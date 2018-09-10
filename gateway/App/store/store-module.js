const actions = require('./actions/actions');
const dispatchers = require('./dispatchers/dispatchers');
const reducers = require('./reducers/reducers');
const store = require('./store/store');

module.exports = StoreModule = { 
    actions,
    dispatchers,
    reducers,
    store
};