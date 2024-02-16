import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import "./TeamD_Css/navbar.css";
import TsukidenLogo from "./TeamD_Assets/TsukidenLogo.png";
import Dropdown from "react-bootstrap/Dropdown";
import { FaRegUserCircle } from "react-icons/fa";
import { TbCertificate } from "react-icons/tb";
import { FiLogOut } from "react-icons/fi";
import NavDropdown from "react-bootstrap/NavDropdown";
import { useAuth } from "../TeamAComponents/components/AuthContext";

// Function to get user image type from TeamA
function getUserImageType(profilePicture) {
  // Check if profilePicture is defined and not null
  if (profilePicture && profilePicture.startsWith) {
    // Check the image type based on the data
    const isPNG = profilePicture.startsWith('data:image/png;base64,');
    const isJPEG = profilePicture.startsWith('data:image/jpeg;base64,');
    
    if (isPNG) {
      return 'png';
    } else if (isJPEG) {
      return 'jpeg';
    } else {
      // Return a default type or handle accordingly
      return 'unknown'; // You can change this to 'jpeg' or handle as needed
    }
  } else {
    // Return a default type or handle accordingly
    return 'unknown'; // You can change this to 'jpeg' or handle as needed
  }
}

// Team_D_HeaderV2 component represents the header section of the website
const Team_D_HeaderV2 = ({ onUserDataFetched, openModal }) => { //TeamA added { onUserDataFetched, openModal }
  const [clicked, setClicked] = useState(false);
  //TeamA addition
  const [userData, setUserData] = useState({});
  const { isLoggedIn, handleLogout } = useAuth();

  // Function to handle the click event to toggle mobile navbar
  const handleClick = () => {
    setClicked(!clicked);
  };

  // Function to close the mobile navbar
  const closeMobileNavbar = () => {
    setClicked(false);
    setMyCourseActive(false);
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

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userId = localStorage.getItem("userId");
        if (!userId) {
          console.error("User ID not found in local storage");
          return;
        }

        const response = await fetch(
          `http://localhost:8085/api/v1/auth/users/${userId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (response.ok) {
          const userData = await response.json();
          setUserData(userData);

          if (
            userData.profilePicture !== undefined &&
            userData.profilePicture !== null
          ) {
            const base64 = btoa(
              String.fromCharCode(...new Uint8Array(userData.profilePicture))
            );
            const imageType = getUserImageType(userData.profilePicture);
            const dataUrl = `data:image/${imageType};base64,${base64}`;

            onUserDataFetched({
              ...userData,
              profilePicture: dataUrl,
            });
          } else {
            console.error(
              "Profile picture is undefined or null in user data"
            );  
          }
        } else {
          console.error(
            "Failed to fetch user data",
            response.status,
            response.statusText
          );
        }
      } catch (error) {
        console.error("Unexpected error during user data fetch", error);
      }
    };

    fetchUserData();
  }, [onUserDataFetched]);

  return (
    <>
      <nav className="navbar_TeamD">
        <NavLink to="/" onClick={closeMobileNavbar}>
          <img src={TsukidenLogo} alt="Logo" />
        </NavLink>
        <div>
          {/* Navbar links */}
          <ul id="navbar" className={clicked ? "active" : ""}>
          {/*Added connection to fetch profile picture from TeamA*/}
          <li className="profile_info">
              <span className="profile_info_con">
                <img src={`data:image/${getUserImageType(userData.profilePicture)};base64,${userData.profilePicture}`} alt="Logo" />
                <span className="profile_info_name">
                  <p className="profile_fName">{userData.firstName}</p>
                </span>
              </span>
            </li>
            {/* Profile link */}
            <li className="profile_link">
            <NavLink
                to="/profile"
                activeClassName="active"
                onClick={closeMobileNavbar}
              >
                Profile
              </NavLink>
            </li>
            {/* Certificate link */}
            <li className="profile_link">
              <NavLink
                to="/certificate"
                activeClassName="active"
                onClick={closeMobileNavbar}
              >
                Certificate
              </NavLink>
            </li>
            <li className="divider"></li>
            {/* Dashboard link */}
            <li>
              <NavLink
                to="/TeamCdashboard"
                activeClassName="active"
                onClick={closeMobileNavbar}
              >
                Dashboard
              </NavLink>
              {/* My Course dropdown */}
            </li>
            <li>
              <NavDropdown
                id="nav-dropdown-dark-example"
                title="My Course"
                menuVariant="dark"
                className="mycourse_dd"
              >
                <NavDropdown.Item href="/course" activeClassName="active">
                  Program Overview
                </NavDropdown.Item>
                <NavDropdown.Item href="/assessment" activeClassName="active">
                  Assessment
                </NavDropdown.Item>
              </NavDropdown>
            </li>
            {/* Forums link */}
            <li>
              {/* this is the forum */}
              <NavLink
                to="/ForumF"
                activeClassName="active"
                onClick={closeMobileNavbar}
              >
                Forums
              </NavLink>
            </li>
            {/* Verification link */}
            <li>
              <NavLink
                to="/verification"
                activeClassName="active"
                onClick={closeMobileNavbar}
              >
                Verification
              </NavLink>
            </li>
          </ul>
        </div>
        {/* Mobile toggle */}
        <div id="mobile" onClick={handleClick}>
          {clicked ? (
            <i className="fas fa-times"></i>
          ) : (
            
            <img
            src={`data:image/${getUserImageType(userData.profilePicture)};base64,${userData.profilePicture}`}
            alt="Logo"
            className="mobile_profile" //Added snippet to fetch profile picture
          />
          )}
        </div>
        {/* Profile dropdown */}
        <div className="profile_side">
          <Dropdown>
            {/*Added snippet to fetch profile picture*/}
          <Dropdown.Toggle
                variant="success"
                id="dropdown-basic"
                className="button_profile"
              >
                <img
                  src={`data:image/${getUserImageType(userData.profilePicture)};base64,${userData.profilePicture}`}
                  alt=""
                  className="profile_img"
                />
                Hi, {userData.firstName}!
              </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item
                as={NavLink}
                to="#"
                onClick={() => {
                  openModal();
                }}
              >
                <FaRegUserCircle /> Profile
              </Dropdown.Item>
              <Dropdown.Item
                as={NavLink}
                to="/certificate"
                onClick={closeMobileNavbar}
              >
                <TbCertificate /> My Certificate
              </Dropdown.Item>
              <Dropdown.Item as={NavLink} to="/" onClick={closeMobileNavbar}>
                <FiLogOut /> Log Out
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </nav>
    </>
  );
};

export default Team_D_HeaderV2; // Export the Team_D_HeaderV2 component
