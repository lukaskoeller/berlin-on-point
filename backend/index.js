const cors = require('cors');
const services = require('./services');

const express = require('express');
const app = express();
const port = 3000;

app.use(cors());

app.get('/services', (req, res) => {
    console.log('Send all services');
    res.json(services);
});

app.listen(port, () => {
    console.log(`berlin on point listening at http://localhost:${port}`);
});

// module.exports = app;