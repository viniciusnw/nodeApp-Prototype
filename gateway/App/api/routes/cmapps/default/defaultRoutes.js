const routes = require('express').Router();

module.exports = defaultRoutes = {
    export: () => {
        console.log('Default Routes');
        
        routes.get('/login', function (req, res, next) {
            res.status(200).json({
                msg: 'First route =D'
            });
        });

        return routes;
    }
};