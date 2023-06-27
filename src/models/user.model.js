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
    },
    links: [{
        type: Schema.Types.ObjectId,
        ref: 'Link'
    }]
})

userSchema.pre(
    'save',
    async function(next) {
        let user = this

        if (!user.isModified('password')) return next()

        try {
            const hash = await bcrypt.hash(user.password, 10)
            user.password = hash
            next()
        } catch(err) {
            next(err)
        }  
    }
)

userSchema.methods.isValidPassword = async function(password) {
    const compare = await bcrypt.compare(password, this.password);
    return compare;
}

//modifies data sent back to user
userSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      delete returnedObject.__v
      // the passwordHash should not be revealed
      delete returnedObject.password
    }
});

module.exports = model('User', userSchema)