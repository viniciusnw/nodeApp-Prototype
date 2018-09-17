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
    client_id: 'd41d8cd98f00b204e9800998ecf8427e', // <- 1,
    client_secret: '21232f297a57a5a743894a0e4a801fc3' // <- admin
}];

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
};