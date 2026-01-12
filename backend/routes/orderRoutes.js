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

// Create order - PUBLIC (no auth required for guest checkout)
// But can also work for authenticated users
router.post('/', createOrder);

// Get single order by ID - PUBLIC (for order tracking)
router.get('/:id', getOrderById);

// Get logged-in user's orders - PROTECTED
router.get('/user/orders', protect, getUserOrders);

// Get all orders - ADMIN ONLY
router.get('/all', protect, adminOnly, getAllOrders);

// Update order status - ADMIN ONLY
router.put('/:id/status', protect, adminOnly, updateOrderStatus);

module.exports = router;