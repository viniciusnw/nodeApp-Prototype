const auth = require('./../../../server/auth/auth');
const router = require('express').Router();

//Load Store Module
const storeModule = require('./../../store/store-module');
// Login Redux (Store Module)
const loginActions = storeModule.actions.login; // actions
const loginDispatch = storeModule.dispatchers.login; // disparo

module.exports = oauthRoutes = {
    // string routes
    Routes: ENV.ROUTES.oauthRoutes.childs,

    export: () => {
        console.log('App: set oAuth Routes'); // log

        // application authorize
        router.get(oauthRoutes.Routes.authorize.path, function (req, res, next) {
            let payloadQuery = req.query;
            loginDispatch({
                type: loginActions.AUTHORIZE,
                payload: payloadQuery
            }).then((data) => {
                res.status(data.status).json(data);
            }, (err) => {
                res.status(err.status).json(err);
            });
        });

        // application authentication
        router.post(oauthRoutes.Routes.token.path, function (req, res, next) {
            let payloadBody = req.body;
            loginDispatch({
                type: loginActions.AUTHORIZE_TOKEN,
                payload: payloadBody
            }).then((data) => {
                res.status(data.status).json(data);
            }, (err) => {
                res.status(err.status).json(err);
            });
        });

        // simple login
        router.post(oauthRoutes.Routes.login.path, auth.beaderAuthentication, function (req, res, next) {
            let payloadBody = req.body;

            // user token traffer
            // console.log(req.decodedBearerAuthentication);

            // dispatch
            loginDispatch({
                type: loginActions.SIGN_IN,
                payload: payloadBody
            }).then((data) => {
                res.status(data.status).json(data);
            }, (err) => {
                res.status(err.status).json(err);
            });
        });

        // simple logout
        router.get(oauthRoutes.Routes.logout.path, auth.beaderAuthentication, function (req, res, next) {
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