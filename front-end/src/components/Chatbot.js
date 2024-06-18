import React, { useState, useEffect } from 'react';
import './Chatbot.css';

const Chatbot = ({ onSaveRemediation, cveId }) => {
  const [input, setInput] = useState('');

  useEffect(() => {
    // Load comment from localStorage on component mount
    const savedRemediation = localStorage.getItem(`savedRemediation_${cveId}`);
    if (savedRemediation) {
      setInput(savedRemediation);
    }
  }, [cveId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      onSaveRemediation(input);
      // Save comment to localStorage
      localStorage.setItem(`savedRemediation_${cveId}`, input);
    }
  };

  return (
    <div className="chatbot-container">
      <form onSubmit={handleSubmit} className="chatbot-form">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter remediation information..."
          className="chatbot-input"
        />
        <button type="submit" className="chatbot-button">Submit</button>
      </form>
    </div>
  );
};

export default Chatbot;





