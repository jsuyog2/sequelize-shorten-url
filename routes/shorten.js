module.exports = {
    shorten: function (req, res) {
        var collection = req.app.get('client'); //db collection connect
        collection.find({
            'short_url': req.params.url
        }).toArray(function (err, result) {
            if (err) {
                res.send({
                    "statusCode": 500,
                    "error": "Internal Server Error",
                    "message": "unable to connect to database server."
                });
                req.app.get('clientClose');
            } else {
                if (result.length == 0) {
                    res.redirect("/?error=1");
                } else {
                    var totalClicks = parseInt(result[0].clicks, 10) + 1;
                    collection.updateOne({
                        _id: result[0]._id
                    }, {
                        $set: {
                            clicks: totalClicks
                        }
                    }, function (err, up) {
                        if (err) {
                            res.send({
                                "statusCode": 500,
                                "error": "Internal Server Error",
                                "message": "unable to connect to database server."
                            });
                            req.app.get('clientClose');
                        } else {
                            var redirectUrl = result[0].full_url;
                            if (redirectUrl.indexOf('http') !== -1) {
                                res.redirect(redirectUrl);
                            } else {
                                res.redirect('http://' + redirectUrl);
                            }
                            req.app.get('clientClose');
                        }
                    });
                }
            }
        });
    }
}