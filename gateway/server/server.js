const express = require('express');
const App = require('./../App/app');

module.exports = Server = {
    express: express(),
    App: App,

    config: () => {
        // configs
        Server.express.set('port', 3000);

        // prevent GET /favicon.ico 204 status {no content}
        Server.express.get('/favicon.ico', (req, res) => res.sendStatus(204));
        Server.express.get('/robots.txt', (req, res) => res.sendStatus(204));

        // log
        console.log('Server: config');
    },

    run: (apiMainRoute) => {
        // log
        console.log('Server: Run');

        // set app routes
        Server.App.setAppRoutes(apiMainRoute);
    },

    start: () => {
        // server start
        Server.express.listen(Server.express.get('port'), () => console.log(`Server: Start ( listening on *:${Server.express.get('port')} )`));
    }
};