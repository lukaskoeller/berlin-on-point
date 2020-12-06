import services from '../services';

const express = require('express');
const app = express();
const port = 3000;

app.get('/services', (req, res) => {
    console.log("Send all services", req);
    res.json(services);
});

app.listen(port, () => {
    console.log(`berlin on point listening at http://localhost:${port}`);
});

// module.exports = app;