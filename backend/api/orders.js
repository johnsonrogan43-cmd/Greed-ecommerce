const { Resend } = require('resend');

// Initialize Resend (only if API key exists)
let resend = null;
if (process.env.RESEND_API_KEY) {
  resend = new Resend(process.env.RESEND_API_KEY);
}

// Verify Paystack Payment
async function verifyPaystackPayment(reference) {
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
}

// Send Order Confirmation Email
async function sendOrderConfirmationEmail(orderData) {
  // Skip email if Resend is not configured
  if (!resend) {
    console.log('Resend not configured, skipping email');
    return true;
  }

  try {
    const itemsList = orderData.items
      .map(
        (item) =>
          `<tr>
            <td style="padding: 10px; border-bottom: 1px solid #eee;">${item.name} (Size: ${item.size})</td>
            <td style="padding: 10px; border-bottom: 1px solid #eee; text-align: center;">${item.quantity}</td>
            <td style="padding: 10px; border-bottom: 1px solid #eee; text-align: right;">₦${(item.price * item.quantity).toLocaleString()}</td>
          </tr>`
      )
      .join('');

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
              <p>Hi <strong>${orderData.customerInfo.name}</strong>,</p>
              <p>Thank you for your order! We've received your order and it's being processed.</p>
              
              <div class="order-details">
                <h2>Order Details</h2>
                <p><strong>Order ID:</strong> ${orderData.orderId}</p>
                <p><strong>Payment Method:</strong> ${orderData.paymentMethod === 'paystack' ? '💳 Paystack' : '🚚 Pay on Delivery'}</p>
                <p><strong>Payment Status:</strong> ${orderData.paymentStatus === 'paid' ? '✅ Paid' : '⏳ Pending'}</p>
                
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
                
                <h3>Contact Information:</h3>
                <p>
                  <strong>Email:</strong> ${orderData.customerInfo.email}<br>
                  <strong>Phone:</strong> ${orderData.customerInfo.phone}
                </p>
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
      to: orderData.customerInfo.email,
      subject: `Order Confirmation - Order #${orderData.orderId}`,
      html: emailHtml,
    });

    console.log('Email sent successfully');
    return true;
  } catch (error) {
    console.error('Email sending error:', error);
    return false;
  }
}

module.exports = async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS, GET');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  // Handle preflight request
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Handle GET request (for testing)
  if (req.method === 'GET') {
    return res.status(200).json({
      success: true,
      message: 'Orders API is working!',
      timestamp: new Date().toISOString(),
    });
  }

  // Handle POST request
  if (req.method === 'POST') {
    try {
      const orderData = req.body;

      // Log received data for debugging
      console.log('Received order data:', JSON.stringify(orderData, null, 2));

      // Validate required fields
      if (!orderData.items || orderData.items.length === 0) {
        return res.status(400).json({
          success: false,
          message: 'No items in order',
        });
      }

      if (!orderData.customerInfo || !orderData.shippingAddress) {
        return res.status(400).json({
          success: false,
          message: 'Missing customer or shipping information',
        });
      }

      // Verify Paystack payment if applicable
      if (orderData.paymentMethod === 'paystack' && orderData.paymentReference) {
        if (!process.env.PAYSTACK_SECRET_KEY) {
          console.warn('Paystack secret key not configured');
        } else {
          const isPaymentValid = await verifyPaystackPayment(orderData.paymentReference);
          
          if (!isPaymentValid) {
            return res.status(400).json({
              success: false,
              message: 'Payment verification failed',
            });
          }
        }
      }

      // Generate Order ID
      const orderId = `ORD-${Date.now()}`;
      
      // Prepare complete order data
      const completeOrderData = {
        ...orderData,
        orderId,
        orderDate: new Date().toISOString(),
        status: 'processing',
      };

      // Send confirmation email (will skip if Resend not configured)
      await sendOrderConfirmationEmail(completeOrderData);

      // Send success response
      return res.status(200).json({
        success: true,
        message: 'Order placed successfully!',
        orderId,
        order: completeOrderData,
      });
    } catch (error) {
      console.error('Order processing error:', error);
      return res.status(500).json({
        success: false,
        message: 'Error processing order',
        error: error.message,
        stack: process.env.NODE_ENV === 'development' ? error.stack : undefined,
      });
    }
  }

  return res.status(405).json({
    success: false,
    message: 'Method not allowed',
  });
};