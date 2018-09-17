const responsePayload = require('./responsePayload');
const login = require('./login/loginDispatch');
const defaultD = require('./default/defaultDispatch');

module.exports = {
    responsePayload,
    login,
    defaultD
}