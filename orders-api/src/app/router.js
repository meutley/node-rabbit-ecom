const store = require('./store');

const _configure = (app) => {
    // Orders
    app.get('/orders', (req, res) => {
        res.statusCode = 200;
        res.json(store.getOrders());
    });
}

module.exports = {
    configure: _configure
};
