const mongoose = require('mongoose')
const passport = require('passport')
const localStrategy = require('passport-local').Strategy

const userModel = require('../models/user.model')


passport.serializeUser((user, done) => {
    done(null, user.id);
});
  
passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
        done(err, user);
    });
});

passport.use(
    'signup',
    new localStrategy(
        {
            usernameField: 'email',
            passwordField: 'password'
        },
    
        async function (email, password, done) {
            try {
                const user = await userModel.create({email, password});
                return done(null, user)
            } catch(err) {
                if (err instanceof mongoose.Error.ValidationError) {
                    err.status = 400
                }
                done(err)
            }
        }
    )
)

passport.use(
    'login',
    new localStrategy(
        {
            "usernameField": "email",
            "passwordField": "password",
        },

        async function(email, password, done) {
            try {
                const user = await userModel.findOne({email})
                if (!user) return done(null, false, {message: "User not found"})

                const validate = await user.isValidPassword(password)
                
                if (!validate) return done(null, false, {message: "Password incorrect"})

                return done(null, user, {message: "Login successful"})
            } catch(err) {
                console.log(err)
                return done(err)
            }
        }
    )
)