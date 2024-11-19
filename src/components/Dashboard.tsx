import React from 'react';
import { Link } from 'react-router-dom';
import './Dashboard.css'; // Create this CSS file to style the dashboard

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h2>Welcome to Your Dashboard</h2>
        <p>Manage your study decks and track your progress!</p>
      </header>

      <div className="dashboard-body">
        <div className="dashboard-widget">
          <h3>Create a New Deck</h3>
          <p>Start creating your flashcards for studying.</p>
          <Link to="/create-deck">
            <button>Create Deck</button>
          </Link>
        </div>

        <div className="dashboard-widget">
          <h3>Your Decks</h3>
          <p>View all of your saved decks and study materials.</p>
          <Link to="/study">
            <button>Go to Study</button>
          </Link>
        </div>

        <div className="dashboard-widget">
          <h3>Study Progress</h3>
          <p>Track your study progress and performance.</p>
          <Link to="/study">
            <button>View Progress</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
