const models = require('./../models');

const userMock = [{
    uuid: 1,
    nome: 'Rob Doe', // user name
    cpf: '000.000.000-01',
    data_nascimento: '07/03/1994',
    email: 'rob.doe@email.com',
    celular: '+55 31 98406-5335',
    verificado: true,
    ativo: true,
    ultimo_acesso: 'last day',
    // user&&pwd
    user: 'Rob', // user
    pwd: '698dc19d489c4e4db73e28a713eab07b' // <-- teste
}, {
    uuid: 2,
    nome: 'Rob Doe', // user name
    cpf: '000.000.000-01',
    data_nascimento: '07/03/1994',
    email: 'rob.doe@email.com',
    celular: '+55 31 98406-5335',
    verificado: true,
    ativo: true,
    ultimo_acesso: 'last day',
    // user&&pwd
    user: 'Rob1', // user
    pwd: '698dc19d489c4e4db73e28a713eab07b' // <-- teste
}];

module.exports = user = {

    // READ GETS
    get: () => new Promise((resolve, reject) => {
        resolve(useMock);
    }),
    login: payloadObj => new Promise((resolve, reject) => {
        let logged = userMock.find(u => u.user == payloadObj.user && u.pwd == payloadObj.pwd);
        if (!logged) reject(); // wrong user or pass :/
        resolve(logged); // correct :D
    }),
    recoverPass: payloadObj => new Promise((resolve, reject) => {
        resolve(payloadObj);
    }),

    // CREATE
    post: payloadObj => new Promise((resolve, reject) => {
        resolve(payloadObj);
    }),

    // UPDATE
    put: () => {},

    // DELETE
    delete: () => {}
};