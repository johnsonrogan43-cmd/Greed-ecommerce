const Product = require('../models/Product');

// Add to cart (stored in session/memory for now, can be DB later)
exports.addToCart = async (req, res) => {
  try {
    const { productId, size, quantity } = req.body;
    
    // Validate product exists
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }
    
    // Check stock availability
    if (product.sizeStock[size] < quantity) {
      return res.status(400).json({
        success: false,
        message: `Only ${product.sizeStock[size]} items available in size ${size}`
      });
    }
    
    res.json({
      success: true,
      message: 'Item added to cart',
      cartItem: {
        productId: product._id,
        name: product.name,
        size,
        quantity,
        price: product.price,
        image: product.images[0]
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error adding to cart',
      error: error.message
    });
  }
};

// Validate cart items before checkout
exports.validateCart = async (req, res) => {
  try {
    const { items } = req.body;
    
    const validationResults = [];
    
    for (const item of items) {
      const product = await Product.findById(item.productId);
      
      if (!product) {
        validationResults.push({
          productId: item.productId,
          valid: false,
          message: 'Product not found'
        });
        continue;
      }
      
      if (product.sizeStock[item.size] < item.quantity) {
        validationResults.push({
          productId: item.productId,
          size: item.size,
          valid: false,
          message: `Only ${product.sizeStock[item.size]} items available`,
          availableStock: product.sizeStock[item.size]
        });
      } else {
        validationResults.push({
          productId: item.productId,
          size: item.size,
          valid: true
        });
      }
    }
    
    const allValid = validationResults.every(r => r.valid);
    
    res.json({
      success: allValid,
      validationResults
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error validating cart',
      error: error.message
    });
  }
};