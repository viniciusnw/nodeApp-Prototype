const express = require('express');
const App = require('./../App/app');

module.exports = Server = {
    // injeção de dependencia
    express: express(), // express for API-server ( /api/v0 route root )
    App: App, // App run into route root API-server

    config: () => {
        // configs
        Server.express.set('port', 3000);

        // prevent GET /favicon.ico 204 status {no content}
        Server.express.get('/favicon.ico', (req, res) => res.sendStatus(204));
        Server.express.get('/robots.txt', (req, res) => res.sendStatus(204));

        // log
        console.log('Server: config');
    },


    setAppRun: (apiMainRoute) => {
        // log
        console.log('Server: set app to run');

        // App export yours routes, with API-Server route reference
        Server.App.setAppRoutes(apiMainRoute);
    },

    run: () => {
        // server start
        Server.express.listen(Server.express.get('port'), () => console.log(`Server: Start ( listening on *:${Server.express.get('port')} )`));
    }
};