/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "./AuthContext";
import Login from "./Login";
import Register from "./Register";
import "../styles/Auth.css";

// CustomModal component for displaying modals
const CustomModal = ({ show, handleClose, children }) => {
  const modalStyles = {
    overlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      background: 'rgba(0, 0, 0, 0.2)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      backdropFilter: show ? 'blur(5px)' : 'none', 
    },
    modalContent: {
      position: 'relative',
      width: '100%',
      maxWidth: '600px',
      margin: '0 auto',
      background: 'none',  // Set the background to none or transparent
    },
    innerContent: {
      background: 'none',
      padding: '20px',
      borderRadius: '8px',
    },
  };

  return (
    <>
      {/* Render the modal only if show is true */}
      {show && (
        <div style={modalStyles.overlay} onClick={handleClose}>
          <div style={modalStyles.modalContent} onClick={(e) => e.stopPropagation()}>
            <div style={modalStyles.innerContent}>
              {children}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
// Navigation component
const Navigation = () => {
  // Extracting isLoggedIn and handleLogout from the useAuth hook
  const { isLoggedIn, handleLogout } = useAuth();
  // State variables for controlling the visibility of login and register modals
  const [loginModalIsOpen, setLoginModalIsOpen] = useState(false);
  const [registerModalIsOpen, setRegisterModalIsOpen] = useState(false);

  // Functions to open and close the login modal
  const openLoginModal = () => setLoginModalIsOpen(true);
  const closeLoginModal = () => setLoginModalIsOpen(false);

  // Functions to open and close the register modal
  const openRegisterModal = () => setRegisterModalIsOpen(true);
  const closeRegisterModal = () => setRegisterModalIsOpen(false);

  return (
    // Main navigation container
    <div className="home-header">
      {/* Left container with logo and navigation links */}
      <div className="left-container">
         {/* Logo container */}
        <div className="logo-container">
          {/* Logo image */}
          <img
            src="..\src\assets\TeamAassets\companyLogo.png"
            alt="Logo"
            className="logo"
          />
        </div>
         {/* Navigation links for logged-in users */}
        {isLoggedIn && (
          <nav>
            <ul>
              <li>
                <Link to="/">
                  <h3>Catalog</h3>
                </Link>
              </li>
              <li>
                <Link to="/">
                  <h3>Activities</h3>
                </Link>
              </li>
            </ul>
          </nav>
        )}
      </div>
      {/* Right container with buttons for login, register, and logout */}
      <div className="right-container">
        {/* Render these elements if the user is not logged in */}
        {!isLoggedIn && (
          <>
             {/* Register button */}
            <button className="TeamA-button" onClick={openRegisterModal}>
              Register
            </button>
            {/* Register modal */}
            <CustomModal show={registerModalIsOpen} handleClose={closeRegisterModal}>
              <Register />
            </CustomModal>
          </>
        )}

        {/* Render these elements if the user is logged in */}
        {isLoggedIn ? (
      // Logout button
          <button className="TeamA-button" onClick={handleLogout}>
            Logout
          </button>
        ) : (
      // Render these elements if the user is not logged in
          <>
             {/* Login button */}
            <button className="TeamA-button" onClick={openLoginModal}>
              Login
            </button>
            {/* Login modal */}  
            <CustomModal show={loginModalIsOpen} handleClose={closeLoginModal}>
              <Login />
            </CustomModal>
          </>
        )}
      </div>
    </div>
  );
};

// Exporting the Navigation component as the default export
export default Navigation;
