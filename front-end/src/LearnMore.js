import React from 'react';


const LearnMore = () => {
  return (
    <div>
      <h1>Vulnerability Title /CVE</h1>
      <h2>Overview</h2>
      <p>Affected versions of this package are vulnerable to URL Redirection to Untrusted Site('Open Redirect') in the endpoint of the library. An attacker can redirect users to malicious sites by exploiting the open redirect vulnerability </p>
      <h3>Affected:</h3>
      <p>Affected versions of this package are vulnerable to URL Redirection to Untrusted Site</p>
      <h4>Remediation</h4>
      <p>Upgrade Umbraco.Cms.Web.BackOffice to version 8.18.14, 10.8.6, 12.3.10, 13.3.1 or higher.</p>
      <img className="rounded-image" src="https://cyvatar.ai/wp-content/uploads/2022/04/vulnerability-management-lifecycle-1024x576.png" alt="Description of the image"/> 


    </div>
  );
};

export default LearnMore;