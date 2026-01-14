// FILE: controllers/reviewController.js
// ============================================
const Review = require('../models/Review');
const Product = require('../models/Product');
const Order = require('../models/Order');

exports.createReview = async (req, res) => {
  try {
    const { productId, rating, title, comment, images } = req.body;

    // Check if user has purchased the product
    const order = await Order.findOne({
      user: req.user.id,
      'items.product': productId,
      orderStatus: 'delivered'
    });

    const reviewData = {
      product: productId,
      user: req.user.id,
      rating,
      title,
      comment,
      images: images || [],
      verified: !!order
    };

    if (order) {
      reviewData.order = order._id;
    }

    const review = await Review.create(reviewData);

    // Update product rating
    const reviews = await Review.find({ product: productId, isApproved: true });
    const avgRating = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;

    await Product.findByIdAndUpdate(productId, {
      'rating.average': avgRating,
      'rating.count': reviews.length
    });

    res.status(201).json({
      success: true,
      message: 'Review submitted successfully',
      data: { review }
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: 'You have already reviewed this product'
      });
    }
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

exports.getProductReviews = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const filter = {
      product: req.params.productId,
      isApproved: true
    };

    if (req.query.rating) {
      filter.rating = parseInt(req.query.rating);
    }

    const reviews = await Review.find(filter)
      .populate('user', 'firstName lastName avatar')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Review.countDocuments(filter);

    res.json({
      success: true,
      data: {
        reviews,
        pagination: {
          page,
          limit,
          total,
          pages: Math.ceil(total / limit)
        }
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

exports.markHelpful = async (req, res) => {
  try {
    const review = await Review.findByIdAndUpdate(
      req.params.id,
      { $inc: { helpful: 1 } },
      { new: true }
    );

    if (!review) {
      return res.status(404).json({
        success: false,
        message: 'Review not found'
      });
    }

    res.json({
      success: true,
      data: { review }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
