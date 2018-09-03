const Rx = require('rxjs');

module.exports = Store = {
    // SIGN_IN: new Rx.Subject(),
    // SIGN_OUT: new Rx.Subject(),

    // {
    //     hasAlerta: false,
    //     hasError: false,
    //     hasInfo: false,
    //     hasValue: true,
    //     hasWarning: false,
    //     messages: [],
    //     ok: true,
    //     value: "f4f33f66-f73b-4d7b-82d4-79837073a656"
    // }
    OUTPUT: new Rx.Subject(),

    ERROR_OUTPUT__CHANGE_STATE: function (err) {
        Store.OUTPUT__CHANGE_STATE({
            hasError: true,
            hasValue: false,
            messages: err,
            value: null
        });
    },

    SUCCESS_OUTPUT__CHANGE_STATE: function (data) {
        Store.OUTPUT__CHANGE_STATE({
            hasError: false,
            hasValue: true,
            messages: null,
            value: data
        });
    },

    OUTPUT__CHANGE_STATE: function (objState) {
        setTimeout(() => {
            Store.OUTPUT.next(objState)
        }, 5000);
    },

    // SIGN_IN__CHANGE_STATE: function(newState){
    //     Store.SIGN_IN.next(newState);
    // },
    // SIGN_OUT__CHANGE_STATE: function(newState){
    //     Store.SIGN_OUT.next(newState);
    // }
};