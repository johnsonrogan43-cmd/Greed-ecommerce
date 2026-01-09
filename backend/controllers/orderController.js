const Order = require('../models/Order');
const Product = require('../models/Product');
const mongoose = require('mongoose');
const { Resend } = require('resend');

// Initialize Resend (only if API key exists)
let resend = null;
if (process.env.RESEND_API_KEY) {
  resend = new Resend(process.env.RESEND_API_KEY);
}

// Verify Paystack Payment
const verifyPaystackPayment = async (reference) => {
  try {
    const response = await fetch(
      `https://api.paystack.co/transaction/verify/${reference}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
        },
      }
    );
    const data = await response.json();
    return data.status && data.data.status === 'success';
  } catch (error) {
    console.error('Paystack verification error:', error);
    return false;
  }
};

// Send Order Confirmation Email
const sendOrderConfirmationEmail = async (orderData) => {
  if (!resend) {
    console.log('Resend not configured, skipping email');
    return true;
  }

  try {
    const itemsList = orderData.items
      .map((item) => {
        const itemName = item.product?.name || item.name || 'Product';
        const itemPrice = item.price || 0;
        const itemQuantity = item.quantity || 0;
        return `<tr>
          <td style="padding: 10px; border-bottom: 1px solid #eee;">${itemName} (Size: ${item.size})</td>
          <td style="padding: 10px; border-bottom: 1px solid #eee; text-align: center;">${itemQuantity}</td>
          <td style="padding: 10px; border-bottom: 1px solid #eee; text-align: right;">₦${(itemPrice * itemQuantity).toLocaleString()}</td>
        </tr>`;
      })
      .join('');

    const customerName = orderData.customerInfo?.name || orderData.shippingAddress?.name || 'Customer';
    const customerEmail = orderData.customerInfo?.email || orderData.user?.email || 'customer@example.com';

    const emailHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: #10b981; color: white; padding: 20px; text-align: center; }
            .content { background: #f9f9f9; padding: 20px; }
            .order-details { background: white; padding: 20px; margin: 20px 0; border-radius: 8px; }
            .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
            table { width: 100%; border-collapse: collapse; }
            .total { font-size: 18px; font-weight: bold; color: #10b981; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>✅ Order Confirmed!</h1>
            </div>
            
            <div class="content">
              <p>Hi <strong>${customerName}</strong>,</p>
              <p>Thank you for your order! We've received your order and it's being processed.</p>
              
              <div class="order-details">
                <h2>Order Details</h2>
                <p><strong>Order ID:</strong> ${orderData._id}</p>
                <p><strong>Payment Method:</strong> ${orderData.paymentMethod === 'paystack' ? '💳 Paystack' : '🚚 Pay on Delivery'}</p>
                <p><strong>Payment Status:</strong> ${orderData.paymentStatus === 'completed' ? '✅ Paid' : '⏳ Pending'}</p>
                
                <h3>Items Ordered:</h3>
                <table>
                  <thead>
                    <tr style="background: #f0f0f0;">
                      <th style="padding: 10px; text-align: left;">Item</th>
                      <th style="padding: 10px; text-align: center;">Quantity</th>
                      <th style="padding: 10px; text-align: right;">Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    ${itemsList}
                  </tbody>
                </table>
                
                <div style="text-align: right; padding: 20px 10px;">
                  <p class="total">Total: ₦${orderData.totalAmount.toLocaleString()}</p>
                </div>
                
                <h3>Shipping Address:</h3>
                <p>
                  ${orderData.shippingAddress.street}<br>
                  ${orderData.shippingAddress.city}, ${orderData.shippingAddress.state}<br>
                  ${orderData.shippingAddress.country}, ${orderData.shippingAddress.zipCode}
                </p>
                
                ${orderData.customerInfo?.phone ? `<p><strong>Contact:</strong> ${orderData.customerInfo.phone}</p>` : ''}
              </div>
              
              <p>We'll send you another email when your order ships.</p>
              <p>If you have any questions, please don't hesitate to contact us.</p>
            </div>
            
            <div class="footer">
              <p>© 2026 Greed Ecommerce. All rights reserved.</p>
              <p>This is an automated email. Please do not reply.</p>
            </div>
          </div>
        </body>
      </html>
    `;

    await resend.emails.send({
      from: 'onboarding@resend.dev', // Change this after verifying your domain
      to: customerEmail,
      subject: `Order Confirmation - Order #${orderData._id}`,
      html: emailHtml,
    });

    console.log('✅ Email sent successfully to:', customerEmail);
    return true;
  } catch (error) {
    console.error('❌ Email sending error:', error);
    return false;
  }
};

// Create order (Updated to support both guest and authenticated users)
exports.createOrder = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  
  try {
    const { items, shippingAddress, paymentMethod, paymentReference, customerInfo } = req.body;
    
    // Validate required fields
    if (!items || items.length === 0) {
      await session.abortTransaction();
      return res.status(400).json({
        success: false,
        message: 'No items in order'
      });
    }

    if (!shippingAddress) {
      await session.abortTransaction();
      return res.status(400).json({
        success: false,
        message: 'Shipping address is required'
      });
    }

    // For guest checkout, require customerInfo
    if (!req.user && !customerInfo) {
      await session.abortTransaction();
      return res.status(400).json({
        success: false,
        message: 'Customer information is required for guest checkout'
      });
    }

    // Verify Paystack payment if applicable
    if (paymentMethod === 'paystack' && paymentReference) {
      if (!process.env.PAYSTACK_SECRET_KEY) {
        console.warn('⚠️ Paystack secret key not configured');
      } else {
        const isPaymentValid = await verifyPaystackPayment(paymentReference);
        
        if (!isPaymentValid) {
          await session.abortTransaction();
          return res.status(400).json({
            success: false,
            message: 'Payment verification failed'
          });
        }
      }
    }

    // Validate and calculate total
    let totalAmount = 0;
    const orderItems = [];
    
    for (const item of items) {
      const product = await Product.findById(item.productId).session(session);
      
      if (!product) {
        throw new Error(`Product ${item.productId} not found`);
      }
      
      // Check stock
      if (product.sizeStock[item.size] < item.quantity) {
        throw new Error(`Insufficient stock for ${product.name} in size ${item.size}`);
      }
      
      // Deduct stock
      product.sizeStock[item.size] -= item.quantity;
      await product.save({ session });
      
      orderItems.push({
        product: product._id,
        size: item.size,
        quantity: item.quantity,
        price: product.price,
        name: product.name // Store name for email
      });
      
      totalAmount += product.price * item.quantity;
    }
    
    // Determine payment status
    const paymentStatus = paymentMethod === 'paystack' ? 'completed' : 'pending';
    
    // Create order
    const order = await Order.create([{
      user: req.user?._id || null, // null for guest orders
      items: orderItems,
      shippingAddress,
      totalAmount,
      paymentMethod: paymentMethod || 'paystack',
      paymentReference: paymentReference || undefined,
      paymentStatus,
      orderStatus: 'pending',
      customerInfo // Store for guest orders
    }], { session });
    
    await session.commitTransaction();

    // Prepare order data for email
    const orderForEmail = {
      ...order[0].toObject(),
      customerInfo: customerInfo || {
        name: req.user?.name,
        email: req.user?.email
      }
    };

    // Send confirmation email (non-blocking)
    sendOrderConfirmationEmail(orderForEmail).catch(err => 
      console.error('Email sending failed:', err)
    );
    
    res.status(201).json({
      success: true,
      message: 'Order created successfully! Check your email for confirmation.',
      order: order[0]
    });
  } catch (error) {
    await session.abortTransaction();
    console.error('Order creation error:', error);
    res.status(500).json({
      success: false,
      message: 'Error creating order',
      error: error.message
    });
  } finally {
    session.endSession();
  }
};

// Get user orders
exports.getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id })
      .populate('items.product')
      .sort({ createdAt: -1 });
    
    res.json({
      success: true,
      count: orders.length,
      orders
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching orders',
      error: error.message
    });
  }
};

// Get all orders (Admin only)
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate('user', 'name email')
      .populate('items.product')
      .sort({ createdAt: -1 });
    
    res.json({
      success: true,
      count: orders.length,
      orders
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching orders',
      error: error.message
    });
  }
};

// Get order by ID (for tracking - no auth required)
exports.getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate('items.product')
      .populate('user', 'name email');
    
    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }
    
    res.json({
      success: true,
      order
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching order',
      error: error.message
    });
  }
};

// Update order status (Admin only)
exports.updateOrderStatus = async (req, res) => {
  try {
    const { orderStatus, paymentStatus } = req.body;
    
    const order = await Order.findById(req.params.id);
    
    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }
    
    if (orderStatus) order.orderStatus = orderStatus;
    if (paymentStatus) order.paymentStatus = paymentStatus;
    
    await order.save();
    
    res.json({
      success: true,
      message: 'Order updated successfully',
      order
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating order',
      error: error.message
    });
  }
};