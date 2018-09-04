const router = require('express').Router();

// injeção de dependencia
const storeModule = require('./../../../../store/store-module');
const loginActions = storeModule.actions.login; // actions
const loginDispatch = storeModule.dispatchers.login; // disparo
// const Store = storeModule.store; // store module

const auth = require('./../../../../../server/auth/auth');

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
            }).then((data) => {
                res.status(data.status).json(data);
            }, (err) => {
                res.status(err.status).json(err);
            });
        });
        
        router.get('/logout', auth.bearerTokenValidation, function (req, res, next) {
            // dispatch
            loginDispatch({
                type: loginActions.SIGN_OUT,
                payload: null
            }).then((data) => {
                res.status(data.status).json(data);
            }, (err) => {
                res.status(err.status).json(err);
            });
        });

        return router;
    }
};