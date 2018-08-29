const defaultRoutes = require('express').Router();

class DefaultRoutes {
    constructor() {

    }

    export(){        
        return defaultRoutes.get('/login', function (req, res, next) {
            console.log('Hi');
        });
    }
}


module.exports = new DefaultRoutes();