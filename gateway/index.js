const appServer = require('./server/server');
const appLoad = require('./App/app');

(function () {
    console.dir(appLoad);
    appServer.run({
        mainRoute: '/',
        app: appLoad
    });
}());