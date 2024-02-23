/* eslint-disable no-unused-vars */
import React from 'react';
import LoginForm from './ForgotForm';
import { Link } from "react-router-dom";
import ForgotForm from './ForgotForm';
import Home from './Home';
import "../styles/Auth.css";

function Forgot() {
  // Function implementation goes here

  return (
    <div className="forgot-container">
      {/* Container for the entire Forgot component */}
      <div className="home-header">
        {/* Header section containing company logo */}
      <Link to='/'>
        {/* Link to the home page */}
        <img
          src="..\src\assets\TeamAassets\companyLogo.png" 
          alt="Logo"
          className="logo"
        />
        </Link>
      </div>
      <div className="forgot-navi">
        {/* Navigation section for the Forgot component */}
        <div className="home-button">
          {/* Button to navigate to the Home page */}
        <Link to="/">
          {/* Link to the Home page */}
          
            <button className='login-button'>Home</button>
           
          </Link>
        </div>
      </div>
      <div className="forgot-content">
        {/* Content section for the Forgot component */}
        <div className="forgot-sign">
          {/* Section containing the ForgotForm component */}
          <ForgotForm />
        </div>
      </div>
    </div>
  );
}

export default Forgot;
