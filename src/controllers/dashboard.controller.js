const userModel = require('../models/user.model');

async function showDashboard(req, res, next) {
    const id = req.session.passport.user;
    // const user = await userModel.findById(id)

    res.render('dashboard')
}

module.exports = {
    showDashboard
}