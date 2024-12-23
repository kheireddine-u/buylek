const express = require('express')
const {
  getProducts,
  getProductDetails,
} = require('../controllers/productController')

const router = express.Router()

router.get('/', getProducts)
router.get('/:id', getProductDetails)

module.exports = router
