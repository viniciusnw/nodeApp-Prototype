const AppRoutes = require('./api/routes/routes');

module.exports = App = {
    setAppRoutes: (apiMainRoute) => {
        // log
        console.log('App: set app routes');

        // set main routes
        Server.express.use(apiMainRoute + '/default', AppRoutes.defaultRoutes.export());
        Server.express.use(apiMainRoute + '/cmAppName', AppRoutes.cmAppNameRoutes.export());
        Server.express.use(apiMainRoute + '/gateway', AppRoutes.gatewayRoutes.export());
    }
};