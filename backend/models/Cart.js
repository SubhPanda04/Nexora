const mongoose = require('mongoose');

const cartItemSchema = new mongoose.Schema({
  productId: { type: Number, required: true },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true, default: 1 },
});

const cartSchema = new mongoose.Schema({
  userId: { type: String, default: 'default' },
  sessionId: { type: String, unique: true, sparse: true },
  items: [cartItemSchema],
  total: { type: Number, default: 0 },
  lastUpdated: { type: Date, default: Date.now },
  expiresAt: { type: Date, default: () => new Date(Date.now() + 24 * 60 * 60 * 1000) }, 
});

module.exports = mongoose.model('Cart', cartSchema);