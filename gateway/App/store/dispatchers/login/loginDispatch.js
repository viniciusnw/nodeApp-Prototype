const LoginReducersClass = require('./../../reducers/reducers').login;
const loginActions = require('./../../actions/login/loginActions');
const responsePayload = require('../responsePayload');

// Store
// const Store = require('./../../store/store');

module.exports = login = function (dispatchObj, callbackFunction = () => null) {
    console.log('DISPATCH: login | ACTION: ' + dispatchObj.type);

    // login reducers Instance
    let loginReducers = new LoginReducersClass();

    return new Promise(function (resolve, reject) {
        switch (dispatchObj.type) {
            case loginActions.SIGN_IN:
                // payload validation async | use Joi
                loginActions.SIGN_IN_schema(dispatchObj.payload).then(
                    // Payload validation success.
                    (schemaPayload) => loginReducers.exec('gerar_token', schemaPayload).then( // run micro service
                        ServiceDataReturn => resolve(responsePayload.successResponse(ServiceDataReturn)), // micro service run success.
                        ServiceDataReturnErr => reject(responsePayload.errorResponse(ServiceDataReturnErr, 406)) // micro service run erro.
                    ),
                    // Payload validation error.
                    (schemaPayloadErr) => {
                        reject(responsePayload.errorResponse(schemaPayloadErr, 400));
                    }
                );
                break;
            case loginActions.SIGN_OUT:
                loginReducers.exec('deslogar').then(
                    ServiceDataReturn => resolve(responsePayload.successResponse(ServiceDataReturn)),
                    ServiceDataReturnErr => reject(responsePayload.errorResponse(ServiceDataReturnErr, 406))
                );
                break;
            case loginActions.AUTHORIZE:
                loginActions.AUTHORIZE_schema(dispatchObj.payload).then(
                    (schemaPayload) => loginReducers.exec('authentication', schemaPayload).then(
                        ServiceDataReturn => resolve(responsePayload.successResponse(ServiceDataReturn)),
                        ServiceDataReturnErr => reject(responsePayload.errorResponse(ServiceDataReturnErr, 406))
                    ),
                    (schemaPayloadErr) => {
                        reject(responsePayload.errorResponse(schemaPayloadErr, 400));
                    }
                );
                break;
            case loginActions.AUTHORIZE_TOKEN:
                loginActions.AUTHORIZE_TOKEN_schema(dispatchObj.payload).then(
                    (schemaPayload) => loginReducers.exec('authorizationToken', schemaPayload).then(
                        ServiceDataReturn => resolve(responsePayload.successResponse(ServiceDataReturn)),
                        ServiceDataReturnErr => reject(responsePayload.errorResponse(ServiceDataReturnErr, 406))
                    ),
                    (schemaPayloadErr) => {
                        reject(responsePayload.errorResponse(schemaPayloadErr, 400));
                    }
                );
                break;
        }
    });
}