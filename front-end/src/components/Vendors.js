import React, { useState, useEffect } from 'react';
import { FaPlus, FaTrash } from 'react-icons/fa';
import Spinner from 'react-bootstrap/Spinner';
import './Vendors.css';

const LoadingSpinner = () => (
  <div className="loading-spinner">
    <Spinner animation="border" role="status" size="sm">
      <span className="sr-only"></span>
    </Spinner>
  </div>
);

function Vendors({ vendors, setVendors, loadingVendor, setLoadingVendor }) {
  const [newVendor, setNewVendor] = useState({ name: '' });
  const [showForm, setShowForm] = useState(false);

  const fetchVendors = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/v3/vendors', {
        credentials: 'include',
      });
      const data = await response.json();
      const formattedVendors = data
        .filter(vendor => vendor.name && vendor.vendor_url)
        .map((vendor) => ({
          id: vendor.id,
          name: vendor.name,
          logo: vendor.vendor_url,
        }));

      // Merge the fetched vendors with the current state, avoiding duplicates
      setVendors((prevVendors) => {
        const vendorIds = prevVendors.map(vendor => vendor.id);
        const newVendors = formattedVendors.filter(vendor => !vendorIds.includes(vendor.id));
        return [...prevVendors, ...newVendors];
      });
    } catch (error) {
      console.error('Error fetching vendors:', error);
    }
  };

  useEffect(() => {
    fetchVendors(); // Initial fetch

    const interval = setInterval(fetchVendors, 5000); // Fetch every 5 seconds

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewVendor((prevVendor) => ({
      ...prevVendor,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const tempId = `temp-${new Date().getTime()}`;
    setLoadingVendor(tempId);

    const tempVendor = {
      id: tempId,
      name: newVendor.name,
      logo: null, // No logo initially
    };
    setVendors((prevVendors) => [...prevVendors, tempVendor]);

    console.log('New vendor to add:', newVendor.name);

    try {
      // Attempt to fetch the vendor ID from the backend
      let vendorResponse = await fetch(`http://localhost:3001/api/v3/vendors?name=${newVendor.name}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });

      let vendorData = await vendorResponse.json();

      if (vendorResponse.status === 404 || !vendorData.id) {
        // If vendor not found, create the vendor first
        vendorResponse = await fetch(`http://localhost:3001/api/v1/vendors/${newVendor.name}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!vendorResponse.ok) {
          throw new Error('Failed to create vendor');
        } else {
          vendorResponse = await fetch(`http://localhost:3001/api/v3/vendors?name=${newVendor.name}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
            credentials: 'include',
          });
        }
        vendorData = await vendorResponse.json();
      }

      const vendorId = vendorData.id; // Assuming the response contains the vendor ID

      // Add the user-vendor association using the fetched vendor ID
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
      console.log('Vendor added:', data);

      if (data.vendor_url) {
        setVendors((prevVendors) => [
          ...prevVendors.filter(v => v.id !== tempId),
          { id: vendorId, name: data.name, logo: data.vendor_url }
        ]);
        setNewVendor({ name: '' });
        setShowForm(false);
      } else {
        console.error('Vendor logo URL is missing:', data);
        alert('Failed to add vendor. Vendor logo URL is missing.');
      }
    } catch (error) {
      console.error('Error adding vendor:', error);
    } finally {
      setLoadingVendor(null); // Hide the spinner
    }
  };

  const handleDelete = async (vendorId) => {
    try {
      const response = await fetch(`http://localhost:3001/api/v3/vendors/${vendorId}/remove_user`, {
        method: 'DELETE',
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const updatedVendors = vendors.filter(vendor => vendor.id !== vendorId);
      setVendors(updatedVendors);
    } catch (error) {
      console.error('Error deleting vendor:', error);
    }
  };

  return (
    <div className="vendors">
      <h2>Vendors You Are Tracking</h2>
      <div className="vendor-grid">
        {vendors.map((vendor) => (
          <div key={vendor.id} className={`vendor-card ${loadingVendor === vendor.id ? 'loading' : ''}`}>
            {loadingVendor === vendor.id ? (
              <LoadingSpinner />
            ) : (
              <img src={vendor.logo} alt={vendor.name} className="vendor-logo" />
            )}
            <button className="delete-button" onClick={() => handleDelete(vendor.id)}>
              <FaTrash />
            </button>
          </div>
        ))}
        <div className="vendor-card add-vendor" onClick={() => setShowForm(!showForm)}>
          <FaPlus size={40} />
        </div>
      </div>
      {showForm && (
        <form onSubmit={handleSubmit} className="vendor-form">
          <input
            type="text"
            name="name"
            placeholder="Vendor Name"
            value={newVendor.name}
            onChange={handleChange}
            required
          />
          <button type="submit">Add Vendor</button>
        </form>
      )}
    </div>
  );
}

export default Vendors;
