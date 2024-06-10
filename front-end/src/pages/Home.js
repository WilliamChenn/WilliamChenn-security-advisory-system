import React from 'react';
import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import NavigationBar from '../components/NavigationBar';
import CircularProgress from '../components/CircularProgress';
import BarGraph from '../components/BarGraph';
import './Home.css';
import Footer from '../components/Footer.js';
 
function Home() {
  return(
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
        
        <BarGraph /> 

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
                  <Link to="/learn-more/1" className="learnMore">Learn More</Link>
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
                  <Link to="/learn-more/2" className="learnMore">Learn More</Link>
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
                  <Link to="/learn-more/3" className="learnMore">Learn More</Link>
                </div>
              </Card.Body>
            </Card>
          </div>
          <Link to="/vulnerabilities" className="view">View all</Link>
        </div>
      </main>
      
      <Footer />
    </div>
  );

  
}
 
export default Home;