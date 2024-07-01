import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
import BarGraph from '../components/BarGraph';
import DotPlot from '../components/DotPlot'; // Import the DotPlot component
import Header from '../components/Header.js';
import Footer from '../components/Footer.js';
import Vendors from '../components/Vendors.js';
import VulnerabilityCard from '../components/Card.js';
import { getTopVulnerabilities } from '../components/TopThree.js';

function Home() {
  const [topVulnerabilities, setTopVulnerabilities] = useState([]);

  const fetchAndSetTopVulnerabilities = async () => {
    const topVulns = await getTopVulnerabilities();
    setTopVulnerabilities(topVulns);
  };

  useEffect(() => {
    fetchAndSetTopVulnerabilities(); // Initial fetch

    const interval = setInterval(fetchAndSetTopVulnerabilities, 5000); // Fetch every 5 seconds

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  return (
    <div className="Home">
      <Header />
      <main className="main-content">
        <div className="subtitle1">Duke’s database for open source vulnerabilities and cloud misconfigurations</div>

        <div className="flex-container">
          <BarGraph />
          <DotPlot />
        </div>
        <div className="content">
          <div className="subtitle3">Top Vulnerabilities in the past month</div>
          <div className="cards">
            {topVulnerabilities.map(vulnerability => (
              <VulnerabilityCard
                key={vulnerability.id}
                title={`${vulnerability.cve_id} ${vulnerability.vendor.name}`}
                text={vulnerability.summary}
                link={`/learn-more/${vulnerability.cve_id}`} // Pass the cve_id as a URL parameter
                value={vulnerability.max_cvss_base_score}
                image={vulnerability.vendor.vendor_url} // Pass the vendor image URL
              />
            ))}
          </div>
          <Link to="/table" className="view">View all</Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default Home;
