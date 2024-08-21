const shortId = require('..');
const isValid = require('../lib/valid')

let i = 10;
while (i--) {
    const shortID = shortId(18-i) 
    console.log(shortID);
    console.log(isValid(shortID) ? 'Valid' : 'Invalid');
    console.log();
}
