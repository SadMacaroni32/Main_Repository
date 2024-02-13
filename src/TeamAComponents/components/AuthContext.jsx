/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import React, { createContext, useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isAuthReady, setIsAuthReady] = useState(false); // Added isAuthReady state
  const [timeoutId, setTimeoutId] = useState(null);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const authToken = localStorage.getItem('authToken');

      const response = await fetch('http://localhost:8085/api/v1/auth/logout', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`,
        },
      });

      if (response.ok) {
        localStorage.removeItem('authToken');
        localStorage.removeItem('username');
        localStorage.removeItem('email');
        localStorage.removeItem('lastName');
        localStorage.removeItem('userId');
        localStorage.removeItem('firstName');

        setLoggedIn(false);
        clearTimeout(timeoutId);

        navigate('/');
      } else {
        console.error('Logout failed', response.status, response.statusText);
      }
    } catch (error) {
      console.error('Unexpected error during logout', error);
    }
  };

  const handleLogin = async (credentials) => {
    try {
      setLoading(true);
  
      const response = await fetch('http://localhost:8085/api/v1/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        console.log('Server Response:', data);
  
        if (data.accessToken) {
          localStorage.setItem('authToken', data.accessToken);
  
          updateLocalStorage('userId', data.userId);
          updateLocalStorage('username', data.username);
          updateLocalStorage('firstName', data.firstName);
          updateLocalStorage('lastName', data.lastName);
          updateLocalStorage('email', data.email);
  
          setLoggedIn(true);
          setError(null);
  
          clearTimeout(timeoutId);
          const newTimeoutId = setTimeout(() => {
            handleLogout();
          }, 3600000);
          setTimeoutId(newTimeoutId);
  
          return { success: true, user: data }; // Return the success status and user data
        } else {
          console.error('Token missing in response:', data);
          setError('Invalid response from the server: Token missing');
        }
      } else {
        console.error('Login failed. Server response:', data);
  
        if (response.status === 401) {
          setError('Invalid email or password. Please try again.');
        } else {
          setError('An unexpected error occurred. Please try again later.');
        }
      }
    } catch (error) {
      console.error('Unexpected error during login', error);
  
      console.log('Response status:', response?.status);
      console.log('Response statusText:', response?.statusText);
  
      setError('An unexpected error occurred. Please try again later.');
    } finally {
      setLoading(false);
    }
  
    return { success: false, user: null }; // Return the failure status
  };
  

  const updateLocalStorage = (key, value) => {
    if (value !== undefined) {
      localStorage.setItem(key, value);

      clearTimeout(timeoutId);
      const newTimeoutId = setTimeout(() => {
        handleLogout();
      }, 3600000);
      setTimeoutId(newTimeoutId);
    }
  };

  useEffect(() => {
    const storedToken = localStorage.getItem('authToken');
    if (storedToken) {
      setLoggedIn(true);
      setIsAuthReady(true);

      const newTimeoutId = setTimeout(() => {
        handleLogout();
      }, 3600000);
      setTimeoutId(newTimeoutId);
    } else {
      setIsAuthReady(true);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, handleLogin, handleLogout, setLoggedIn, error, loading, isAuthReady }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
};
