const auth = require('./../server/auth/auth');
const AppRoutes = require('./api/routes/routes');

const jwt = require('jsonwebtoken');

module.exports = App = {
    // string routes
    Routes: ENV.ROUTES,

    // App primaries set routes
    setAppRoutes: (apiMainRoute) => {
        console.log('App: START set Routes'); // log

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
         * Default Routes /default
         */
        Server.express.use(
            apiMainRoute + ENV.ROUTES.defaultRoutes.path,
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