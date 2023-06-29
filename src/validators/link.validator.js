const joi = require('joi')

const urlSchema = joi.object({
    url: joi.string()
            .uri({
                scheme: ['http', 'https'],
            })
})

const linkValidationMiddleware = async function(req, res, next) {
    try {
        const urlPayload = req.body
        await urlSchema.validateAsync(urlPayload)
        next()
    } catch(err) {
        console.log(err)
        return res.status(406).json({error: err.details[0].message})
    }
}

module.exports = linkValidationMiddleware;
  