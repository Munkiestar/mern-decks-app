import './app.css';
import React, { useState } from 'react';

function App() {
  const [titleValue, setTitleValue] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitleValue(e.target.value);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetch('http://localhost:5000/decks', {
      method: 'POST',
      body: JSON.stringify({
        title: titleValue,
      }),
    });
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
