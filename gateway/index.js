const Server = require('./server/server');
const App = require('./App/app');

(function () {
    Server.run('/', App);
}());