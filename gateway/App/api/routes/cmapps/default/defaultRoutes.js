const router = require('express').Router();

// injeção de dependencia
const storeModule = require('./../../../../store/store-module');
const loginActions = storeModule.actions.login; // actions
const loginDispatch = storeModule.dispatchers.login; // disparo
// const Store = storeModule.store; // store module

module.exports = defaultRoutes = {

    export: () => {
        console.log('App: set Default Routes'); // log

        // Routes
        router.post('/login', function (req, res, next) {
            let requestPost = req.body;

            // dispatch
            loginDispatch({
                type: loginActions.SIGN_IN,
                payload: requestPost
            }, (data) => {
                res.status(200).json(data);
            }); //callback
        });

        router.get('/logout', function (req, res, next) {
            // dispatch
            loginDispatch({
                type: loginActions.SIGN_OUT,
                payload: null
            }, (data) => {
                res.status(200).json(data);
            }); //callback
        });

        return router;
    }
};