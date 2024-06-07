import React from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import './CircularProgress1.css'; // Import the CSS file

const CircularProgress1 = ( {value}) => {
  // Define a functioß to determine the severity class based on the value
  const getSeverityClass1 = (value) => {
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
  // Ensure value is within 0-10 range
  const clampedValue = Math.max(0, Math.min(value, 10));

  return (
    <div className="circular-progress-container1"> {/* Apply the container class */}
      <div className={`circular-progress1 ${getSeverityClass1(clampedValue)}`}> {/* Apply the severity class */}
        <CircularProgressbar
          value={clampedValue}
          maxValue={10}
          text={`${clampedValue}`}
          strokeWidth={10} // Set the stroke width for the progress bar
          styles={buildStyles({
            textColor: '#333',
            trailColor: '#d6d6d6',
            rotation: 0, // Ensure the progress starts at the top
            strokeLinecap: 'round', // Add rounded end caps to the path
          })}
        />
      </div>
    </div>
  );

};

export default CircularProgress1;