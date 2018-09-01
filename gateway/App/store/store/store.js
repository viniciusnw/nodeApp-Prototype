const Rx = require('rxjs');
// const actions = require('./../actions/actions');

module.exports = Store = {
    SIGN_IN: new Rx.Subject(),
    SIGN_OUT: new Rx.Subject(),

    SIGN_IN__CHANGE_STATE: function(newState){
        Store.SIGN_IN.next(newState);
    },
    
    SIGN_OUT__CHANGE_STATE: function(newState){
        Store.SIGN_OUT.next(newState);
    }
};