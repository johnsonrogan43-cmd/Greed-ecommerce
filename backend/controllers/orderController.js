const Order = require('../models/Order');
const Product = require('../models/Product');
const mongoose = require('mongoose');

// Create order
exports.createOrder = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  
  try {
    const { items, shippingAddress, paymentMethod } = req.body;
    
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
        price: product.price
      });
      
      totalAmount += product.price * item.quantity;
    }
    
    // Create order
    const order = await Order.create([{
      user: req.user._id,
      items: orderItems,
      shippingAddress,
      totalAmount,
      paymentMethod,
      paymentStatus: 'pending',
      orderStatus: 'pending'
    }], { session });
    
    await session.commitTransaction();
    
    res.status(201).json({
      success: true,
      message: 'Order created successfully',
      order: order[0]
    });
  } catch (error) {
    await session.abortTransaction();
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