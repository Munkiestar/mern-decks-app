import express, { Response, Request } from 'express';
import mongoose from 'mongoose';
mongoose.set('strictQuery', false);

import Deck from './models/Deck';

const PORT = 5000;

const app = express();

app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  res.send('home');
});

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
  mongoose.connect('mongodb+srv://flashcard:rkNorLQ3hBvgZ3nb@cluster0.rpedaca.mongodb.net/?retryWrites=true&w=majority', { useNewUrlParser: true }).then((r) => {
    // console.log('R: ', r);
    console.log(`Listening on port ${PORT}`);
  });
  app.listen(PORT);
} catch (err) {
  console.log('Err: ', err);
}
