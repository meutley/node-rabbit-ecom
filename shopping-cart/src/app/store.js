const uuid = require('uuid/v1');
const _ = require('lodash');

// Carts
const _carts = [];

const _createCart = () => {
    return {
        id: uuid(),
        items: []
    };
}

const _addToCart = (cartId, productId) => {
    var cart = _.find(_carts, { 'id': cartId });
    if (cart === undefined) {
        cart = _createCart();
        _carts.push(cart);
    }
    
    const product = _.find(_products, { 'id': productId });
    if (product === undefined) {
        throw `Product Id ${productId} not found`;
    }
    
    cart.items.push(product);
    return cart.id;
}

const _getCart = (cartId) => {
    var cart = _.find(_carts, { 'id': cartId });
    return cart;
}

// Products
const _products = [
    {
        id: uuid(),
        name: 'Low End Motherboard',
        price: 100
    },
    {
        id: uuid(),
        name: 'Mid Grade Motherboard',
        price: 175
    },
    {
        id: uuid(),
        name: 'High End Motherboard',
        price: 350
    }
];

const _getProducts = () => {
    return _products;
}

module.exports = {
    // Carts
    addToCart: _addToCart,
    getCart: _getCart,
    // Products
    getProducts: _getProducts
};
