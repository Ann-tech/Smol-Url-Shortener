const os = require('os');
const express = require('express');
const app = express();
const cors = require('cors');
const session = require('express-session');
const passport = require('passport')
const path = require('path')


const PORT = process.env.PORT || 3000;

app.use( cors({
    origin: `http://localhost:${PORT}`
}) );

app.use( express.static(path.join(__dirname, 'public')) )

const db = require('./db');

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, "views"))


//Signup and login authentication middleware
require('./authentication/auth')

app.use(session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 7 * 24 * 60 * 60 * 1000,
    },
}));

app.use(passport.initialize());
app.use(passport.session());

const authRoute = require('./routes/auth.route');
const signupRoute = require('./routes/signup.route')
const loginRoute = require('./routes/login.route')
const linkRoute = require('./routes/link.route');
const dashboardRoute = require('./routes/dashboard.route')

const isLoggedIn = require('./middleware/auth.middleware');

//To parse url encoded data
app.use(express.urlencoded( {extended: false} ))

//To parse data passed via body
app.use(express.json())

//AUTHENTICATION ROUTE
app.use('/auth', authRoute)

//SIGNUP ROUTE
app.use('/signup', signupRoute)

//LOGIN ROUTE
app.use('/login', loginRoute)

//LINKS ROUTE
app.use('/links', linkRoute)


//DASHBOARD ROUTE
app.use('/dashboard', isLoggedIn, dashboardRoute)

if (process.env.NODE_ENV !== 'test') {
    db.connectToDb()
}



//Error Middleware function
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    
    //send the first line of an error message 
    if (err instanceof Error) return res.json({error: err.message.split(os.EOL)[0]})

    res.json({ error: err.message });
})

app.use('*', (req, res) => {
    res.status(404).json({status: false, message: `Route not found`})
})

if (process.env.NODE_ENV != "test") {
    app.listen(PORT, () => {
        console.log(`Server is running at PORT http://localhost:${PORT}`)
    })
}