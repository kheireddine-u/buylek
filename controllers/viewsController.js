exports.getLoginPage = async (req, res) => {
  try {
    res.render('pages/login', { hideBanner: true, isAdmin: false })
  } catch (err) {
    res.status(500).send('Error fetching products')
  }
}
