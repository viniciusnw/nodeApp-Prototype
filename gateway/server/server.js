const express = require('express');
const App = require('./../App/app');

module.exports = Server = {
    // injeção de dependencia
    express: express(), // express for API-server ( /api/v0 route root )
    App: App, // App run into route root API-server

    // middlewares
    config: () => {
        // prevent GET 204 status {no content}
        Server.express.get('/favicon.ico', (req, res) => res.sendStatus(204));
        Server.express.get('/robots.txt', (req, res) => res.sendStatus(204));
        Server.express.get('/teste', (req, res) => res.sendStatus(204));
        console.log('Server: set configs'); // log
    },


    setAppRun: (apiMainRoute) => {
        console.log('Server: set app to run'); // log
        // App set yours routes, with {apiMainRoute} reference
        Server.App.setAppRoutes(apiMainRoute);
    },
    
    run: () => {
        // server express server
        Server.express.listen(process.env.PORT || 3000, () => console.log(`Server: Start ( listening on *:${process.env.PORT || 3000} )`));

        // memory use
        let used = process.memoryUsage().heapUsed / 1024 / 1024;
        console.log(`Server: memory use:  ${Math.round(used * 100) / 100} MB`);
    }
};