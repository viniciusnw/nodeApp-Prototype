const AppRoutes = require('./api/routes/routes');

module.exports = App = {
    // App set routes
    setAppRoutes: (apiMainRoute) => {
        // log
        console.log('App: set routes for Server use');

        // set main routes
        Server.express.use(apiMainRoute + '/default', AppRoutes.defaultRoutes.export());
        Server.express.use(apiMainRoute + '/cmAppName', AppRoutes.cmAppNameRoutes.export());
        Server.express.use(apiMainRoute + '/apiClient', AppRoutes.gatewayRoutes.export());
    }
};