const Order = require('../models/orderModel') // Adjust the path to your Order model

exports.getDashboard = async (req, res) => {
  res.render('pages/dashboard', { hideBanner: true, isAdmin: req.isAdmin })
}

exports.getOrders = async (req, res) => {
  const { page = 1, limit = 10 } = req.query // Get pagination parameters from the query

  try {
    const orders = await Order.find()
      .populate('productId', 'name price') // Include product name and price
      .skip((page - 1) * limit)
      .limit(parseInt(limit))

    const totalOrders = await Order.countDocuments()
    res.render('pages/admin-orders', {
      orders,
      currentPage: parseInt(page),
      totalPages: Math.ceil(totalOrders / limit),
      hideBanner: true,
      isAdmin: req.isAdmin,
    })
  } catch (err) {
    console.error(err)
    res.status(500).render('pages/error', {
      message: 'Server error',
      hideBanner: true,
      isAdmin: req.isAdmin,
    })
  }
}
exports.updateOrderStatus = async (req, res) => {
  const { id } = req.params
  const { status } = req.body

  try {
    const order = await Order.findByIdAndUpdate(id, { status }, { new: true })
    if (!order) {
      return res.status(404).json({ message: 'Order not found' })
    }
    res.status(200).json({ message: 'Status updated successfully', order })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Server error' })
  }
}
