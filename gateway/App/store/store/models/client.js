const models = require('./../models');

// Client Model return
// {
//     "$schema": "http://json-schema.org/draft-04/schema#",
//     "title": "Client",
//     "type": "object",
//     "properties":{
//         "client_id": {
//             "type": "string"
//         },
//         "client_secret": {
//             "type": "string"
//         }
//     }
// }
const clientMock = [{
    client_id: '1',
    client_secret: 'ABC123'
}]

module.exports = client = {
    // get: (id) => models.mySql_queryExecute(`SELECT * FROM clientes WHERE id = ${id}`),
    // pgGet: (id) => models.pg_queryExecute(`SELECT * FROM clientes WHERE id = ${id}`),
    get: (id) => new Promise((resolve, reject) => {
        let auth = clientMock.find(c => c.client_id == id);
        if (!auth) reject();
        resolve(auth);
    }),
    post: () => {},
    put: () => {},
    delete: () => {}
}