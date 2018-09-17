const router = require('express').Router();

//Load Store Module
const storeModule = require('./../../../../store/store-module');
// Login Redux (Store Module)
const defaultActions = storeModule.actions.defaultA; // actions
const defaultDispatch = storeModule.dispatchers.defaultD; // disparo

module.exports = defaultRoutes = {
    // string routes
    Routes: ENV.ROUTES.defaultRoutes.childs,

    export: () => {
        console.log('App: set Default Routes'); // log

        // register
        router.post(defaultRoutes.Routes.register.path, function (req, res, next) {
            let payloadBody = req.body;
            defaultDispatch({
                type: defaultActions.REGISTER,
                payload: payloadBody
            }).then((data) => {
                res.status(data.status).json(data);
            }, (err) => {
                res.status(err.status).json(err);
            });
        });
        // recover-pass
        router.post(defaultRoutes.Routes.recoverPass.path, function (req, res, next) {
            let payloadBody = req.body;
            defaultDispatch({
                type: defaultActions.RECOVER_PASS,
                payload: payloadBody
            }).then((data) => {
                res.status(data.status).json(data);
            }, (err) => {
                res.status(err.status).json(err);
            });
        });
        
        return router;
    }
};