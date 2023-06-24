const { Schema, model } = require('mongoose')
const bcrypt = require('bcrypt')

const userSchema = new Schema({
    email: {
        type: String,
        required: [true, "email field is required"],
        trim: true,
        lowercase: true,
        unique: true,
        match: [/^.+@(?:[\w-]+\.)+\w+$/, 'Please fill a valid email address']
    }, 
    password: {
        type: String,
        required: true
    },
    created_at: {
        type: Date,
        default: Date
    },
    updated_at: {
        type: Date,
        default: Date
    }
})


module.exports = model('User', userSchema)