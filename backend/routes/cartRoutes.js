const express = require('express');
const router = express.Router();
const { addToCart, validateCart } = require('../controllers/cartController');
const { protect } = require('../middleware/authMiddleware');

router.post('/add', protect, addToCart);
router.post('/validate', protect, validateCart);

module.exports = router;