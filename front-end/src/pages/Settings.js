import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Vendors from '../components/Vendors'; // Import the Vendors component
import './Settings.css';

function Settings() {
  const [displayName, setDisplayName] = useState('');
  const [profilePicture, setProfilePicture] = useState(null);
  const [availableVendors, setAvailableVendors] = useState([]);
  const [userVendors, setUserVendors] = useState([]);
  const [loadingVendor, setLoadingVendor] = useState(null); // Track the specific vendor being added

  useEffect(() => {
    // Fetch all vendors from the backend
    const fetchAvailableVendors = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/v1/vendors', {
          credentials: 'include',
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setAvailableVendors(data);
      } catch (error) {
        console.error('Error fetching available vendors:', error);
      }
    };

    fetchAvailableVendors();
  }, []);

  useEffect(() => {
    // Fetch user vendors from the backend
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

  const handleDisplayNameChange = (e) => {
    setDisplayName(e.target.value);
  };

  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePicture(URL.createObjectURL(file));
    }
  };

  const handleSubmitProfile = (e) => {
    e.preventDefault();
    // Handle form submission logic here (e.g., API call)
    console.log('Display Name:', displayName);
    console.log('Profile Picture:', profilePicture);
  };

  const handleVendorCheck = async (event) => {
    const { value, checked } = event.target;
    const vendorId = parseInt(value);

    if (checked) {
      // Add vendor
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
      // Remove vendor
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

  return (
    <div className="settings-page">
      <Header />
      <div className="settings-container">
        <div className="settings-form">
          <h2>Settings</h2>
          <form onSubmit={handleSubmitProfile}>
            <div className="form-group">
              <label htmlFor="displayName">Display Name:</label>
              <input
                type="text"
                id="displayName"
                value={displayName}
                onChange={handleDisplayNameChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="profilePicture">Profile Picture:</label>
              <input
                type="file"
                id="profilePicture"
                accept="image/*"
                onChange={handleProfilePictureChange}
              />
              {profilePicture && (
                <div className="profile-picture-preview">
                  <img src={profilePicture} alt="Profile Preview" />
                </div>
              )}
            </div>

            <button type="submit">Save Changes</button>
          </form>
        </div>
        <div className="vendor-selection">
          <h2>Available Vendors</h2>
          <ul className="vendor-list">
            {availableVendors.length > 0 ? (
              availableVendors.map((vendor) => (
                <li key={vendor.id}>
                  <input
                    type="checkbox"
                    id={`vendor-${vendor.id}`}
                    value={vendor.id}
                    checked={userVendors.some((v) => v.id === vendor.id)}
                    onChange={handleVendorCheck}
                  />
                  <label htmlFor={`vendor-${vendor.id}`}>{vendor.name}</label>
                </li>
              ))
            ) : (
              <li>No vendors available</li>
            )}
          </ul>
        </div>
        <div className="vendors-section">
          <Vendors vendors={userVendors} setVendors={setUserVendors} loadingVendor={loadingVendor} setLoadingVendor={setLoadingVendor} /> {/* Pass props to Vendors component */}
        </div>
      </div>
    </div>
  );
}

export default Settings;
