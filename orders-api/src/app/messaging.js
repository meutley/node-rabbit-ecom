const amqp = require('amqplib');
const consumer = require('./consumer');

const _initialize = async () => {
    const conn = await amqp.connect('amqp://messaging');
    consumer.initialize(conn);
}

module.exports = {
    initialize: _initialize
};
