// src/pages/settingsSubpages/Profile.js
import React, { useState, useEffect, useCallback } from 'react';
import './Profile.css';
import { useUserProfile } from '../../App';
import dog from '../../images/dog.png';
import cat from '../../images/cat.png';
import capybara from '../../images/capybara.png';
import kelly from '../../images/kelly.png';
import katherine from '../../images/katherine.png';
import unicorn from '../../images/unicorn.png';
import unicorn1 from '../../images/unicorn1.png';

const profilePictures = [dog, cat, capybara, kelly, katherine, unicorn, unicorn1];

const Profile = ({ userId }) => {
  const { profilePicture, updateProfilePictureIndex } = useUserProfile();
  const [profile, setProfile] = useState({
    profilePictureIndex: 0,
    profilePicture: dog,
    userName: '',
    userEmail: '',
    userNetID: ''
  });

  const [dropdownVisible, setDropdownVisible] = useState(false);

  const fetchProfile = useCallback(async () => {
    try {
      const response = await fetch(`http://localhost:3001/api/v3/users/${userId}/email_and_uid_and_name`, {
        credentials: 'include',
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setProfile({
        profilePictureIndex: data.profile_picture_index || 0,
        profilePicture: profilePictures[data.profile_picture_index] || dog,
        userName: data.name,
        userEmail: data.email,
        userNetID: data.uid
      });
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  }, [userId]);

  const handleProfilePictureClick = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const handleProfilePictureSelect = async (index) => {
    await updateProfilePictureIndex(index);
    setProfile((prevProfile) => ({
      ...prevProfile,
      profilePictureIndex: index,
      profilePicture: profilePictures[index]
    }));
    setDropdownVisible(false);
  };

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  return (
    <div className="profile-container">
      <div className="profile-sidebar">
        <div className="profile-greeting">
          <h2>Hello, {profile.userName}!</h2>
          <p>This is your profile page. You can see the vendors you have selected and want to receive notifications from.</p>
          <button className="edit-profile-button">Edit Profile</button>
        </div>
      </div>

      <div className="profile-info">
        <div className="profile-details">
          <h2>User Profile</h2>
          <div className="profile-row">
            <h3>Username:</h3>
            <p>{profile.userName}</p>
          </div>
          <div className="profile-row">
            <h3>Email: </h3>
            <p>{profile.userEmail}</p>
          </div>
          <div className="profile-row">
            <h3>Net ID:</h3>
            <p>{profile.userNetID}</p>
          </div>
        </div>
        <div className="profile-picturepage-wrapper">
          <div className="profile-picture-container" onClick={handleProfilePictureClick}>
            <img src={profile.profilePicture} alt="Profile" className="profile-picturepage" />
          </div>
          {dropdownVisible && (
            <div className="profile-dropdown" onMouseLeave={() => setDropdownVisible(false)}>
              {profilePictures.map((picture, index) => (
                <img
                  key={index}
                  src={picture}
                  alt={`Profile option ${index + 1}`}
                  className={`profile-thumbnail ${profile.profilePictureIndex === index ? 'selected' : ''}`}
                  onClick={() => handleProfilePictureSelect(index)}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
