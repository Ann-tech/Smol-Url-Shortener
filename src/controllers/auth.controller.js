const passport = require('passport')

function signup(req, res) {
    return res.status(201).json({
        status: true, 
        message: "Signup successful",
        user: req.user
    })
}

async function login(req, res, next) {
    passport.authenticate('login', async (err, user, info) => {
        try {
            if (err) return next(err)

            if (!user) {
                // const err = new Error(info.message)
                // err.status = 403
                // return next(err)

                req.session.errorMessage = info.message;
                return res.redirect('/login');  
            }
            req.login(user, {session: true}, async(err) => {
                if (err) return next(err)

                // const body = {_id: user._id, email: user.email}
                
                // console.log(body)
                return res.redirect('/dashboard');
                
                // return res.status(200).json({
                //     message: info.message,
                //     user: body
                // })
            })
        } catch(err) {
            next(err)
        }
    })(req, res, next)
   
}

module.exports = {
    signup,
    login
}