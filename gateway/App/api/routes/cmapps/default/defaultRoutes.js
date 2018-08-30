const routes = require('express').Router();
const storeModule = require('./../../../../store/store-module');

module.exports = defaultRoutes = {
    store: storeModule.store,
    actions: storeModule.actions.login,

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