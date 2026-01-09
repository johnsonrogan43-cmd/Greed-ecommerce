const express = require('express');
const router = express.Router();

const {
  createOrder,
  getUserOrders,
  getAllOrders,
  updateOrderStatus,
  getOrderById,
} = require('../controllers/orderController');

const { protect, adminOnly } = require('../middleware/authMiddleware');

// Create order (Public - no login required for guest checkout)
router.post('/', createOrder);

// Get single order by ID (Public - users can check order status with order ID)
router.get('/:id', getOrderById);

// Get logged-in user's orders
router.get('/user', protect, getUserOrders);

// Get all orders (Admin)
router.get('/all', protect, adminOnly, getAllOrders);

// Update order status (Admin)
router.put('/:id/status', protect, adminOnly, updateOrderStatus);

module.exports = router;