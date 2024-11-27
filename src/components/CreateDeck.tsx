import React, { useState } from 'react';

interface Flashcard {
  question: string;
  answer: string;
}

interface Deck {
  id: number;
  name: string;
  description: string; // Added description
  cards: Flashcard[];
}

interface CreateDeckProps {
  addDeck: (deck: Deck) => void; // Expects a full deck object
}

const CreateDeck: React.FC<CreateDeckProps> = ({ addDeck }) => {
  const [deckName, setDeckName] = useState('');
  const [deckDescription, setDeckDescription] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === 'name') {
      setDeckName(value);
    } else if (name === 'description') {
      setDeckDescription(value);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newDeck: Deck = {
      id: Date.now(),
      name: deckName,
      description: deckDescription,
      cards: [],
    };

    addDeck(newDeck);

    setDeckName('');
    setDeckDescription('');
  };

  return (
    <div>
      <h2>Create New Deck</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Deck Name:</label>
          <input
            type="text"
            name="name"
            value={deckName}
            onChange={handleInputChange}
            placeholder="Enter deck name"
          />
        </div>
        <div>
          <label>Deck Description:</label>
          <input
            type="text"
            name="description"
            value={deckDescription}
            onChange={handleInputChange}
            placeholder="Enter deck description"
          />
        </div>
        <button type="submit">Create Deck</button>
      </form>
    </div>
  );
};

export default CreateDeck; // Ensure this is a default export
