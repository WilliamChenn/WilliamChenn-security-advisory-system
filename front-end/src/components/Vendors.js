import React, { useState } from 'react';
import './Vendors.css';
import { FaPlus } from 'react-icons/fa'; // Using react-icons for the plus icon

function Vendors() {
  const [vendors, setVendors] = useState([
    { id: 1, name: 'Vendor 1', logo: 'path/to/logo1.png' },
    { id: 2, name: 'Vendor 2', logo: 'path/to/logo2.png' },
    // Add initial vendors here
  ]);

  const [newVendor, setNewVendor] = useState({ name: '', logo: '' });
  const [showForm, setShowForm] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewVendor((prevVendor) => ({
      ...prevVendor,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setVendors((prevVendors) => [
      ...prevVendors,
      { ...newVendor, id: prevVendors.length + 1 },
    ]);
    setNewVendor({ name: '', logo: '' });
    setShowForm(false);
  };

  return (
    <div className="vendors">
      <h2>Vendor Logos</h2>
      <div className="vendor-grid">
        {vendors.map((vendor) => (
          <div key={vendor.id} className="vendor-card">
            <img src={vendor.logo} alt={vendor.name} className="vendor-logo" />
            <p>{vendor.name}</p>
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
          <input
            type="text"
            name="logo"
            placeholder="Logo URL"
            value={newVendor.logo}
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
