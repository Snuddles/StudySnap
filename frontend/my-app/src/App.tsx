import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

// Import components
import CreateDeck from './components/CreateDeck';
import Study from './components/Study';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Signup from './components/Signup';

// Header Component
const Header = () => {
  const isLoggedIn = false; // Replace with actual logic for login state

  return (
    <header className="App-header">
      <h1>Welcome to StudySnap</h1>
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          {!isLoggedIn && <li><Link to="/login">Login</Link></li>}
          {!isLoggedIn && <li><Link to="/signup">Sign Up</Link></li>}
          {isLoggedIn && <li><Link to="/dashboard">Dashboard</Link></li>}
          {isLoggedIn && <li><Link to="/create-deck">Create Deck</Link></li>}
          {isLoggedIn && <li><Link to="/study">Study</Link></li>}
        </ul>
      </nav>
    </header>
  );
};

function App() {
  return (
    <Router>
      <div className="App">
        {/* Include the Header Component */}
        <Header />

        {/* Set up routes */}
        <main className="App-content">
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/create-deck" element={<CreateDeck />} />
            <Route path="/study" element={<Study />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
