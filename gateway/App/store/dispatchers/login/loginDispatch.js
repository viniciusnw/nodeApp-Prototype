const Joi = require('joi');

//  
const LoginReducersClass = require('./../../reducers/reducers').login;
const loginActions = require('./../../actions/login/loginActions');

// Store
const Store = require('./../../store/store');

module.exports = login = function (dispatchObj, callbackFunction = () => null) {
    console.log('DISPATCH: login | ACTION: ' + dispatchObj.type);

    // login reducers Instance
    let loginReducers = new LoginReducersClass();
    let responsePayload = {
        hasError: false,
        hasValue: false,
        messages: null,
        value: null
    };

    switch (dispatchObj.type) {
        case loginActions.SIGN_IN:

            // payload description
            let SIGN_IN_schema = Joi.object().keys({
                user: Joi.string().alphanum().min(3).max(30).required(),
                pwd: Joi.string().required()
            });

            // payload validation use Joi
            Joi.validate(dispatchObj.payload, SIGN_IN_schema, function (err, payload) {
                if (err) {
                    responsePayload.hasError = true;
                    responsePayload.messages = err.message;
                } else {
                    responsePayload.hasValue = true;
                    responsePayload.value = loginReducers.gerar_token(payload);
                }
            });
            break;
        case loginActions.SIGN_OUT:
            responsePayload.hasValue = true;
            responsePayload.value = loginReducers.deslogar();;
            break;
    }
    return callbackFunction(dataTeste);
}