// ====== ROUTES ====== //
process.env.ROUTES = JSON.stringify({
    apiMainRoute: '/api',
    version: '/v0',
    oauthRoutes: {
        path: '/oauth',
        childs: {
            authorize: {
                path: '/authorize'
            },
            token: {
                path: '/token'
            },
            login: {
                path: '/login'
            },
            logout: {
                path: '/logout'
            }
        }
    }
});
module.exports.ROUTES = JSON.parse(process.env.ROUTES);