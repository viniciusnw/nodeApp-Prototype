const routes = require('express').Router();

module.exports = defaultRoutes = {
    export: () => {
        console.log('App: set Default Routes');
        
        routes.get('/login', function (req, res, next) {
            res.status(200).json({
                msg: 'Default Login'
            });
        });

        return routes;
    }
};