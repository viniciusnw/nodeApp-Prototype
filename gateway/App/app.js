const AppRoutes = require('./api/routes/routes');
const auth = require('./../server/auth/auth');

module.exports = App = {

    // App set routes
    setAppRoutes: (apiMainRoute) => {
        // log
        console.log('App: START set Routes');

        // SET MAIN ROUTES

        /**
         * Auth Routes /oauth
         */
        Server.express.use(
            apiMainRoute + ENV.ROUTES.oauthRoutes.path,
            AppRoutes.oauthRoutes.export()
        );

        /**
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