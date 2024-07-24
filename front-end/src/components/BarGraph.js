import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Cell, ResponsiveContainer, LabelList, Label } from 'recharts';

const BarGraph = () => {
  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      const backendUrl = process.env.REACT_APP_BACKEND_URL;
      console.log('Backend URL:', backendUrl); // Log the backend URL

      const response = await fetch(`${backendUrl}/api/v3/cves/recent?time_range=month`, {
        credentials: 'include',
      });


      // Check if the response is ok
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      // Parse the response as JSON
      const parsedData = await response.json();

      const scoreRanges = {
        '0-1': { count: 0, color: '#00FF00' }, // Green
        '1-2': { count: 0, color: '#7FFF00' }, // Light Green
        '2-3': { count: 0, color: '#ADFF2F' }, // Green-Yellow
        '3-4': { count: 0, color: '#FFFF00' }, // Yellow
        '4-5': { count: 0, color: '#FFD700' }, // Gold
        '5-6': { count: 0, color: '#FFA500' }, // Orange
        '6-7': { count: 0, color: '#FF8C00' }, // Dark Orange
        '7-8': { count: 0, color: '#FF4500' }, // Orange-Red
        '8-9': { count: 0, color: '#FF0000' }, // Red
        '9+': { count: 0, color: '#8B0000' }  // Dark Red
      };

      parsedData.forEach(item => {
        const score = item.max_cvss_base_score;
        if (score >= 0 && score < 1) scoreRanges['0-1'].count++;
        else if (score >= 1 && score < 2) scoreRanges['1-2'].count++;
        else if (score >= 2 && score < 3) scoreRanges['2-3'].count++;
        else if (score >= 3 && score < 4) scoreRanges['3-4'].count++;
        else if (score >= 4 && score < 5) scoreRanges['4-5'].count++;
        else if (score >= 5 && score < 6) scoreRanges['5-6'].count++;
        else if (score >= 6 && score < 7) scoreRanges['6-7'].count++;
        else if (score >= 7 && score < 8) scoreRanges['7-8'].count++;
        else if (score >= 8 && score < 9) scoreRanges['8-9'].count++;
        else if (score >= 9) scoreRanges['9+'].count++;
      });

      const chartData = Object.keys(scoreRanges).map(range => ({
        scoreRange: range,
        count: scoreRanges[range].count,
        fill: scoreRanges[range].color
      }));

      setData(chartData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData(); // Initial fetch

    const interval = setInterval(fetchData, 3000); // Fetch every 3 seconds

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  const CustomLabel = ({ x, y, width, value }) => (
    <text x={x + width + 5} y={y + 5} fill="blue" dy={10} textAnchor="start">
      {value}
    </text>
  );

  return (
    <div className="bar-chart">
      <ResponsiveContainer width="100%" height={400}>
        <BarChart layout="vertical" data={data} margin={{ top: 40, left: 80 }}>
          <XAxis type="number" hide />
          <YAxis type="category" dataKey="scoreRange">
            <Label value="CVSS Score" position="insideTop" offset={-17} />
          </YAxis>
          <Tooltip />
          <Bar dataKey="count" barSize={20}>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.fill} />
            ))}
            <LabelList dataKey="count" position="right" content={CustomLabel} />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BarGraph;
