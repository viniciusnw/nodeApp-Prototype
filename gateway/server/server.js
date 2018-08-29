const express = require('express');
const server = express();

// const auth = require('./auth/auth.js');

class Server {

    // Set Configs
    constructor() {
        // configs
        server.set('port', 3000);
        this.preventGetSet();

        console.log('Constructor Server');
    }

    /**
     * 
     * @param {*} appRun 
     */
    run(appRun) {
        server.use(appRun.mainRoute, appRun.useRoutes());
    }

    // prevent GET /favicon.ico 204 status {no content}
    preventGetSet() {
        server.get('/favicon.ico', (req, res) => res.sendStatus(204));
        server.get('/robots.txt', (req, res) => res.sendStatus(204));
    }

    setMainRoutes(mainRoute) {

        // common route example
        // this.server.use('/', routes.defaultRoutes);

        // auth example
        // this.server.get('/login', (req, res) => {
        //     res.status(200).json({
        //         token: auth.makeJwtToken()
        //     });
        // });
    }

    start() {
        server.listen(server.get('port'), () => console.log(`server listening on *:${server.get('port')}`));
    }
}

module.exports = new Server();