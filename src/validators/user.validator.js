const joi = require('joi')

//Define validation schema
const userSchema = joi.object({
    email: joi.string()
                .pattern(new RegExp(/^.+@(?:[\w-]+\.)+\w+$/))
                .required(),
    password: joi.string()
                    .required()
})

const userValidationMiddleware = async function(req, res, next) {
    try {
        const userPayload = req.body
        await userSchema.validateAsync(userPayload)
        next()
    } catch(err) {
        console.log(err)
        return res.status(406).json({error: err.details[0].message})
    }
}

module.exports = userValidationMiddleware;