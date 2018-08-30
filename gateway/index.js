const Server = require('./server/server');

(function () {
    Server.config();
    Server.run('/api/v0');
    Server.start();
}());