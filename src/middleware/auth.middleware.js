const isLoggedIn = (req, res, next) => {
    console.log(req)
    if (req.isAuthenticated()) {
        return next();
    }

    // res.redirect('/login'); 
    res.status(401).json({ error: 'Unauthorized' }); 
};

module.exports = isLoggedIn;
  