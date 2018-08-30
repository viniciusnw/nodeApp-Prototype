const routes = require('./api/routes/routes');
const Server = require('./../server/server');

module.exports = App = {

    appRoutes: (mainRoute) => {
        console.log('App: app routes');
        Server.express.use(mainRoute + '/default', routes.defaultRoutes.export());
    }
};