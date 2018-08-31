const routes = require('express').Router();
const storeModule = require('./../../../../store/store-module');

module.exports = defaultRoutes = {
    // injeção de dependencia
    store: storeModule.store, // store module
    actions: storeModule.actions.login, // actions

    // disparo
    dispatch: (dispatchObj) => {
        // console.log(dispatchObj);
        switch (dispatchObj.type) {
            case defaultRoutes.actions.SING_IN:
                defaultRoutes.store.getState();
                break;
            case defaultRoutes.actions.SING_OUT:
                break;
        }
    },

    export: () => {
        console.log('App: set Default Routes');
        routes.get('/login', function (req, res, next) {
            
            // subscribe
            let subscribe = defaultRoutes.store.SING_IN.subscribe((data) => {
                res.status(200).json({
                    msg: data
                });
                subscribe.unsubscribe();
            });

            // dispatch
            defaultRoutes.dispatch({
                type: defaultRoutes.actions.SING_IN,
                payload: {
                    name: 'Rob',
                    pwd: 'bla'
                }
            });
        });

        return routes;
    }
};