

// ====== KEY SECRETS ====== //
// Key for bearer and basic token encrypt/decrypt
process.env.SECRET = JSON.stringify({
    BEARER: 'eyJhbGciOiJIUzUxMiJ9.eyJob3N0Ijoid3d3LmNtdGVjbm9sb2dpYS5jb20uYnIiLCJ0eXBlIjoiSldUIiwidXNlIjoia2V5IGZvciBzaWduYXR1cmUgYmVhcmVyIHRva2VuIn0.zcuO7MAvSa-6Yvsmoz7W9sasAPqetA5fU3_Ms3wwgTGp-UM_Z_CUFu6O6x_lSeSsY_AEnAC_l7_jZgLCpU3bAg',
    BASIC: 'eyJhbGciOiJIUzUxMiJ9.eyJob3N0Ijoid3d3LmNtdGVjbm9sb2dpYS5jb20uYnIiLCJ0eXBlIjoiSldUIiwidXNlIjoia2V5IGZvciBzaWduYXR1cmUgYmFzaWMgdG9rZW4ifQ.kmiFbccYf6AsMyNn_gMdZPNigynga8NmjMW3HHB_BO2PqxznTzg1pU0KpaXnr4rhJrCKMUselCu4fr4yrrIUbQ',
    KEY: 'CMTEC'
})

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