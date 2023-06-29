const express  = require('express');
const signupRoute = express.Router();

signupRoute.get('/', (req, res) => {
    const errorMessage = req.session.errorMessage;

    if (errorMessage) {
        req.session.errorMessage = null;
        res.render('signup', { errorMessage });
    } else {
        res.render('signup');
    }
})

module.exports = signupRoute;

