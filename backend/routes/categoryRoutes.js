// FILE: routes/categoryRoutes.js
// ============================================
const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/auth');
const Category = require('../models/Category');

// Get all categories
router.get('/', async (req, res) => {
  try {
    const categories = await Category.find({ isActive: true })
      .populate('parent', 'name slug')
      .sort({ name: 1 });

    res.json({ success: true, data: { categories } });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Get category by ID or slug
router.get('/:identifier', async (req, res) => {
  try {
    const category = await Category.findOne({
      $or: [
        { _id: req.params.identifier },
        { slug: req.params.identifier }
      ]
    }).populate('parent', 'name slug');

    if (!category) {
      return res.status(404).json({ success: false, message: 'Category not found' });
    }

    res.json({ success: true, data: { category } });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Create category (Admin only)
router.post('/', protect, authorize('admin', 'superadmin'), async (req, res) => {
  try {
    const category = await Category.create(req.body);
    res.status(201).json({ 
      success: true, 
      message: 'Category created successfully',
      data: { category } 
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Update category (Admin only)
router.put('/:id', protect, authorize('admin', 'superadmin'), async (req, res) => {
  try {
    const category = await Category.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!category) {
      return res.status(404).json({ success: false, message: 'Category not found' });
    }

    res.json({ 
      success: true, 
      message: 'Category updated successfully',
      data: { category } 
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Delete category (Admin only)
router.delete('/:id', protect, authorize('admin', 'superadmin'), async (req, res) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);

    if (!category) {
      return res.status(404).json({ success: false, message: 'Category not found' });
    }

    res.json({ success: true, message: 'Category deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
