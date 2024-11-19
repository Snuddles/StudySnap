import React from 'react';

const Signup = () => {
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // Handle form submission logic here (e.g., send data to the server)
  };

  const handleLoginRedirect = () => {
    // Redirect to login page
    window.location.href = '/login';
  };

  return (
    <div className="container">
      <div className="signup-section">
        <form onSubmit={handleSubmit}>
          <h2>Sign Up</h2>

          {/* Email Field */}
          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="email" required />

          {/* Username Field */}
          <label htmlFor="username">Username</label>
          <input type="text" id="username" name="username" required />

          {/* Password Field */}
          <label htmlFor="password">Password</label>
          <input type="password" id="password" name="password" required />

          {/* Buttons container */}
          <div className="button-group">
            {/* Sign Up button */}
            <button type="submit">Sign Up</button>

            {/* Already have an account button */}
            <button type="button" onClick={handleLoginRedirect}>
              Already have an account? Log in
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
