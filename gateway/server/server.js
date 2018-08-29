// common route example
// this.server.use('/', routes.defaultRoutes);

const express = require('express');

return module.exports = Server = {
    express: express(),

    config: () => {
        // configs
        Server.express.set('port', 3000);
        
        // prevent GET /favicon.ico 204 status {no content}
        Server.express.get('/favicon.ico', (req, res) => res.sendStatus(204));
        Server.express.get('/robots.txt', (req, res) => res.sendStatus(204));
        
        // log
        console.log('Server: config');
    },

    run: (mainRoute, AppLoad) => {
        // log
        console.log('Server: Run');
        
        Server.config();
        Server.express.use(mainRoute, AppLoad.appRoutes());
        Server.start();
    },

    start: () => {
        Server.express.listen(Server.express.get('port'), () => console.log(`Server: Start ( listening on *:${Server.express.get('port')} )`));
    }
}