import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Deck, Flashcard } from '../App';

interface AddCardFormProps {
  decks: Deck[];
  addCardToDeck: (deckId: number, newCard: Flashcard) => void;
}

const AddCardForm: React.FC<AddCardFormProps> = ({ decks, addCardToDeck }) => {
  const { deckId } = useParams<{ deckId: string }>(); // Get deckId from URL params
  const navigate = useNavigate();
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');

  const deck = decks.find(d => d.id === Number(deckId));

  if (!deck) {
    return <div>Deck not found</div>;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (question && answer) {
      const newCard: Flashcard = { question, answer };
      addCardToDeck(deck.id, newCard);
      navigate('/dashboard');
    }
  };

  return (
    <div>
      <h2>Add Card to {deck.name}</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Question:</label>
          <input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
          />
        </div>
        <div>
          <label>Answer:</label>
          <input
            type="text"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
          />
        </div>
        <button type="submit">Add Card</button>
      </form>
    </div>
  );
};

export default AddCardForm;
