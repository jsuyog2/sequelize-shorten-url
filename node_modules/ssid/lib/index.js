'use strict';

const customAlphabet = require('./alphabet/custom')
const generateSeed = require('./random/randomSeed');
const generateAlphabet = require('./alphabet/alphabet');
const {DEFAULT_LENGTH, MIN_LENGTH, MAX_LENGTH} = require('./defaultLength');

const generateShortId = (length = DEFAULT_LENGTH) => {

    if(length < MIN_LENGTH){
        throw new Error(`Minimum Length of short id can not be less than ${MIN_LENGTH}`)
    }

    if(length > MAX_LENGTH){
        throw new Error(`Maximum Length of short id can not be more than ${MAX_LENGTH}`)
    }

    const alphabet = generateAlphabet();

    const seed = generateSeed();
    
    const combinedSeed = seed + Date.now();
    
    const id = customAlphabet(alphabet, length, combinedSeed);

    return id;
};

module.exports = generateShortId;
