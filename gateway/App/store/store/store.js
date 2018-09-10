const mysql = require('mysql');

// dbConnect
module.exports = dbCon = {
    createConnection: () => mysql.createConnection({
        host: "db-dev.server.cmtecnologia.com.br",
        user: "root",
        password: "+cmdev01_",
        database: "cmtecnologia"
    })
}

// let conn = dbCon.createConnection();
// conn.connect((err) => {
//     if (err) throw err;
//     else console.log('App: connect in [host]-[db] database!');
// });

// Load store models modules
const client = require('./models/client');
const user = require('./models/user');
module.exports = Store = {
    dbCon,
    client,
    user
};