import './app.css';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import getDecks from './api/getDecks';
import deleteDecks from './api/deleteDeck';
import createDeck from './api/createDeck';
import { TDeck } from './api/getDecks';

function App() {
  const [titleValue, setTitleValue] = useState('');
  const [decks, setDecks] = useState<TDeck[]>([]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitleValue(e.target.value);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (titleValue.length === 0) return;

    const res = await createDeck(titleValue);
    setDecks([...decks, res]);
    setTitleValue('');
  };

  const handleDeleteDeck = async (deckId: number) => {
    await deleteDecks(deckId);

    setDecks(decks.filter((deck) => deck._id !== deckId));
  };

  const fetchDecks = async () => {
    try {
      const data = await getDecks();
      setDecks(data);
    } catch (err) {
      console.log('Err: ', err);
    }
  };

  useEffect(() => {
    fetchDecks();
  }, []);

  return (
    <div className='app'>
      <form action='' onSubmit={handleFormSubmit}>
        <label htmlFor='deck-title'>Deck title </label>
        <input type='text' name='deck-title' value={titleValue} onChange={handleInputChange} />

        <br />
        <br />
        <button type='submit'>Create Deck</button>
      </form>
      <br />
      <br />
      <div className='decks'>
        <ul>
          {decks.map((deck) => (
            <li key={deck._id}>
              <Link to={`/decks/${deck._id}`}>{deck.title}</Link>
              <button onClick={() => handleDeleteDeck(deck._id)}>X</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
