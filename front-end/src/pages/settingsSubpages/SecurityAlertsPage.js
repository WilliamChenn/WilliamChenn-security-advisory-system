import React, { useState, useEffect } from 'react';
import './SecurityAlertsPage.css';

function SecurityAlerts() {
    const [showForm, setShowForm] = useState(false);
    const [vendor, setVendor] = useState('');
    const [alerts, setAlerts] = useState([]);
    const [vendorList, setVendorList] = useState([]);
    const [duplicateVendorWarning, setDuplicateVendorWarning] = useState(false);
    const [frequency, setFrequency] = useState('');
    const [frequencyStatus, setFrequencyStatus] = useState('');
    const [severity, setSeverity] = useState('');
    const [severityStatus, setSeverityStatus] = useState('');

    useEffect(() => {
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

        const fetchUserNotificationVendors = async () => {
            try {
                const response = await fetch('http://localhost:3001/api/v1/user_notification_vendors', {
                    credentials: 'include',
                });
                if (response.ok) {
                    const data = await response.json();
                    const formattedAlerts = data.map((alert) => ({
                        id: alert.id,
                        vendor: {
                            id: alert.vendor_id,
                            name: alert.vendor.name,
                            logo: alert.vendor.vendor_url,
                        },
                    }));
                    setAlerts(formattedAlerts);
                } else {
                    console.error('Failed to fetch user notification vendors:', response.statusText);
                }
            } catch (error) {
                console.error('Error fetching user notification vendors:', error);
            }
        };

        const fetchUserFrequency = async () => {
            try {
                const response = await fetch('http://localhost:3001/api/v1/user_frequencies', {
                    credentials: 'include',
                });
                if (response.ok) {
                    const data = await response.json();
                    setFrequency(data.frequency);
                    setFrequencyStatus(`${data.frequency}`);
                } else {
                    console.error('Failed to fetch user frequency:', response.statusText);
                }
            } catch (error) {
                console.error('Error fetching user frequency:', error);
            }
        };

        const fetchUserSeverity = async () => {
            try {
                const response = await fetch('http://localhost:3001/api/v1/user_severities', {
                    credentials: 'include',
                });
                if (response.ok) {
                    const data = await response.json();
                    setSeverityStatus(data.severity);
                    setSeverity(data.severity);
                } else {
                    console.error('Failed to fetch severity:', response.statusText);
                }
            } catch (error) {
                console.error('Error fetching severity:', error);
            }
        };

        fetchVendors();
        fetchUserNotificationVendors();
        fetchUserFrequency();
        fetchUserSeverity();
    }, []);

    const getAuthToken = () => {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; auth_token=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
    };

    const handleFrequencyChange = async (selectedFrequency) => {
        try {
            // First delete existing frequency
            await fetch('http://localhost:3001/api/v1/user_frequencies', {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${getAuthToken()}`,
                },
                credentials: 'include',
            });

            // Then create new frequency
            const response = await fetch('http://localhost:3001/api/v1/user_frequencies', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${getAuthToken()}`,
                },
                body: JSON.stringify({
                    user_frequency: {
                        frequency: selectedFrequency,
                    },
                }),
                credentials: 'include',
            });

            if (response.ok) {
                setFrequency(selectedFrequency);
                setFrequencyStatus(`${selectedFrequency}`);
            } else {
                console.error('Failed to update frequency:', response.statusText);
            }
        } catch (error) {
            console.error('Error updating frequency:', error);
        }
    };

    const handleSeverityChange = async (selectedSeverity) => {
        try {
            // Check if there's an existing severity entry
            const responseCheck = await fetch('http://localhost:3001/api/v1/user_severities', {
                credentials: 'include',
            });
    
            if (responseCheck.ok) {
                // There is an existing severity entry, so delete it
                await fetch('http://localhost:3001/api/v1/user_severities', {
                    method: 'DELETE',
                    headers: {
                        Authorization: `Bearer ${getAuthToken()}`,
                    },
                    credentials: 'include',
                });
            } else if (responseCheck.status === 404) {
                // No existing severity entry found, do nothing
            } else {
                console.error('Failed to check severity:', responseCheck.statusText);
                return;
            }
    
            // Create new severity entry
            const response = await fetch('http://localhost:3001/api/v1/user_severities', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${getAuthToken()}`,
                },
                body: JSON.stringify({
                    user_severity: { severity: selectedSeverity },
                }),
                credentials: 'include',
            });
    
            if (response.ok) {
                setSeverity(selectedSeverity);  // Update severity state
                setSeverityStatus(selectedSeverity);  // Update severityStatus state if needed
            } else {
                console.error('Failed to update severity:', response.statusText);
            }
        } catch (error) {
            console.error('Error updating severity:', error);
        }
    };

    const handleAddClick = () => {
        setShowForm(true);
        setDuplicateVendorWarning(false);
    };

    const handleCancelClick = () => {
        setShowForm(false);
        resetForm();
        setDuplicateVendorWarning(false);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const selectedVendor = vendorList.find((v) => v.name === vendor);

        const isVendorAlreadyAdded = alerts.some((alert) => alert.vendor.name === selectedVendor.name);

        if (isVendorAlreadyAdded) {
            setDuplicateVendorWarning(true);
            return;
        }

        try {
            const response = await fetch('http://localhost:3001/api/v1/user_notification_vendors', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${getAuthToken()}`,
                },
                body: JSON.stringify({
                    vendor_id: selectedVendor.id,
                }),
                credentials: 'include',
            });

            if (response.ok) {
                const responseData = await response.json();
                const newAlert = {
                    id: responseData.id,
                    vendor: {
                        id: selectedVendor.id,
                        name: selectedVendor.name,
                        logo: selectedVendor.logo,
                    },
                };
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
                    Authorization: `Bearer ${getAuthToken()}`,
                },
                credentials: 'include',
            });

            if (response.ok) {
                const updatedAlerts = alerts.filter((alert) => alert.vendor.id !== vendorId);
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
        <div className="security-alerts-container1">
            <h2 className="h21">Email Notification Preferences</h2>
            <div className="frequency-selection1">
                <br />
                <h3 className="h31">Frequency:</h3>
                {frequencyStatus && <p className="frequency-status1">Current frequency: <strong style={{ color: '#0417aa' }}>{frequencyStatus}</strong></p>}
                <select className="select1" value={frequency} onChange={(e) => handleFrequencyChange(e.target.value)}>
                    <option value="daily">Daily</option>
                    <option value="weekly">Weekly</option>
                    <option value="biweekly">Biweekly</option>
                    <option value="monthly">Monthly</option>
                </select>
            </div>

            <div className="severity-selection1">
                <br />
                <h3 className="h31">CVE Severity:</h3>
                {severityStatus && <p className="severity-status1">Current severity: <strong style={{ color: '#0417aa' }}>{severityStatus}</strong></p>}
                <select className="select1" value={severity} onChange={(e) => handleSeverityChange(e.target.value)}>
                    <option value="all">All (CVSS: 1-10)</option>
                    <option value="medium">Medium and up (CVSS: 4-10)</option>
                    <option value="high">High and up (CVSS: 7-10)</option>
                    <option value="critical">Critical (CVSS: 9-10)</option>
                </select>
            </div>

            <div className="alerts-list1">
                <h3 className="h31">Vendors:</h3>
                {alerts.length === 0 ? (
                    <p>No Vendors Selected.</p>
                ) : (
                    <ul className="vendor-list1">
                        {alerts.map((alert, index) => (
                            <li key={alert.id} className="alert-item1">
                                <div className="vendor-info1">
                                    <img src={alert.vendor.logo} alt={alert.vendor.name} className="vendor-logo1" />
                                    <p><strong>{alert.vendor.name}</strong></p>
                                </div>
                                <button className="button1" id="delete-button1" onClick={() => handleDeleteAlert(index, alert.vendor.id)}>Delete</button>
                            </li>
                        ))}
                    </ul>
                )}

            </div>

            <button className="add-vendor-button1" onClick={handleAddClick}>Add Vendor</button>

            {showForm && (
                <form className="form1" onSubmit={handleSubmit}>
                    <label className="label1">
                        <br />
                        Vendor:
                        <select className="select1" value={vendor} onChange={(e) => setVendor(e.target.value)} required>
                            <option value="">Select Vendor</option>
                            {vendorList.map((v) => (
                                <option key={v.id} value={v.name}>
                                    {v.name}
                                </option>
                            ))}
                        </select>
                    </label>

                    <div className="form-buttons1">
                        <button className="button1" type="submit">Submit</button>
                        <button className="button1" type="button" onClick={handleCancelClick}>
                            Cancel
                        </button>
                    </div>
                </form>
            )}

            {duplicateVendorWarning && (
                <div className="popup1">
                    <p>Vendor has already been added.</p>
                    <button className="button1" onClick={handleDismissWarning}>OK</button>
                </div>
            )}
        </div>
    );

}

export default SecurityAlerts;
