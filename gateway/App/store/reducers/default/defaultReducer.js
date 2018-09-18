const Store = require('./../../store/store');

class DefaultReducers {
    constructor() {
        this.jwt = require('jsonwebtoken');
    }

    jwtVerify(jwt, key) {
        return this.jwt.verify(jwt, key);
    }

    register(payload) {
        return Store.Models.user.post(payload).then(data => {
            return data;
        }, err => {
            throw new Error('Failed to register User!');
        });
    }

    recoverPass(payload) {
        return Store.Models.user.recoverPass(payload).then(data => {
            return data;
        }, err => {
            throw new Error('Failed to recover Pass!');
        });
    }

    getProfessionalPerUsr_uuid(payload) {
        let usuario_uuid;

        // payload.usuario_uuid, 'process.env.SECRET_basic'

        // this.jwt.verify(payload.usuario_uuid, 'process.env.SECRET_basic', (err, decoded) => {
        //     if (err) {
        //         usuario_uuid = payload.usuario_uuid;
        //         return;
        //     }
        //     usuario_uuid = decoded.logged.uuid;
        // });
        
        return Store.Models.profissional.getPer_usuario_uuid(usuario_uuid).then(p => {
            return p;
        }, err => {
            throw new Error('No content user!');
        });
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
module.exports = DefaultReducers;