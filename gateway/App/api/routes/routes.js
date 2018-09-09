// auth routes
const oauthRoutes = require('./oauthRoutes');

// cm apps
const defaultRoutes = require('./cmApps/default/defaultRoutes');
const cmAppNameRoutes = require('./cmApps/cmAppName/cmAppNameRoutes');

// gateway
const gatewayRoutes = require('./gateway/gatewayRoutes');

module.exports = {
    oauthRoutes,
    defaultRoutes,
    cmAppNameRoutes,
    gatewayRoutes
};