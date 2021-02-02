const passport = require('passport')
const express = require('express')
const router = express.Router()

const { uploadImage } = require('../controllers/twitter.controller')
const bearerAuth = passport.authenticate('bearer')

router.post('/upload', bearerAuth, uploadImage)

module.exports = router