// express config
// express and express plugins
const express = require('express');
const bodyParser = require('body-parser');

// LOAD ENVIRONMENTS FOR SERVER AND APP
const ENV = require('./../environments/env');

module.exports = Server = {
    // injeção de dependencia **
    express: express(), // INJECT express for HTTP HOST
    App: require('./../App/app'), // INJECT App to run

    // Express configs and plugins
    config: () => {
        /**
         * CORS
         */
        Server.express.use((req, res, next) => {
            res.header("Access-Control-Allow-Origin", "*");
            res.header(
                "Access-Control-Allow-Headers",
                "Origin, X-Requested-With, Content-Type, Accept, Authorization, Authorization-user"
            );
            res.header("X-Powered-By", "=D!");

            // OPTIONS REQUEST
            if (req.method === "OPTIONS") {
                res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
                return res.status(200).json({});
            }
            next();
        });
        // -----------------------

        /**
         * For parse POST requests
         */
        Server.express.use(bodyParser.urlencoded({
            extended: true
        })); // parse application/x-www-form-urlencoded
        Server.express.use(bodyParser.json()); // parse application/json
        // -----------------------

        /**
         * Prevent GET 204 status {no content}
         */
        Server.express.get('/favicon.ico', (req, res) => res.sendStatus(204));
        Server.express.get('/robots.txt', (req, res) => res.sendStatus(204));
        // -----------------------

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

// RESPONSE HEADERS
// Access-Control-Allow-Credentials: true
// Access-Control-Allow-Headers: Origin, Credentials, X-Requested-With, Content-Type, Accept, Authorization, x-userip, x-token, x-token_category, x-token_type, x-captcha, x-cblc, cache-control
// Access-Control-Allow-Methods: OPTIONS, GET, PUT, PATCH, POST, DELETE, HEAD
// Access-Control-Allow-Origin: *
// Cache-Control: no-cache
// Content-Type: application/json; charset=UTF-8
// Date: Sat, 15 Sep 2018 22:51:35 GMT
// Expires: -1
// Pragma: no-cache
// Server: Microsoft-IIS/8.5
// Transfer-Encoding: chunked
// X-AspNet-Version: 4.0.30319
// X-Content-Type-Options: nosniff
// X-Powered-By: ASP.NET

// REQUEST HEADERS
// Accept: */*
// Accept-Encoding: gzip, deflate, br
// Accept-Language: pt-BR,pt;q=0.9,en-US;q=0.8,en;q=0.7
// Cache-Control: no-cache
// Connection: keep-alive
// content-type: application/x-www-form-urlencoded; charset=UTF-8
// DNT: 1
// Host: webapidelay.toroinvestimentos.com.br
// Origin: https://www.toroinvestimentos.com.br
// Pragma: no-cache
// Referer: https://www.toroinvestimentos.com.br/
// User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/68.0.3440.106 Safari/537.36