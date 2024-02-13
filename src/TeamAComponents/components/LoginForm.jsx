/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from "./AuthContext";
import Footer from './Footer';

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  // Use the useAuth hook to get the handleLogin and setLoggedIn functions
  const { handleLogin } = useAuth(); 
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      console.log('Form submitted'); // Add this line for debugging
  
      const result = await handleLogin({ email, password });
      
      if (result.success) {
        console.log('Login successful'); // Add this line for debugging
        navigate('/dashboard');
      } else {
        setError('Invalid email or password. Please try again.');
      }
    } catch (error) {
      setError('An unexpected error occurred. Please try again later.');
      console.error('Login failed:', error);
    }
  };
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSubmit(e);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="template-form">
        <h2 style={{ margin: '30px' }}>Sign In to Your Account and Be Part of the Success</h2>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email Address"
          required
        />
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyPress={handleKeyPress} 
          placeholder="Password"
          required
        />
        <div className="remember-me">
          {/* Your remember me checkbox */}
        </div>
        <div>
          <h3 style={{ marginTop: '15px' }}>By clicking "Sign in," you agree to our Terms of Use and our Privacy Policy.</h3>
        </div>
        <Link to="/forgot">
          <div className="forgot-password">
            Forgot your password?
          </div>
        </Link>
        <button  className="TeamA-button">Sign in</button>
        {error && <div className="error-message">{error}</div>}
      </form>
    </>
  );
}


export default LoginForm;
