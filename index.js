const { Sequelize } = require('sequelize');
const shortenerFactory = require('./lib/shortener');

/**
 * Initializes the URL shortener with a given Sequelize configuration.
 *
 * @param {Object|Sequelize} sequelizeConfig - The Sequelize configuration object or an existing Sequelize instance.
 * @returns {Object} An object containing the URL shortener functions: `createShortUrl`, `getOriginalUrl`, and `getUrlStats`.
 */
module.exports = (sequelizeConfig) => {
    // If the user provides a Sequelize instance, use it; otherwise, create a new instance with the provided config
    const sequelize = sequelizeConfig instanceof Sequelize
        ? sequelizeConfig
        : new Sequelize(sequelizeConfig);

    // Return the shortener functions
    return shortenerFactory(sequelize);
};
