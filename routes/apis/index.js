const express = require('express')
const router = express.Router()
const restController = require('../../controllers/apis/restaurant-controller')
const admin = require('./modules/admin')
const { apiErrorHandler } = require('../../middleware/error-handler')
const passport = require('../../config/passport')
const userController = require('../../controllers/apis/user-controller')

router.use('/admin', admin)

router.post('/signin', passport.authenticate('local', { session: false }), userController.signIn) // 注意是 post

router.get('/restaurants', restController.getRestaurants)

router.use('/', apiErrorHandler)

module.exports = router
