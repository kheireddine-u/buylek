const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  oldPrice: { type: Number, required: true },
  priceGap: { type: Number },

  note: { type: String, required: true },

  image: { type: String, required: true },
  images: { type: [String], required: false },

  features: { type: [String], required: false },
  colors: { type: [String], required: false },
  sizes: { type: [String], required: false },
})

// Automatically calculate the price gap before saving
productSchema.pre('save', function (next) {
  this.priceGap = this.oldPrice - this.price // Calculate the price difference
  console.log(this.priceGap, 'seed ')
  next()
})

const Product = mongoose.model('Product', productSchema)

module.exports = Product
