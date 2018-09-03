const Store = require('./../../store/store');

class LoginReducers {
    constructor() {
        this.jwt = require('jsonwebtoken');
    }

    deslogar() {
        Store.SIGN_OUT__CHANGE_STATE({
            user: null,
            pwd: null,
            jwt: null
        });
    }

    gerar_token(payload) {
        let jwt = this.jwt.sign({
            user: payload.name,
            pwd: payload.pwd
        }, 'process.env.SECRET', {
            expiresIn: 300
        });

        // store change status
        Store.SIGN_IN__CHANGE_STATE({
            user: payload.name,
            pwd: payload.pwd,
            jwt: jwt
        });
    }
}

module.exports = LoginReducers;