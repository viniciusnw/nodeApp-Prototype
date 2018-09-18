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
        router.get(defaultRoutes.Routes.professional.childs.perUsrId.path, function (req, res, next) {
            // declare Dispatch
            function callDefaultDispatch(payload) {
                defaultDispatch({
                    type: defaultActions.GET_PROFISSIONAL_PER_usuario_uuid,
                    payload: payload
                }).then((data) => {
                    res.status(data.status).json(data);
                }, (err) => {
                    res.status(err.status).json(err);
                });
            }

            if ('usuario_uuid' in req.query) callDefaultDispatch(req.query);
            else App.getBasicToken(req, 'uuid').then(DecodedBasic => {
                callDefaultDispatch({
                    usuario_uuid: DecodedBasic.logged.uuid
                });
            }, err => {
                callDefaultDispatch(null);
            });
        });

        return router;
    }
};