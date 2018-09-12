const mysql = require('mysql');
const pg = require('pg');

// mySqlConnect module
module.exports.mySqlCon = {
    createConnection: () => mysql.createConnection({
        host: "db-dev.server.cmtecnologia.com.br",
        user: "root",
        password: "+cmdev01",
        database: "cmtecnologia"
    }),
    connect: () => new Promise((resolve, reject) => {
        this.mySqlCon.createConnection().connect((err) => {
            if (err) reject(err.message);
            else {
                console.log('App: [mySqlCon] - connect in [host]-[db] database!');
                resolve(this.mySqlCon.createConnection());
            }
        })
    })
};

// postgresConnect module
module.exports.pgCon = {
    // connection string
    conString: "postgres://username:password@localhost/database",
    connect: () => new Promise((resolve, reject) => {
        this.pgCon.connect(this.pgCon.conString, (err, client, done) => {
            if (err) reject(err.message);
            else {
                console.log('App: [pgCon] - connect in [host]-[db] database!');
                resolve(client);
            }
        });
    })
};

/**
 * Load store models modules for store
 */
// Model methods
const models = require('./models');
// Models
const client = require('./models/client');
const user = require('./models/user');

//Sore module
module.exports.Models = {
    models, // default model
    // import models
    client,
    user
};