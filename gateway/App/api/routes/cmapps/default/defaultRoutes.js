const routes = require('express').Router();
const storeModule = require('./../../../../store/store-module');

// injeção de dependencia
const loginActions = storeModule.actions.login; // actions
const loginDispatch = storeModule.dispatchers.login; // disparo
const Store = storeModule.store; // store module

module.exports = defaultRoutes = {

    export: () => {
        // log
        console.log('App: set Default Routes');

        // Routes
        routes.get('/login', function (req, res, next) {

            // subscribe
            let subscribe = Store.SIGN_IN
                .subscribe((data) => {
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
            }, function () {
                // console.log('callback');
            });

        });

        routes.get('/logout', function (req, res, next) {

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
            }, function () {
                // console.log('callback');
            });
        });

        return routes;
    }
};