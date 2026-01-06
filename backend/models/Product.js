const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  category: {
    type: String,
    required: true,
    enum: ['mens-fashion', 'football-jerseys', 'football-boots']
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  images: [{
    type: String,
    required: true
  }],
  description: {
    type: String,
    required: true
  },
  brand: String,
  team: String,
  season: String,
  isJersey: {
    type: Boolean,
    default: false
  },
  sizeStock: {
    S: { type: Number, default: 0, min: 0 },
    M: { type: Number, default: 0, min: 0 },
    L: { type: Number, default: 0, min: 0 },
    XL: { type: Number, default: 0, min: 0 },
    XXL: { type: Number, default: 0, min: 0 }
  },
  averageRating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5
  },
  numReviews: {
    type: Number,
    default: 0
  }
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);