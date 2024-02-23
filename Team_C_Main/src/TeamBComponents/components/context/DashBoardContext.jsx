/* eslint-disable react/prop-types */
import {  createContext, useState } from "react";

export const DashBoardContext = createContext();

const DashBoardProvider = ({ children }) => {
  //react hook for dashboardhover
  const [dashBoardHover, setDashBoardHover] = useState(false);

  //onMouseHover hook
  const [hoverClose, setHoverClose] = useState(false);

  //react hook for show dropdown
  const [showDropDown, setShowDropDown] = useState(false);
  return (
    <DashBoardContext.Provider
      value={{
        dashBoardHover,
        setDashBoardHover,
        setHoverClose,
        hoverClose,
        showDropDown,
        setShowDropDown,
      }}>
      {children}
    </DashBoardContext.Provider>
  );
};

export default DashBoardProvider;
