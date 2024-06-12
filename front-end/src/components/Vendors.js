import React, { useState, useEffect } from 'react';
import './Vendors.css';
import { FaPlus, FaTrash } from 'react-icons/fa'; // Using react-icons for the plus and trash icons

function Vendors() {
  const [vendors, setVendors] = useState([]);
  const [newVendor, setNewVendor] = useState({ name: '' });
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    // Load vendors from local storage on component mount
    const storedVendors = JSON.parse(localStorage.getItem('vendors'));
    if (storedVendors) {
      setVendors(storedVendors);
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
      const response = await fetch('http://localhost:3001/api/v1/cves/recent?time_range=month');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      const matchingVendor = data
        .map((item) => item.vendor)
        .find(vendor => vendor.name.toLowerCase() === newVendor.name.toLowerCase());

      if (matchingVendor) {
        console.log('Matching vendor found:', matchingVendor); // Debug log
        const updatedVendors = [
          ...vendors,
          { id: vendors.length + 1, name: matchingVendor.name, logo: matchingVendor.vendor_url },
        ];
        setVendors(updatedVendors);
        saveToLocalStorage(updatedVendors);
        setNewVendor({ name: '' });
        setShowForm(false);
      } else {
        console.error('Vendor not found for name:', newVendor.name);
        alert('Vendor not found. Please ensure the vendor name is correct and try again.');
      }
    } catch (error) {
      console.error('Error fetching vendors:', error);
    }
  };

  const handleDelete = (vendorId) => {
    const updatedVendors = vendors.filter(vendor => vendor.id !== vendorId);
    setVendors(updatedVendors);
    saveToLocalStorage(updatedVendors);
  };

  return (
    <div className="vendors">
      <h2>Vendor Logos</h2>
      <div className="vendor-grid">
        {vendors.map((vendor) => (
          <div key={vendor.id} className="vendor-card">
            <img src={vendor.logo} alt={vendor.name} className="vendor-logo" />
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
