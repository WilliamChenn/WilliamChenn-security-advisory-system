// src/pages/Settings.js
import React, { useState } from 'react';
import Header from '../components/Header';
import VendorsSection from './settingsSubpages/VendorsSection';
import Profile from './settingsSubpages/Profile';
import SecurityAlerts from './settingsSubpages/SecurityAlertsPage';
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
  const [activeSection, setActiveSection] = useState('vendors');
  const [showSidebar, setShowSidebar] = useState(false);
  const userId = 1; // Replace this with the actual logic to get the current user's ID

  const renderSection = () => {
    switch (activeSection) {
      case 'vendors':
        return <VendorsSection />;
      case 'profile':
        return <Profile userId={userId} profilePictures={profilePictures} />;
      case 'alerts':
        return <SecurityAlerts />;
      default:
        return null;
    }
  };

  return (
    <div className="settings-page">
      <Header />
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
