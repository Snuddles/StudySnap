import React, { useState } from 'react';
import { Deck, Flashcard } from '../App';
import { Link, useNavigate } from 'react-router-dom';

interface DashboardProps {
  user: { email: string; username: string };
  decks: Deck[];
  addDeck: (deckName: string) => void;
  deleteDeck: (deckId: number) => void;
  editDeck: (deckId: number, newName: string) => void;
  addCardToDeck: (deckId: number, newCard: Flashcard) => void;
  deleteCard: (deckId: number, cardIndex: number) => void;
  editCard: (deckId: number, cardIndex: number, updatedCard: Flashcard) => void;
}

const Dashboard: React.FC<DashboardProps> = ({
  user,
  decks,
  addDeck,
  deleteDeck,
  editDeck,
  addCardToDeck,
  deleteCard,
  editCard,
}) => {
  const navigate = useNavigate();
  const [newDeckName, setNewDeckName] = useState('');
  const [editingDeckId, setEditingDeckId] = useState<number | null>(null);
  const [editingDeckName, setEditingDeckName] = useState('');
  const [editingCard, setEditingCard] = useState<{ deckId: number; cardIndex: number } | null>(
    null
  );
  const [updatedCard, setUpdatedCard] = useState<Flashcard>({ question: '', answer: '' });

  const handleEditDeck = () => {
    if (editingDeckId !== null && editingDeckName) {
      editDeck(editingDeckId, editingDeckName);
      setEditingDeckId(null);
      setEditingDeckName('');
    }
  };

  const handleEditCard = () => {
    if (editingCard && updatedCard.question && updatedCard.answer) {
      editCard(editingCard.deckId, editingCard.cardIndex, updatedCard);
      setEditingCard(null);
      setUpdatedCard({ question: '', answer: '' });
    }
  };

  return (
    <div className="dashboard">
      <div className="header">
        <h2>Welcome, {user.username}!</h2>
        <button onClick={() => navigate('/')}>Back to Home</button>
      </div>

      <div className="content">
        <h3>Your Decks:</h3>
        <div className="deck-container">
          {decks.map((deck) => (
            <div key={deck.id} className="deck-item">
              {editingDeckId === deck.id ? (
                <>
                  <input
                    type="text"
                    value={editingDeckName}
                    onChange={(e) => setEditingDeckName(e.target.value)}
                  />
                  <button onClick={handleEditDeck}>Save</button>
                  <button onClick={() => setEditingDeckId(null)}>Cancel</button>
                </>
              ) : (
                <>
                  <h4>{deck.name}</h4>
                  <button onClick={() => setEditingDeckId(deck.id)}>Edit</button>
                  <button onClick={() => deleteDeck(deck.id)}>Delete</button>
                </>
              )}
              <ul>
                {deck.cards.map((card, index) => (
                  <li key={index}>
                    {editingCard &&
                    editingCard.deckId === deck.id &&
                    editingCard.cardIndex === index ? (
                      <>
                        <input
                          type="text"
                          value={updatedCard.question}
                          onChange={(e) =>
                            setUpdatedCard((prev) => ({ ...prev, question: e.target.value }))
                          }
                        />
                        <input
                          type="text"
                          value={updatedCard.answer}
                          onChange={(e) =>
                            setUpdatedCard((prev) => ({ ...prev, answer: e.target.value }))
                          }
                        />
                        <button onClick={handleEditCard}>Save</button>
                        <button onClick={() => setEditingCard(null)}>Cancel</button>
                      </>
                    ) : (
                      <>
                        <p>
                          <strong>Q:</strong> {card.question}
                        </p>
                        <p>
                          <strong>A:</strong> {card.answer}
                        </p>
                        <button
                          onClick={() => {
                            setEditingCard({ deckId: deck.id, cardIndex: index });
                            setUpdatedCard(card);
                          }}
                        >
                          Edit
                        </button>
                        <button onClick={() => deleteCard(deck.id, index)}>Delete</button>
                      </>
                    )}
                  </li>
                ))}
              </ul>
              <Link to={`/deck/${deck.id}`}>Manage Deck</Link>
            </div>
          ))}
        </div>
      </div>

      <div className="footer">
        <h3>Create a New Deck</h3>
        <input
          type="text"
          value={newDeckName}
          onChange={(e) => setNewDeckName(e.target.value)}
        />
        <button onClick={() => newDeckName && addDeck(newDeckName)}>Add Deck</button>
      </div>
    </div>
  );
};

export default Dashboard;
