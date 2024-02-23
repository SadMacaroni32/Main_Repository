/* eslint-disable react/prop-types */

import React, { createContext, useState } from "react";


export const ProfileContext = createContext();

const ProfileProvider = ({ children }) => {
  const [showPersonalInfo, setPersonalInfo] = useState(true);
  const [showAccDetails, setShowAccDetails] = useState(false);
  const [showDropDown, setShowDropDown] = useState(false);
  
 

  const showPInfo = () => {
    setPersonalInfo(() => (prev) => !prev);
    setShowAccDetails(false);
    setShowDropDown(false);
  };
  const showADetails = () => {
    setShowAccDetails(() => (prev) => !prev);
    setPersonalInfo(false);
    setShowDropDown(false);
  };

  return (
    <ProfileContext.Provider
      value={{
        showPersonalInfo,
        setPersonalInfo,
        showAccDetails,
        setShowAccDetails,
        showPInfo,
        showADetails,
      }}>
      {children}
    </ProfileContext.Provider>
  );
};

export default ProfileProvider;
