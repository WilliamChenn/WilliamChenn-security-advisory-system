import React, { useState, useEffect, useCallback } from 'react';
import Header from '../components/Header';
import Vendors from '../components/Vendors';
import SecurityAlerts from './SecurityAlerts';
import './Settings.css';
import dog from '../images/dog.png';
import cat from '../images/cat.png';
import capybara from '../images/capybara.png';
import kelly from '../images/kelly.png';
import katherine from '../images/katherine.png';
import unicorn from '../images/unicorn.png';
import unicorn1 from '../images/unicorn1.png';
import Footer from '../components/Footer';

const profilePictures = [dog, cat, capybara, kelly, katherine, unicorn, unicorn1];

const useUserProfile = (userId) => {
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
  }, [userId]);

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

  return { ...profile, updateProfilePictureIndex, fetchProfile };
};

function Settings() {
  const [activeSection, setActiveSection] = useState('vendors');
  const [availableVendors, setAvailableVendors] = useState([]);
  const [userVendors, setUserVendors] = useState([]);
  const [loadingVendor, setLoadingVendor] = useState(null);
  const [showSidebar, setShowSidebar] = useState(false);
  const userId = 1; // Replace this with the actual logic to get the current user's ID

  const { profilePicture, userName, userEmail, userNetID, updateProfilePictureIndex, fetchProfile } = useUserProfile(userId);

  useEffect(() => {
    const fetchAvailableVendors = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/v1/vendors', {
          credentials: 'include',
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        const vendorsWithLogo = data.filter(vendor => vendor.vendor_url);
        vendorsWithLogo.sort((a, b) => a.name.localeCompare(b.name));
        setAvailableVendors(vendorsWithLogo);
      } catch (error) {
        console.error('Error fetching available vendors:', error);
      }
    };

    fetchAvailableVendors();
  }, []);

  useEffect(() => {
    const fetchUserVendors = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/v1/user_vendors', {
          credentials: 'include',
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setUserVendors(data);
      } catch (error) {
        console.error('Error fetching user vendors:', error);
      }
    };

    fetchUserVendors();
  }, []);

  const handleVendorCheck = async (event) => {
    const { value, checked } = event.target;
    const vendorId = parseInt(value);

    if (checked) {
      try {
        const response = await fetch(`http://localhost:3001/api/v3/vendors/${vendorId}/add_user`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const result = await response.json();
        const data = result.vendor;

        if (data.vendor_url) {
          setUserVendors((prevVendors) => [
            ...prevVendors,
            { id: vendorId, name: data.name, logo: data.vendor_url }
          ]);
        } else {
          console.error('Vendor logo URL is missing:', data);
          alert('Failed to add vendor. Vendor logo URL is missing.');
        }
      } catch (error) {
        console.error('Error adding vendor:', error);
      }
    } else {
      try {
        const response = await fetch(`http://localhost:3001/api/v3/vendors/${vendorId}/remove_user`, {
          method: 'DELETE',
          credentials: 'include',
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        setUserVendors((prevVendors) => prevVendors.filter((vendor) => vendor.id !== vendorId));
      } catch (error) {
        console.error('Error deleting vendor:', error);
      }
    }
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

  const renderSection = () => {
    switch (activeSection) {
      case 'vendors':
        return (
          <div className="settings-container">
            <div className="left-section">
              <div className="vendor-selection">
                <h2>Available Vendors</h2>
                <ul className="vendor-list">
                  {availableVendors.length > 0 ? (
                    availableVendors.map((vendor) => (
                      <li key={vendor.id} className="vendor-list-item">
                        <div className="vendor-item-wrapper">
                          <input
                            type="checkbox"
                            id={`vendor-${vendor.id}`}
                            value={vendor.id}
                            checked={userVendors.some((v) => v.id === vendor.id)}
                            onChange={handleVendorCheck}
                            className="vendor-checkbox"
                          />
                          <label htmlFor={`vendor-${vendor.id}`} className="vendor-label">{vendor.name}</label>
                          <img src={vendor.vendor_url} alt={vendor.name} className="vendor-logo-small" />
                        </div>
                      </li>
                    ))
                  ) : (
                    <li>No vendors available</li>
                  )}
                </ul>
              </div>
            </div>
            <div className="middle-section">
              <div className="vendors-section vendors-page">
                <Vendors vendors={userVendors} setVendors={setUserVendors} loadingVendor={loadingVendor} setLoadingVendor={setLoadingVendor} /> {/* Pass props to Vendors component */}
              </div>
            </div>
          </div>
        );
      case 'profile':
        return (
          <div className="profile-container">
            <div className="profile-sidebar">
              <div className="profile-greeting">
                <h2>Hello, {userName}!</h2>
                <p>This is your profile page. You can see the vendors you have selected and want to receive notifications from.</p>
                <button className="edit-profile-button">Edit Profile</button>
              </div>
            </div>

            <div className="profile-info">
              <div className="profile-details">
                <h2>User Profile</h2>
                <div className="profile-row">
                  <h3>Username:</h3>
                  <p>{userName}</p>
                </div>
                <div className="profile-row">
                  <h3>Email: </h3>
                  <p>{userEmail}</p>
                </div>
                <div className="profile-row">
                  <h3>Net ID:</h3>
                  <p>{userNetID}</p>
                </div>
              </div>
              <div className="profile-picturepage-wrapper">
                <img src={profilePicture} alt="Profile" className="profile-picturepage" />
              </div>
            </div>
          </div>
        );
      case 'alerts':
        return <SecurityAlerts />;
      default:
        return null;
    }
  };

  return (
    <div className="settings-page">
      <Header profilePicture={profilePicture} updateProfilePictureIndex={updateProfilePictureIndex} />
      <button className="sidebar-toggle" onClick={() => setShowSidebar(!showSidebar)}>
        ☰
      </button>
      <div className={`sidebar ${showSidebar ? 'show' : ''}`}>
        <ul>
          <li onClick={() => setActiveSection('profile')}>Profile</li>
          <li onClick={() => setActiveSection('vendors')}>Vendors</li>
          <li onClick={() => setActiveSection('alerts')}>Security Alerts</li>
          <li onClick={handleLogout}>Logout</li>
        </ul>
      </div>
      <div className={`content ${showSidebar ? 'shifted' : ''}`}>
        {renderSection()}
      </div>
      <Footer />
    </div>
  );
}

export default Settings;
