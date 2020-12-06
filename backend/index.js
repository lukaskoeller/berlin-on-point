const cors = require('cors');
const multer  = require('multer');
const upload = multer({ dest: 'uploads/' });
const services = require('./services');

const express = require('express');
const app = express();
const port = 3000;

app.use(cors());
app.use(express.urlencoded({ extended: true }))
app.use(express.json());

app.get('/services', (req, res) => {
    console.log('Send all services');
    res.json(services);
});

app.post('/subscribe', upload.none(), (req, res) => {
    console.log("req.body", req.body);
});

app.listen(port, () => {
    console.log(`berlin on point listening at http://localhost:${port}`);
});

// module.exports = app;