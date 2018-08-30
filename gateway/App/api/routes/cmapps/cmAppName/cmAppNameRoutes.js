const routes = require('express').Router();

module.exports = cmAppNameRoutes = {
    export: () => {
        console.log('App: set appName Routes');
        
        routes.get('/login', function (req, res, next) {
            res.status(200).json({
                msg: 'appName Login'
            });
        });

        return routes;
    }
};