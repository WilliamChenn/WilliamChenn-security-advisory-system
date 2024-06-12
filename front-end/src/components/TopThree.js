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
  