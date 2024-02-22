/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from "./AuthContext";
import Footer from './Footer';

function LoginForm() {
  // State variables to manage email, password, and error
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  // Use the useAuth hook to get the handleLogin and setLoggedIn functions
  const { handleLogin } = useAuth(); 
   // Hook from React Router for navigation
  const navigate = useNavigate();

  // Handling form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      console.log('Form submitted'); // Add this line for debugging

      // Calling the handleLogin function from the useAuth hook
      const result = await handleLogin({ email, password });
      
      if (result.success) {
        console.log('Login successful'); // Add this line for debugging

        navigate('/dashboard'); // Redirecting to the dashboard on successful login

      } else {
        setError('Invalid email or password. Please try again.');
      }
    } catch (error) {
      setError('An unexpected error occurred. Please try again later.');
      console.error('Login failed:', error);
    }
  };
  
  // Handling Enter key press
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSubmit(e);
    }
  };

  return (
    <>
       {/* Form for user login */}
      <form onSubmit={handleSubmit} className="template-form">
        <h2 style={{ margin: '30px' }}>Sign In to Your Account and Be Part of the Success</h2>
         {/* Input field for email */}
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
        {/* Input field for password */}
        <div className="remember-me">
          {/* Your remember me checkbox */}
        </div>
        {/* Information about terms of use and privacy policy */}
        <div>
          <h3 style={{ marginTop: '15px' }}>By clicking "Sign in," you agree to our Terms of Use and our Privacy Policy.</h3>
        </div>
         {/* Link to the forgot password page */}
        <Link to="/forgot">
          <div className="forgot-password">
            Forgot your password?
          </div>
        </Link>
         {/* Button for submitting the form */}
        <button  className="TeamA-button">Sign in</button>
         {/* Displaying error message if there is an error */}
        {error && <div className="error-message">{error}</div>}
      </form>
    </>
  );
}

// Exporting the LoginForm component as the default export
export default LoginForm;
