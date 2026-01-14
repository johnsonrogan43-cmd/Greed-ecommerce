// FILE: routes/reviewRoutes.js
// ============================================
const express = require('express');
const router = express.Router();
const {
  createReview,
  getProductReviews,
  markHelpful
} = require('../controllers/reviewController');
const { protect } = require('../middleware/auth');

router.post('/', protect, createReview);
router.get('/product/:productId', getProductReviews);
router.put('/:id/helpful', markHelpful);

module.exports = router;

