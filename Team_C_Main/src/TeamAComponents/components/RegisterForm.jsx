import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function RegisterForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [userName, setUserName] = useState('');
  const [role, setRole] = useState('');
  const [error, setError] = useState('');
  const [showError, setShowError] = useState(false);
  const [verificationCodeSent, setVerificationCodeSent] = useState(false);
  const navigate = useNavigate();
  const [passwordFocused, setPasswordFocused] = useState(false); // Track if the password field is focused

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,20}$/;
    return passwordRegex.test(password);
  };

  const handleRoleChange = (e) => {
    setRole(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setShowError(false);
  };

  const handlePasswordFocus = () => {
    setPasswordFocused(true);
  };

  const handlePasswordBlur = () => {
    setPasswordFocused(false);
  };
// Define an asynchronous function to handle user registration
  const handleRegister = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior

    // Validate the email address using the validateEmail function
    if (!validateEmail(email)) {
      setError('Please enter a valid email address.'); // Set an error message if the email is invalid
      setShowError(true);
      return;
    }

    // Check if the password does not meet the validation criteria
    if (!validatePassword(password)) {
       // Set an error message indicating the password requirements
      setError('Password must be 8 to 20 characters long with at least 1 uppercase, 1 numeric, and 1 symbol.');
      setShowError(true); // Display the error message
      return;
    }

    try {
       // Map the role value to either 'INSTRUCTOR' or 'STUDENT'
      const mappedRole = role === 'INSTRUCTOR' ? 'INSTRUCTOR' : 'STUDENT';
      // Send a POST request to the signup endpoint with the provided data
      const response = await fetch('http://localhost:8085/api/v1/auth/signup', {
        method: 'POST', // Request method
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, firstName, lastName, userName, role: mappedRole }),
      });

      if (response.ok) {
        // Store the email in local storage
        localStorage.setItem('email', email);
        // Set the verification code sent state to true
        setVerificationCodeSent(true);
        // Navigate to the verification page
        navigate('/verify');
      } else {
        // Extract data from response headers if available
        const data = response.headers.get('Content-Type')?.includes('application/json') ? await response.json() : null;
        if (response.status === 409) {
          // Set error message if user with the email or username already exists
          setError('User with this email or username already exists. Please use different credentials.');
        } else {
          // Set error message based on response data or default message
          setError(data?.message || 'Registration failed. Please try again.');
        }
        // Show the error message
        setShowError(true);
      }
    } catch (error) {
      setError('Registration failed. Please try again.');
      setShowError(true);
    }
  };

  const isPasswordValid = validatePassword(password);

  return (
    <form onSubmit={handleRegister} className="template-form">
      <h2>Sign up an account.</h2>
      <h2>Be part of the success.</h2>

      <div className="group_input">
        <input
          type="text"
          id="username"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          placeholder={`Username (${role === 'Admin' ? 'Admin' : role})`}
          required
        />

        {/* Select role */}
        <select
          id="Role"
          value={role}
          onChange={handleRoleChange}
        >
          {/* Option for student */}
          <option value="STUDENT">Student</option>
           {/* Option for instructor */}
          <option value="INSTRUCTOR">Instructor</option>
        </select>
      </div>
      <input
        type="text"
        id="FirstName"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
        placeholder="First Name"
        required
      />
      <input
        type="text"
        id="lastName"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
        placeholder="Last Name"
        required
      />
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
        onChange={handlePasswordChange}
        onFocus={handlePasswordFocus} // Add onFocus event handler
        onBlur={handlePasswordBlur}   // Add onBlur event handler
        placeholder="Password"
        required
      />
      <div className="data-validation">
         {/* Check if the password field is focused and display validation message */}
        {passwordFocused && (
          <label style={{ color: isPasswordValid ? 'green' : 'red', fontSize: '15px', fontWeight: '700', transition: 'color 0.3s' }}>
           {/* Display error message if present, otherwise display default message */}
            { error || 'Password must be 8 to 20 characters long with at least 1 uppercase character, 1 numeric digit, and 1 special character.'}
          </label>
        )}
      </div>
      <div>
         {/* Display agreement text */}
        <h3 style={{ fontSize: '15px' }}>By clicking Sign up you agree to our Terms of Use and our Privacy Policy.</h3>
      </div>
      {/* Conditionally render verification code sent message */}
      {verificationCodeSent && (
        <div style={{ backgroundColor: 'lightgreen', padding: '10px', borderRadius: '5px', marginTop: '10px' }}>
         {/* Display verification code sent message */}
          <span style={{ color: 'green' }}>✓</span> Verification code has been sent to your email. Please check your inbox.
        </div>
      )}
      <Link to="/login">
         {/* Link to login page */}
        <div className="existing-account">
          {/* Text indicating existing account */}
          Already have an account?
        </div>
      </Link>
      {/* Sign up button */}
      <button className="TeamA-button" style={{ backgroundColor: '#126912' }}>Sign Up</button>
    </form>
  );
}

export default RegisterForm;
