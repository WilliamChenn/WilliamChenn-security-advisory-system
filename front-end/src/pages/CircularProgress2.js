import React from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import './CircularProgress2.css'; // Import the CSS file

const CircularProgress2 = ({ value }) => {
  // Define a function to determine the severity class based on the value
  const getSeverityClass2 = (value) => {
    if (value < 4) {
      return "low-severity";
    } else if (value >= 4 && value < 7) {
      return "medium-severity";
    } else if (value >= 7 && value < 9) {
      return "high-severity";
    } else if (value >= 9 && value <= 10) {
      return "critical-severity";
    } else {
      return "n-a";
    }
  };

  // Define a function to determine the severity text based on the value
  const getSeverityText = (value) => {
    if (value < 4) {
      return "Low";
    } else if (value >= 4 && value < 7) {
      return "Medium";
    } else if (value >= 7 && value < 9) {
      return "High";
    } else if (value >= 9 && value <= 10) {
      return "Critical";
    } else {
      return "N/A";
    }
  };

  // Define a function to determine the severity text color based on the value
  const getSeverityTextColor = (value) => {
    if (value < 4) {
      return "rgb(106, 168, 106)"; // Low severity color
    } else if (value >= 4 && value < 7) {
      return "rgb(230, 166, 45)"; // Medium severity color
    } else if (value >= 7 && value < 9) {
      return "rgb(230, 166, 45)"; // High severity color (same as medium for example)
    } else if (value >= 9 && value <= 10) {
      return "darkred"; // Critical severity color
    } else {
      return "black"; // Default color
    }
  };

  return (
    <div className="circular-progress-container2"> {/* Apply the container class */}
      <div className={`circular-progress2 ${getSeverityClass2(value)}`}> {/* Apply the severity class */}
        <CircularProgressbar
          value={value}
          maxValue={10}
          text={`${value}`}
          strokeWidth={10} // Set the stroke width for the progress bar
          styles={buildStyles({
            textColor: '#333',
            trailColor: '#d6d6d6',
            rotation: 0, // Ensure the progress starts at the top
            strokeLinecap: 'round', // Add rounded end caps to the path
          })}
        />
        <div className={`severity-text-box2 ${getSeverityClass2(value)}`} style={{ color: getSeverityTextColor(value) }}>
          <span className="severity-text2">{getSeverityText(value)}</span>
        </div>
      </div>
    </div>
  );
};

export default CircularProgress2;
