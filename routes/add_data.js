module.exports = {
    add_data: function (req, res, next) {
        var collection = req.app.get('client'); //db collection connect
        var key = req.body.key;
        if (!key) {
            key = makeid(8);
        }
        if (validURL(req.body.url)) {
            validateData(collection, req, res, key, next);
        } else {
            res.send({
                "statusCode": 500,
                "error": "Please enter vaild url"
            });
        }


    }
}

function validateData(collection, req, res, key, next) {
    collection.find({
        'short_url': key
    }).toArray(function (err, result) {
        if (err) {
            res.send({
                "statusCode": 500,
                "error": "Internal Server Error",
                "message": "unable to connect to database server."
            });
            req.app.get('clientClose');
        } else {
            if (result.length === 0) {
                insertData(collection, req, res, key);
            } else {
                if (req.body.key) {
                    res.send({
                        "statusCode": 500,
                        "error": "Key is already found in database. Change the key"
                    });
                } else {
                    key = makeid(8);
                    validateData(collection, req, res, key, next)
                }
            }
        }
    });
}

function insertData(collection, req, res, key) {
    collection.insertMany([{
        full_url: req.body.url,
        short_url: key,
        created_time: new Date(),
        clicks: 0
    }], function (err, result) {
        if (err) {
            res.send({
                "statusCode": 500,
                "error": "Internal Server Error",
                "message": "unable to connect to database server."
            });
            req.app.get('clientClose');
        } else {
            res.send({
                "statusCode": 200,
                "url": req.body.url,
                "key": key,
                "message": "Successfully New Short URL Added In Database"
            })
            req.app.get('clientClose');
        }
    });
}

function makeid(length) {
    var result = '';
    var characters = 'abcdefghijklmnopqrstuvwxyz';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

function validURL(str) {
    var pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
        '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
    return !!pattern.test(str);
}