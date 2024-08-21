module.exports = (sequelize) => {
    const Url = require('../models/Url')(sequelize);

    /**
     * Creates a shortened URL and stores it in the database.
     *
     * @param {string} originalUrl - The original URL to be shortened.
     * @returns {Promise<Object>} An object containing the short URL, original URL, and click count.
     */
    const createShortUrl = async (originalUrl) => {
        const shortUrl = require('shortid').generate();
        const newUrl = await Url.create({ originalUrl, shortUrl });
        return { shortUrl: newUrl.shortUrl, originalUrl: newUrl.originalUrl, clicks: newUrl.clicks };
    };

    /**
     * Retrieves the original URL from the database and increments the click count.
     *
     * @param {string} shortUrl - The shortened URL code.
     * @returns {Promise<Object|null>} An object containing the short URL, original URL, and updated click count, or null if not found.
     */
    const getOriginalUrl = async (shortUrl) => {
        const url = await Url.findOne({ where: { shortUrl } });
        if (url) {
            url.clicks += 1;
            await url.save();
            return { shortUrl: url.shortUrl, originalUrl: url.originalUrl, clicks: url.clicks };
        }
        return null;
    };

    /**
     * Retrieves statistics for a given shortened URL.
     *
     * @param {string} shortUrl - The shortened URL code.
     * @returns {Promise<Object|null>} An object containing the short URL, original URL, and click count, or null if not found.
     */
    const getUrlStats = async (shortUrl) => {
        const url = await Url.findOne({ where: { shortUrl } });
        if (url) {
            return { shortUrl: url.shortUrl, originalUrl: url.originalUrl, clicks: url.clicks };
        }
        return null;
    };

    return {
        createShortUrl,
        getOriginalUrl,
        getUrlStats,
    };
};
