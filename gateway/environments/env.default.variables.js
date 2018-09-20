// ====== KEY SECRETS ====== //
// Key for bearer and basic token encrypt/decrypt
process.env.SECRET = JSON.stringify({
    // beader signature private key
    BEARER: 'BEARER',
    // basic signature private key
    BASIC: 'BASIC',
    // application signature public key
    APPLICATION: 'APPLICATION',
    // jwt master key {used for encode: BEARER, BASIC, APPLICATION} signature
    KEY: 'CMTEC'
});
module.exports.SECRET = JSON.parse(process.env.SECRET);

// ====== ROUTES ====== //
process.env.ROUTES = JSON.stringify({
    apiMainRoute: '/api',
    version: '/v0',
    // auth routes
    oauthRoutes: {
        path: '/oauth',
        childs: {
            authorize: {
                path: '/authorize',
                queryParam: ['client_id']
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
    },
    // default routes
    defaultRoutes: {
        path: '/default',
        childs: {
            register: {
                path: '/register'
            },
            recoverPass: {
                path: '/recover-pass'
            },

            // get Profissional per usuario_uuid || get info in basic jwt
            professional: {
                path: '/professional',
                childs: {
                    perUsrId: {
                        path: '/professional/per-usr-id',
                        queryParam: ['usuario_uuid'],
                    }
                }
            }
        }
    }
});
module.exports.ROUTES = JSON.parse(process.env.ROUTES);
