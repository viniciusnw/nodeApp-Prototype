const Joi = require('joi');

module.exports = login = {
    SIGN_IN: 'SIGN_IN',
    SIGN_IN_schema: (schemaToValidate) => {
        let schema = Joi.object().keys({
            user: Joi.string().alphanum().min(3).max(30).required(),
            pwd: Joi.string().required()
        });
        return Joi.validate(schemaToValidate, schema);
    },

    SIGN_OUT: 'SIGN_OUT',
}