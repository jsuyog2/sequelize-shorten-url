const { DataTypes } = require('sequelize');

/**
 * Defines the `ShortenUrls` model for storing URL data.
 *
 * @param {Sequelize} sequelize - The Sequelize instance to attach the model to.
 * @returns {Model} The defined `ShortenUrls` model.
 */
module.exports = (sequelize) => {
    /**
     * The `ShortenUrls` model stores the original URL, its shortened version, and the click count.
     * 
     * Fields:
     * - `originalUrl` (STRING): The original URL to be shortened. Cannot be null.
     * - `shortUrl` (STRING): The shortened version of the URL. Cannot be null.
     * - `clicks` (INTEGER): The number of times the shortened URL has been clicked. Defaults to 0.
     */
    const Url = sequelize.define('ShortenUrls', {
        originalUrl: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        shortUrl: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        clicks: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
        },
    });

    return Url;
};
