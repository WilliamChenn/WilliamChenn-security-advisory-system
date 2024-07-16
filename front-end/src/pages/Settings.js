import React, { useState } from 'react';
import Header from '../components/Header';
import VendorsSection from './settingsSubpages/VendorsSection';
import Profile from './settingsSubpages/Profile';
import SecurityAlerts from './settingsSubpages/SecurityAlertsPage';
import './Settings.css';
import Footer from '../components/Footer';
import { useUserProfile } from '../App';

const handleLogout = async () => {
  try {
    const response = await fetch('http://localhost:3001/api/v3/users/logout', {
      method: 'POST',
      credentials: 'include', // Ensure cookies are included in the request
    });

    if (response.ok) {
      localStorage.removeItem('authToken');
      sessionStorage.removeItem('authToken');
      localStorage.clear();
      sessionStorage.clear();

      window.location.href = 'https://shib.oit.duke.edu/cgi-bin/logout.pl?logoutWithoutPrompt=1&returnto=http://www.oit.duke.edu';
    } else {
      console.error("Failed to logout");
    }
  } catch (error) {
    console.error("Error during logout:", error);
  }
};

function Settings() {
  const [activeSection, setActiveSection] = useState('profile'); // Set default to 'profile'
  const { profilePicture, updateProfilePictureIndex } = useUserProfile();
  const userId = 1; // Replace this with the actual logic to get the current user's ID

  const renderSection = () => {
    switch (activeSection) {
      case 'vendors':
        return <VendorsSection />;
      case 'profile':
        return <Profile userId={userId} updateProfilePictureIndex={updateProfilePictureIndex} />;
      case 'alerts':
        return <SecurityAlerts />;
      default:
        return null;
    }
  };

  return (
    <div className="settings-page">
      <div className="settings-container">
        <div className="sidebar">
          <ul>
            <li onClick={() => setActiveSection('profile')}>Profile</li>
            <li onClick={() => setActiveSection('vendors')}>Vendors</li>
            <li onClick={() => setActiveSection('alerts')}>Security Alerts</li>
            <li onClick={handleLogout}>Logout</li>
          </ul>
        </div>
        <div className="content">
          {renderSection()}
        </div>
      </div>
    </div>
  );
}

export default Settings;
