// ====== KEY SECRETS ====== //
// Key for bearer and basic token encrypt/decrypt
process.env.SECRET = JSON.stringify({
    // beader signature private key
    BEARER: 'eyJhbGciOiJIUzUxMiJ9.eyJob3N0Ijoid3d3LmNtdGVjbm9sb2dpYS5jb20uYnIiLCJ0eXBlIjoiSldUIiwidXNlIjoia2V5IGZvciBzaWduYXR1cmUgYmVhcmVyIHRva2VuIn0.zcuO7MAvSa-6Yvsmoz7W9sasAPqetA5fU3_Ms3wwgTGp-UM_Z_CUFu6O6x_lSeSsY_AEnAC_l7_jZgLCpU3bAg',
    // basic signature private key
    BASIC: 'eyJhbGciOiJIUzUxMiJ9.eyJob3N0Ijoid3d3LmNtdGVjbm9sb2dpYS5jb20uYnIiLCJ0eXBlIjoiSldUIiwidXNlIjoia2V5IGZvciBzaWduYXR1cmUgYmFzaWMgdG9rZW4ifQ.kmiFbccYf6AsMyNn_gMdZPNigynga8NmjMW3HHB_BO2PqxznTzg1pU0KpaXnr4rhJrCKMUselCu4fr4yrrIUbQ',
    // application signature public key
    APPLICATION: 'eyJhbGciOiJIUzUxMiJ9.eyJob3N0Ijoid3d3LmNtdGVjbm9sb2dpYS5jb20uYnIiLCJ0eXBlIjoiSldUIiwidXNlIjoia2V5IGZvciBzaWduYXR1cmUgYXBwbGljYXRpb24gdG9rZW4ifQ.FCmZZzD6bg6OEA6OL6XzqQg95cZ4kLMyxUCuHA3oeQbLOhYoPcU96jI_aET8zJ7643TeWfTykB6ytjWeYKYX3A',
    // jwt master key {used for encode: BEARER, BASIC, APPLICATION} signature
    KEY: 'CMTEC'
});

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
                path: '/cadastrar'
            },
            recoverPass: {
                path: '/recuperar-senha'
            },
            profissional: {
                path: '/profissional',
                queryParam: ['usuario_uuid']
            }
        }
    }
});
module.exports.ROUTES = JSON.parse(process.env.ROUTES);