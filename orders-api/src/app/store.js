const uuid = require('uuid/v1');
const _ = require('lodash');

// Orders
const _orders = [];

const _completeOrder = (payload) => {
    const order = {
        id: uuid(),
        items: payload.items
    };

    _orders.push(order);
}

const _getOrders = () => {
    return _orders;
}

module.exports = {
    // Orders
    completeOrder: _completeOrder,
    getOrders: _getOrders
};
