const jwt = require('jsonwebtoken');
const responsePayload = require('./../../App/store/dispatchers/responsePayload');

module.exports = Auth = {

    // check basic
    basicAuthentication: (req, res, next) => {
        Auth.getHeaders(req, 'authorization-user').then((Basic) => {
            jwt.verify(Basic, 'process.env.SECRET_basic', function (err, decoded) {
                if (err) {
                    let data = responsePayload.errorResponse(err, 401);
                    res.status(data.status).json(data);
                } else {
                    req.decodedBearerAuthentication = decoded;
                    next();
                }
            });
        }, (err) => {
            res.status(err.status).json(err);
        });
    },

    // check bearer 
    beaderAuthentication: (req, res, next) => {
        Auth.getHeaders(req, 'authorization-token').then((Beader) => {
            jwt.verify(Beader, 'process.env.SECRET_bearer', function (err, decoded) {
                if (err) {
                    let data = responsePayload.errorResponse(err, 401);
                    res.status(data.status).json(data);
                } else {
                    req.decodedBearerAuthentication = decoded;
                    next();
                }
            });
        }, (err) => {
            res.status(err.status).json(err);
        });
    },

    // Auth HEADERS
    getHeaders: (reqHeaders, target = '_target_') => {
        // let headers
        let headers = reqHeaders.headers;

        return new Promise((resolve, reject) => {
            // No Header content
            if (!headers) reject(responsePayload.errorResponse(new Error('No header provided.'), 401));

            // No target Header content
            if (target in headers) {
                let auth = headers[target].split(' ');
                switch (target) {
                    case 'authorization-user':
                        if (auth[0] === 'Basic')
                            resolve(headers[target].split(' ')[1]);
                        else
                            reject(responsePayload.errorResponse(new Error('No token provided.'), 401));
                        break;

                    case 'authorization-token':
                        if (auth[0] === 'Bearer')
                            resolve(headers[target].split(' ')[1]);
                        else
                            reject(responsePayload.errorResponse(new Error('No token provided.'), 401));
                }
            } else reject(responsePayload.errorResponse(new Error('No ' + target + ' provided.'), 401));
        });

    }
};