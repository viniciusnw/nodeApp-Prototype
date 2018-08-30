const routes = require('express').Router();

module.exports = gatewayRoutes = {
    export: () => {
        console.log('App: set Gateway Routes');
        
        routes.get('/login', function (req, res, next) {
            res.status(200).json({
                msg: 'Gateway Login'
            });
        });

        return routes;
    }
};