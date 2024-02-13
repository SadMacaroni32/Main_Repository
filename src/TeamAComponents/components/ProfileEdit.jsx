import React from "react";
import { Link, useNavigate } from 'react-router-dom';
import "../styles/Auth.css";

import ProfileEditForm from "./ProfileEditForm";
import Navigation from './Navigation';
import { useAuth } from "./AuthContext";


const ProfileEdit = ({ handleClose }) => {

  const { isLoggedIn, handleLogout } = useAuth();
  const navigate = useNavigate(); //
    
  return (
    <div>
      <div className="Prof2-content">
        <div className="Prof2-sign">
          <ProfileEditForm handleClose={handleClose}/>
        </div>
      </div>
    </div>
  );
}

export default ProfileEdit;