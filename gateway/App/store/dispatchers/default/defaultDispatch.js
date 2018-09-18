// ACTION & REDUCER
const defaultActions = require('./../../actions/actions').defaultA; // for check type
const defaultReducersClass = require('./../../reducers/reducers').defaultR; // for execute micro-service
// response payload
const responsePayload = require('../responsePayload');

module.exports = defaultD = function (dispatchObj) {
    console.log('DISPATCH: default | ACTION: ' + dispatchObj.type);

    // LOAD REDUCER - login reducers Instance
    let defaultReducer = new defaultReducersClass();

    return new Promise(function (resolve, reject) {
        switch (dispatchObj.type) {
            case defaultActions.REGISTER:
                defaultActions.REGISTER_schema(dispatchObj.payload).then(
                    // Payload validation success.
                    (schemaPayload) => defaultReducer.exec('register', schemaPayload).then( // run micro service
                        ServiceDataReturn => resolve(responsePayload.successResponse(ServiceDataReturn)), // micro service run success.
                        ServiceDataReturnErr => reject(responsePayload.errorResponse(ServiceDataReturnErr, 406)) // micro service run erro.
                    ),
                    // Payload validation error.
                    (schemaPayloadErr) => {
                        reject(responsePayload.errorResponse(schemaPayloadErr, 400));
                    }
                );
                break;
            case defaultActions.RECOVER_PASS:
                defaultActions.RECOVER_PASS_schema(dispatchObj.payload).then(
                    (schemaPayload) => defaultReducer.exec('recoverPass', schemaPayload).then(
                        ServiceDataReturn => resolve(responsePayload.successResponse(ServiceDataReturn)),
                        ServiceDataReturnErr => reject(responsePayload.errorResponse(ServiceDataReturnErr, 406))
                    ),
                    (schemaPayloadErr) => {
                        reject(responsePayload.errorResponse(schemaPayloadErr, 400));
                    }
                );
                break;
            case defaultActions.GET_PROFESSIONAL_PER_usuario_uuid:
                defaultActions.GET_PROFESSIONAL_PER_usuario_uuid_schema(dispatchObj.payload).then(
                    (schemaPayload) => defaultReducer.exec('getProfessionalPerUsr_uuid', schemaPayload).then(
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