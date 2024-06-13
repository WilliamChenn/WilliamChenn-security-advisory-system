import React, { useState, useEffect } from 'react';

export const getTopVulnerabilities = async () => {
  try {
    const response = await fetch('http://localhost:3001/api/v1/cves/recent?time_range=month');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();

    const sortedVulnerabilities = data.sort((a, b) => b.max_cvss_base_score - a.max_cvss_base_score).slice(0, 3);
    return sortedVulnerabilities;
  } catch (error) {
    console.error('Error fetching vulnerabilities:', error);
    return [];
  }
};

const TopVulnerabilities = () => {
  const [topVulnerabilities, setTopVulnerabilities] = useState([]);

  const fetchAndSetTopVulnerabilities = async () => {
    const vulnerabilities = await getTopVulnerabilities();
    setTopVulnerabilities(vulnerabilities);
  };

  useEffect(() => {
    fetchAndSetTopVulnerabilities(); // Initial fetch

    const interval = setInterval(fetchAndSetTopVulnerabilities, 5000); // Fetch every 5 seconds

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  return (
    <div className="top-vulnerabilities">
      <h2>Top 3 Vulnerabilities</h2>
      <ul>
        {topVulnerabilities.map((vulnerability) => (
          <li key={vulnerability.id}>
            <h3>{vulnerability.cve_id}</h3>
            <p>Score: {vulnerability.max_cvss_base_score}</p>
            <p>{vulnerability.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TopVulnerabilities;
