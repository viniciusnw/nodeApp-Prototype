const Store = require('./../../store/store');

class LoginReducers {
    constructor() {
        this.jwt = require('jsonwebtoken');
    };

    // authentication service
    authentication(payload) {
        return Store.Models.client.get(payload.client_id).then(data => {
            if (!data.length) throw new Error('Failed to authentication');

            return {
                authorization_code: this.jwt.sign({
                    client_id: data[0].client_id
                }, data[0].client_secret, {
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

// MODEL 

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