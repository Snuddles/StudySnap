import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Deck, Flashcard } from '../App';

interface DeckPageProps {
  decks: Deck[];
  addCardToDeck: (deckId: number, newCard: Flashcard) => void;
}

const DeckPage: React.FC<DeckPageProps> = ({ decks, addCardToDeck }) => {
  const { deckId } = useParams<{ deckId: string }>();
  const navigate = useNavigate();
  const deck = decks.find((d) => d.id === Number(deckId));

  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');

  if (!deck) {
    return <div>Deck not found</div>;
  }

  const handleAddCard = (e: React.FormEvent) => {
    e.preventDefault();
    if (question && answer) {
      const newCard: Flashcard = { question, answer };
      addCardToDeck(deck.id, newCard);
      setQuestion('');
      setAnswer('');
    }
  };

  return (
    <div>
      <button onClick={() => navigate('/dashboard')}>Back to Dashboard</button>
      <h2>{deck.name}</h2>
      <h3>Cards:</h3>
      {deck.cards.length > 0 ? (
        <ul>
          {deck.cards.map((card, index) => (
            <li key={index}>
              <p><strong>Q:</strong> {card.question}</p>
              <p><strong>A:</strong> {card.answer}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No cards in this deck yet.</p>
      )}
      <h3>Add a New Card:</h3>
      <form onSubmit={handleAddCard}>
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

export default DeckPage;
