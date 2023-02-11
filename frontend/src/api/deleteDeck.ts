import { API_URL } from './config';

const deleteDecks = async (deckId: number) => {
  await fetch(`${API_URL}/decks/${deckId}`, {
    method: 'DELETE',
  });
};
export default deleteDecks;
