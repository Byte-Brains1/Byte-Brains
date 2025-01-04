import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Predefined admin credentials
  const ADMIN_EMAIL = 'bbcnecg@csm.com';
  const ADMIN_PASSWORD = 'bbc#csm1';

  // Handle the login logic
  const handleLogin = (e) => {
    e.preventDefault();

    // Check if the email and password match the predefined admin credentials
    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      // If credentials are correct, store a "fake" JWT token in localStorage
      localStorage.setItem('token', 'fake-jwt-token');

      // Redirect to the admin page
      navigate('/admin');
    } else {
      // If credentials are incorrect, display an error message
      setError('Invalid credentials. Please try again.');
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleLogin}>
        <h2 className="login-form__title">Login</h2>

        <div className="login-form__input-container">
          <label className="login-form__label">Email:</label>
          <input
            type="email"
            className="login-form__input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="login-form__input-container">
          <label className="login-form__label">Password:</label>
          <input
            type="password"
            className="login-form__input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        {error && <div className="login-form__error">{error}</div>}

        <button type="submit" className="login-form__button">Login</button>
      </form>
    </div>
  );
};

export default Login;
