const jwt = require("jsonwebtoken")
require('dotenv').config()
const JWT_SECRET = process.env.JWT_SECRET

const signToken = (payload) => {
  return jwt.sign(payload, JWT_SECRET)
}

const verifyToken = (token) => {
  return jwt.verify(token, JWT_SECRET)
}

module.exports = {
  signToken,
  verifyToken
}
