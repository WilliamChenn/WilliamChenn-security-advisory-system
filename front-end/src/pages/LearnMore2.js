import React from 'react';
import './LearnMore1.css'; // Ensure the path is correct
import CircularProgress1 from '../pages/CircularProgress1';
import Footer from './Footer'; // Import the Footer component

const LearnMore2 = () => {
  return (
    <div className="learn-more-content">
      <div className="text-content">
        <div className="center-content">
          <h1>Vulnerability Title /CVE 1</h1>
          <h2>Overview</h2>
          <p>Affected versions of this package are vulnerable to URL Redirection to Untrusted Site ('Open Redirect') in the endpoint of the library. An attacker can redirect users to malicious sites by exploiting the open redirect vulnerability.</p>
          <h3>Affected:</h3>
          <p>Affected versions of this package are vulnerable to URL Redirection to Untrusted Site.</p>
          <div className="remediation-container">
            <div className="remediation-header">
              <h4>Remediation</h4>
            </div>
            <div className="remediation-content">
              <p>Upgrade Umbraco.Cms.Web.BackOffice to version 8.18.14, 10.8.6, 12.3.10, 13.3.1 or higher.</p>
            </div>
          </div>
        </div>
      </div>
      <div className="circular-progress-container">
        <CircularProgress1 value={5.2} />
      </div>
      <Footer /> {/* Include the Footer component here */}
    </div>
  );
};

export default LearnMore2;


