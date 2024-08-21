/**
 * Check if a given string is a valid short ID.
 * A valid short ID should consist of alphanumeric characters (A-Z, a-z, 0-9) and possibly underscore (_) or hyphen (-).
 * @param {string} shortId - The string to be checked.
 * @returns {boolean} True if the string is a valid short ID, false otherwise.
 */
const isValidShortId = (shortId) => {
    // Define a regular expression pattern to match valid short IDs
    const pattern = /^[A-Za-z0-9_-]+$/;
    // Test the provided string against the pattern and return the result
    return pattern.test(shortId);
};

module.exports = isValidShortId;
