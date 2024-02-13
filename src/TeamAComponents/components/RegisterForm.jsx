/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function RegisterForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [userName, setUserName] = useState('');
  const [role, setRole] = useState(''); // Default to 'STUDENT'
  const [error, setError] = useState('');
  const [showError, setShowError] = useState(false); // State to control visibility of the error message
  const [verificationCodeSent, setVerificationCodeSent] = useState(false); // New state variable

  const navigate = useNavigate();

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,}$/;
    const isValid = passwordRegex.test(password);

    setError(isValid ? '' : 'Password must be at least 8 characters with at least 1 uppercase, 1 numeric, and 1 symbol.');

    return isValid;
  };

  const handleRoleChange = (e) => {
    setRole(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    validatePassword(e.target.value);
  };

  const handleRegister = async (e) => {
    e.preventDefault();
  
    if (!validateEmail(email) || !validatePassword(password)) {
      return;
    }
  
    try {
      // Map Role to corresponding role enum value
      const mappedRole = role === 'INSTRUCTOR' ? 'INSTRUCTOR' : 'STUDENT';
      console.log('Selected Role:', role);
      console.log('Mapped role:', mappedRole);
      const response = await fetch('http://localhost:8085/api/v1/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, firstName, lastName, userName, role: mappedRole }), // Use the mapped role
      });
  
      if (response.ok) {
        console.log('Registration successful');
        // Store the email in local storage
        localStorage.setItem('email', email);
        setVerificationCodeSent(true);
        navigate('/verify'); // Include email as a query parameter
      } else {
        // Handle error response
        const data = response.headers.get('Content-Type')?.includes('application/json') ? await response.json() : null;
        if (response.status === 409) {
          console.error('User already exists');
          setError(data?.message || 'User with this email or username already exists. Please use different credentials.');
        } else {
          console.error('Registration failed');
          setError(data?.message || 'Registration failed. Please try again.');
        }
      }
    } catch (error) {
      console.error('Error during registration:', error);
      setError('Registration failed. Please try again.');
    }
  };
  
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleRegister(e);
    }
  };

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

        <select
          id="Role"
          value={role}
          onChange={handleRoleChange}
        >
          <option value="STUDENT">Student</option>
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
        onKeyPress={handleKeyPress} 
        placeholder="Password"
        required
      />
        <div className="data-validation">
          {showError && (
            <label style={{ color: 'red', fontSize: '15px', fontWeight: '700', transition: 'color 0.3s' }}>
              {error}
            </label>
          )}
        </div>
      <div>
        <h3 style={{ fontSize: '15px' }}>By clicking Sign up you agree to our Terms of Use and our Privacy Policy.</h3>
      </div>
      {verificationCodeSent && (
        <div style={{ backgroundColor: 'lightgreen', padding: '10px', borderRadius: '5px', marginTop: '10px' }}>
          <span style={{ color: 'green' }}>✓</span> Verification code has been sent to your email. Please check your inbox.
        </div>
      )}
      <Link to="/login">
        <div className="existing-account">
          Already have an account?
        </div>
      </Link>
      <button className="TeamA-button" style={{ backgroundColor: '#126912' }}>Sign Up</button>
    </form>
  );
}

export default RegisterForm;
