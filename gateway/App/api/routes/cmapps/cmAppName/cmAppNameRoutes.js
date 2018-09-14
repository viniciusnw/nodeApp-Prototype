const router = require('express').Router();
const auth = require('./../../../../../server/auth/auth');

module.exports = cmAppNameRoutes = {
    export: () => {
        console.log('App: set AppName Routes');

        // Route for teste basic and bearer auth
        router.get('/TESTE', auth.basicAuthentication, function (req, res, next) {
            res.status(200).json("Autorizado");
        });

        return router;
    }
};