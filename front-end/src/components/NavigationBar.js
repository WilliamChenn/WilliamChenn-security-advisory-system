import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import './NavigationBar.css';
import Login from './Login'; // Import the SlidingDrawer component

function NavigationBar() {
  const [navVisible, setNavVisible] = useState(false);
  const [drawerVisible, setDrawerVisible] = useState(false); // State to manage drawer visibility

  const toggleNav = () => {
    setNavVisible(!navVisible);
  };

  const toggleDrawer = () => {
    setDrawerVisible(!drawerVisible);
  };

  return (
    <div className="navigation-bar">
      <div className="nav" onClick={toggleNav}>
        <div className="one"></div>
        <div className="two"></div>
        <div className="three"></div>
      </div>
      {navVisible && (
        <Navbar expand="lg" bg="light" variant="light" className="expanded-navbar">
          <Container>
            <Navbar.Collapse id="basic-navbar-nav" className="navbar-collapse">
              <Nav className="me-auto">
                <Nav.Link as={Link} to="/">Home</Nav.Link>
                <Nav.Link as={Link} to="/about">About</Nav.Link>
                <Nav.Link as={Link} to="/table">Search</Nav.Link>
                <Nav.Link onClick={toggleDrawer}>Login</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      )}
      <Login isVisible={drawerVisible} onClose={toggleDrawer} /> {/* Add the SlidingDrawer component */}
    </div>
  );
}

export default NavigationBar;
