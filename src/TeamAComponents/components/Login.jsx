import React from 'react';
import LoginForm from './LoginForm';
import { Link } from "react-router-dom";
import "../styles/Auth.css";

//Importing styles for the component
function Login() {

  //Functional component for the Login page
  return (
    //Main container for the authentication page
    <div className="auth-container">
      {/* Flex container for centering content horizontally */}
      <div style={{display: "flex", justifyContent: "center"}}>
        {/* Flex container with a columnn layout and content aligned to the start */}
      <div style={{display: "flex", flexDirection: "column", alignItems: "start", }}>
        {/* Heading for the Login page */}
      <div>
        <div className="auth-label">
          <h1>LOG IN</h1>
        </div>
      </div>
        {/* Container for the main authentication content */}
      <div className="auth-content">
        {/* Container for the login form component */}
        <div className="auth-sign">
          {/* Rendering the LoginForm component
          */}
          <LoginForm />
        </div>
      </div>
      </div>
      </div>
    </div>
  );
}

export default Login;
