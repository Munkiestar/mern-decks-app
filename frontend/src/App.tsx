import './app.css';
import React, { useEffect, useState } from 'react';

type TDeck = {
  title: string;
  _id: number;
};

function App() {
  const [titleValue, setTitleValue] = useState('');
  const [decks, setDecks] = useState<TDeck[]>([]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitleValue(e.target.value);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (titleValue.length === 0) return;

    const res = await fetch('http://localhost:5000/decks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: titleValue,
      }),
    });
    const newDeck = await res.json();
    setDecks([...decks, newDeck]);
    setTitleValue('');
  };

  const handleDeleteDeck = async (deckId: number) => {
    console.log('deckId: ', deckId);
    await fetch(`http://localhost:5000/decks/${deckId}`, {
      method: 'DELETE',
    });

    setDecks(decks.filter((deck) => deck._id !== deckId));
  };

  const fetchDecks = async () => {
    try {
      const res = await fetch('http://localhost:5000/decks');
      const data = await res.json();
      setDecks(data);
    } catch (err) {
      console.log('Err: ', err);
    }
  };

  useEffect(() => {
    fetchDecks();
  }, []);

  console.log('decks', decks);

  return (
    <div className='app'>
      <h1>hello</h1>

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
              {deck.title}
              <button onClick={() => handleDeleteDeck(deck._id)}>X</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
