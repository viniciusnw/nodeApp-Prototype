const jwt = require('jsonwebtoken');
const responsePayload = require('./../../App/store/dispatchers/responsePayload');

module.exports = Auth = {

    // check basic
    basicAuthentication: (req, res, next) => {
        Auth.getHeaders(req, 'authorization-user').then(Basic => {

            jwt.verify(Basic, 'process.env.SECRET_basic', (err, decoded) => {
                if (err) res.status(401).json(responsePayload.errorResponse(err));
                else {
                    req.decodedBasicAuthentication = decoded;
                    next();
                }
            });
        }, err => {
            res.status(err.status).json(err);
        });
    },

    // check bearer 
    beaderAuthentication: (req, res, next) => {
        Auth.getHeaders(req, 'authorization-token').then(Beader => {

            jwt.verify(Beader, 'process.env.SECRET_bearer', (err, decoded) => {
                if (err) res.status(401).json(responsePayload.errorResponse(err));
                else {
                    req.decodedBearerAuthentication = decoded;
                    next();
                }
            });
        }, err => {
            res.status(err.status).json(err);
        });
    },

    // Auth HEADERS
    getHeaders: (reqHeaders, target = '_target_') => {
        // let headers
        let headers = reqHeaders.headers;

        return new Promise((resolve, reject) => {
            // No DEFAULT Header content
            if (!headers) reject(responsePayload.errorResponse(new Error('No header provided.'), 401));
            // No DEFAULT Header content

            // No target Header content
            if (target in headers) {
                let auth = headers[target].split(' ');
                switch (target) {
                    case 'authorization-user':
                        if (auth[0] === 'Basic')
                            resolve(auth[1]);
                        else
                            reject(responsePayload.errorResponse(new Error('No token provided.'), 401));
                        break;

                    case 'authorization-token':
                        if (auth[0] === 'Bearer')
                            resolve(auth[1]);
                        else
                            reject(responsePayload.errorResponse(new Error('No token provided.'), 401));
                }
            } else reject(responsePayload.errorResponse(new Error('No ' + target + ' provided.'), 401));
        });

    }
};