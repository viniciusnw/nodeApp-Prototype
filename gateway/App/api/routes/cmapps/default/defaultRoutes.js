const router = require('express').Router();
const auth = require('./../../../../../server/auth/auth');

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

        // user model
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

        // email
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

        // teste
        // usuario_uuid || jwt basic token in header
        (function () {
            let route = defaultRoutes.Routes.professional.childs.perUsrId.path;
            router.get(route, auth.getBasicToken, function (req, res, next) {
                let payloadQuery = req.query;
                console.log(req);
                return;

                // {
                //     usuario_uuid: 1
                // }
                // defaultDispatch({
                //     type: defaultActions.GET_PROFISSIONAL_PER_usuario_uuid,
                //     payload: payload
                // }).then((data) => {
                //     res.status(data.status).json(data);
                // }, (err) => {
                //     res.status(err.status).json(err);
                // });
            });
        })();

        return router;
    }
};