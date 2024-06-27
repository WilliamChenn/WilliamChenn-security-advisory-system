import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import './NavigationBar.css';
import Login from './Login'; 

function NavigationBar() {
  const [navVisible, setNavVisible] = useState(false);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [videoVisible, setVideoVisible] = useState(false);

  const toggleNav = () => {
    setNavVisible(!navVisible);
  };

  const toggleDrawer = () => {
    setDrawerVisible(!drawerVisible);
  };

  const toggleVideo = () => {
    console.log("About clicked");
    setVideoVisible(true);
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
          <Nav.Link as={Link} to="/table" onClick={() => setNavVisible(false)}>Search</Nav.Link>
          <Nav.Link onClick={toggleDrawer}>Login</Nav.Link>
        </Nav>
      </div>
      <Login isVisible={drawerVisible} onClose={toggleDrawer} />
      {videoVisible && (
        <div className="video-container">
          <video width="600" controls autoPlay>
            <source src="/a.mov" type="video/quicktime" />
            Your browser does not support the video tag.
          </video>
        </div>
      )}
    </div>
  );
}

export default NavigationBar;
