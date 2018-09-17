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
}