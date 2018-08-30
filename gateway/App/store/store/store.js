const Rx = require('rxjs');
// const actions = require('./../actions/actions');

module.exports = Store = {
    SING_IN: new Rx.Subject(),

    // seta um novo state a cada nova entrada
    getState() {
        setTimeout(() => {
            Store.SING_IN.next('Default Login');
        });
    },
}