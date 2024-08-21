# SSID(Secure Short ID) Generator [![shortid](https://img.shields.io/npm/dm/ssid.svg)](https://www.npmjs.org/package/ssid)

SSID Generator is a Node.js module that provides a secure and efficient way to generate short IDs, suitable for various use cases such as unique identifiers in databases, session IDs, URL shorteners, etc.

## Features

- Generates short IDs using a secure algorithm.
- Customizable length for generated IDs.
- Supports a wide range of characters, making IDs URL-friendly.
- Ensures uniqueness of generated IDs, even in high-demand scenarios.
- Suitable for applications where security and uniqueness are critical.

## Installation

You can install the Secure Short ID Generator module via npm:

```bash
npm install ssid
```

## Usage

```javascript
const generateShortId = require('ssid');

// Generate a short ID with default length (8 characters)
const shortId = generateShortId();
console.log(shortId);

// Generate a short ID with custom length (e.g., 12 characters)
const customLengthShortId = generateShortId(12);
console.log(customLengthShortId);
```

## API

### `generateShortId([length])`

Generates a short ID with the specified length. If no length is provided, the default length is 8 characters.

- `length` (optional): The length of the generated short ID (default is 8 characters). Minimum length is 4 characters and maximum length is 10,000 characters.

Returns: A string representing the generated short ID.

## License

This project is licensed under the [MIT License](LICENSE).
