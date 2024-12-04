import React, { useEffect, useState } from 'react';
import './App.css';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';

// Import components
import Study from './components/Study';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import Signup from './components/Signup';
import DeckPage from './components/DeckPage';

// Interfaces
export interface Flashcard {
  question: string;
  answer: string;
}

export interface Deck {
  id: number;
  name: string;
  description?: string;
  cards: Flashcard[];
}

interface User {
  email: string;
  username: string;
  password?: string;
}

function App() {
  const navigate = useNavigate();
  const [decks, setDecks] = useState<Deck[]>([
    { id: 1, name: 'Biology Basics', cards: [] },
    { id: 2, name: 'History 101', cards: [] },
  ]);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const fetchDecks = async () => {

      try {
          const endpoint = 'http://192.168.1.212:3000/api/decks/user/' + currentUser?.username
          const response = await fetch(endpoint); // Replace with your API URL
          // hello
          if (!response.ok) {
              throw new Error('Failed to fetch user data');
          }
          const data = await response.json();
          setDecks((prevDecks) => data.decks); // Update state with fetched data
      } catch (err) {
          console.log(err); // Update error state if fetch fails
      }  
  }
  useEffect(() => {
    console.log("Reloading decks")
    fetchDecks();
  },[currentUser]);
  
  // Deck and card management functions
  const addDeck =  async (deckName: string) => {
    const newDeck: Deck = { id: Date.now(), name: deckName, cards: [] };
    const data = { username: currentUser?.username, name: newDeck.name, cards: newDeck.cards }
    try {
      const response = await fetch('http://192.168.1.212:3000/api/decks/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      const result = await response.json();

      if (response.ok) {
        alert("Deck Added!");
        setDecks((prevDecks) => [...prevDecks, newDeck]);
        navigate('/dashboard'); // Navigate to dashboard on successful login
      } else {
        // Show error feedback and stay on /login
        alert(`Deck Failed to Add: ${result.message || 'Invalid credentials'}`);
      }
    } catch (error) {
      if (error instanceof Error) {
        alert(`An error occurred: ${error.message}`);
      } else {
        alert('An unexpected error occurred.');
      }
    }

  };

  const deleteDeck = (deckId: number) => {
    setDecks((prevDecks) => prevDecks.filter((deck) => deck.id !== deckId));
  };

  const editDeck = (deckId: number, newName: string) => {
    setDecks((prevDecks) =>
      prevDecks.map((deck) =>
        deck.id === deckId ? { ...deck, name: newName } : deck
      )
    );
  };

  const addCardToDeck = (deckId: number, newCard: Flashcard) => {
    setDecks((prevDecks) =>
      prevDecks.map((deck) =>
        deck.id === deckId
          ? { ...deck, cards: [...deck.cards, newCard] }
          : deck
      )
    );
  };

  // Card management functions
  const deleteCard = (deckId: number, cardIndex: number) => {
    setDecks((prevDecks) =>
      prevDecks.map((deck) =>
        deck.id === deckId
          ? {
            ...deck,
            cards: deck.cards.filter((_, index) => index !== cardIndex),
          }
          : deck
      )
    );
  };

  const editCard = (deckId: number, cardIndex: number, updatedCard: Flashcard) => {
    setDecks((prevDecks) =>
      prevDecks.map((deck) =>
        deck.id === deckId
          ? {
            ...deck,
            cards: deck.cards.map((card, index) =>
              index === cardIndex ? updatedCard : card
            ),
          }
          : deck
      )
    );
  };

  // Header navigation component
  const Header: React.FC = () => (
    <header className="App-header">
      <nav>
        <ul className="nav-list">
          <li>
            <Link to="/">Home</Link>
          </li>
          {currentUser ? (
            <>
              <li>
                <span>Welcome, {currentUser.username}!</span>
              </li>
              <li>
                <button onClick={() => {setCurrentUser(null); setDecks((prevDecks) => []); console.log(decks); navigate('/')}}>Logout</button>
              </li>
            </>
          ) : null} {/* Removed the Login link when there's no currentUser */}
        </ul>
      </nav>
    </header>
  );
  // Main render
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Home currentUser={currentUser} />} />
        <Route path="/study" element={<Study decks={decks} />} />
        <Route
          path="/dashboard"
          element={
            <Dashboard
              user={currentUser || { email: 'guest@example.com', username: 'Guest' }}
              decks={decks}
              addDeck={addDeck}
              deleteDeck={deleteDeck}
              editDeck={editDeck}
              addCardToDeck={addCardToDeck}
              deleteCard={deleteCard}
              editCard={editCard}
            />
          }
        />
        <Route
          path="/login"
          element={
            <Login
              onLogin={async (username, password) => {
                const user = {
                  "username": username,
                  "password": password
                };
                try {
                  const response = await fetch('http://192.168.1.212:3000/api/auth/login', {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(user)
                  });

                  const result = await response.json();

                  if (response.ok) {
                    alert("You're logged in!");
                    setCurrentUser({ email: result.user.email, username: result.user.username });
                    navigate('/dashboard'); // Navigate to dashboard on successful login
                  } else {
                    // Show error feedback and stay on /login
                    alert(`Login failed: ${result.message || 'Invalid credentials'}`);
                  }
                } catch (error) {
                  if (error instanceof Error) {
                    alert(`An error occurred: ${error.message}`);
                  } else {
                    alert('An unexpected error occurred.');
                  }
                }
              }}
            />
          }
        />

        <Route
          path="/signup"
          element={
            <Signup
            onSignup={async (email, username, password) => {
              const user = {
                "email" : email,
                "username": username,
                "password": password
              }
              const response = await fetch('http://192.168.1.212:3000/api/auth/register', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify(user) 
              })
              const result = await response.json();
              if (response.ok){
                alert("You're registered!")
                setCurrentUser({ email: email, username });
                navigate('/login');
              }
              else{
                alert(`Error ${result.error}`)
              }
              
            }}
            />
          }
        />
        <Route
          path="/deck/:deckId"
          element={
            <DeckPage
              decks={decks}
              addCardToDeck={addCardToDeck}
            />
          }
        />
      </Routes>
    </div>
  );
}

// Home Component
const Home: React.FC<{ currentUser: User | null }> = ({ currentUser }) => (
  <div className="home-page">
    {!currentUser ? (
      <div>
        <h2>Welcome to StudySnap!</h2>
        <p>Organize and optimize your study sessions with custom flashcards.</p>
        <p>
          <Link to="/login" className="button-link">
            Log in
          </Link>{' '}
          or{' '}
          <Link to="/signup" className="button-link">
            Sign up
          </Link>
        </p>
      </div>
    ) : (
      <div>
        <h2>Welcome back, {currentUser.username}!</h2>
        <p>
          <Link to="/study" className="button-link">
            Start Studying
          </Link>{' '}
          or{' '}
          <Link to="/dashboard" className="button-link">
            Manage Your Decks
          </Link>
        </p>
      </div>
    )}
  </div>
);

export default App;
