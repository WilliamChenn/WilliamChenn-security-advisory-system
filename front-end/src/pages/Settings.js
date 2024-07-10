import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Vendors from '../components/Vendors';
import SecurityAlerts from './SecurityAlerts';
import './Settings.css';
import { useUserProfile } from '../App';

function Settings() {
  const [activeSection, setActiveSection] = useState('vendors');
  const [availableVendors, setAvailableVendors] = useState([]);
  const [userVendors, setUserVendors] = useState([]);
  const [loadingVendor, setLoadingVendor] = useState(null);
  const { profilePicture } = useUserProfile();
  const [showSidebar, setShowSidebar] = useState(false);

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
        return <div>Profile Section (Placeholder)</div>;
      case 'alerts':
        return <SecurityAlerts />;
      default:
        return null;
    }
  };

  return (
    <div className="settings-page">
      <Header profilePicture={profilePicture} />
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
    </div>
  );
}

export default Settings;
