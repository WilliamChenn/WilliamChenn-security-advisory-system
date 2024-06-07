import React from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const CircularProgress1 = ({ value, variant }) => {
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

  return (
    <div className={`circular-progress-container ${variant}`}>
      <div className={`circular-progress ${getSeverityClass(value)}`}>
        <CircularProgressbar
          value={value}
          maxValue={10}
          text={`${value}`}
          strokeWidth={10}
          styles={buildStyles({
            textColor: '#333',
            trailColor: '#d6d6d6',
            rotation: 0,
            strokeLinecap: 'round',
          })}
        />
        <div className={`severity-text-box ${getSeverityClass(value)}`}>
          <span className="severity-text">{getSeverityText(value)}</span>
        </div>
      </div>
    </div>
  );
};

export default CircularProgress1;






