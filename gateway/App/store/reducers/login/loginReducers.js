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
            authorization: "Bearer " + this.jwt.sign({
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