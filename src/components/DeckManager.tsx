import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Study from './Study';
import ManageCards from './ManageCards';

interface Flashcard {
  question: string;
  answer: string;
}

interface Deck {
  id: number;
  name: string;
  cards: Flashcard[];
}

const DeckManager: React.FC = () => {
  // Initialize some dummy data for decks (this can later be replaced with API data)
  const [decks, setDecks] = useState<Deck[]>([
    {
      id: 1,
      name: 'Deck 1',
      cards: [
        { question: 'What is React?', answer: 'A JavaScript library for building user interfaces' },
        { question: 'What is JSX?', answer: 'A syntax extension for JavaScript' },
      ],
    },
    {
      id: 2,
      name: 'Deck 2',
      cards: [
        { question: 'What is TypeScript?', answer: 'A superset of JavaScript that adds static types' },
        { question: 'What is Node.js?', answer: 'A JavaScript runtime built on Chrome\'s V8 engine' },
      ],
    },
  ]);

  // Update the decks state when a card is added or removed
  const updateDeck = (updatedDecks: Deck[]) => {
    setDecks(updatedDecks);
  };

  return (
    <Router>
      <div className="deck-manager">
        <h1>Flashcard App</h1>
        <nav>
          <Link to="/study">Study</Link>
          <Link to="/manage-cards">Manage Cards</Link>
        </nav>

        <Routes>
          <Route path="/study" element={<Study decks={decks} />} />
          <Route
            path="/manage-cards"
            element={<ManageCards decks={decks} updateDeck={updateDeck} />}
          />
        </Routes>
      </div>
    </Router>
  );
};

export default DeckManager;
