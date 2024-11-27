import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface Flashcard {
  question: string;
  answer: string;
}

interface Deck {
  id: number;
  name: string;
  cards: Flashcard[];
}

interface StudyProps {
  decks: Deck[];
}

const Study: React.FC<StudyProps> = ({ decks }) => {
  const navigate = useNavigate(); // Hook for navigation
  const [selectedDeck, setSelectedDeck] = useState<Deck | null>(null);
  const [currentCard, setCurrentCard] = useState<Flashcard | null>(null);
  const [showAnswer, setShowAnswer] = useState<boolean>(false);

  // Function to handle deck selection
  const handleDeckSelection = (deckId: number) => {
    const deck = decks.find((d) => d.id === deckId) || null;
    setSelectedDeck(deck);
    setCurrentCard(deck?.cards[0] || null); // Start with the first card
    setShowAnswer(false);
  };

  // Toggle answer visibility
  const toggleAnswer = () => setShowAnswer(!showAnswer);

  // Move to next card
  const nextCard = () => {
    if (selectedDeck) {
      const currentIndex = selectedDeck.cards.indexOf(currentCard!);
      const nextIndex = (currentIndex + 1) % selectedDeck.cards.length;
      setCurrentCard(selectedDeck.cards[nextIndex]);
      setShowAnswer(false);
    }
  };

  // If no deck is selected, display selection prompt
  if (!selectedDeck) {
    return (
      <div>
        <h2>Select a Deck to Study</h2>
        {decks.map((deck) => (
          <button
            key={deck.id}
            onClick={() => handleDeckSelection(deck.id)}
            style={{ margin: '10px' }}
          >
            {deck.name}
          </button>
        ))}
        <button onClick={() => navigate('/dashboard')} style={{ marginTop: '20px' }}>
          Back to Dashboard
        </button>
      </div>
    );
  }

  // Display the selected deck's cards
  return (
    <div>
      <h2>Study Flashcards</h2>
      <p><strong>Deck:</strong> {selectedDeck.name}</p>
      {currentCard ? (
        <>
          <p><strong>Question:</strong> {currentCard.question}</p>
          {showAnswer && <p><strong>Answer:</strong> {currentCard.answer}</p>}
          <button onClick={toggleAnswer}>
            {showAnswer ? 'Hide Answer' : 'Show Answer'}
          </button>
          <button onClick={nextCard}>Next Card</button>
        </>
      ) : (
        <p>No cards in this deck.</p>
      )}
      <button onClick={() => navigate('/dashboard')} style={{ marginTop: '20px' }}>
        Back to Dashboard
      </button>
    </div>
  );
};

export default Study;
