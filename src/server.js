const express = require('express');
const app = express();

const PORT = process.env.PORT || 3000;

const db = require('./db');

//Signup and login authentication middleware
require('./authentication/auth')

const authRoute = require('./routes/auth.route')

//To parse url encoded data
app.use(express.urlencoded( {extended: false} ))

//To parse data passed via body
app.use(express.json())

//USER ROUTE
app.use('/auth', authRoute)

if (process.env.NODE_ENV !== 'test') {
    db.connectToDb()
}



app.listen(PORT, () => {
    console.log(`Application is currently running on http://localhost:${PORT}`)
})