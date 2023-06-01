const jwt = require('jsonwebtoken')
const userServices = require('../../services/user-services')

const userController = {
  signIn: (req, res, next) => {
    try {
      const userData = req.user.toJSON()
      delete userData.password
      const token = jwt.sign(userData, process.env.JWT_SECRET, { expiresIn: '30d' }) // 簽發JWT，效期為30天
      res.json({
        status: 'success',
        data: {
          token, user: userData
        }
      })
    } catch (err) {
      next(err)
    }
  },
  signUp: (req, res, next) => { // 修改這裡
    userServices.signUp(req, (err, data) => {
      if (err) return next(err)
      return res.json({ status: 'success', message: 'Sign up successfully!' })
    })
  }
}

module.exports = userController
