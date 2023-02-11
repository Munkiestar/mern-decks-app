import Deck from '../models/Deck';
import { Response, Request } from 'express';

export const deleteDeckController = async (req: Request, res: Response) => {
  // get deck id from url
  const { deckId } = req.params;
  console.log('deckId', deckId);
  // delete that deck from mongo
  const deletedDeck = await Deck.findByIdAndDelete(deckId);
  console.log('deletedDeck', deletedDeck);

  res.json(deletedDeck);
};
