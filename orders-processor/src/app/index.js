const http = require('http');

const consumer = require('./consumer');

module.exports = {
    start: () => {
        consumer.initialize();
    }
};
