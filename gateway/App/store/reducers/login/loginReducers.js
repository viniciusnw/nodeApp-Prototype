class LoginReducers {
    constructor() {
        this.jwt = require('jsonwebtoken');
        this.clientMock = {
            client_id: 123,
            client_secret: 'ABC123',
            response_type: 'code',
        };
    }
    // micro service-/ EXAMPLE #1
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
    // micro service-/ EXAMPLE #2
    deslogar() {
        return {
            user: null,
            pwd: null,
            authorization: null,
        };
    }

    // authentication service
    authentication(payload) {
        let jwt_authorization_code;
        // check client id
        if (this.clientMock.client_id == payload.client_id)
            // Use client_secret for embed 'jwt_authorization_code'
            jwt_authorization_code = this.jwt.sign({
                client_id: payload.client_id
            }, this.clientMock.client_secret, {
                expiresIn: 60 // 1min
            });
        else throw new Error('Failed to authentication');

        return {
            authorization_code: jwt_authorization_code
        };
    }

    // authorization service
    authorizationToken(payload) {
        let clientValidate; // extra valididation
        try {
            clientValidate = (payload.client_id == this.jwt.verify(payload.authorization_code, payload.client_secret).client_id) ? true : false;
        } catch (err) {
            throw new Error(err);
        }
        if (!clientValidate) throw new Error('Failed to authorization');

        return {
            // access_token
            access_token: 'Bearer ' + this.jwt.sign({
                client_id: payload.client_id,
                client_secret: payload.client_secret,
            }, 'process.env.SECRET', {
                expiresIn: 86400 // 24h
            }),
            token_type: "bearer",
            expires_in: "86400 : 24h",
            host: "www.cmtecnologia.com.br",
            msg: "Enjoy your Token!"
        }
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