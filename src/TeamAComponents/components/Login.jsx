import React from 'react';
import LoginForm from './LoginForm';
import { Link } from "react-router-dom";
import "../styles/Auth.css";


function Login() {

  return (
    <div className="auth-container">
      <div style={{display: "flex", justifyContent: "center"}}>
      <div style={{display: "flex", flexDirection: "column", alignItems: "start", }}>
      <div>
        <div className="auth-label">
          <h1>LOG IN</h1>
        </div>
      </div>
      <div className="auth-content">
        <div className="auth-sign">
          <LoginForm />
        </div>
      </div>
      </div>
      </div>
    </div>
  );
}

export default Login;
