import React, { useState } from 'react';

interface SignupProps {
  onSignup: (email: string, username: string, password: string) => void;
}

const Signup = ({ onSignup }: SignupProps) => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!email || !username || !password) {
      setError('All fields are required.');
      return;
    }

    setError('');
    onSignup(email, username, password);
  };

  return (
    <div className="container">
      <div className="signup-section">
        <h2>Sign Up</h2>
        {error && <p className="error">{error}</p>}
        <form onSubmit={handleSubmit}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />

          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <div className="button-group">
            <button type="submit">Sign Up</button>
            <button type="button" onClick={() => window.location.href = '/login'}>
              Already have an account? Log in
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
