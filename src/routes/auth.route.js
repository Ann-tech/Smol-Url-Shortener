const express = require('express')
const authRoute = express.Router()
const authController = require('../controllers/auth.controller')
const userValidator = require('../validators/user.validator')
const passport = require('passport')

authRoute.post('/signup', userValidator, passport.authenticate('signup'), authController.signup)
authRoute.post('/login', userValidator, authController.login)

module.exports = authRoute