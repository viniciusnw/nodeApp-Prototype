const router = require('express').Router();
const auth = require('./../../../server/auth/auth');

//Load Store Module
const storeModule = require('./../../store/store-module');
// Login Redux (Store Module)
const loginActions = storeModule.actions.login; // actions
const loginDispatch = storeModule.dispatchers.login; // disparo

module.exports = oauthRoutes = {

    export: () => {
        console.log('App: set oAuth Routes'); // log

        // application authorize
        router.get(ENV.ROUTES.oauthRoutes.childs.authorize.path, function (req, res, next) {
            let queryParams = req.query;
            console.log(req);
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
        router.post(ENV.ROUTES.oauthRoutes.childs.token.path, function (req, res, next) {
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
        router.post(ENV.ROUTES.oauthRoutes.childs.login.path, auth.beaderAuthentication, function (req, res, next) {
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
        router.get(ENV.ROUTES.oauthRoutes.childs.logout.path, function (req, res, next) {
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