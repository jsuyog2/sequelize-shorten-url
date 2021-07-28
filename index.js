//server imports
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const config = require('./config');
var cors = require('cors');
const { MongoClient } = require('mongodb')

//initalize serverss
const app = express();
const port = config.port;

// create application/json parser
app.use(bodyParser.urlencoded({
    extended: true,
    limit: '500mb'
}));

//pg db config
const client = new MongoClient(config.db,{ useNewUrlParser: true, useUnifiedTopology: true })
client.connect()
const db = client.db('ShortenURL')
const collection = db.collection('ShortenURL')
app.set('client', collection);
function clientClose(client) {
    // client.close();
    return null;
}

app.set('clientClose', clientClose(client));

//Serving static files
app.use(express.static('./public'))

//cors
const allowlist = config.corsAllowList;

const corsOptionsDelegate = (req, callback) => {
    let corsOptions;

    let isDomainAllowed = allowlist.indexOf(req.header('Origin')) !== -1;

    if (isDomainAllowed) {
        // Enable CORS for this request
        corsOptions = {
            origin: true
        }
    } else {
        // Disable CORS for this request
        corsOptions = {
            origin: false
        }
    }
    callback(null, corsOptions)
}
app.use(cors(corsOptionsDelegate))

//defined route
app.use('/', express.static(path.join(__dirname, 'public')))
const routes = require('./routes');
app.use('/', routes);

//enable server
app.listen(port, () => {
    console.log(`Example app listening on port ${port}!`)
});