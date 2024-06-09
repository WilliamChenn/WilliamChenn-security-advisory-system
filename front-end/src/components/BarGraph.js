import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const BarGraph = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Fetch JSON data from the API
    fetch('http://localhost:3001/api/v1/cves/recent?time_range=month')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(parsedData => {
        console.log("Fetched Data:", parsedData); // Debugging: Check fetched data

        // Extract and format data
        const scoreRanges = {
          '0-1': 0,
          '1-2': 0,
          '2-3': 0,
          '3-4': 0,
          '4-5': 0,
          '5-6': 0,
          '6-7': 0,
          '7-8': 0,
          '8-9': 0,
          '9+': 0
        };

        parsedData.forEach(item => {
          const score = item.max_cvss_base_score;
          if (score >= 0 && score < 1) scoreRanges['0-1']++;
          else if (score >= 1 && score < 2) scoreRanges['1-2']++;
          else if (score >= 2 && score < 3) scoreRanges['2-3']++;
          else if (score >= 3 && score < 4) scoreRanges['3-4']++;
          else if (score >= 4 && score < 5) scoreRanges['4-5']++;
          else if (score >= 5 && score < 6) scoreRanges['5-6']++;
          else if (score >= 6 && score < 7) scoreRanges['6-7']++;
          else if (score >= 7 && score < 8) scoreRanges['7-8']++;
          else if (score >= 8 && score < 9) scoreRanges['8-9']++;
          else if (score >= 9) scoreRanges['9+']++;
        });

        console.log("Score Ranges:", scoreRanges); // Debugging: Check processed data

        const chartData = Object.keys(scoreRanges).map(range => ({
          scoreRange: range,
          count: scoreRanges[range]
        }));

        console.log("Chart Data:", chartData); // Debugging: Check chart data

        setData(chartData);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  return (
    <BarChart width={800} height={400} data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="scoreRange" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="count" fill="#8884d8" />
    </BarChart>
  );
};

export default BarGraph;
