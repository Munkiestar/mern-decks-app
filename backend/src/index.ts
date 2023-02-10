import { config } from 'dotenv';
config();
// @ts-ignore
import express, { Response, Request } from 'express';
import mongoose from 'mongoose';
import Deck from './models/Deck';
const cors = require('cors');

mongoose.set('strictQuery', false);

const PORT = 5000;

const app = express();

app.use(cors({ origin: true }));
app.use(express.json());

// fetch all decks from mongo
app.get('/decks', async (req: Request, res: Response) => {
  const allDecks = await Deck.find();
  console.log('allDecks', allDecks);
  res.json(allDecks);
});

// create new deck,save to mongo
app.post('/decks', async (req: Request, res: Response) => {
  console.log('body: ', req.body);
  const { title } = req.body;
  const newDeck = new Deck({
    title,
  });
  const createdDeck = await newDeck.save();
  res.json(createdDeck);
});

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
