// CVEpage.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import CircularProgress from '../components/CircularProgress';
import Chatbot from '../components/Chatbot';
import './CVEpage.css';

function CVEpage() {
  const { cveId } = useParams();
  const [vulnerability, setVulnerability] = useState(null);
  const [vendorLogoUrl, setVendorLogoUrl] = useState('');

  useEffect(() => {
    const fetchVulnerability = async () => {
      try {
        const response = await fetch(`http://localhost:3001/api/v1/cves/${cveId}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setVulnerability(data.data.attributes);
      } catch (error) {
        console.error('Error fetching vulnerability:', error);
      }
    };

    fetchVulnerability();
  }, [cveId]);

  useEffect(() => {
    const fetchVendorUrl = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/v1/vendors');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();

        // Find the vendor object with matching name
        const matchedVendor = data.find(vendor => vendor.name === vulnerability?.vendor);
        if (matchedVendor) {
          setVendorLogoUrl(matchedVendor.vendor_url);
        }
      } catch (error) {
        console.error('Error fetching vendor data:', error);
      }
    };

    if (vulnerability?.vendor) {
      fetchVendorUrl();
    }
  }, [vulnerability]);

  if (!vulnerability || !vendorLogoUrl) {
    return <div>Loading...</div>;
  }

  return (
    <div className="cve-page-container">
      <Header />
      <div className="cve-content-wrapper">
        <div className="cve-text-content">
          <div className="title-with-image">
            {/* Display vendor logo if available */}
            <h1>{vulnerability.cve_id} - {vulnerability.assigner_source_name}</h1>
          </div>
          <h2>Overview</h2>
          <p>{vulnerability.summary}</p>
          <h3>Affected:</h3>
          <p>{vulnerability.affected_versions}</p>
          <div className="remediation-container">
            <div className="remediation-header">
              <h4>Remediation</h4>
            </div>
            <div className="remediation-content">
              <p>{vulnerability.remediation || "No remediation information available."}</p>
              <Chatbot cveDetail={vulnerability} />
            </div>
          </div>
        </div>
        <div className="circular-logo-container">
          <img src={vendorLogoUrl} alt="Vendor Logo" className="vendor-logo" />
          <div className="cve-circular-progress-container">
            <CircularProgress value={vulnerability.max_cvss_base_score} />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default CVEpage;







