const express = require('express');
const app = express();

const PORT = process.env.PORT || 3000;

const db = require('./db');

if (process.env.NODE_ENV !== 'test') {
    db.connectToDb()
}



app.listen(PORT, () => {
    console.log(`Application is currently running on http://localhost:${PORT}`)
})