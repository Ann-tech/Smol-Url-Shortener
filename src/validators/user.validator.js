const joi = require('joi')

const userValidationMiddleware = async function(req, res, next) {
    try {
        const userPayload = req.body
        await userValidator.validateAsync(userPayload)
        next()
    } catch(err) {
        console.log(err)
        return res.status(406).json({error: err.details[0].message})
    }
}

//Define validation schema
const userValidator = joi.object({
    email: joi.string()
                .pattern(new RegExp(/^.+@(?:[\w-]+\.)+\w+$/))
                .required(),
    password: joi.string()
                    .required()
})

module.exports = userValidationMiddleware;