module.exports = client = {
    /**
     * Get client peer ID
     */
    get: (id) => client.queryExecute(`SELECT * FROM clientes WHERE id = ${id}`),
    post: () => {},
    put: () => {},
    delete: () => {},
    // ------------------------------------------
    queryExecute: (SQL) => {
        return new Promise((resolve, reject) => {
            // return connected
            Store.dbCon.connect().then(conn => {
                // objeto de conexão
                conn.query(SQL, function (err, result, fields) {
                    if (err) reject(err);
                    resolve(result);
                });
            }, err => { // return not-connected
                reject(err);
            });
        });
    }
}