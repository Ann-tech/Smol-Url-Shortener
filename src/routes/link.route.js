const express = require('express')
const linkRoute = express.Router()
const passport = require('passport')

const isLoggedIn = require('../middleware/auth.middleware')
const linkValidator = require('../validators/link.validator')
const { createShortUrl } = require('../controllers/link.controller')


linkRoute.post('/', isLoggedIn, linkValidator, createShortUrl)

module.exports = linkRoute