import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import CircularProgress from '../components/CircularProgress';
import './CVEpage.css';
import Chatbot from '../components/Chatbot';

function CVEpage() {
  const { cveId } = useParams();
  const [vulnerability, setVulnerability] = useState(null);
  const [remediation, setRemediation] = useState('');
  const [remediationUrl, setRemediationUrl] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [vendor, setVendor] = useState(null);

  const fetchVendors = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/v1/vendors');
      const data = await response.json();
      const vendorData = data.find(vendor => vendor.id === vulnerability.vendor_id);
      if (vendorData) {
        setVendor({
          name: vendorData.name,
          logo: vendorData.vendor_url,
        });
      }
    } catch (error) {
      console.error('Error fetching vendors:', error);
    }
  };

  useEffect(() => {
    const fetchVulnerability = async () => {
      try {
        const response = await fetch(`http://localhost:3001/api/v1/cves/${cveId}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log('API response:', data); // Debug statement
        setVulnerability(data.data.attributes);
        if (data.data.attributes.remediation_url) { // Ensure correct path
          setRemediationUrl(data.data.attributes.remediation_url);
        }
      } catch (error) {
        console.error('Error fetching vulnerability:', error);
      }
    };

    fetchVulnerability();
  }, [cveId]);

  useEffect(() => {
    if (vulnerability) {
      fetchVendors();
    }
  }, [vulnerability]);

  const handleSaveRemediation = (newRemediation) => {
    setRemediation(newRemediation);
    setIsEditing(false); // Close the chatbot after saving
    localStorage.setItem(`savedRemediation_${cveId}`, newRemediation);
  };

  useEffect(() => {
    const savedRemediation = localStorage.getItem(`savedRemediation_${cveId}`);
    if (savedRemediation) {
      setRemediation(savedRemediation);
    }
  }, [cveId]);

  if (!vulnerability) {
    return <div>Loading...</div>;
  }

  console.log('Remediation URL:', remediationUrl); // Debug statement

  return (
    <div className="cve-page-container">
      <Header />
      <div className="cve-content-wrapper">
        <div className="cve-text-content">
          <h1>{vulnerability.cve_id} - {vulnerability.assigner_source_name}</h1>
          <h2>Overview</h2>
          <p>{vulnerability.summary}</p>
          <h3>Affected:</h3>
          <p>{vulnerability.affected_versions}</p>
          <div className="remediation-container">
            <div className="remediation-header">
              <h4>Remediation</h4>
              <button 
                onClick={() => setIsEditing(!isEditing)} 
                className="edit-button"
              >
                {isEditing ? 'Cancel' : 'Edit'}
              </button>
            </div>
            <div className="remediation-content">
              {remediation && <p>{remediation}</p>}
              {remediationUrl && (
                <p>For more information about remediation, visit <a href={remediationUrl} target="_blank" rel="noopener noreferrer">{remediationUrl}</a></p>
              )}
              {!remediation && !remediationUrl && (
                <p>No remediation information available.</p>
              )}
              {isEditing && <Chatbot onSaveRemediation={handleSaveRemediation} cveId={cveId} />}
            </div>
          </div>
        </div>
        <div className="cve-circular-progress-container">
          <CircularProgress value={vulnerability.max_cvss_base_score} />
          {vendor && (
            <img 
              src={vendor.logo} 
              alt={`${vendor.name} logo`} 
              className="vendor-logo" 
            />
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default CVEpage;
