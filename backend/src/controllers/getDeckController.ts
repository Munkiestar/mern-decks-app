import Deck from '../models/Deck';
import { Response, Request } from 'express';
export const getDeckController = async (req: Request, res: Response) => {
  const allDecks = await Deck.find();
  res.json(allDecks);
};
