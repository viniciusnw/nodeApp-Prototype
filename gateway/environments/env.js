console.log('Run in -> ' + process.env.NODE_ENV + ' mode <-');

// set ENV names
const NODE_ENV = {
    development: './env.dev.variables',
    production: './env.hml.variables',
    homologation: './env.prod.variables'
};

// == ENV DEFAULT VARIABLES == //
const {
    ROUTES
} = require('./env.default.variables');

// == ENV VARIABLES == //
const {
    DATABASE
} = require(NODE_ENV[process.env.NODE_ENV]);

module.exports = ENV = {
    ROUTES,
    DATABASE
};