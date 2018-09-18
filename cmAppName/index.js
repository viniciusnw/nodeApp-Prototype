(function () {
    const express = require('express');
    const jwt = require('jsonwebtoken');
    const SECRET_APPLICATION = 'eyJhbGciOiJIUzUxMiJ9.eyJob3N0Ijoid3d3LmNtdGVjbm9sb2dpYS5jb20uYnIiLCJ0eXBlIjoiSldUIiwidXNlIjoia2V5IGZvciBzaWduYXR1cmUgYXBwbGljYXRpb24gdG9rZW4ifQ.FCmZZzD6bg6OEA6OL6XzqQg95cZ4kLMyxUCuHA3oeQbLOhYoPcU96jI_aET8zJ7643TeWfTykB6ytjWeYKYX3A';

    const client = {
        id: 'd41d8cd98f00b204e9800998ecf8427e', // public key
        secret: '21232f297a57a5a743894a0e4a801fc3', // private key
        // -- //
        signature: SECRET_APPLICATION // public application signature key
    };
    const app = express();

    // uses
    app.use(express.static(__dirname + '/public'));
    // set
    app.set('port', 4000);
    // prevent GET send 204 status {no content}
    app.get('/favicon.ico', (req, res) => res.sendStatus(204));
    app.get('/robots.txt', (req, res) => res.sendStatus(204));


    // GET application
    app.get('/', (req, res) => {
        res.sendFile(__dirname + '/public/index.html');
    });
    app.get('/home', (req, res, next) => {
        res.sendFile(__dirname + '/public/home.html');
    });

    // GET APPLICATION TOKEN
    app.get('/application-token', (req, res) => {
        res.status(200).json({
            client_id: jwt.sign({
                client_id: client.id,
            }, client.signature, {
                expiresIn: 120 // 2min
            }),
            client_secret: jwt.sign({
                client_secret: client.secret
            }, client.signature, {
                expiresIn: 120 // 2min
            })
        });
    });

    app.listen(app.get('port'), () => console.log(`App listening on *:${app.get('port')}`));
})();