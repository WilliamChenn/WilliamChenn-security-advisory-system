import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
import BarGraph from '../components/BarGraph';
import Header from '../components/Header.js';
import Footer from '../components/Footer.js';
import Vendors from '../components/Vendors.js';
import VulnerabilityCard from '../components/Card.js';

function Home() {
  return (
    <div className="Home">
      <Header />
      <main className="main-content">
        <div className="subtitle1">Duke’s database for open source vulnerabilities</div>
        <div className="subtitle2">and cloud misconfigurations</div>

        <div className="flex-container">
          <Vendors />
          <BarGraph />
        </div>

        <div className="content">
          <div className="subtitle3">Vulnerabilities in the last week</div>
          <div className="cards">
            <VulnerabilityCard
              title="Vulnerability 1"
              text="The SuluFormBundle adds support for creating dynamic forms in Sulu Admin. The TokenController get parameter formName is not sanitized in the returned input field which leads to XSS. This vulnerability is fixed in 2.5.3."
              link="/learn-more/1"
              value={5.4}
            />
            <VulnerabilityCard
              title="Vulnerability 2"
              text="Ariane Allegro Scenario Player through 2024-03-05, when Ariane Duo kiosk mode is used, allows physically proximate attackers to obtain sensitive information (such as hotel invoice content with PII), and potentially create unauthorized room keys, by entering a guest-search quote character and then accessing the underlying Windows OS."
              link="/learn-more/2"
              value={0.5}
            />
            <VulnerabilityCard
              title="Vulnerability 3"
              text="Evmos is the Ethereum Virtual Machine (EVM) Hub on the Cosmos Network. Users are able to delegate tokens that have not yet been vested. This affects employees and grantees who have funds managed via `ClawbackVestingAccount`. This affects 18.1.0 and earlier."
              link="/learn-more/3"
              value={2}
            />
          </div>
          <Link to="/vulnerabilities" className="view">View all</Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default Home;
