const Joi = require('joi');

module.exports = login = {
    // SIGN IN
    SIGN_IN: 'SIGN_IN',
    SIGN_IN_schema: schemaToValidate => {
        let schema = Joi.object().keys({
            user: Joi.required(),
            pwd: Joi.required()
        });
        return Joi.validate(schemaToValidate, schema);
    },

    // SIGN OUT
    SIGN_OUT: 'SIGN_OUT',
    SIGN_OUT_schema: (schemaToValidate) => schemaToValidate,

    // AUTHORIZE
    AUTHORIZE: 'AUTHORIZE',
    AUTHORIZE_schema: schemaToValidate => {
        let schema = Joi.object().keys({
            client_id: Joi.required(),
            response_type: Joi.required()
        });
        return Joi.validate(schemaToValidate, schema);
    },

    // AUTHORIZE_TOKEN
    AUTHORIZE_TOKEN: 'AUTHORIZE_TOKEN',
    AUTHORIZE_TOKEN_schema: schemaToValidate => {
        let schema = Joi.object().keys({
            authorization_code: Joi.required(),
            client_id: Joi.required(),
            client_secret: Joi.required()
        });
        return Joi.validate(schemaToValidate, schema);
    }
}