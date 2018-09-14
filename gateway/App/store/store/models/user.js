const models = require('./../models');

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
const userMock = [{
    client_id: 1,
    name: 'Rob Doe',
    user: 'Rob',
    pwd: 'teste'
}];

module.exports = user = {

    // READ
    get: () => new Promise((resolve, reject) => {
        resolve([useMock]);
    }),
    login: (user, pwd) => new Promise((resolve, reject) => {
        let logged = userMock.find(u => u.user == user && u.pwd == pwd);
        if (!logged) reject();
        resolve(logged);
    }),

    // CREATE
    post: () => {},

    // UPDATE
    put: () => {},

    // DELETE
    delete: () => {}
}