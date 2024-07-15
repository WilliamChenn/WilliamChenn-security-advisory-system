import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import NavigationBar from './NavigationBar.js';
import { useUserProfile } from '../App';
import dog from '../images/dog.png';
import cat from '../images/cat.png';
import capybara from '../images/capybara.png';
import kelly from '../images/kelly.png';
import katherine from '../images/katherine.png';
import unicorn from '../images/unicorn.png';
import unicorn1 from '../images/unicorn1.png';

const profilePictures = [dog, cat, capybara, kelly, katherine, unicorn, unicorn1];

const Header = () => {
  const { profilePicture, updateProfilePictureIndex } = useUserProfile();
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const handleProfilePictureClick = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const handleProfilePictureSelect = async (index) => {
    try {
      await updateProfilePictureIndex(index);
      setDropdownVisible(false); // Close dropdown after selecting a picture
    } catch (error) {
      console.error('Error updating profile picture:', error);
    }
  };

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
        <div
          className="profile-picture-wrapper"
          onClick={handleProfilePictureClick}
        >
          {profilePicture ? (
            <img src={profilePicture} alt="Profile" className="profile-picture" />
          ) : (
            <div className="profile-placeholder">User</div>
          )}
          <div
            className={`profile-dropdown ${dropdownVisible ? 'show' : ''}`}
            onMouseLeave={() => setDropdownVisible(false)}
          >
            {profilePictures.map((picture, index) => (
              <img
                key={index}
                src={picture}
                alt={`Profile option ${index + 1}`}
                className={`profile-thumbnail ${profilePicture === picture ? 'selected' : ''}`}
                onClick={() => handleProfilePictureSelect(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
