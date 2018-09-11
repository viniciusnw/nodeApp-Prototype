const mysql = require('mysql');

// MYSQL dbConnect module
module.exports = dbCon = {
    createConnection: () => mysql.createConnection({
        host: "db-dev.server.cmtecnologia.com.br",
        user: "root",
        password: "+cmdev01",
        database: "cmtecnologia"
    }),
    connect: () => new Promise((resolve, reject) => {
        dbCon.createConnection().connect((err) => {
            if (err) {
                reject(err.message);
            } else {
                console.log('App: connect in [host]-[db] database!');
                resolve(dbCon.createConnection());
            }
        })
    })
};

// Load store models modules
const client = require('./models/client');
const user = require('./models/user');

module.exports = Store = {
    dbCon,
    client,
    user
};