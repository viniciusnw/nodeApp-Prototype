const mysql = require('mysql');

// dbCon.connect((err) => {
//     if (err) throw err;
//     else console.log('App: connect in [host]-[db] database!');
// });
// dbCon.query("SELECT name, address FROM customers", function (err, result, fields) {
//     if (err) throw err;
//     console.log(fields);
// });

// module.exports = dbCon = {
//     createConnection: mysql.createConnection({
//         host: "db-dev.server.cmtecnologia.com.br",
//         user: "root",
//         password: "+cmdev01_",
//         database: "cmtecnologia"
//     }),

//     conn: dbCon.createConnection.connect((err) => {
//         if (err) throw err;
//         else console.log('App: connect in [host]-[db] database!');
//     })
// };

module.exports = dbCon = {
    createConnection: () => mysql.createConnection({
        host: "db-dev.server.cmtecnologia.com.br",
        user: "root",
        password: "+cmdev01_",
        database: "cmtecnologia"
    })
}

let conn = dbCon.createConnection();
conn.connect((err) => {
    if (err) throw err;
    else console.log('App: connect in [host]-[db] database!');
});

// Load store modules
const client = require('./models/client');
const user = require('./models/user');
module.exports = Store = {
    dbCon,
    client,
    user
};