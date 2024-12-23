const jwt = require('jsonwebtoken')
const Admin = require('../models/adminModel')

// Secret key for JWT
const JWT_SECRET = process.env.JWT_SECRET

exports.login = async (req, res) => {
  const { email, password } = req.body

  try {
    const admin = await Admin.findOne({ email })

    if (!admin) {
      return res.status(400).render('pages/error', {
        message: 'Invalid credentials!',
        hideBanner: true,
        isAdmin: false,
      })
    }

    const isMatch = await admin.matchPassword(password)

    if (!isMatch) {
      return res.status(400).render('pages/error', {
        message: 'Invalid credentials!',
        hideBanner: true,
        isAdmin: false,
      })
    }

    // Generate JWT token
    const token = jwt.sign({ id: admin._id }, JWT_SECRET, { expiresIn: '1h' })

    // Set token as a cookie or send it in the response
    res.cookie('token', token, {
      httpOnly: true,
      maxAge: 60 * 60 * 1000,
      secure: process.env.NODE_ENV === 'production',
    })

    // Redirect to dashboard page on successful login
    res.redirect('/admin/dashboard')
  } catch (err) {
    console.error(err)
    res
      .status(500)
      .render('pages/error', {
        message: 'Server error',
        hideBanner: true,
        isAdmin: false,
      })
  }
}

// Signup function
exports.signup = async (req, res) => {
  const { username, email, password } = req.body

  try {
    const existingAdmin = await Admin.findOne({ email })
    if (existingAdmin) {
      return res.status(400).render('pages/error', {
        message: 'Email is already in use!',
        hideBanner: true,
        isAdmin: false,
      })
    }

    const admin = new Admin({
      username,
      email,
      password,
    })

    await admin.save()

    // Generate JWT token
    const token = jwt.sign({ id: admin._id }, JWT_SECRET, { expiresIn: '1h' })

    // Set token as a cookie or send it in the response
    res.cookie('token', token, { httpOnly: true })

    // Redirect to dashboard page after successful signup
    res.redirect('/admin/dashboard')
  } catch (err) {
    console.error(err)
    res
      .status(500)
      .render('pages/error', {
        message: 'Server error',
        hideBanner: true,
        isAdmin: false,
      })
  }
}
