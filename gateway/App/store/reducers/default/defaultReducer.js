const Store = require('./../../store/store');

class DefaultReducers {
    constructor() {}

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