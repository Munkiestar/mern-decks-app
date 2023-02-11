import { API_URL } from './config';

export type TDeck = {
  title: string;
  _id: number;
};

const getDecks = async (): Promise<TDeck[]> => {
  const res = await fetch(`${API_URL}/decks`);
  return await res.json();
};
export default getDecks;
