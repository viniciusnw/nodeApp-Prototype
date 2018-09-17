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
    client_id: 'd41d8cd98f00b204e9800998ecf8427e', // <- client_id reference {1}
    name: 'Rob Doe', // user name
    user: 'Rob', // user
    pwd: '698dc19d489c4e4db73e28a713eab07b' // <- teste
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
};