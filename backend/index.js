import cors from 'cors';
import multer from 'multer';
import services from './services/index.js';
import express from 'express';
import fs from 'fs';
import { getAllFreeSlots } from './scraper/index.js';

const scheduler = async () => {
  const allSlots = await getAllFreeSlots();
  const stream = fs.createWriteStream('berlin-free-slots.json')
  stream.write(JSON.stringify(allSlots));
  console.log(allSlots);
  // setTimeout(() => scheduler(), 20000);
};

scheduler();

const app = express();
const port = 3000;
const upload = multer({ dest: 'uploads/' });

app.use(cors());
app.use(express.urlencoded({ extended: true }))
app.use(express.json());

app.get('/services', (req, res) => {
  console.log('Send all services', services);
  res.json(services);
});

app.get('/getFreeSlots', (_req, res) => {
  fs.readFile('berlin-free-slots.json', 'utf8', (err, data) => {
    if (err) throw err;
    res.send(JSON.parse(data));
  });
});

app.post('/subscribe', upload.none(), (req, res) => {
  console.log("req.body:form", req.body);
  res.sendStatus(200);
});

app.listen(port, () => {
  console.log(`berlin on point listening at http://localhost:${port}`);
});

// module.exports = app;
