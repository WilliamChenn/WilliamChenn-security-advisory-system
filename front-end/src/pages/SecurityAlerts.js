import React, { useState, useEffect } from 'react';
import './SecurityAlerts.css';

function SecurityAlerts() {
  const [showForm, setShowForm] = useState(false);
  const [vendor, setVendor] = useState('');
  const [frequency, setFrequency] = useState('daily'); // Default frequency
  const [time, setTime] = useState('12:00 AM'); // Default time
  const [alerts, setAlerts] = useState([]);
  const [vendorList, setVendorList] = useState([]);
  const [duplicateVendorWarning, setDuplicateVendorWarning] = useState(false); // State for showing duplicate vendor warning
  const [isFrequencySubmitted, setIsFrequencySubmitted] = useState(false); // State for frequency submission

  useEffect(() => {
    // Fetch vendor list from API
    const fetchVendors = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/v1/vendors', {
          credentials: 'include',
        });
        const data = await response.json();
        const formattedVendors = data
          .filter((vendor) => vendor.name && vendor.vendor_url)
          .map((vendor) => ({
            id: vendor.id,
            name: vendor.name,
            logo: vendor.vendor_url,
          }));
        setVendorList(formattedVendors);
      } catch (error) {
        console.error('Error fetching vendors:', error);
      }
    };

    fetchVendors();
  }, []);

  const getAuthToken = () => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; auth_token=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
  }

  const handleAddClick = () => {
    setShowForm(true);
    setDuplicateVendorWarning(false); // Reset duplicate vendor warning state
  };

  const handleCancelClick = () => {
    setShowForm(false);
    resetForm();
    setDuplicateVendorWarning(false); // Reset duplicate vendor warning state
  };

  const handleSubmitFrequency = () => {
    setIsFrequencySubmitted(true);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const selectedVendor = vendorList.find((v) => v.name === vendor);

    // Check if the vendor already exists
    const isVendorAlreadyAdded = alerts.some(alert => alert.vendor.name === selectedVendor.name);

    if (isVendorAlreadyAdded) {
      setDuplicateVendorWarning(true); // Show warning
      return;
    }

    try {
      const response = await fetch('http://localhost:3001/api/v1/user_notification_vendors', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${getAuthToken()}` // Include auth token
        },
        body: JSON.stringify({
          vendor_id: selectedVendor.id, // Pass vendor_id to match backend parameter
          frequency: frequency,
          time: time
        }),
        credentials: 'include'
      });

      if (response.ok) {
        const responseData = await response.json();
        const newAlert = { vendor: selectedVendor, frequency, time };
        setAlerts([...alerts, newAlert]);
        resetForm();
        setShowForm(false);
      } else {
        console.error('Failed to add vendor notification:', response.statusText);
      }
    } catch (error) {
      console.error('Error adding vendor notification:', error);
    }
  };

  const handleDeleteAlert = async (index, vendorId) => {
    try {
      const response = await fetch(`http://localhost:3001/api/v1/user_notification_vendors/${vendorId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${getAuthToken()}` // Include auth token
        },
        credentials: 'include'
      });

      if (response.ok) {
        const updatedAlerts = alerts.filter((_, idx) => idx !== index);
        setAlerts(updatedAlerts);
      } else {
        console.error('Failed to delete vendor notification:', response.statusText);
      }
    } catch (error) {
      console.error('Error deleting vendor notification:', error);
    }
  };

  const resetForm = () => {
    setVendor('');
  };

  const handleDismissWarning = () => {
    setDuplicateVendorWarning(false);
  };

  return (
    <div className="security-alerts-container">
      <h2>Security Alert Preferences</h2>
      <div>
        <label>
          Frequency:
          <select value={frequency} onChange={(e) => setFrequency(e.target.value)} disabled={isFrequencySubmitted}>
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="bi-weekly">Bi-weekly</option>
            <option value="monthly">Monthly</option>
          </select>
        </label>
        <button onClick={handleSubmitFrequency} disabled={isFrequencySubmitted}>Submit Frequency</button>
      </div>

      {isFrequencySubmitted && (
        <button onClick={handleAddClick} disabled={showForm}>Add Vendor</button>
      )}

      {showForm && (
        <form onSubmit={handleSubmit}>
          <label>
            Vendor:
            <select
              value={vendor}
              onChange={(e) => setVendor(e.target.value)}
              required
            >
              <option value="">Select Vendor</option>
              {vendorList.map((v) => (
                <option key={v.id} value={v.name}>
                  {v.name}
                </option>
              ))}
            </select>
          </label>

          <div className="form-buttons">
            <button type="submit">Submit</button>
            <button type="button" onClick={handleCancelClick}>Cancel</button>
          </div>
        </form>
      )}

      {duplicateVendorWarning && (
        <div className="popup">
          <p>Vendor has already been added.</p>
          <button onClick={handleDismissWarning}>OK</button>
        </div>
      )}

      <div className="alerts-list">
        <h3>Current Alerts:</h3>
        {alerts.length === 0 ? (
          <p>No alerts configured.</p>
        ) : (
          <ul>
            {alerts.map((alert, index) => (
              <li key={index} className="alert-item">
                <img src={alert.vendor.logo} alt={alert.vendor.name} className="vendor-logo" />
                <div className="alert-details">
                  <p><strong>Vendor:</strong> {alert.vendor.name}</p>
                  <p><strong>Frequency:</strong> {alert.frequency}</p>
                  <p><strong>Time:</strong> {alert.time}</p>
                </div>
                <button onClick={() => handleDeleteAlert(index, alert.vendor.id)} className="delete-button">
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default SecurityAlerts;
