const router = require('express').Router();
const storeModule = require('./../../../../store/store-module');

// injeção de dependencia
const loginActions = storeModule.actions.login; // actions
const loginDispatch = storeModule.dispatchers.login; // disparo

const Store = storeModule.store; // store module

module.exports = defaultRoutes = {

    export: () => {
        console.log('App: set Default Routes'); // log

        // Routes
        router.get('/login', function (req, res, next) {

            // subscribe
            let subscribe = Store.SIGN_IN.subscribe((data) => {
                res.status(200).json({
                    msg: data
                });
                subscribe.unsubscribe();
            });

            // dispatch
            loginDispatch({
                type: loginActions.SIGN_IN,
                payload: {
                    name: 'Rob',
                    pwd: 'pwd'
                }
            }, function () {}); //callback
        });

        router.get('/logout', function (req, res, next) {

            // subscribe
            let subscribe = Store.SIGN_OUT.subscribe((data) => {
                res.status(200).json({
                    msg: data
                });
                subscribe.unsubscribe();
            });

            // dispatch
            loginDispatch({
                type: loginActions.SIGN_OUT,
                payload: null
            }, function () {}); //callback
        });

        return router;
    }
};