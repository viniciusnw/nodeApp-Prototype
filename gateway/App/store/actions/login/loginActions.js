const Joi = require('joi');

module.exports = login = {
    // SIGN IN
    SIGN_IN: 'SIGN_IN',
    SIGN_IN_schema: schemaToValidate => {
        let schema = Joi.object().keys({
            user: Joi.string().alphanum().min(3).max(30).required(),
            pwd: Joi.string().required()
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
            client_id: Joi.string().alphanum().min(3).max(30).required(),
            response_type: Joi.string().required()
        });
        return Joi.validate(schemaToValidate, schema);
    }
}