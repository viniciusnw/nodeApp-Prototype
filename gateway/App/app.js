const routes = require('./api/routes/routes');
const Server = require('./../server/server');

return module.exports = App = {
    
    appRoutes: () => {
        console.log('App: app routes');
        Server.express.use('/cmapps/default', routes.defaultRoutes.export());
        return () => {};
    }
};