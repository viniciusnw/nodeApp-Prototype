// ACTION & REDUCER
const loginActions = require('./../../actions/actions').login; // for check type
const LoginReducersClass = require('./../../reducers/reducers').login; // for execute micro-service
// response payload
const responsePayload = require('../responsePayload');

module.exports = login = function (dispatchObj) {
    console.log('DISPATCH: login | ACTION: ' + dispatchObj.type);

    // LOAD REDUCER - login reducers Instance
    let loginReducers = new LoginReducersClass();

    return new Promise(function (resolve, reject) {
        switch (dispatchObj.type) {
            case loginActions.SIGN_IN:
                // payload validation async | use Joi
                loginActions.SIGN_IN_schema(dispatchObj.payload).then(
                    // Payload validation success.
                    (schemaPayload) => loginReducers.exec('authorizationBasic', schemaPayload).then( // run micro service
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
                loginReducers.exec('logout').then(
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
                    (schemaPayload) => loginReducers.exec('authorizationBearer', schemaPayload).then(
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