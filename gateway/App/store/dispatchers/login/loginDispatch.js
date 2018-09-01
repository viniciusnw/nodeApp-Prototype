const LoginReducersClass = require('./../../reducers/reducers').login;
const loginActions = require('./../../actions/login/loginActions');

// const Store = require('./../../store/store');
// reducers
module.exports = login = function (dispatchObj, callbackFunction = () => null) {
    console.log('DISPATCH: login | ACTION: ' + dispatchObj.type);

    let loginReducers = new LoginReducersClass()

    switch (dispatchObj.type) {
        case loginActions.SIGN_IN:
            loginReducers.gerar_token(dispatchObj.payload)
            break;
        case loginActions.SIGN_OUT:
            loginReducers.deslogar();
            break;
    }
    return callbackFunction();
}