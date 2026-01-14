// FILE: middleware/validator.js
// ============================================
exports.validateRegister = (req, res, next) => {
  const { firstName, lastName, email, password } = req.body;
  
  if (!firstName || !lastName || !email || !password) {
    return res.status(400).json({
      success: false,
      message: 'Please provide all required fields'
    });
  }

  if (password.length < 6) {
    return res.status(400).json({
      success: false,
      message: 'Password must be at least 6 characters'
    });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({
      success: false,
      message: 'Please provide a valid email'
    });
  }

  next();
};

exports.validateProduct = (req, res, next) => {
  const { name, description, price, category, stock } = req.body;
  
  if (!name || !description || !price || !category) {
    return res.status(400).json({
      success: false,
      message: 'Please provide all required fields'
    });
  }

  if (price < 0) {
    return res.status(400).json({
      success: false,
      message: 'Price cannot be negative'
    });
  }

  if (stock !== undefined && stock < 0) {
    return res.status(400).json({
      success: false,
      message: 'Stock cannot be negative'
    });
  }

  next();
};

