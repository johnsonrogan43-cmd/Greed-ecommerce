const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

// Allowed origins for CORS
const allowedOrigins = [
  'http://localhost:3000',
  'https://greed-ecommerce.vercel.app'
];

// CORS Configuration
app.use(cors({
  origin: function(origin, callback) {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

// Body Parser Middleware (IMPORTANT - was missing!)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Database Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB Connected'))
  .catch((err) => console.error('❌ MongoDB Error:', err));

// Import Routes with error handling
let authRoutes, productRoutes, cartRoutes, orderRoutes;

try {
  authRoutes = require('./routes/authRoutes');
  productRoutes = require('./routes/productRoutes');
  cartRoutes = require('./routes/cartRoutes');
  orderRoutes = require('./routes/orderRoutes');
} catch (error) {
  console.error('❌ Error loading routes:', error.message);
  process.exit(1);
}

// Use Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/orders', orderRoutes);

// Health Check
app.get('/', (req, res) => {
  res.json({ message: '🔥 GREED API is running!' });
});

// Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// Start Server (Note: Vercel handles this automatically in production)
const PORT = process.env.PORT || 5000;
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`✅ Server running on port ${PORT}`);
  });
}

// Export for Vercel
module.exports = app;