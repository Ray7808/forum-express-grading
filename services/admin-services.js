const { Restaurant, Category } = require('../models')

const adminServices = {
  getRestaurants: (req, cb) => {
    Restaurant.findAll({
      raw: true, // 把 Sequelize 包裝過的一大包物件轉換成格式比較單純的 JS 原生物件
      nest: true, // 將原先sequelize因為include生成的物件轉換為可以直接被前端讀取的內容(或用toJSON())
      include: [Category]
    })
      .then(restaurants => cb(null, { restaurants }))
      .catch(err => cb(err))
  }

}
module.exports = adminServices
