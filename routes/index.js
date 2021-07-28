const routes = require('express').Router();

createPostRoute('add_data');
createGetRoute('getUrls');

module.exports = routes;

function createPostRoute(path) {
    var getPath = require('./' + path);
    routes.route('/' + path).post(getPath[path]);
}

function createGetRoute(path, array) {
    var getPath = require('./' + path);
    var params = "";
    if (array) {
        array.forEach(element => {
            params += "/:" + element;
        });
    }
    routes.route('/' + path + params).get(getPath[path]);
}
var shorten = require('./shorten');
routes.route('/:url').get(shorten.shorten)