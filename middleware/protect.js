const jwt = require('jsonwebtoken')
const JWT_SECRET = process.env.JWT_SECRET

const protect = (req, res, next) => {
  const token = req.cookies.token

  if (!token) {
    return res.redirect('/login')
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET)
    req.admin = decoded
    req.isAdmin = true
    next()
  } catch (err) {
    console.error(err)
    return res.redirect('/login')
  }
}

module.exports = protect
