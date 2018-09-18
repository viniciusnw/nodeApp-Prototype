const auth = require('./../server/auth/auth');
const AppRoutes = require('./api/routes/routes');

const jwt = require('jsonwebtoken');

module.exports = App = {
    // string routes
    Routes: ENV.ROUTES,

    /**
     * 
     * @param {*} req request object
     * @param {*} prop prop into jwt to return
     */
    getBasicToken(req, prop) {
        return new Promise((resolve, reject) => {
            let basicToken = (req.header('authorization-user') || 'string').split(' ')[1];
            jwt.verify(basicToken, ENV.SECRET.BASIC, (err, decoded) => {
                if (err) reject(err);
                else {
                    if ('logged' in decoded && prop in decoded.logged) resolve(decoded);
                    else reject('no prop provider');
                }
            });
        });
    },

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