import { config } from 'dotenv';
config();
// @ts-ignore
import express, { Response, Request } from 'express';
import mongoose from 'mongoose';

import { getDeckController } from './controllers/getDeckController';
import { createDeckController } from './controllers/createDeckController';
import { deleteDeckController } from './controllers/deleteDeckController';
const cors = require('cors');

mongoose.set('strictQuery', false);

const PORT = 5000;

const app = express();

app.use(cors({ origin: true }));
app.use(express.json());

// fetch all decks from mongo
app.get('/decks', getDeckController);

// create new deck,save to mongo
app.post('/decks', createDeckController);

// delete single deck
app.delete('/decks/:deckId', deleteDeckController);

try {
  // @ts-ignore
  mongoose.connect(process.env.MONGO_URL!, { useNewUrlParser: true }).then((r) => {
    // console.log('R: ', r);
    console.log(`Listening on port ${PORT}`);
  });
  app.listen(PORT);
} catch (err) {
  console.log('Err: ', err);
}
