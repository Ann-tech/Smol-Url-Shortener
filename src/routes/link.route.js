const express = require('express')
const linkRoute = express.Router()
const passport = require('passport')

const isLoggedIn = require('../middleware/auth.middleware')
const linkValidator = require('../validators/link.validator')

linkRoute.post('/', isLoggedIn, linkValidator)

module.exports = linkRoute