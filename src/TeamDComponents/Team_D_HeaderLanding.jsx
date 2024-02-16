import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import TsukidenLogo from "../TeamDComponents/TeamD_Assets/TsukidenLogo.png";
import "../TeamDComponents/TeamD_Css/hdrlndng.css";

// Team_D_HeaderLanding component represents the header section of a landing page or dashboard
const Team_D_HeaderLanding = () => {
  // State for managing the expanded state of the navbar
  const [expanded, setExpanded] = useState(false);

  // Function to toggle the navbar state
  const handleToggle = () => {
    setExpanded(!expanded);
  };

  // Function to close the navbar
  const closeNavbar = () => {
    setExpanded(false);
  };

  return (
    // navigation bar for users
    <Navbar expand="lg">
      {/* Logo with link to "/TeamCdashboard" */}
      <Navbar.Brand as={Link} to="/TeamCdashboard" onClick={closeNavbar}>
        <img src={TsukidenLogo} alt="Logo" />
      </Navbar.Brand>
      {/* Navbar toggle button */}
      <Navbar.Toggle aria-controls="responsive-navbar-nav" onClick={handleToggle} />
      {/* Navbar content */}
      <Navbar.Collapse id="responsive-navbar-nav">
        {/* Left-aligned navigation links */}
        <Nav className="mr-auto">
          {/* About link */}
          <Nav.Link as={NavLink} to="/about" activeClassName="active" onClick={closeNavbar}>
            About
          </Nav.Link>
          {/* Verification link */}
          <Nav.Link as={NavLink} to="/verif_nonuser" activeClassName="active" onClick={closeNavbar}>
            Verification
          </Nav.Link>
        </Nav>
        {/* Right-aligned buttons */}
        <Nav className="btns">
          {/* Log In button */}
          <Nav.Link as={Link} to="/certificate" onClick={closeNavbar}>
            <button className="login_btn">Log In</button>
          </Nav.Link>
          {/* Register button */}
          <Nav.Link as={Link} to="/" onClick={closeNavbar}>
            <button className="reg_btn">Register</button>
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Team_D_HeaderLanding; // Export the Team_D_HeaderLanding component

