/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Footer from "./Footer";

function ForgotForm({ onForgotPassword }) {
  // State variables for email and OTP
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState(''); // Add state for OTP

  // Navigation hook from react-router-dom
  const navigate = useNavigate();

  // Event handler for handling the forgot password process
  const handleForgot = (e) => {
    e.preventDefault();
    // Call the onForgotPassword prop with the email value
    onForgotPassword(email);
    console.log('Resetting password for email:', email);

    // Redirect to EmailVerification page after handling the forgot password logic
    navigate('/EmailForm');
  };

  return (
    <div className="forgot-container">
       {/* Main container for the ForgotForm component */}
      <div className="forgot-container">
        {/* Form section for the ForgotForm */}
        <form className="template-form" onSubmit={handleForgot}>
          {/* Back button linking to the login page */}
          <Link to="/login">
            <button className="wBackbutton">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-left" viewBox="0 0 16 16">
                <path fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8"/>
              </svg>
            </button>
          </Link>

          {/* Title and description for the forgot password form */}
          <h2 className="title">Forgot Password</h2>
          <p>Please enter your email address to reset your password.</p>
          {/* Input field for email with onChange event */}
          <div className="email-input-field">
            {/* Use setEmail to update the email state */}
            <input
              type="email"
              id="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          
          {/* Input field for OTP with Send button */}
          <div className="email-input-field">
  <div className="forgot-otp-input-container">
    <input
      type="text"
      id="OTP"
      placeholder="OTP"
      value={otp}
      onChange={(e) => setOtp(e.target.value)}
    />
    <button  className="forgot-otp-button">
      Send
    </button>
  </div>
</div>

          {/* Links to other pages */}
          <Link to="/login">
            <div className="existing-account">
              Remember your password?
            </div>
          </Link>
          <Link to="/new">
            <button className="TeamA-button">Verify</button>
          </Link>
        </form>
      </div>
      {/* Left panel for additional content */}
      <div className="forgot-container">
        <div className="forgot left-panel">
          <div className="forgot-content"></div>
        </div>
      </div>
      {/* Footer component */}
      <Footer />
    </div>
  );
}

export default ForgotForm;
