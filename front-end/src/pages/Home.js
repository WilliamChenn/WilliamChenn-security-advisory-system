import React from 'react';
import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import NavigationBar from '../components/NavigationBar';
import CircularProgress from '../components/CircularProgress';
import './Home.css';
 
function Home() {
  return (
    <div className="Home">
      <header className="duke-banner">
        <div className="duke-container">
          <div className="duke-logo">Duke</div>
          <div className="duke-entity-name">| IT Security Advisory Dashboard</div>
          <div className="navbar-container">
            <NavigationBar />
          </div>
        </div>
      </header>
 
      <main className="main-content">
        <div className="subtitle1">Duke’s database for open source vulnerabilities</div>
        <div className="subtitle2">and cloud misconfigurations</div>
        
        <div className="content">
          <div className="subtitle3">Vulnerabilities in the last week</div>
          <div className="cards">
            <Card style={{ width: '18rem' }}>
              <Card.Body>
                <CircularProgress value={5.4} />
                <div className="card-content">
                  <Card.Title>Vulnerability 1</Card.Title>
                  <Card.Text>
                    The SuluFormBundle adds support for creating
                    dynamic forms in Sulu Admin. The TokenController
                    get parameter formName is not sanitized in the
                    returned input field which leads to XSS. This
                    vulnerability is fixed in 2.5.3.
                  </Card.Text>
                  <Button style={{ backgroundColor: '#012169' }}>Go somewhere</Button>
                </div>
              </Card.Body>
            </Card>
            
            <Card style={{ width: '18rem' }}>
              <Card.Body>
                <CircularProgress value={0.5} />
                <div className="card-content">
                  <Card.Title>Vulnerability 2</Card.Title>
                  <Card.Text>
                    Ariane Allegro Scenario Player through 2024-03-05,
                    when Ariane Duo kiosk mode is used, allows physically
                    proximate attackers to obtain sensitive information
                    (such as hotel invoice content with PII), and
                    potentially create unauthorized room keys, by entering a guest-search
                    quote character and then accessing the underlying Windows OS.
                  </Card.Text>
                  <Button style={{ backgroundColor: '#012169' }}>Go somewhere</Button>
                </div>
              </Card.Body>
            </Card>
            
            <Card style={{ width: '18rem' }}>
              <Card.Body>
                <CircularProgress value={2} />
                <div className="card-content">
                  <Card.Title>Vulnerability 3</Card.Title>
                  <Card.Text>
                    Evmos is the Ethereum Virtual Machine (EVM) Hub
                    on the Cosmos Network. Users are able to delegate tokens
                    that have not yet been vested. This affects employees and
                    grantees who have funds managed via `ClawbackVestingAccount`.
                    This affects 18.1.0 and earlier.
                  </Card.Text>
                  <Button style={{ backgroundColor: '#012169' }}>Go somewhere</Button>
                </div>
              </Card.Body>
            </Card>
          </div>
          <Link to="/vulnerabilities" className="view">View all</Link>
        </div>
      </main>
      
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
              <div className="footer-social-icons">
                <a href="#" className="footer-social-icon">F</a>
                <a href="#" className="footer-social-icon">T</a>
                <a href="#" className="footer-social-icon">I</a>
                <a href="#" className="footer-social-icon">Y</a>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <div className="footer-logo">Duke</div>
            <div className="footer-copyright">Copyright © 2024 Duke University</div>
            <div className="footer-links">
              <a href="#" className="footer-link">Accessibility</a>
              <a href="#" className="footer-link">Privacy Statement</a>
            </div>
            <div className="footer-live-chat">Live Chat</div>
          </div>
        </div>
      </footer>
    </div>
  );
}
 
export default Home;