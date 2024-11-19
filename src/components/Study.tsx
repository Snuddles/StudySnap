import React, { useState } from 'react';

// Define the structure for a flashcard
interface Flashcard {
  question: string;
  answer: string;
}

const Study: React.FC = () => {
  // Flashcards array to store questions and answers
  const [flashcards, setFlashcards] = useState<Flashcard[]>([
    { question: 'What is React?', answer: 'A JavaScript library for building user interfaces.' },
    { question: 'What is JSX?', answer: 'A syntax extension for JavaScript, used with React.' },
  ]);

  // Track current flashcard index
  const [currentCardIndex, setCurrentCardIndex] = useState<number>(0);
  const [showAnswer, setShowAnswer] = useState<boolean>(false);

  // Handle next flashcard
  const nextCard = () => {
    if (currentCardIndex < flashcards.length - 1) {
      setCurrentCardIndex(currentCardIndex + 1);
      setShowAnswer(false);
    }
  };

  // Handle previous flashcard
  const prevCard = () => {
    if (currentCardIndex > 0) {
      setCurrentCardIndex(currentCardIndex - 1);
      setShowAnswer(false);
    }
  };

  // Toggle answer visibility
  const toggleAnswer = () => {
    setShowAnswer(!showAnswer);
  };

  const currentCard = flashcards[currentCardIndex];

  return (
    <div>
      <h2>Study Flashcards</h2>
      <div>
        <div>
          <p><strong>Question:</strong> {currentCard.question}</p>
          {showAnswer && <p><strong>Answer:</strong> {currentCard.answer}</p>}
        </div>
        <button onClick={toggleAnswer}>
          {showAnswer ? 'Hide Answer' : 'Show Answer'}
        </button>
        <div>
          <button onClick={prevCard} disabled={currentCardIndex === 0}>
            Previous
          </button>
          <button onClick={nextCard} disabled={currentCardIndex === flashcards.length - 1}>
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Study;
