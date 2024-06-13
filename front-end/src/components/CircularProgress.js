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

  // Define a function to determine the severity text based on the value
  const getSeverityText = (value) => {
    if (value === 0 || value === null || value === undefined) {
      return "N/A";
    } else if (value < 4) {
      return "Low";
    } else if (value >= 4 && value < 7) {
      return "Medium";
    } else if (value >= 7 && value < 9) {
      return "High";
    } else if (value >= 9 && value <= 10) {
      return "Critical";
    }
  };

  // Define a function to get the severity color based on the value
  const getSeverityColor = (value) => {
    if (value < 4) {
      return "rgb(106, 168, 106)";
    } else if (value >= 4 && value < 7) {
      return "rgb(230, 166, 45)";
    } else if (value >= 7 && value < 9) {
      return "rgb(115, 83, 23)";
    } else if (value >= 9 && value <= 10) {
      return "darkred";
    } else {
      return "#888";
    }
  };

  const clampedValue = value !== null && value !== undefined ? Math.max(0, Math.min(value, 10)) : null;
  const severityColor = clampedValue !== null ? getSeverityColor(clampedValue) : "#888";

  return (
    <div className="circular-progress-container">
      {clampedValue !== null && clampedValue !== 0 ? (
        <div className={`circular-progress ${getSeverityClass(clampedValue)}`}>
          <CircularProgressbar
            value={clampedValue}
            maxValue={10}
            text=""
            strokeWidth={10}
            styles={buildStyles({
              pathColor: severityColor,
              textColor: severityColor,
              trailColor: '#d6d6d6',
              rotation: 0,
              strokeLinecap: 'round',
            })}
          />
          <div className="severity-text-box">
            <div className="severity-value" style={{ color: severityColor }}>{clampedValue}</div>
            <div className={`severity-text ${getSeverityClass(clampedValue)}`}>
              {getSeverityText(clampedValue)}
            </div>
          </div>
        </div>
      ) : (
        <div className="na-value">
          <span>N/A</span>
        </div>
      )}
    </div>
  );
};

export default CircularProgress;
