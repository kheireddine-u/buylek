require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const cookieParser = require('cookie-parser')

const { getHomePage } = require('./controllers/productController')
const { getLoginPage } = require('./controllers/viewsController')

const productRoutes = require('./routes/productRoutes')
const orderRoutes = require('./routes/orderRoutes')
const authRoutes = require('./routes/authRoutes')
const adminRoutes = require('./routes/adminRoutes')
const { error } = require('console')

const app = express()
const PORT = 3000

// Middleware
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cookieParser())

// MongoDB Connection
const DB = process.env.CLOUD_MONGODB_URI
const LOCAL_DB = process.env.MONGODB_URI
// connect to mongoDB data base
if (process.env.NODE_ENV === 'production') {
  mongoose
    .connect(DB, {
      //return a promise
    })
    .then((con) => {
      console.log('db connection successful!')
    })
} else if (process.env.NODE_ENV === 'development') {
  mongoose
    .connect(LOCAL_DB, {
      //return a promise
    })
    .then((con) => {
      console.log('local db connection successful!')
    })
}
// Routes
app.get('/', getHomePage)
app.get('/login', getLoginPage)
app.use('/auth', authRoutes)
app.use('/admin', adminRoutes)
app.use('/products', productRoutes)
app.use('/order', orderRoutes)

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`)
})
