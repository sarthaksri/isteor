import React, { useState } from 'react';
import './form.css';
import logo from './istelogo.png'; 

function RegistrationForm() {
  const [formData, setFormData] = useState({
    name: '',
    branch: '',
    applicationNumber: '',
    contactInfo: '',
    email: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Data:', formData);
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit} className="glassmorphism">
        <div className="logo-container">
          <img src={logo} alt="Logo" className="logo" />
        </div>
        <h2 className="title">ORIENTATION</h2>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="branch"
          placeholder="Branch"
          value={formData.branch}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="applicationNumber"
          placeholder="Application Number"
          value={formData.applicationNumber}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="contactInfo"
          placeholder="Contact Info"
          value={formData.contactInfo}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default RegistrationForm;
