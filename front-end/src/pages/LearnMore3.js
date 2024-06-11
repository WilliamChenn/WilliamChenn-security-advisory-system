import React from 'react';
import './LearnMore1.css'; // Ensure the path is correct
import CircularProgress1 from '../pages/CircularProgress1.js';
import Footer from '../components/Footer.js'; // Import the Footer component
import Header from '../components/Header';

const LearnMore3 = () => {
  return (
    <div className="page-container">
      <Header />
      <div className="content-wrapper">
        <div className="text-content">
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
        <div className="circular-progress-container1">
          <CircularProgress1 value={7.2} />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default LearnMore3;

