// FILE: routes/productRoutes.js
// ============================================
const express = require('express');
const router = express.Router();
const {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  getFeaturedProducts
} = require('../controllers/productController');
const { protect, authorize } = require('../middleware/auth');
const { validateProduct } = require('../middleware/validator');

router.get('/', getProducts);
router.get('/featured', getFeaturedProducts);
router.get('/:id', getProduct);
router.post('/', protect, authorize('admin', 'superadmin'), validateProduct, createProduct);
router.put('/:id', protect, authorize('admin', 'superadmin'), updateProduct);
router.delete('/:id', protect, authorize('admin', 'superadmin'), deleteProduct);

module.exports = router;

