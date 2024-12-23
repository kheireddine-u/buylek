// models/Order.js
const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  color: {
    type: String,
  },
  size: {
    type: String,
  },
  status: {
    type: String,
    enum: ['Pending', 'Delivered', 'Returned'],
    default: 'Pending',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

module.exports = mongoose.model('Order', orderSchema)
