import React from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import './CircularProgress.css'; // Import the CSS file
 
const CircularProgress = ({ value }) => {
  // Define a function to determine the severity class based on the value
  const getSeverityClass = (value) => {
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
 
  // Calculate the scale factor based on the maximum value
  const scaleFactor = 100 / 10; // Assuming the maximum value is 10
 
  return (
    <div className="circular-progress-container"> {/* Apply the container class */}
      <div className={`circular-progress ${getSeverityClass(value)}`}> {/* Apply the severity class */}
        <CircularProgressbar
          value={value}
          maxValue={10}
          text={`${value}`}
          strokeWidth={10} // Set the stroke width for the progress bar
          styles={buildStyles({
            pathColor: `rgb(106, 168, 106)`, // Default color (will be overridden by CSS)
            textColor: '#333',
            trailColor: '#d6d6d6',
          })}
        />
      </div>
    </div>
  );
};
 
export default CircularProgress;