import './app.css';
import React, { useState } from 'react';

function App() {
  const [titleValue, setTitleValue] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitleValue(e.target.value);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch('http://localhost:5000/decks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: titleValue,
      }),
    });
    setTitleValue('');
  };

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
    </div>
  );
}

export default App;
