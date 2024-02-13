/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import React, { useState, useEffect } from "react";
import { NavLink, Link } from "react-router-dom";
  import "../styles/Auth.css";
import TsukidenLogo from "/src/assets/TeamAassets/companyLogo.png";
import Dropdown from "react-bootstrap/Dropdown";
import { FaRegUserCircle } from "react-icons/fa";
import { TbCertificate } from "react-icons/tb";
import { FiLogOut } from "react-icons/fi";
import NavDropdown from "react-bootstrap/NavDropdown";
import { useAuth } from "./AuthContext"; // Import useAuth from your AuthContext

// Function to get user image type
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

const UserNavigation = ({ onUserDataFetched, openModal }) => {
  const { isLoggedIn, handleLogout } = useAuth();
  const [clicked, setClicked] = useState(false);
  const [userData, setUserData] = useState({});

  const handleClick = () => {
    setClicked(!clicked);
  };

  const closeMobileNavbar = () => {
    setClicked(false);
    // Assuming setMyCourseActive is a state setter function, replace it with the appropriate state management logic
    // setMyCourseActive(false);
  };

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

  useEffect(() => {
    if (clicked) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [clicked]);

  return (
    <>
      <nav className="navbar_TeamD">
        <NavLink to="/" onClick={closeMobileNavbar}>
          <img className="teamDimg" src={TsukidenLogo} alt="Logo" />
        </NavLink>
        <div>
          <ul id="navbar" className={clicked ? "active" : ""}>
            <li className="profile_info">
              <span className="profile_info_con">
                <img src={`data:image/${getUserImageType(userData.profilePicture)};base64,${userData.profilePicture}`} alt="Logo" />
                <span className="profile_info_name">
                  <p className="profile_fName">{userData.firstName}</p>
                </span>
              </span>
            </li>
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
                Certificate
              </NavLink>
            </li>
            <li className="divider"></li>
            <li>
              <NavLink
                to="/dashboard"
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
                <NavDropdown.Item href="/course" activeClassName="active">
                  Problem Overview
                </NavDropdown.Item>
                <NavDropdown.Item href="/assessment" activeClassName="active">
                  Assessment
                </NavDropdown.Item>
              </NavDropdown>
            </li>
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
        <div id="mobile" onClick={handleClick}>
          {clicked ? (
            <i className="fas fa-times"></i>
          ) : (
            <img
              src={`data:image/${getUserImageType(userData.profilePicture)};base64,${userData.profilePicture}`}
              alt="Logo"
              className="mobile_profile"
            />
          )}
        </div>
        <div className="profile_side">
          {isLoggedIn ? (
            <Dropdown>
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
                <Dropdown.Item href="#" onClick={openModal}>
                  <FaRegUserCircle /> Profile
                </Dropdown.Item>
                <Dropdown.Item
                  as={NavLink}
                  to="/certificate"
                  onClick={closeMobileNavbar}
                >
                  <TbCertificate /> My Certificate
                </Dropdown.Item>
                <Dropdown.Item as={NavLink} to="/" onClick={handleLogout}>
                  <FiLogOut /> Log Out
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          ) : (
            <>
              <Link to="/register">
                <button id="register">Register</button>
              </Link>
              <Link to="/login">
                <button id="login">Log In</button>
              </Link>
            </>
          )}
        </div>
      </nav>
    </>
  );
};

export default UserNavigation;
