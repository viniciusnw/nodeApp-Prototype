const models = require('../models');

const unidadesMock = [{
    uuid: 1,
    empresa_uuid: 1,
    nome: 'Unidade A1',
    sigla: 'UA1',
    endereco: 'Rua ',
    telefone: '+55 31 3000-2000',
    erp: '',
    api_client: ''
}];

module.exports = unidades = {

    // READ GETS
    get: () => new Promise((resolve, reject) => {
        resolve(unidadesMock); // correct :D
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