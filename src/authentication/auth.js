const mongoose = require('mongoose')
const passport = require('passport')
const localStrategy = require('passport-local').Strategy

const userModel = require('../models/user.model')


passport.serializeUser((user, done) => {
    done(null, user.id);
});
  
passport.deserializeUser((id, done) => {
    userModel.findById(id)
          .then((user) => {
            done(null, user);
          })
          .catch((err) => {
            done(err);
          });
});

passport.use(
    'signup',
    new localStrategy(
        {
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback: true
        },
    
        async function (req, email, password, done) {
            try {
                const user = await userModel.create({email, password});
                console.log(user);
                return done(null, user)
            } catch(err) {
                if (err instanceof mongoose.Error.ValidationError) {
                    err.status = 400;
                    req.session.errorMessage = "An error has occured while processing request, please try again"
                } else {
                    req.session.errorMessage = "User already exists";
                }
                done(null, false)
                // done(null, false);

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

                if (!user) return done(null, false, {message: "User does not exist, kindly signup"})

                const validate = await user.isValidPassword(password)

                if (!validate) return done(null, false, {message: "Incorrect password"})

                return done(null, user, {message: "Login successful"})
            } catch(err) {
                console.log(err)
                return done(err)
            }
        }
    )
)