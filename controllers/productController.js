const Product = require('../models/productModel')
const wilayas = require('../data/wilayas')

exports.getHomePage = async (req, res) => {
  try {
    const products = await Product.find().limit(8)
    res.render('pages/home', { products, hideBanner: true, isAdmin: false })
  } catch (err) {
    res.status(500).send('Error fetching products')
  }
}

exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find()
    res.render('pages/products', { products, hideBanner: true, isAdmin: false })
  } catch (err) {
    res.status(500).send('Error fetching products')
  }
}

exports.getProductDetails = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
    if (!product) return res.status(404).send('Product not found')
    res.render('pages/product-details', {
      product,
      wilayas,
      hideBanner: true,
      isAdmin: false,
    })
  } catch (err) {
    res.status(500).send('Error fetching product details')
  }
}
exports.addProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body)
    res.status(201).json({
      status: 'success',
      product,
    })
  } catch (err) {
    res.status(500).send('Error creating product ')
  }
}
exports.deleteProduct = async (req, res) => {
  try {
    const productId = req.params.id
    await Product.findByIdAndDelete(productId)
    res.status(200).json({
      status: 'success',
      message: 'product deleted successfully',
    })
  } catch (err) {
    res.status(500).send('Error creating product ')
  }
}
exports.updateProduct = async (req, res) => {
  try {
    const productId = req.params.id

    // Validate the productId
    if (!productId) {
      return res.status(400).json({
        status: 'fail',
        message: 'Product ID is required.',
      })
    }

    // Update the product and return the new document
    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      req.body,
      { new: true, runValidators: true }, // Return the updated product and run validations
    )

    // Handle case where product doesn't exist
    if (!updatedProduct) {
      return res.status(404).json({
        status: 'fail',
        message: 'Product not found.',
      })
    }

    res.status(200).json({
      status: 'success',
      data: updatedProduct,
    })
  } catch (err) {
    console.error('Error updating product:', err.message)
    res.status(500).json({
      status: 'error',
      message: 'Error updating product.',
      error: err.message, // Include error details for easier debugging
    })
  }
}
