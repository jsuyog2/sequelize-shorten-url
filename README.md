# sequelize-shorten-url

`sequelize-shorten-url` is a Node.js package that provides URL shortening functionality using Sequelize ORM. It allows you to shorten URLs, track the number of clicks, and retrieve statistics, all while leveraging your own database configuration.

## Features

- Shorten URLs and store them in a database.
- Track the number of clicks on each shortened URL.
- Retrieve original URLs and statistics.
- Compatible with any database supported by Sequelize (e.g., MySQL, PostgreSQL, SQLite).

## Installation

Install the package via npm:

```bash
npm install sequelize-shorten-url
```

## Usage

### Initialize the Package

You can initialize the package by providing your Sequelize configuration or an existing Sequelize instance.

```javascript
const { Sequelize } = require('sequelize');
const createShortener = require('sequelize-shorten-url');

// Example: Using a Sequelize configuration object
const sequelize = new Sequelize('database', 'username', 'password', {
  host: 'localhost',
  dialect: 'mysql', // or 'sqlite', 'postgres', etc.
});

const shortener = createShortener(sequelize);
```

### Shorten a URL

```javascript
shortener.createShortUrl('https://example.com').then((result) => {
  console.log('Shortened URL:', result.shortUrl);
});
```

### Retrieve the Original URL and Increment Clicks

```javascript
shortener.getOriginalUrl('shortUrl').then((result) => {
  if (result) {
    console.log('Original URL:', result.originalUrl);
    console.log('Clicks:', result.clicks);
  } else {
    console.log('Short URL not found');
  }
});
```

### Get URL Statistics

```javascript
shortener.getUrlStats('shortUrl').then((stats) => {
  if (stats) {
    console.log('Original URL:', stats.originalUrl);
    console.log('Clicks:', stats.clicks);
  } else {
    console.log('Short URL not found');
  }
});
```

## Database Configuration

This package is designed to work with any database supported by Sequelize. You can use your own database configuration as shown in the examples above.

### Model

The package uses a `ShortenUrls` model with the following fields:

- `originalUrl` (STRING): The original URL to be shortened.
- `shortUrl` (STRING): The shortened version of the URL.
- `clicks` (INTEGER): The number of times the shortened URL has been clicked.

## Contributing

Contributions are welcome! Feel free to open issues or submit pull requests to improve the package.

## License

This package is licensed under the ISC License. See the [LICENSE](LICENSE) file for details.

## Author

Created by Suyog Dinesh Jadhav.