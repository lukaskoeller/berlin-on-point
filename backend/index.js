import cors from 'cors';
import multer from 'multer';
import services from './services/index.js';
import express from 'express';

const app = express();
const port = 3000;
const upload = multer({ dest: 'uploads/' });

app.use(cors());
app.use(express.urlencoded({ extended: true }))
app.use(express.json());

app.get('/services', (req, res) => {
    console.log('Send all services');
    res.json(services);
});

app.post('/getFreeSlots', (req, res) => {
    console.log("req.body:service", req.body);
    res.sendStatus(200);
});

app.post('/subscribe', upload.none(), (req, res) => {
    console.log("req.body:form", req.body);
    res.sendStatus(200);
});

app.listen(port, () => {
    console.log(`berlin on point listening at http://localhost:${port}`);
});

// module.exports = app;