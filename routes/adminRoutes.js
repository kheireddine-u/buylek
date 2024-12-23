// routes/adminRoutes.js
const express = require('express')
const router = express.Router()
const protect = require('../middleware/protect')
const {
  getDashboard,
  getOrders,
  updateOrderStatus,
} = require('../controllers/adminController')
const {
  addProduct,
  deleteProduct,
  updateProduct,
} = require('../controllers/productController')

router.get('/dashboard', protect, getDashboard)
router.get('/orders', protect, getOrders)
router.patch('/orders/:id/update-status', protect, updateOrderStatus)
router.route('/products').post(protect, addProduct)
router
  .route('/products/:id')
  .delete(protect, deleteProduct)
  .patch(protect, updateProduct)

module.exports = router
