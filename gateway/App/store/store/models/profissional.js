const models = require('../models');

const profissionalMock = [{
    uuid: 1,
    usuario_uuid: 1,
    unidade_uuid: 1,
    tipo_profissional_uuid: 1,
    codigo_conselho: 1,
    nome: 'Rob Doe',
    data_nascimento: '07/03/1994',
    sexo: 'M',
    cpf: '000.000.000-01',
    rg: '00.000.000',
    orgao_emissor: 'MG',
    pais: 'BR',
    estado: 'MG',
    cidade: 'BH',
    endereco: 'Rua dos Timbiras 2500 apt 1721',
    numero_conselho: 1,
    corpo_clinico: 1,
    ws_profissional_id: 1
}];

module.exports = profissional = {

    // READ GETS
    get: () => new Promise((resolve, reject) => {
        resolve(profissionalMock); // correct :D
    }),
    getPer_usuario_uuid: (uuid) => new Promise((resolve, reject) => {
        let prfl = profissionalMock.find(p => p.usuario_uuid == uuid);
        if (!prfl) reject(); // wrong user or pass
        resolve(prfl); // correct :D
    }),

    // CREATE USER
    post: payloadObj => new Promise((resolve, reject) => {
        resolve(payloadObj);
    }),

    // UPDATE
    put: () => {},

    // DELETE
    delete: () => {}
};