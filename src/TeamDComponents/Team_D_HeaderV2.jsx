import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import "./TeamD_Css/navbar.css";
import TsukidenLogo from "./TeamD_Assets/TsukidenLogo.png";
import Profile from "./TeamD_Assets/profilepic.jpg";
import Dropdown from "react-bootstrap/Dropdown";
import { FaRegUserCircle } from "react-icons/fa";
import { TbCertificate } from "react-icons/tb";
import { FiLogOut } from "react-icons/fi";
import NavDropdown from "react-bootstrap/NavDropdown";
import ForumF from './../TeamCComponents/pages/ForumF';

const Team_D_HeaderV2 = () => {
  const [clicked, setClicked] = useState(false);

  const handleClick = () => {
    setClicked(!clicked);
  };

  const closeMobileNavbar = () => {
    setClicked(false);
    setMyCourseActive(false);
  };

  const reloadPage = () => {
    window.location.reload();
  };

  // Add or remove the 'no-scroll' class based on the 'clicked' state
  useEffect(() => {
    if (clicked) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = ""; // Cleanup on component unmount
    };
  }, [clicked]);

  return (
    <>
      <nav className="navbar_TeamD">
        <NavLink  onClick={() => { closeMobileNavbar(); reloadPage(); }}>
          <img src={TsukidenLogo} alt="Logo" />
        </NavLink>
        <div>
          <ul id="navbar" className={clicked ? "active" : ""}>
            {/* Profile Info */}
            <li className="profile_info">
              <span className="profile_info_con">
                <img src={Profile} alt="Logo" />
                <span className="profile_info_name">
                  <p className="profile_fName">Joshua Allada</p>
                  <p className="profile_email">jallada.@tgsi.com.ph</p>
                </span>
              </span>
            </li>
            {/* Profile Links */}
            <li className="profile_link">
              <NavLink
                to="/profile"
                activeClassName="active"
                onClick={closeMobileNavbar}
              >
                Profile
              </NavLink>
            </li>
            <li className="profile_link">
              <NavLink
                to="/certificate"
                activeClassName="active"
                onClick={closeMobileNavbar}
              >
                My Certificate
              </NavLink>
            </li>
            <li className="divider"></li>
            {/* Navigation Links */}
            <li>
              <NavLink
                to="/TeamCDashboard"
                activeClassName="active"
                onClick={closeMobileNavbar}
              >
                Dashboard
              </NavLink>
            </li>
            <li>
              <NavDropdown
                id="nav-dropdown-dark-example"
                title="My Course"
                menuVariant="dark"
                className="mycourse_dd"
              >
                <NavDropdown.Item href="course" activeClassName="active">
                  Program Overview
                </NavDropdown.Item>
                <NavDropdown.Item href="assessment" activeClassName="active">
                  Assessment
                </NavDropdown.Item>
              </NavDropdown>
            </li>
            <li>
              <NavLink
                to="/ForumF"
                activeClassName="active"
                onClick={closeMobileNavbar}
              >
                Forums
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/verification"
                activeClassName="active"
                onClick={closeMobileNavbar}
              >
                Verification
              </NavLink>
            </li>
            {/* Log Out Link */}
            <li className="profile_link">
              <NavLink
                to="/landing"
                activeClassName="active"
                onClick={closeMobileNavbar}
              >
                <span className="teamD_LogOut_Btn">Log Out</span>
              </NavLink>
            </li>
          </ul>
        </div>
        {/* Mobile Menu */}
        <div id="mobile" onClick={handleClick}>
          {clicked ? (
            <i className="fas fa-times"></i>
          ) : (
            <img src={Profile} alt="Logo" className="mobile_profile" />
          )}
        </div>
        {/* Profile Dropdown */}
        <div className="profile_side">
          <Dropdown>
            <Dropdown.Toggle
              variant="success"
              id="dropdown-basic"
              className="button_profile"
            >
              <img src={Profile} alt="" className="profile_img" />
              Hi, JALLADA!
            </Dropdown.Toggle>

            <Dropdown.Menu>
              {/* Profile Dropdown Items */}
              <Dropdown.Item href="">
                <FaRegUserCircle /> Profile
              </Dropdown.Item>
              <Dropdown.Item
                as={NavLink}
                to="/certificate"
                onClick={closeMobileNavbar}
              >
                <TbCertificate /> My Certificate
              </Dropdown.Item>
              <Dropdown.Item
                as={NavLink}
                to="/"
                onClick={closeMobileNavbar}
              >
                <FiLogOut /> Log Out
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </nav>
    </>
  );
};

export default Team_D_HeaderV2;
