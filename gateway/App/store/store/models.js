const mySqlStore = require('./store').mySqlCon;
const postgresStore = require('./store').pgCon;

module.exports = models = {

    mySql_queryExecute: (SQL) => new Promise((resolve, reject) => {
        // return connected
        mySqlStore.connect().then(conn => {
            // objeto de conexão
            conn.query(SQL, function (err, result, fields) {
                if (err) reject(err);
                resolve(result);
            });
        }, err => { // return not-connected
            reject(err);
        });
    }),

    // postgres query execute
    pg_queryExecute: (SQL) => new Promise((resolve, reject) => {
        postgresStore.connect().then(conn => {
            conn.query(SQL, function (err, result, fields) {
                done();
                if (err) reject(err);
                resolve(result);
            });
        }, err => {
            reject(err);
        });
    })
}