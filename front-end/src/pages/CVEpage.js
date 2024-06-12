import React, { useState, useEffect } from 'react';
import './Vendors.css';
import { FaPlus, FaTrash } from 'react-icons/fa';

function Vendors() {
  const [vendors, setVendors] = useState([]);
  const [newVendor, setNewVendor] = useState({ name: '' });
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const fetchVendors = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/v1/cves/recent?time_range=month');
        const data = await response.json();
        const formattedVendors = data
          .map((item) => item.vendor)
          .filter(vendor => vendor.name && vendor.vendor_url)
          .map((vendor) => ({
            id: vendor.id,
            name: vendor.name,
            logo: vendor.vendor_url,
          }));
        setVendors(formattedVendors);
        saveToLocalStorage(formattedVendors);
      } catch (error) {
        console.error('Error fetching vendors:', error);
      }
    };

    const storedVendors = JSON.parse(localStorage.getItem('vendors'));
    if (storedVendors) {
      setVendors(storedVendors);
    } else {
      fetchVendors();
    }
  }, []);

  const saveToLocalStorage = (vendors) => {
    localStorage.setItem('vendors', JSON.stringify(vendors));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewVendor((prevVendor) => ({
      ...prevVendor,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('New vendor to add:', newVendor.name); // Debug log

    try {
      const response = await fetch(`http://localhost:3001/api/v1/vendors/${newVendor.name}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log('Vendor added:', data); // Debug log

      if (data.data.vendor_url) {
        const updatedVendors = [
          ...vendors,
          { id: data.data.id, name: data.data.name, logo: data.data.vendor_url },
        ];

        setVendors(updatedVendors);
        saveToLocalStorage(updatedVendors);
        setNewVendor({ name: '' });
        setShowForm(false);
      } else {
        console.error('Vendor logo URL is missing:', data);
        alert('Failed to add vendor. Vendor logo URL is missing.');
      }
    } catch (error) {
      console.error('Error adding vendor:', error);
    }
  };

  const handleDelete = async (vendorName) => {
    try {
      const response = await fetch(`http://localhost:3001/api/v1/vendors/${vendorName}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const updatedVendors = vendors.filter(vendor => vendor.name !== vendorName);
      setVendors(updatedVendors);
      saveToLocalStorage(updatedVendors);
    } catch (error) {
      console.error('Error deleting vendor:', error);
    }
  };

  return (
    <div className="vendors">
      <h2>Vendor Logos</h2>
      <div className="vendor-grid">
        {vendors.map((vendor) => (
          <div key={vendor.id} className="vendor-card">
            <img src={vendor.logo} alt={vendor.name} className="vendor-logo" />
            <button className="delete-button" onClick={() => handleDelete(vendor.name)}>
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
