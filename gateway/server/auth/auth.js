const jwt = require('jsonwebtoken');
const responsePayload = require('./../../App/store/dispatchers/responsePayload');

module.exports = Auth = {
    // check bearer
    bearerAuthentication: (req, res, next) => {
        if (req.headers && req.headers.Authorization && req.headers.Authorization.split(' ')[0] === 'Bearer') {
            jwt.verify(req.headers.Authorization.split(' ')[1], 'process.env.SECRET', function (err, decoded) {
                if (err) {
                    let data = responsePayload.errorResponse(err, 401);
                    res.status(data.status).json(data);
                } else {
                    req.decoded = decoded;
                    next();
                }
            });
        } else {
            let data = responsePayload.errorResponse(new Error('No token provided.'), 401);
            res.status(data.status).json(data);
        }
    },
    
    // check authorize 
    applicationAuthorization: (req, res, next) => {
        
    }
};

// var express = require('express'),
//     media = express.Router(),
//     mediaProtected = express.Router();
// media.get('/', function(req, res) {
//     // provide results from db
// });
// mediaProtected.post('/', function(req, res) {
//     // This route is auth protected
// });

// module.exports = {
//     protected: mediaProtected,
//     unprotected: media
// };

// var router = require('./my-router');
// app.use('/api/route', passport.authenticate('bearer'), router.protected);
// app.use('/api/route', router.unprotected);