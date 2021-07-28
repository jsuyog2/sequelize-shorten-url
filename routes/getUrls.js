module.exports = {
    getUrls: function (req, res) {
        var collection = req.app.get('client'); //db collection connect
        
        collection.find({}).toArray(function (err, result) {
            if (err) {
                res.send({
                    "statusCode": 500,
                    "error": "Internal Server Error",
                    "message": "unable to connect to database server."
                });
                req.app.get('clientClose');
            } else {
                if (result.length === 0) {
                    res.send({
                        "statusCode": 500,
                        "error": "Urls Not Found"
                    });
                    req.app.get('clientClose');
                } else {
                    res.send(result);
                    req.app.get('clientClose');
                }
            }
        });
    }
}