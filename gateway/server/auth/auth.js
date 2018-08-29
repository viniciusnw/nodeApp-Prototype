const jwt = require('jsonwebtoken');

class Auth {

    constructor() {}

    makeJwtToken() {
        return jwt.sign({
            id: 10
        }, 'process.env.SECRET', {
            expiresIn: 300
        });
    }
}

module.exports = new Auth();