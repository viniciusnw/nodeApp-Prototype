class LoginReducers {
    constructor() {
        this.jwt = require('jsonwebtoken');
    }

    // micro service example #1
    gerar_token(payload) {
        // user mock
        let user_schema = {
            user: 'Rob',
            pwd: 'teste'
        }

        // simule valid authenticate
        if (payload.user == user_schema.user && payload.pwd == user_schema.pwd) return {
            // service data return
            user: payload.user,
            pwd: payload.pwd,
            // jwt token create
            Authorization: "Bearer " + this.jwt.sign({
                user: payload.user,
                pwd: payload.pwd
            }, 'process.env.SECRET', {
                expiresIn: 86400 // 24h
            })
        };
        else throw new Error('Failed to authenticate!');
    }

    // micro service example #2
    deslogar() {
        return {
            user: null,
            pwd: null,
            authorization: null,
        };
    }

    // micro service example #3
    authorization(payload) {

        // client mock (cmApp || gtwApp)
        let client = {
            client_id: 123,
            client_secret: 'ABC123',
            response_type: 'code',
        };

        // Use client_secret for embed 'jwt_authorization_code'
        let jwt_authorization_code = this.jwt.sign({
            client_id: client.client_id
        }, client.client_secret, {
            expiresIn: 86400 // 24h
        });

        return {
            authorization_code: jwt_authorization_code
        };
    }

    // micro service example #4
    authorizationToken() {
        // client mock (cmApp || gtwApp)
        let client = {
            client_id: 123,
            client_secret: 'ABC123',
            response_type: 'code',
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