const linkModel = require('../models/link.model')

const { checkUrlAvailability } = require('../helpers/validateUrl')
const { generateId } = require('../helpers/idGenerator');

async function createShortUrl(req, res, next) {
    try {
        const { url } = req.body;
        
        await checkUrlAvailability(url)
        const shortId = await generateId();

        const user = req.session.passport.user;

        const link = await linkModel.create({
            shortId,
            shortUrl: `${req.headers.origin}/${id}`,
            longUrl: url,
            user
        });
        return res.json(link)
    } catch(err) {
        return res.json( {error: err.message} )
    }
}

module.exports = {
    createShortUrl
}