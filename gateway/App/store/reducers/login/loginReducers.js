class LoginReducers {
    constructor() {
        this.jwt = require('jsonwebtoken');
    }

    deslogar() {
        return {
            user: null,
            pwd: null,
            jwt: null
        };
    }

    gerar_token(payload) {
        let jwt = this.jwt.sign({
            user: payload.user,
            pwd: payload.pwd
        }, 'process.env.SECRET', {
            expiresIn: 300
        });

        return {
            user: payload.user,
            pwd: payload.pwd,
            access_token: jwt
        }
    }
}

module.exports = LoginReducers;