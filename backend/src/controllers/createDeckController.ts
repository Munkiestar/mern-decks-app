import Deck from '../models/Deck';
import { Response, Request } from 'express';

export const createDeckController = async (req: Request, res: Response) => {
  const { title } = req.body;
  const newDeck = new Deck({
    title,
  });
  const createdDeck = await newDeck.save();
  res.json(createdDeck);
};
