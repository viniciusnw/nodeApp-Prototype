const jwt = require('jsonwebtoken');
const responsePayload = require('./../../App/store/dispatchers/responsePayload');

module.exports = Auth = {

    // check basic
    basicAuthentication: (req, res, next) => {
        Auth.getHeaders(req, 'authorization-user').then(Basic => {

            jwt.verify(Basic, ENV.SECRET.BASIC, (err, decoded) => {
                if (err) res.status(401).json(responsePayload.errorResponse({
                    message: 'basic:token:expired'
                }));
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
        Auth.getHeaders(req, 'authorization').then(Beader => {
            jwt.verify(Beader, ENV.SECRET.BEARER, (err, decoded) => {
                if (err) res.status(401).json(responsePayload.errorResponse({
                    message: 'bearer:token:expired'
                }));
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
            if (!headers) reject(responsePayload.errorResponse(new Error('no:header:provided'), 401));
            // No DEFAULT Header content

            // No target Header content
            if (target in headers) {
                let auth = headers[target].split(' ');
                switch (target) {
                    case 'authorization':
                        if (auth[0] === 'Bearer')
                            resolve(auth[1]);
                        else
                            reject(responsePayload.errorResponse(new Error('no:bearer-token:provided'), 401));
                        break;
                    case 'authorization-user':
                        if (auth[0] === 'Basic')
                            resolve(auth[1]);
                        else
                            reject(responsePayload.errorResponse(new Error('no:basic-token:provided'), 401));
                        break;
                    default: // just prevent
                        reject(responsePayload.errorResponse(new Error('no:token:provided'), 401));

                }
            } else reject(responsePayload.errorResponse(new Error('no:' + target + ':header'), 401));
        });

    }
};