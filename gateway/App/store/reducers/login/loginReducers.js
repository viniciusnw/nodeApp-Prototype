const Store = require('./../../store/store');

class LoginReducers {
    constructor() {
        this.jwt = require('jsonwebtoken');
    }

    // authentication service
    authentication(payload){
        return Store.client.get(payload.client_id).then(client => {
            if (!client.length) throw new Error('Failed to authentication');

            return {
                authorization_code: this.jwt.sign({
                    client_user: client[0].ws_user
                }, client[0].ws_pass, {
                    expiresIn: 60 // 1min
                })
            };
        }, err => {
            throw new Error(err);
        });
    }

    // authorization Bearer
    authorizationBearer(payload) {
        let clientValidate;
        try {
            clientValidate = (payload.client_id == this.jwt.verify(payload.authorization_code, payload.client_secret).client_id) ? true : false;
        } catch (err) {
            throw new Error(err);
        }
        if (!clientValidate) throw new Error('Failed to authorization');

        return {
            // access_token
            access_token: 'Bearer ' + this.jwt.sign(this.client, 'process.env.SECRET_bearer', {
                expiresIn: 86400 //expire in 24h
            }),
            token_type: "bearer",
            expires_in: '86400:24h',
            host: "www.cmtecnologia.com.br",
            msg: "Enjoy your Token =D"
        }
    }

    // authorization Basic
    authorizationBasic(payload) {
        let user = Store.user.get();

        // simule valid authenticate
        if (payload.user == user.user && payload.pwd == user.pwd) return {
            access_token: "Basic " + this.jwt.sign({
                user: payload.user,
                pwd: payload.pwd
            }, 'process.env.SECRET_basic'),
            token_type: "basic",
        };
        else throw new Error('Failed to authenticate!');
    }

    // logout
    logout() {
        return {
            user: null,
            pwd: null,
            authorization: null,
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