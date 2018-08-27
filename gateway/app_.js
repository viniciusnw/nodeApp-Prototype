//index.js
var http = require('http');
const express = require('express')
const app = express()
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const helmet = require('helmet');

// request
app.get('/users', (req, res, next) => {
    console.log('user');
});

app.get('/products', (req, res, next) => {
    console.log('products');
});

app.use(logger('dev'));
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));
app.use(cookieParser());

var server = http.createServer(app);
server.listen(3000);