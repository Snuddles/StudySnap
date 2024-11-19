import React, { useState } from 'react';

// Define the structure for the deck
interface Deck {
  title: string;
  description: string;
}

const CreateDeck: React.FC = () => {
  // Initialize state to manage deck details
  const [deck, setDeck] = useState<Deck>({ title: '', description: '' });

  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDeck((prevDeck) => ({
      ...prevDeck,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Submit logic here, e.g., send deck to backend
    console.log('New Deck Created:', deck);
  };

  return (
    <div>
      <h2>Create New Deck</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Deck Title:</label>
          <input
            type="text"
            name="title"
            value={deck.title}
            onChange={handleInputChange}
            placeholder="Enter deck title"
          />
        </div>
        <div>
          <label>Deck Description:</label>
          <input
            type="text"
            name="description"
            value={deck.description}
            onChange={handleInputChange}
            placeholder="Enter deck description"
          />
        </div>
        <button type="submit">Create Deck</button>
      </form>
    </div>
  );
};

export default CreateDeck;
