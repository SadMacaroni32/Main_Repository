import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Footer from "./Footer";

// NewPassForm component
function NewPassForm() {
  // State variables for managing password-related inputs and errors
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [newPasswordError, setNewPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');

  // Function to toggle password visibility
  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  // Function to handle changes in the confirm password field
  const handleConfirmPasswordChange = (e) => {
    const confirmedPassword = e.target.value.trim();
    setConfirmPassword(confirmedPassword);

    // Check if new password and confirm password match
    if (newPassword.trim() !== '' && newPassword !== confirmedPassword) {
      setConfirmPasswordError('Passwords do not match');
    } else {
      setConfirmPasswordError('');
    }
  };

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Perform your form submission here
    if (newPassword === confirmPassword && newPassword.trim() !== '') {
      console.log('Password match! Submitting...');
      // Add your logic for form submission.

      // Show an alert when the password is confirmed
      window.alert('Password confirmed! Form submitted successfully.');

    } else {
      console.error('Passwords do not match or are empty. Please check.');
    }
  };

  return (
    // Main container for the NewPassForm
    <div className="email-forms-container" style={{ fontFamily: 'sans-serif' }}>
      {/* Form section */}
      <form className="template-form" onSubmit={handleSubmit}>
        {/* Back button to navigate to login page */}
        <Link to="/login">
          <button className="wBackbutton">
            {/* Arrow-left icon */}
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-left" viewBox="0 0 16 16">
              <path fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8"/>
            </svg>
          </button>
        </Link>
        
        {/* Title and description */}
        <h2 className="title"style={{fontSize:'20px'}}>Change Password</h2>
        <p style={{marginTop:'10px'}}>Please Change Your Password Here</p>

        {/* Input field for new password */}
        <label htmlFor="newPassword">
          <i className="fas fa-envelope"></i>
        </label>
        <div className="email-input-field">
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="Enter New Password here*"
            id="newPassword"
            name="newPassword"
            value={newPassword}
            onChange={(e) => {
              setNewPassword(e.target.value);
              setNewPasswordError('');
            }}
            onFocus={() => setNewPasswordError('')}
            required
          />
         
        </div>
        {/* Input field for confirming new password */}
        <div className="email-input-field" style={{ marginBottom: '20px' }}>
          <input
            style={{ marginTop: '5px' }}
            type={showPassword ? 'text' : 'password'}
            placeholder="Confirm New Password*"
            id="confirmPassword"
            name="confirmPassword"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            onFocus={() => setConfirmPasswordError('')}
            required
          />
        </div>

        {/* Password status messages */}
        <div className='passstat'>
          {newPassword === confirmPassword && newPassword.trim() !== '' && (
            <span style={{ color: 'green', fontSize: '14px'}}>Password match</span>
          )}


          {newPassword !== confirmPassword && confirmPassword.trim() !== '' && newPassword.trim() !== '' && (
            <span style={{ color: 'red', fontSize: '14px'}}>{confirmPasswordError || 'Password do not match'}</span>
          )}
        </div>

         {/* Confirm button */}
        <div style={{ marginTop: '-60px' }}>
          <Link to="/login">
            <button className="Confirm-button">Confirm</button>
          </Link>
        </div>
      </form>

      {/* Panels container */}
      <div className="email-panels-container">
        {/* Left panel */}
        <div className="email-panel email-left-panel">
          <div className="content">
            {/* Add content for the left panel */}
          </div>
          {/* Image for the left panel */}
          <img src="your-image.png" className="email-image" alt="" />
        </div>
      </div>
      {/* Footer component */}
      <Footer/>
    </div>
 
  );
}

// Exporting the NewPassForm component as the default export
export default NewPassForm;
