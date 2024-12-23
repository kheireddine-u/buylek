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
mongoose.connect(process.env.MONGODB_URI, {})
const db = mongoose.connection
db.on('error', console.error.bind(console, 'Connection error:'))
db.once('open', () => {
  console.log('Connected to MongoDB')
})

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
