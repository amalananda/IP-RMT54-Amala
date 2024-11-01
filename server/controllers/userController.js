const { User } = require("../models")
const bcrypt = require('bcrypt')
const { signToken } = require("../helpers/jwt")
module.exports = class UserController {
  static async register(req, res, next) {
    const { username, email, password } = req.body

    if (!email) {
      return res.status(400).json({ message: "Email is required" })
    }
    try {
      // console.log("Request Body: ", req.body)
      const newUser = await User.create({
        username,
        email,
        password,
      })
      res.status(201).json({
        message: "Register Success",
        username,
      })
    } catch (err) {
      console.log(err, "<<<<")
      next(err)
    }
  }
  static async login(req, res, next) {
    const { email, password } = req.body
    if (!email) {
      const err = new Error('Email is required')
      err.name = 'BadRequest'
      return next(err)
    }

    if (!password) {
      const err = new Error('Password is required')
      err.name = 'BadRequest'
      return next(err)
    }

    try {
      const user = await User.findOne({ where: { email } })
      if (!user) {
        const err = new Error('Invalid email/password')
        err.name = 'Unauthorized'
        return next(err)
      }

      const isValidPassword = await bcrypt.compare(password, user.password)
      if (!isValidPassword) {
        const err = new Error('Invalid email/password')
        err.name = 'Unauthorized'
        return next(err)
      }

      const access_token = signToken({ id: user.id })
      res.status(200).json({ access_token: access_token, username: user.username, user: { id: user.id } }) //kalau salah user: { id: user.id } dihapus
    } catch (err) {
      next(err)
    }
  }
}
