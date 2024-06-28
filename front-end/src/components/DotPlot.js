import React, { useEffect, useState } from 'react';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Label } from 'recharts';

const DotPlot = () => {
  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/v3/cves/recent?time_range=month', {
        credentials: 'include',
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const parsedData = await response.json();
      console.log("Fetched Data:", parsedData);

      const chartData = parsedData
        .filter(item => item.epss_score !== null && item.epss_score !== undefined) // Ensure EPSS scores are valid
        .map(item => ({
          cvssScore: item.max_cvss_base_score,
          epssScore: item.epss_score
        }));

      console.log("Chart Data:", chartData); // Debugging: Check chart data

      setData(chartData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData(); // Initial fetch

    const interval = setInterval(fetchData, 3000); // Fetch every 5 seconds

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  return (
    <div className="dot-plot">
      <ResponsiveContainer width="100%" height={400}>
        <ScatterChart margin={{ top: 40, bottom: 40, left: 40, right: 40 }}>
          <CartesianGrid />
          <XAxis type="number" dataKey="cvssScore" name="CVSS Score" domain={[0, 10]}>
            <Label value="CVSS Score" position="insideBottom" offset={-5} />
          </XAxis>
          <YAxis type="number" dataKey="epssScore" name="EPSS Score" domain={[0, 1]} tickFormatter={(tick) => tick.toFixed(4)}>
            <Label value="EPSS Score" angle={-90} position="insideLeft" offset={-10} />
          </YAxis>
          <Tooltip cursor={{ strokeDasharray: '3 3' }} />
          <Scatter name="CVSS vs EPSS" data={data} fill="#8884d8" />
        </ScatterChart>
      </ResponsiveContainer>
    </div>
  );
};

export default DotPlot;
