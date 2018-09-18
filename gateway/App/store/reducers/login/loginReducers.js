const Store = require('./../../store/store');

class LoginReducers {
    constructor() {
        this.jwt = require('jsonwebtoken');
    }

    jwtVerify(jwt, key) {
        return this.jwt.verify(jwt, key);
    }

    // oAuth/Authorize
    authentication(payload) {
        // decrypt encoding application
        let client_id = this.jwtVerify(payload.client_id, ENV.SECRET.APPLICATION).client_id;

        return Store.Models.client.get(client_id).then(data => {
            return {
                authorization_code: this.jwt.sign({
                    client_id: data.client_id
                }, data.client_secret, {
                    expiresIn: 60 // 1min
                })
            };
        }, err => {
            throw new Error('failed to authentication!');
        });
    }

    // oAuth/Token
    authorizationBearer(payload) {
        // decrypt encoding application
        let client_id = this.jwtVerify(payload.client_id, ENV.SECRET.APPLICATION).client_id;
        let client_secret = this.jwtVerify(payload.client_secret, ENV.SECRET.APPLICATION).client_secret;

        return Store.Models.client.get(client_id).then(data => {
            if (client_id != this.jwtVerify(payload.authorization_code, client_secret).client_id)
                throw new Error('Failed to authorization!');

            return {
                access_token: 'Bearer ' + this.jwt.sign(data, ENV.SECRET.BEARER, {
                    expiresIn: 86400 // expire in 24h
                }),
                token_type: "bearer",
                expires_in: '86400:24h',
                host: "www.cmtecnologia.com.br",
                msg: "Enjoy your Token =D!"
            };
        }, err => {
            throw new Error('failed to authorization!');
        });
    }

    // oAuth/Login
    authorizationBasic(payload) {
        return Store.Models.user.login(payload).then(data => {
            return {
                access_token: "Basic " + this.jwt.sign({
                    logged: data
                }, ENV.SECRET.BASIC),
                token_type: "basic",
            };
        }, err => {
            throw new Error('failed to authorization!');
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