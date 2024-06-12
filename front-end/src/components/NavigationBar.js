import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import './NavigationBar.css';

function NavigationBar() {
  const [navVisible, setNavVisible] = useState(false);

  const toggleNav = () => {
    setNavVisible(!navVisible);
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
                <Nav.Link as={Link} to="/search">Search</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      )}
    </div>
  );
}

export default NavigationBar;