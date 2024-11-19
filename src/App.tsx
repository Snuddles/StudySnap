import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

// Import components
import CreateDeck from './components/CreateDeck';
import Study from './components/Study';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Signup from './components/Signup';

// Home Component
const Home = () => {
  return (
    <div className="home-page">
      <h2>Welcome to StudySnap!</h2>
      <p>Organize and optimize your study sessions with custom flashcards.</p>
      <p>
        <Link to="/login" className="button-link">Login</Link> or{' '}
        <Link to="/signup" className="button-link">Sign Up</Link> to get started!
      </p>
    </div>
  );
};

// Header Component (only shows Home link)
const Header = () => {
  return (
    <header className="App-header">
      <nav>
        <ul className="nav-list">
          {/* Home link only at the top right */}
          <li className="home-link">
            <Link to="/">Home</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* No Header on the Home page */}
          <Route path="/" element={<Home />} />

          {/* Only render Header on the Login, Signup, Dashboard, and other pages */}
          <Route path="/login" element={<><Header /><Login /></>} />
          <Route path="/signup" element={<><Header /><Signup /></>} />
          <Route path="/dashboard" element={<><Header /><Dashboard /></>} />
          <Route path="/create-deck" element={<><Header /><CreateDeck /></>} />
          <Route path="/study" element={<><Header /><Study /></>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
