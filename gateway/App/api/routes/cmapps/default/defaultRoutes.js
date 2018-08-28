var express = require('express');
var defaultRoutes = express.Router();

/* FIRST GET */
defaultRoutes.get('/', function (req, res, next) {
    res.send('Hi');
});

module.exports = defaultRoutes;