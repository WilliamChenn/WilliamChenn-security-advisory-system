import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';
import './NavigationBar.css';

function NavigationBar() {
  const [navVisible, setNavVisible] = useState(false);
  const [videoVisible, setVideoVisible] = useState(false);
  const navigate = useNavigate(); // Hook to navigate programmatically

  const toggleNav = () => {
    setNavVisible(!navVisible);
  };

  const toggleVideo = () => {
    console.log("About clicked");
    setVideoVisible(true);
  };

  const handleLogout = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/v3/users/logout', {
        method: 'POST',
        credentials: 'include', // Ensure cookies are included in the request
      });

      if (response.ok) {
        // Clear any authentication tokens or user data stored on the client side
        localStorage.removeItem('authToken'); // Example: removing a token from local storage
        sessionStorage.removeItem('authToken'); // Example: removing a token from session storage
        // Optionally, clear all local storage/session storage items
        localStorage.clear();
        sessionStorage.clear();

        // Redirect to the Shibboleth logout URL
        window.location.href = 'https://shib.oit.duke.edu/cgi-bin/logout.pl?logoutWithoutPrompt=1&returnto=http://www.oit.duke.edu';
      } else {
        console.error("Failed to logout");
      }
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <div className="navigation-bar">
      <div className={`nav ${navVisible ? 'open' : ''}`} onClick={toggleNav}>
        <div className="one"></div>
        <div className="two"></div>
        <div className="three"></div>
      </div>
      <div className={`dropdown-box ${navVisible ? 'show' : ''}`}>
        <Nav className="flex-column">
          <Nav.Link as={Link} to="/" onClick={() => setNavVisible(false)}>Home</Nav.Link>
          <Nav.Link as={Link} to="/about" onClick={toggleVideo}>About</Nav.Link>
          <Nav.Link as={Link} to="/table" onClick={() => setNavVisible(false)}>Advisories</Nav.Link>
          <Nav.Link as={Link} to="/settings" onClick={() => setNavVisible(false)}>Settings</Nav.Link>
          <Nav.Link onClick={handleLogout}>Logout</Nav.Link> {/* Updated Logout Button */}
        </Nav>
      </div>
    </div>
  );
}

export default NavigationBar;
