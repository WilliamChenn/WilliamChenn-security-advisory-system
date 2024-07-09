import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css'; // Assuming you have a separate CSS file for styling
import NavigationBar from './NavigationBar.js'; // Ensure you have a NavigationBar component
import { useUserProfile } from '../App'; // Import the context

const Header = () => {
  const { profilePicture } = useUserProfile();

  return (
    <header className="duke-banner">
      <div className="navbar-container">
        <NavigationBar />
      </div>
      <div className="title-container">
        <Link to="/" className="duke-logo-link">
          <div className="duke-logo">Duke</div>
          <div className="duke-entity-name">| IT Security Advisory Dashboard</div>
        </Link>
      </div>
      <div className="profile-picture-container">
        {profilePicture ? (
          <Link to="/settings">
            <img src={profilePicture} alt="Profile" className="profile-picture" />
          </Link>
        ) : (
          <Link to="/settings" className="profile-placeholder-link">
            <div className="profile-placeholder">User</div>
          </Link>
        )}
      </div>
    </header>
  );
};

export default Header;
