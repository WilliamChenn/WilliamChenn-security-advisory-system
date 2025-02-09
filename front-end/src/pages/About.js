import React, { useState, useEffect } from 'react';
import './About.css'; 

function About() {
  const [currentImage, setCurrentImage] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage(prevImage => (prevImage === 1 ? 4 : 1));
    }, 2000); 

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="about-container">
      <div className="hero-image" style={{
        backgroundImage: `url(${currentImage === 1 ? 'https://oit.duke.edu/sites/default/files/styles/large_2_5_1/public/web%20and%20app%20development.png?h=d1cb525d&itok=FaszV0D5' : 'https://oit.duke.edu/sites/default/files/styles/large_2_5_1/public/Security%20Hero.png?h=d1cb525d&itok=Zfusifek'})`
      }} role="img" aria-label="grid of colorful app icons">
      </div>
      <div className="header-background"></div>
      <div className="content-wrapper">
        <h1>Overview of Services & Tools</h1>
        <p>The Security Advisory Ingestion And Notification System dashboard focuses on aggregating data sources from advisory dashboards and announcements from vendors or software that Duke utilizes. The aggregated data is presented in a unified output for end users to filter based on criticality and relevancy.</p>
        
        <section className="paragraph__twocolumn">
          <div className="row">
            <div className="col-md-6">
              <div className="light-grey-container">
                <div id="paragraph__content_b5448971-0f44-534b-b9e3-b257b936bacc">
                  <section className="paragraph__wysiwyg">
                    <h4 className="heading" role="heading" aria-level="2">Vendor Selection</h4>
                    <p>End users possess the capability to designate particular vendors. Within the settings section, navigate to the Available vendors checkbox to specify the vendors from whom you wish to receive CVEs.</p>
                    <img src="/Screenshotofvendors.png" alt="Screenshot of Available vendors" />
                  </section>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="light-grey-container">
                <div id="paragraph__content_24a21b86-93a4-5add-818f-ebd5415451fb">
                  <section className="paragraph__wysiwyg">
                    <h4 className="heading" role="heading" aria-level="2">Vulnerabilities Sorting</h4>
                    
                    <p>End users have the capability to utilize the 'Filter here' sidebar to categorize CVEs based on severity levels, date ranges, search criteria, and vendors. Click 'view all' to access the table displaying CVE IDs.</p>
                    <img src="/Screenshotoftable.png" alt="Screenshot of Vulnerabilities Sorting table" />
                  </section>
                </div>
              </div>
            </div>
            
            <div className="col-md-6">
              <div className="light-grey-container">
                <section className="paragraph__wysiwyg">
                  <h4 className="heading" role="heading" aria-level="2">CVE Detailed Information</h4>
                  <p>Users are empowered to delve into detailed CVE summaries, gaining access to official vendor advisories for comprehensive insights into remediation strategies and affected products. Furthermore, the 'Learn More' page incorporates an advanced chatbot functionality tailored for IT professionals, facilitating manual data entry and interaction.</p>
                  <img src="/Screenshotoflearnmore.png" alt="Screenshot of CVE Detailed Information" />
                </section>
              </div>
            </div>

            <div className="col-md-6">
              <div className="light-grey-container">
                <section className="paragraph__wysiwyg">
                  <h4 className="heading" role="heading" aria-level="2">Receive CVE Notifications</h4>
                  <p>
                  End users will benefit from daily notifications about security updates, ensuring they can promptly update affected products. These timely updates provide immediate awareness, allowing users to take prompt actions to secure their products. By minimizing vulnerabilities and staying protected, users can manage their security efficiently. </p>
                  <img src="/Screenshotofnotifications.png" alt="Phone Notification" />
                </section>
              </div>
            </div>
          </div>
        </section>
        
        <div className="sidebar-about">
          <h2>Ask for Help</h2>
          <p>If you need help, visit <a href="https://oit.duke.edu/help/">https://oit.duke.edu/help/</a></p>
        </div>
        
      </div>
    </div>
  );
}

export default About;












