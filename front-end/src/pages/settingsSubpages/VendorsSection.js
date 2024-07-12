// src/pages/settingsSubpages/VendorsSection.js
import React, { useState, useEffect } from 'react';
import './VendorsSection.css';
import Vendors from '../../components/Vendors';

const VendorsSection = () => {
  const [availableVendors, setAvailableVendors] = useState([]);
  const [userVendors, setUserVendors] = useState([]);
  const [loadingVendor, setLoadingVendor] = useState(null);

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
          <Vendors vendors={userVendors} setVendors={setUserVendors} loadingVendor={loadingVendor} setLoadingVendor={setLoadingVendor} />
        </div>
      </div>
    </div>
  );
};

export default VendorsSection;
