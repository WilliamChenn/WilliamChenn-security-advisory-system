import React from 'react';
import './Header.css'; // Assuming you have a separate CSS file for styling
import NavigationBar from './NavigationBar.js'; // Ensure you have a NavigationBar component

const Header = () => {
  return (
    <header className="duke-banner">
      <div className="duke-container">
        <div className="duke-logo">Duke</div>
        <div className="duke-entity-name">| IT Security Advisory Dashboard</div>
        <div className="navbar-container">
          <NavigationBar />
        </div>
      </div>
    </header>
  );
};
export default Header;
