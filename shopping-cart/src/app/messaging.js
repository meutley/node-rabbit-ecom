const amqp = require('amqplib');

const Connection = {
    channel: null
};

const Queues = {
    PlaceOrder: 'place-order'
};

const _initialize = async () => {
    const conn = await amqp.connect('amqp://messaging');
    const chan = await conn.createChannel();
    chan.assertQueue(Queues.PlaceOrder, { durable: false });
    
    Connection.channel = chan;
}

const _placeOrder = async (payload) => {
    Connection.channel.sendToQueue(Queues.PlaceOrder, new Buffer(JSON.stringify(payload)));
}

module.exports = {
    initialize: _initialize,
    placeOrder: _placeOrder
};
