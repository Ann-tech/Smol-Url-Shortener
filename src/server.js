const os = require('os');
const express = require('express');
const app = express();
const cors = require('cors');
const session = require('express-session');

const PORT = process.env.PORT || 3000;

app.use( cors({
    origin: `http://localhost:${PORT}`
}) );

const db = require('./db');

app.use(session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 7 * 24 * 60 * 60 * 1000,
    },
}));

//Signup and login authentication middleware
require('./authentication/auth')

const authRoute = require('./routes/auth.route');
const linkRoute = reqire('./routes/link.route');

//To parse url encoded data
app.use(express.urlencoded( {extended: false} ))

//To parse data passed via body
app.use(express.json())

//AUTHENTICATION ROUTE
app.use('/auth', authRoute)

//LINKS ROUTE
app.use('/links', linkRoute)

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