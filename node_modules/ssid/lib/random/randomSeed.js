'use strict';

const generateSeed = () => {
    let seed = '';

    if (typeof crypto !== 'undefined' && crypto.randomBytes) {
        const randomBuffer = crypto.randomBytes(16);
        seed = randomBuffer.toString('hex');
    } else {
        seed = Math.random().toString(36).substring(2) + Date.now().toString(36);
    }

    return seed;
};

module.exports = generateSeed;
