const express = require('express');
const router = express.Router();

const {
  createOrder,
  getUserOrders,
  getAllOrders,
  updateOrderStatus,
} = require('../controllers/orderController');

const { protect, adminOnly } = require('../middleware/authMiddleware');

// Create order (User)
router.post('/', protect, createOrder);

// Get logged-in user's orders
router.get('/user', protect, getUserOrders);

// Get all orders (Admin)
router.get('/all', protect, adminOnly, getAllOrders);

// Update order status (Admin)
router.put('/:id/status', protect, adminOnly, updateOrderStatus);

module.exports = router;
