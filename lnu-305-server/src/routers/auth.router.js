const passport = require('passport')
const express = require('express')
const router = express.Router()

const sessionMiddleware = require('../middleware/session.middleware')
const AuthController = require('../controllers/auth.controller')

const twitterAuth = passport.authenticate('twitter')

router.get('/twitter/callback', twitterAuth, AuthController.route({ provider: 'twitter' }, 'LNU University'))

router.use(sessionMiddleware.saveSocketSession)

router.get('/twitter', twitterAuth)

module.exports = router
