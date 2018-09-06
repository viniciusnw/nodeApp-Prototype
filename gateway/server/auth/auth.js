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
                    req.decodedBearerAuthentication = decoded;
                    next();
                }
            });
        } else {
            let data = responsePayload.errorResponse(new Error('No token provided.'), 401);
            res.status(data.status).json(data);
        }
    }, // disabled, for now

    // check authorize 
    applicationAuthorization: (req, res, next) => {
        if (req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
            jwt.verify(req.headers.authorization.split(' ')[1], 'process.env.SECRET', function (err, decoded) {
                if (err) {
                    let data = responsePayload.errorResponse(err, 401);
                    res.status(data.status).json(data);
                } else {
                    req.decodedApplicationAuthorization = decoded;
                    next();
                }
            });
        } else {
            let data = responsePayload.errorResponse(new Error('No token provided.'), 401);
            res.status(data.status).json(data);
        }
    }
};


// BRUNO CLIENTE
// PUB PRI

// ENVIO DO BRUNO PARA VINICIUS
// PUB_VIN(PRI_BRU(FILE)) > PRI_VIN(PUB_BRU(FILE))

// ENVIO DO VINICIUS PARA O BRUNO
// PUB_BRU(PRI_VIN(FILE)) > PRI_BRU(PUB_VIN(FILE))

// VINICIUS ADMIN SERVER FODEROSO
// PUB PRI