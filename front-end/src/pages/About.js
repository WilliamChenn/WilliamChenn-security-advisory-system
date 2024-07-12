import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import './About.css'; // Make sure to import your CSS file

function About() {
  const [currentImage, setCurrentImage] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage(prevImage => (prevImage === 1 ? 2 : 1));
    }, 2000); // Switch image every 4 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="about-container">
      <Header />
      
      <div className="hero-image" style={{
        backgroundImage: `url(${currentImage === 1 ? 'https://oit.duke.edu/sites/default/files/styles/large_2_5_1/public/web%20and%20app%20development.png?h=d1cb525d&itok=FaszV0D5' : 'https://oit.duke.edu/sites/default/files/styles/large_2_5_1/public/Security%20Hero.png?h=d1cb525d&itok=Zfusifek'})`
      }} role="img" aria-label="grid of colorful app icons">
        <div className="container">
          {/* Content inside the hero image */}
        </div>
      </div>
      <div className="header-background"></div>
      <div className="content-wrapper">
        <h1>Overview of Services & Tools</h1>
        <p>The Security Advisory Ingestion And Notification System dashboard focuses on aggregating data sources from advisory dashboards and announcements from vendors or software that Duke utilizes. The aggregated data is presented in a unified output for end users to filter based on criticality and relevancy.</p>
        
        {/* Add more content as needed */}
        <section className="paragraph__twocolumn">
          <div className="row">
            <div className="col-md-6">
              <div className="light-grey-container">
                <div id="paragraph__content_b5448971-0f44-534b-b9e3-b257b936bacc">
                  <section className="paragraph__wysiwyg">
                    <h4 className="heading" role="heading" aria-level="2">Vendor Selection</h4>
                    <p>End users possess the capability to designate particular vendors. Within the settings section, navigate to the Available vendors checkbox to specify the vendors from whom you wish to receive CVEs.</p>
                    {/* Display screenshot under Vendor Selection */}
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
                    <p>End users can select specific vendors by activating the 'Available vendors' checkbox in the settings section to receive CVEs.</p>
                    <p>End users have the capability to utilize the 'Filter here' sidebar to categorize CVEs based on severity levels, date ranges, search criteria, and vendors. Click 'view all' to access the table displaying CVE ID, summaries, and criticality scores.</p>
                    {/* Display screenshot under Vulnerabilities Sorting */}
                    <img src="/Screenshotoftable.png" alt="Screenshot of Vulnerabilities Sorting table" />
                  </section>
                </div>
              </div>
            </div>
            
            {/* New column for CVE detailed information */}
            <div className="col-md-6">
              <div className="light-grey-container">
                <section className="paragraph__wysiwyg">
                  <h4 className="heading" role="heading" aria-level="2">CVE Detailed Information</h4>
                  <p>Users are empowered to delve into detailed CVE summaries, gaining access to official vendor advisories for comprehensive insights into remediation strategies and affected products. Furthermore, the 'Learn More' page incorporates an advanced chatbot functionality tailored for IT professionals, facilitating manual data entry and interaction.</p>
                  <img src="/Screenshotoflearnmore.png" alt="Screenshot of CVE Detailed Information" />
                </section>
              </div>
            </div>

            {/* New column for Receive CVE Notifications */}
            <div className="col-md-6">
              <div className="light-grey-container">
                <section className="paragraph__wysiwyg">
                  <h4 className="heading" role="heading" aria-level="2">Receive CVE Notifications</h4>
                  <p>End users will be able to receive daily notifications about security updates, ensuring they can promptly update affected products.</p>
                  <img src="https://support.ajax.systems/wp-content/uploads/2019/05/en-phone-notification.jpg" alt="Phone Notification" />
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
      
      <Footer />
    </div>
  );
}

export default About;












