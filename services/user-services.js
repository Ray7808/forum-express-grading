const { User } = require('../models')
const bcrypt = require('bcryptjs') // 載入 bcrypt

const userServices = {
  signUp: (req, cb) => { // 修改這裡
    // 如果兩次輸入的密碼不同，就建立一個 Error 物件並拋出
    if (req.body.password !== req.body.passwordCheck) throw new Error('Passwords do not match!')

    // 確認資料裡面沒有一樣的 email，若有，就建立一個 Error 物件並拋出
    return User.findOne({
      where: { email: req.body.email }
    })
      .then(user => {
        if (user) throw new Error('Email already exists!')
        return bcrypt.hash(req.body.password, 10) // 前面加 return
      })
      .then(hash => {
        return User.create({ // 上面錯誤狀況都沒發生，就把使用者的資料寫入資料庫
          name: req.body.name,
          email: req.body.email,
          password: hash
        })
      })
      .then(user => cb(null, { user: user }))
      .catch(err => cb(err)) // 接住前面拋出的錯誤，呼叫專門做錯誤處理的 middleware
  }
}

module.exports = userServices
