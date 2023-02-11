import { API_URL } from './config';

const createDeck = async (title: string) => {
  const res = await fetch(`${API_URL}/decks`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      title,
    }),
  });
  return res.json();
};

export default createDeck;
