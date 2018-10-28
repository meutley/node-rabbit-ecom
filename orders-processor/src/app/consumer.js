const amqp = require('amqplib');

const Connection = {
    channel: null
};

const Queues = {
    PlaceOrder: 'place-order',
    CompleteOrder: 'complete-order'
};

const _initialize = async () => {
    const conn = await amqp.connect('amqp://messaging');
    const chan = await conn.createChannel();
    chan.assertQueue(Queues.PlaceOrder, { durable: false });

    Connection.channel = chan;

    _consumeMessages();
}

const _consumeMessages = () => {
    Connection.channel.consume(Queues.PlaceOrder, (message) => {
        const payload = JSON.parse(message.content.toString());
        console.log(`Placing order for cart: ${payload}`);
        setTimeout(() => {
            Connection.channel.sendToQueue(Queues.CompleteOrder, new Buffer(JSON.stringify(payload)));
            console.log('Sent Complete Order message');
        }, 3000);
    }, { noAck: true });
}

module.exports = {
    initialize: _initialize
};
