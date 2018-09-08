class LoginReducers {
    constructor() {
        this.jwt = require('jsonwebtoken');
        this.clientMock = {
            client_name: 'Client Name', // Name
            client_id: 123, // public
            client_secret: 'ABC123', // secret
            response_type: 'code', // res_type 
        };
        this.userMock = {
            user: 'Rob',
            pwd: 'teste'
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
            access_token: 'Bearer ' + this.jwt.sign({
                client: this.clientMock
            }, 'process.env.SECRET_bearer', {
                expiresIn: 86400 // 24h
            }),
            token_type: "bearer",
            expires_in: "86400 : 24h",
            host: "www.cmtecnologia.com.br",
            msg: "Enjoy your Token!"
        }
    }

    // authorization Basic
    authorizationBasic(payload) {
        // simule valid authenticate
        if (payload.user == this.userMock.user && payload.pwd == this.userMock.pwd) return {
            access_token: "Basic " + this.jwt.sign({
                user: payload.user,
                pwd: payload.pwd
            }, 'process.env.SECRET_basic', {
                expiresIn: 86400 // 24h
            }),
            token_type: "basic",
        };
        else throw new Error('Failed to authenticate!');
    }

    // logout
    logout(){
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