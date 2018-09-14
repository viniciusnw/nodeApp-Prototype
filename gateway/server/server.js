// express config
// express and express plugins
const express = require('express');
const bodyParser = require('body-parser');

// LOAD ENVIRONMENTS FOR SERVER and APP
const ENV = require('./../environments/env');

module.exports = Server = {
    // injeção de dependencia **
    express: express(), // INJECT express for HTTP HOST
    App:  require('./../App/app'), // INJECT App to run

    // Express configs and plugins
    config: () => {
        /**
         * Set up public files
         */
        // -----------------------

        /**
         * For parse POST requests
         */
        Server.express.use(bodyParser.urlencoded({
            extended: true
        })); // parse application/x-www-form-urlencoded
        Server.express.use(bodyParser.json()); // parse application/json

        /**
         * Prevent GET 204 status {no content}
         */
        Server.express.get('/favicon.ico', (req, res) => res.sendStatus(204));
        Server.express.get('/robots.txt', (req, res) => res.sendStatus(204));
        console.log('Server: set configs'); // log
    },

    // Set app to run
    setAppRun: (apiMainRoute) => {
        console.log('Server: set app to run'); // log

        /**
         * App set yours routes, 
         * with {apiMainRoute} reference
         */
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