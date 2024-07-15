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
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVulnerability = async () => {
      try {
        const response = await fetch(`http://localhost:3001/api/v1/cves/${cveId}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setVulnerability(data.data.attributes);
        try {
          const remediationResponse = await fetch(`http://localhost:3001/api/v1/remediation_url/${cveId}`);
          if (!remediationResponse.ok) {
            console.warn(`Failed to fetch remediation URL: ${remediationResponse.statusText}`);
            return;
          }
        
          const remediationData = await remediationResponse.json();
        
          // Check if remediationData.remediation_url is a string
          if (typeof remediationData.remediation_url === 'string') {
            setRemediationUrl(remediationData.remediation_url);
          } else if (remediationData.errors && remediationData.errors.error) {
            console.warn(`Error from API: ${remediationData.errors.error_description || remediationData.errors.error}`);
          } else {
            console.warn('Unexpected data format');
          }
        } catch (error) {
          console.warn(`An error occurred: ${error.message}`);
        }

        const remediationGetResponse = await fetch(`http://localhost:3001/api/v1/remediation/${cveId}`);
        if (!remediationGetResponse.ok) {
          throw new Error('Failed to fetch remediation');
        }
        const remediationGetData = await remediationGetResponse.json();
        if (remediationGetData.remediation) {
          setRemediation(remediationGetData.remediation);
        } else {
          setRemediation(null); // Set to null instead of 'No remediation information available'
        }
      } catch (error) {
        console.error('Error fetching vulnerability:', error);
        setError(error.message);
      }
    };

    fetchVulnerability();
  }, [cveId]);

  useEffect(() => {
    const fetchVendors = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/v1/vendors');
        const data = await response.json();
        const vendorData = data.find(vendor => vendor.id === vulnerability?.vendor_id);
        if (vendorData) {
          setVendor({
            name: vendorData.name,
            logo: vendorData.vendor_url,
          });
        }
      } catch (error) {
        console.error('Error fetching vendors:', error);
        setError(error.message);
      }
    };

    if (vulnerability) {
      fetchVendors();
    }
  }, [vulnerability]);

  const handleSaveRemediation = async (newRemediation) => {
    try {
      const response = await fetch(`http://localhost:3001/api/v1/remediation/${cveId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ remediation: newRemediation }),
      });

      if (!response.ok) {
        throw new Error('Failed to save remediation');
      }

      setRemediation(newRemediation || ''); // Set to empty string instead of 'No remediation information available'
      setIsEditing(false);
    } catch (error) {
      console.error('Error saving remediation:', error);
      setError(error.message);
    }
  };

  const handleClearRemediation = async () => {
    try {
      const response = await fetch(`http://localhost:3001/api/v1/remediation/${cveId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to clear remediation');
      }

      setRemediation(''); // Clear remediation information
    } catch (error) {
      console.error('Error clearing remediation:', error);
      setError(error.message);
    }
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!vulnerability) {
    return <div>Loading...</div>;
  }

  return (
    <div className="cve-page-container">
      <Header />
      <div className="cve-content-container">
        <div className="cve-content-wrapper">
          <div className="cve-text-content">
            <h1>{vulnerability.cve_id} - {vulnerability.assigner_source_name}</h1>
            <h2>Overview</h2>
            <p>{vulnerability.summary}</p>
            <p>{vulnerability.affected_versions}</p>
            <div className="remediation-container">
              <div className="remediation-header">
                <h4>Remediation</h4>
                <div>
                  <button onClick={() => setIsEditing(!isEditing)} className="edit-button">
                    {isEditing ? 'Cancel' : 'Edit'}
                  </button>
                  <button onClick={handleClearRemediation} className="edit-button clear-button">
                    Clear
                  </button>
                </div>
              </div>
              <div className="remediation-content">
                {remediation && (
                  <p>{remediation}</p>
                )}
                {remediationUrl && (
                  <p>For more information about remediation and affected products, visit <a href={remediationUrl} target="_blank" rel="noopener noreferrer">{remediationUrl}</a></p>
                )}
                {isEditing && <Chatbot onSaveRemediation={handleSaveRemediation} cveId={cveId} />}
              </div>
            </div>
          </div>
          <div className="cve-circular-progress-container">
            <CircularProgress value={vulnerability.max_cvss_base_score} />
            {vendor && (
              <img src={vendor.logo} alt={`${vendor.name} logo`} className="vendor-logo" />
            )}
          </div>
        </div>
      </div>
      <Footer className="footer" />
    </div>
  );
}

export default CVEpage;
