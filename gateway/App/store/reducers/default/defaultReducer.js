const Store = require('./../../store/store');

class DefaultReducers {
    constructor() {
        // this.jwt = require('jsonwebtoken');
    }

    register(payload) {
        return Store.Models.user.post(payload).then(data => {
            return data;
        }, err => {
            throw new Error('failed to register User!');
        });
    }

    recoverPass(payload) {
        return Store.Models.user.recoverPass(payload).then(data => {
            return data;
        }, err => {
            throw new Error('failed to recover Pass!');
        });
    }

    // teste
    getProfessionalPerUsr_uuid(payload) {
        return Store.Models.profissional.getPer_usuario_uuid(payload.usuario_uuid).then(p => {
            return p;
        }, err => {
            throw new Error('no content user!');
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