const Product = require('../models/Product');

// ================================
// TEMP IN-MEMORY CART STORE
// ================================
const carts = {};

// Helper
const getUserCart = (userId) => {
  if (!carts[userId]) {
    carts[userId] = [];
  }
  return carts[userId];
};

// ================================
// GET CART
// GET /api/cart
// ================================
exports.getCart = (req, res) => {
  const userId = req.user.id;
  const cart = getUserCart(userId);

  res.status(200).json({
    success: true,
    cart
  });
};

// ================================
// ADD TO CART
// POST /api/cart/add
// ================================
exports.addToCart = async (req, res) => {
  try {
    const { productId, size, quantity } = req.body;
    const userId = req.user.id;

    if (!productId || !size || !quantity) {
      return res.status(400).json({
        success: false,
        message: 'productId, size, and quantity are required'
      });
    }

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    if (
      !product.sizeStock ||
      typeof product.sizeStock[size] !== 'number'
    ) {
      return res.status(400).json({
        success: false,
        message: `Size ${size} is not available`
      });
    }

    if (product.sizeStock[size] < quantity) {
      return res.status(400).json({
        success: false,
        message: `Only ${product.sizeStock[size]} items available in size ${size}`
      });
    }

    const cart = getUserCart(userId);

    const existingItem = cart.find(
      item => item.productId.toString() === productId && item.size === size
    );

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.push({
        itemId: Date.now().toString(),
        productId: product._id,
        name: product.name,
        size,
        quantity,
        price: product.price,
        image: product.images?.[0] || null
      });
    }

    res.status(200).json({
      success: true,
      message: 'Item added to cart',
      cart
    });
  } catch (error) {
    console.error('Add to cart error:', error);
    res.status(500).json({
      success: false,
      message: 'Error adding to cart',
      error: error.message
    });
  }
};

// ================================
// UPDATE CART ITEM
// PUT /api/cart/items/:itemId
// ================================
exports.updateCartItem = (req, res) => {
  const userId = req.user.id;
  const { itemId } = req.params;
  const { quantity } = req.body;

  const cart = getUserCart(userId);
  const item = cart.find(i => i.itemId === itemId);

  if (!item) {
    return res.status(404).json({
      success: false,
      message: 'Cart item not found'
    });
  }

  if (!quantity || quantity < 1) {
    return res.status(400).json({
      success: false,
      message: 'Quantity must be at least 1'
    });
  }

  item.quantity = quantity;

  res.status(200).json({
    success: true,
    message: 'Cart item updated',
    cart
  });
};

// ================================
// REMOVE CART ITEM
// DELETE /api/cart/items/:itemId
// ================================
exports.removeFromCart = (req, res) => {
  const userId = req.user.id;
  const { itemId } = req.params;

  carts[userId] = getUserCart(userId).filter(
    item => item.itemId !== itemId
  );

  res.status(200).json({
    success: true,
    message: 'Item removed from cart',
    cart: carts[userId]
  });
};

// ================================
// CLEAR CART
// DELETE /api/cart/clear
// ================================
exports.clearCart = (req, res) => {
  const userId = req.user.id;
  carts[userId] = [];

  res.status(200).json({
    success: true,
    message: 'Cart cleared'
  });
};
