// src/pages/settingsSubpages/Profile.js
import React, { useState, useEffect, useCallback } from 'react';
import './Profile.css';
import dog from '../../images/dog.png'; // Default profile picture if needed

const Profile = ({ userId, profilePictures }) => {
  const [profile, setProfile] = useState({
    profilePictureIndex: 0,
    profilePicture: dog,
    userName: '',
    userEmail: '',
    userNetID: ''
  });

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
  }, [userId, profilePictures]);

  const updateProfilePictureIndex = async (index) => {
    try {
      const response = await fetch(`http://localhost:3001/api/v3/users/set_profile_picture_index`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ profile_picture_index: index }),
        credentials: 'include',
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      setProfile((prevProfile) => ({
        ...prevProfile,
        profilePictureIndex: index,
        profilePicture: profilePictures[index]
      }));
    } catch (error) {
      console.error('Error updating profile picture:', error);
    }
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
          <img src={profile.profilePicture} alt="Profile" className="profile-picturepage" />
        </div>
      </div>
    </div>
  );
};

export default Profile;
