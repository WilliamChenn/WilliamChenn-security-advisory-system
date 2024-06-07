// LearnMore3.jsx
import React from 'react';
import './LearnMore3.css'; // Ensure the path is correct
import CircularProgress3 from '../pages/CircularProgress3';

const LearnMore3 = () => {
  return (
    <div>

      <CircularProgress3 value={9.3} />
      <div className="center-content">
        <h1>Vulnerability Title /CVE 1</h1>
        <h2>Overview</h2>
        <p>Affected versions of this package are vulnerable to URL Redirection to Untrusted Site ('Open Redirect') in the endpoint of the library. An attacker can redirect users to malicious sites by exploiting the open redirect vulnerability.</p>
        <h3>Affected:</h3>
        <p>Affected versions of this package are vulnerable to URL Redirection to Untrusted Site.</p>
        <h4>Remediation</h4>
        <div className="remediation-container">
          <div className="remediation-header">
            {/* Add any header content if needed */}
          </div>
          <p>Upgrade Umbraco.Cms.Web.BackOffice to version 8.18.14, 10.8.6, 12.3.10, 13.3.1 or higher.</p>
        </div>
      </div>
    </div>
  );
} 
export default LearnMore3;
