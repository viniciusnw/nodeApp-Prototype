const Joi = require('joi');

module.exports = defaultA = {
    // REGISTER
    REGISTER: 'REGISTER',
    REGISTER_schema: schemaToValidate => {
        let schema = Joi.object().keys({
            nome: Joi.required(),
            sobrenome: Joi.required(),
            email: Joi.required(),
            cpf: Joi.required(),
            senha: Joi.required(),
            senhaConf: Joi.required()
        });
        return Joi.validate(schemaToValidate, schema);
    },

    // RECOVER PASS
    RECOVER_PASS: 'RECOVER_PASS',
    RECOVER_PASS_schema: schemaToValidate => {
        let schema = Joi.object().keys({
            userOrEmail: Joi.required(),
        });
        return Joi.validate(schemaToValidate, schema);
    },

    // testew
    // PROFESSIONAL-ACTIONS
    GET_PROFISSIONAL_PER_usuario_uuid: 'GET_PROFISSIONAL_PER_usuario_uuid',
    GET_PROFISSIONAL_PER_usuario_uuid_schema: schemaToValidate => {
        let schema = Joi.object().keys({
            usuario_uuid: Joi.required(),
        });
        return Joi.validate(schemaToValidate, schema);
    }, 
}