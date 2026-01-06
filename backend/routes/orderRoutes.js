const express = require('express');
const router = express.Router();
const {
  createOrder,
  getUserOrders,
  getAllOrders,
  updateOrderStatus
} = require('../controllers/orderController');
const { protect, admin } = require('../middleware/authMiddleware');

router.post('/', protect, createOrder);
router.get('/user', protect, getUserOrders);
router.get('/all', protect, admin, getAllOrders);
router.put('/:id/status', protect, admin, updateOrderStatus);

module.exports = router;