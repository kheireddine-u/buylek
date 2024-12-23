const Order = require('../models/orderModel')
const Product = require('../models/productModel')

exports.createOrder = async (req, res) => {
  try {
    const { userName, phoneNumber, address, quantity, color, size } = req.body
    const productId = req.params.id

    const product = await Product.findById(productId)
    if (!product) {
      return res.status(404).json({ message: 'Product not found' })
    }

    const order = new Order({
      userName,
      phoneNumber,
      address,
      productId,
      quantity,
      color: product.colors.includes(color) ? color : undefined,
      size: product.sizes.includes(size) ? size : undefined,
    })

    await order.save()

    res.render('pages/thanks', { userName, isAdmin: false, hideBanner: false })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Internal server error' })
  }
}
