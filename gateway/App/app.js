const auth = require('./../server/auth/auth');
const AppRoutes = require('./api/routes/routes');

module.exports = App = {
    // string routes
    Routes: ENV.ROUTES,

    // App set routes
    setAppRoutes: (apiMainRoute) => {
        console.log('App: START set Routes'); // log

        // SET MAIN ROUTES
        /**
         * Auth Routes /oauth
         */
        Server.express.use(
            apiMainRoute + App.Routes.oauthRoutes.path, // route
            AppRoutes.oauthRoutes.export() // export routes for express
        );

        /**
         * all routes after then, use auth.beaderAuthentication for access
         * for application level security
         * 
         * Default Routes
         */
        Server.express.use(
            apiMainRoute + '/default',
            auth.beaderAuthentication,
            AppRoutes.defaultRoutes.export()
        );

        /**
         * CM APP ROUTES
         */
        Server.express.use(
            apiMainRoute + '/cmAppName',
            auth.beaderAuthentication,
            AppRoutes.cmAppNameRoutes.export()
        );

        /**
         * API CLIENT ROUTES
         */
        Server.express.use(
            apiMainRoute + '/apiClient',
            auth.beaderAuthentication,
            AppRoutes.gatewayRoutes.export()
        );
    }
};