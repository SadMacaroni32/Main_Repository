import React from 'react';
import NewPassForm from './NewPassForm';
import { Link } from 'react-router-dom';
import "../styles/Auth.css";
 // Assuming you want to include Auth.css

// TeamA_NewPass component
function TeamA_NewPass({ onNewPassForm }) {
  return (
   // Main container for the email page
    <div className="email-container">
     {/* Header section with a link to the home page */}
      <div className="home-header">
      <Link to='/'>
       {/* Logo image */}
        <img
          src="..\src\assets\TeamAassets\companyLogo.png" 
          alt="Logo"
          className="logo"
        />
        </Link>
      </div>
     {/* Navigation section (currently empty in the provided code) */}
      <div className="email-navi">
       
      </div>

     {/* Content section containing the NewPassForm component */}
      <div className="content">
        <div className="email-sign">
         {/* Rendering the NewPassForm component */}
          <NewPassForm onNewPassForm={onNewPassForm} />
        </div>
      </div>
    </div>
  );
}

// Exporting the TeamA_NewPass component as the default export
export default TeamA_NewPass;
