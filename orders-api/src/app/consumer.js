const amqp = require('amqplib');
const store = require('./store');

const Connection = {
    channel: null
};

const Queues = {
    CompleteOrder: 'complete-order'
};

const _initialize = async (conn) => {
    const chan = await conn.createChannel();
    chan.assertQueue(Queues.CompleteOrder, { durable: false });

    Connection.channel = chan;

    _consumeMessages();
}

const _consumeMessages = () => {
    Connection.channel.consume(Queues.CompleteOrder, (message) => {
        const payload = message.content.toString();
        store.completeOrder(JSON.parse(payload));
        console.log('Completed an order');
    }, { noAck: true });
}

module.exports = {
    initialize: _initialize
};
