import React, { useState } from 'react';

interface Flashcard {
  question: string;
  answer: string;
}

interface Deck {
  id: number;
  name: string;
  cards: Flashcard[];
}

interface ManageCardsProps {
  decks: Deck[];
  updateDeck: (updatedDecks: Deck[]) => void;
}

const ManageCards: React.FC<ManageCardsProps> = ({ decks, updateDeck }) => {
  const [selectedDeckId, setSelectedDeckId] = useState<number | null>(null);
  const [newCard, setNewCard] = useState<Flashcard>({ question: '', answer: '' });

  const handleDeckChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedDeckId(Number(event.target.value));
  };

  const handleAddCard = () => {
    if (selectedDeckId !== null) {
      const updatedDecks = decks.map((deck) => {
        if (deck.id === selectedDeckId) {
          deck.cards.push(newCard);
        }
        return deck;
      });
      updateDeck(updatedDecks);
      setNewCard({ question: '', answer: '' });
    }
  };

  const handleRemoveCard = (deckId: number, cardIndex: number) => {
    const updatedDecks = decks.map((deck) => {
      if (deck.id === deckId) {
        deck.cards.splice(cardIndex, 1);
      }
      return deck;
    });
    updateDeck(updatedDecks);
  };

  const selectedDeck = selectedDeckId ? decks.find((deck) => deck.id === selectedDeckId) : null;

  return (
    <div>
      <h2>Manage Cards</h2>
      <select onChange={handleDeckChange} value={selectedDeckId || ''}>
        <option value="">Select a Deck</option>
        {decks.map((deck) => (
          <option key={deck.id} value={deck.id}>
            {deck.name}
          </option>
        ))}
      </select>

      {selectedDeck && (
        <div>
          <h3>{selectedDeck.name}</h3>
          <ul>
            {selectedDeck.cards.map((card, index) => (
              <li key={index}>
                {card.question} - {card.answer}
                <button onClick={() => handleRemoveCard(selectedDeck.id, index)}>Remove</button>
              </li>
            ))}
          </ul>
          <div>
            <h4>Add New Card</h4>
            <input
              type="text"
              placeholder="Question"
              value={newCard.question}
              onChange={(e) => setNewCard({ ...newCard, question: e.target.value })}
            />
            <input
              type="text"
              placeholder="Answer"
              value={newCard.answer}
              onChange={(e) => setNewCard({ ...newCard, answer: e.target.value })}
            />
            <button onClick={handleAddCard}>Add Card</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageCards;
