const { User } = require("../models")
const { verifyToken } = require("../helpers/jwt")

module.exports = async function authentication(req, res, next) {
  const bearerToken = req.headers.authorization
  try {
    if (req.path === '/user/register' || req.path === '/user/login') {
      return next() // Langsung lanjutkan ke rute
    }
    if (bearerToken) {
      const token = bearerToken.split(' ')[1]
      if (token) {
        const decoded = verifyToken(token)
        const user = await User.findByPk(decoded.id, {
          attributes: {
            exclude: ['email', 'password']
          }
        })
        if (user) {
          req.user = user
          return next()
        }
      }
    }
    throw { name: 'JsonWebTokenError' }
  } catch (err) {
    // Tangani kesalahan jika token tidak valid atau error lain
    next(err)
  }
}
