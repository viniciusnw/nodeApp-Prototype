const router = require('express').Router();

// injeção de dependencia
const storeModule = require('./../../../../store/store-module');
const loginActions = storeModule.actions.login; // actions
const loginDispatch = storeModule.dispatchers.login; // disparo
const auth = require('./../../../../../server/auth/auth');

module.exports = defaultRoutes = {

    export: () => {
        console.log('App: set Default Routes'); // log


        // application authorize
        router.get('/oauth/authorize', function (req, res, next) {
            let queryParams = req.query;
            loginDispatch({
                type: loginActions.AUTHORIZE,
                payload: queryParams
            }).then((data) => {
                res.status(data.status).json(data);
            }, (err) => {
                res.status(err.status).json(err);
            });
        });

        // application authentication
        router.post('/oauth/token', function (req, res, next) {
            let requestPost = req.body;
            loginDispatch({
                type: loginActions.AUTHORIZE_TOKEN,
                payload: requestPost
            }).then((data) => {
                res.status(data.status).json(data);
            }, (err) => {
                res.status(err.status).json(err);
            });
        });

        // simple login
        router.post('/oauth/login', auth.beaderAuthentication, function (req, res, next) {
            let requestPost = req.body;

            // console.log(req.decodedBearerAuthentication);

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

        // simple logout
        router.get('/oauth/logout', function (req, res, next) {
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