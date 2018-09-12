const models = require('./../models');

module.exports = client = {
    
    /**
     * Get client peer ID
     */
    get: (id) => models.mySql_queryExecute(`SELECT * FROM clientes WHERE id = ${id}`),
    pgGet: (id) => models.pg_queryExecute(`SELECT * FROM clientes WHERE id = ${id}`),
    post: () => {},
    put: () => {},
    delete: () => {}
}

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
