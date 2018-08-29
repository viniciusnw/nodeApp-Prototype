const express = require('express');
const server = express();

const routes = require('./api/routes/routes');

class App {
    constructor() {
        console.log('Constructor app');
    }

    useRoutes() {
        server.use('/cmapps/default', routes.defaultRoutes.export());

        // appRoutes.get('/gateway', function (req, res, next) {
        //     res.send('Hi');
        // });

        // return appRoutes;
    }
}

module.exports = new App();