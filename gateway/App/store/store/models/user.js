module.exports = user = {
    
    get: () => ({
        client_id: 1,
        name: 'Rob Doe',
        user: 'Rob',
        pwd: 'teste'
    }),
    post: () => {},
    put: () => {},
    delete: () => {}
}

// User Model return
// {
//     "$schema": "http://json-schema.org/draft-04/schema#",
//     "title": "User",
//     "type": "object",
//     "properties": {
//         "client_id": {
//             "type": "string"
//         },
//         "name": {
//             "type": "string"
//         },
//         "user": {
//             "type": "string"
//         },
//         "pwd": {
//             "type": "string"
//         }
//     }
// }