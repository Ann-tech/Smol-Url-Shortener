const express  = require('express');
const loginRoute = express.Router();

loginRoute.get('/', (req, res) => {
    const errorMessage = req.session.errorMessage;
    req.session.errorMessage = null;
    res.render('login', {errorMessage})
})

module.exports = loginRoute;

