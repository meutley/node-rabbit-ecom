const messaging = require('./messaging');
const store = require('./store');

const _configure = (app) => {
    // Carts
    app.post('/add-to-cart', (req, res) => {
        const data = req.body;
        const cartId = data['cartId'];
        const productId = data['productId'] || '(None)';

        try {
            const returnCartId = store.addToCart(cartId || '', productId);
            res.statusCode = 200;
            res.json({ cartId: returnCartId });
        } catch (err) {
            res.statusCode = 400;
            res.json({ error: err });
        }
    });

    // Orders
    app.post('/place-order', (req, res) => {
        const data = req.body;
        const cartId = data['cartId'];
        const cart = store.getCart(cartId);
        if (cart === undefined) {
            res.statusCode = 400;
            res.json({ error: 'Cart Id not valid' });
            return;
        }

        messaging.placeOrder(cart);

        res.statusCode = 204;
        res.end();
    });
    
    // Products
    app.get('/products', (req, res) => {
        res.statusCode = 200;
        res.json(store.getProducts());
    });
}

module.exports = {
    configure: _configure
};
