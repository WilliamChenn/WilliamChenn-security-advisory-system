import React, { useEffect } from 'react';
import './Footer.css';

const Footer = () => {
    return (
      <footer className="footer">
          <div className="footer-container">
            <div className="footer-row">
              <div className="footer-col">
                <h3 className="footer-title">Office of Information Technology</h3>
                <p className="footer-address">
                  <span>300 Fuller Street</span><br />
                  <span>Durham, NC 27701</span><br />
                  <span>Internal: Duke Box 104100</span>
                </p>
                <p className="footer-phone">
                  <a href="tel:9196842200">(919) 684-2200</a>
                </p>
              </div>
              <div className="footer-col">
                <a href="#" className="footer-button">Report Website Issues</a>
              </div>
            </div>
            <div className="footer-bottom">
              <div className="footer-logo">Duke</div>
              <div className="footer-copyright">Copyright © 2024 Duke University</div>
              <div className="footer-links">
                <a href="#" className="footer-link">Accessibility</a>
                <a href="#" className="footer-link">Privacy Statement</a>
              </div>

            </div>
          </div>
        </footer>
    );
  };
  
  export default Footer;