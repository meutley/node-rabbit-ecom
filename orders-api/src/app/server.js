const express = require('express');
const bodyParser = require('body-parser');

const messaging = require('./messaging');
const router = require('./router');

const PORT = 4002;

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

router.configure(app);

const _start = () => {
    app.listen(PORT, () => {
        console.log(`Orders API service listening on port ${PORT}`);
        messaging.initialize();
    });
}

module.exports = {
    start: _start
};
