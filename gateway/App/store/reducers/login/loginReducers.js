const Store = require('./../../store/store');

class LoginReducers {
    constructor() {
        this.jwt = require('jsonwebtoken');
    }

    jwtVerify(jwt, key) {
        return this.jwt.verify(jwt, key);
    }

    // oAuth/Authorize
    // {
    //     "$schema": "http://json-schema.org/draft-04/schema#",
    //     "title": "oAuth/Authorize",
    //     "type": "object",
    //     "properties":{
    //         "authorization_code": {
    //             "type": "string"
    //         }
    //     }
    // }
    authentication(payload) {
        // decrypt encoding application
        let client_id = this.jwtVerify(payload.client_id, 'process.env.SECRET_application').client_id;

        return Store.Models.client.get(client_id).then(data => {
            return {
                authorization_code: this.jwt.sign({
                    client_id: data.client_id
                }, data.client_secret, {
                    expiresIn: 60 // 1min
                })
            };
        }, err => {
            throw new Error('Failed to authentication!');
        });
    }

    // oAuth/Token
    // {
    //     "$schema": "http://json-schema.org/draft-04/schema#",
    //     "title": " oAuth/Token",
    //     "type": "object",
    //     "properties":{
    //         "access_token": {
    //             "type": "string"
    //         },
    //         "token_type": {
    //             "type": "string"
    //         },
    //         "expires_in": {
    //             "type": "string"
    //         },
    //         "host":{
    //             "type": "string"
    //         },
    //         "msg":{
    //             "type": "string"
    //         }
    //     }
    // }
    authorizationBearer(payload) {
        // decrypt encoding application
        let client_id = this.jwtVerify(payload.client_id, 'process.env.SECRET_application').client_id;
        let client_secret = this.jwtVerify(payload.client_secret, 'process.env.SECRET_application').client_secret;

        return Store.Models.client.get(client_id).then(data => {
            if (client_id != this.jwtVerify(payload.authorization_code, client_secret).client_id)
                throw new Error('Failed to authorization!');

            return {
                access_token: 'Bearer ' + this.jwt.sign(data, 'process.env.SECRET_bearer', {
                    expiresIn: 86400 // expire in 24h
                }),
                token_type: "bearer",
                expires_in: '86400:24h',
                host: "www.cmtecnologia.com.br",
                msg: "Enjoy your Token =D!"
            };
        }, err => {
            throw new Error('Failed to authorization!');
        });
    }

    // oAuth/Login
    // {
    //     "$schema": "http://json-schema.org/draft-04/schema#",
    //     "title": "oAuth/Login",
    //     "type": "object",
    //     "properties":{
    //         "access_token": {
    //             "type": "string"
    //         },
    //         "token_type": {
    //             "type": "string"
    //         }
    //     }
    // }
    authorizationBasic(payload) {
        return Store.Models.user.login(payload.user, payload.pwd).then(data => {
            return {
                access_token: "Basic " + this.jwt.sign({
                    logged: data
                }, 'process.env.SECRET_basic'),
                token_type: "basic",
            };
        }, err => {
            throw new Error('Failed to authorization!');
        });
    }

    // logout
    logout() {
        return {
            access_token: null,
        };
    }

    // async micro-service call
    exec(method, payload) {
        return new Promise((resolve, reject) => {
            try {
                resolve(this[method](payload));
            } catch (err) {
                reject(err);
            }
        });
    }
}
module.exports = LoginReducers;