const jwt = require('jsonwebtoken');
const responsePayload = require('./../../App/store/dispatchers/responsePayload');

module.exports = Auth = {

    // check basic
    basicAuthentication: (req, res, next) => {
        // No DEFAULT Header content
        if (!req.headers) res.status(401).json(responsePayload.errorResponse({
            message: 'no:header:provider'
        }));
        // No DEFAULT Header content

        let basicToken = (req.header('authorization-user') || 'string').split(' ')[1];
        jwt.verify(basicToken, ENV.SECRET.BASIC, (err, decoded) => {
            if (err) res.status(401).json(responsePayload.errorResponse({
                message: 'no:basic:provider'
            }));
            else {
                req.decodedBasicAuthentication = decoded;
                next();
            }
        });
    },

    // check bearer 
    beaderAuthentication: (req, res, next) => {
        // No DEFAULT Header content
        if (!req.headers) res.status(401).json(responsePayload.errorResponse({
            message: 'no:header:provider'
        }));
        // No DEFAULT Header content

        let bearerToken = (req.header('authorization') || 'string').split(' ')[1];
        jwt.verify(bearerToken, ENV.SECRET.BEARER, (err, decoded) => {
            if (err) res.status(401).json(responsePayload.errorResponse({
                message: 'no:bearer:provider'
            }));
            else {
                req.decodedBearerAuthentication = decoded;
                next();
            }
        });
    },

    /**
     * 
     * @param {*} req request object
     * @param {*} prop prop into jwt to return
     */
    getBasicToken: (req, res, next) => {
        let basicToken = (req.header('authorization-user') || 'string').split(' ')[1];
        jwt.verify(basicToken, ENV.SECRET.BASIC, (err, decoded) => {
            if (err) req.decodedBasicAuthentication = err;
            else {
                if ('logged' in decoded) req.decodedBasicAuthentication = decoded;
                else req.decodedBasicAuthentication = 'no prop provider';
            }
            next();
        });
    },
};