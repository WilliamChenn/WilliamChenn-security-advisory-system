import React, { useEffect, useState } from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import './CircularProgress1.css';

const CircularProgress1 = ({ value }) => {
  const [isFullscreen, setIsFullscreen] = useState(false);

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

  const getBorderColor = (value) => {
    if (value < 4) {
      return "rgb(106, 168, 106)";
    } else if (value >= 4 && value < 7) {
      return "rgb(230, 166, 45)";
    } else if (value >= 7 && value < 9) {
      return "rgb(230, 166, 45)";
    } else if (value >= 9 && value <= 10) {
      return "darkred";
    } else {
      return "black";
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      const isFullscreen = document.fullscreenElement ||
        document.webkitFullscreenElement ||
        document.mozFullScreenElement ||
        document.msFullscreenElement;
      setIsFullscreen(!!isFullscreen);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
    document.addEventListener('mozfullscreenchange', handleFullscreenChange);
    document.addEventListener('MSFullscreenChange', handleFullscreenChange);

    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
      document.removeEventListener('mozfullscreenchange', handleFullscreenChange);
      document.removeEventListener('MSFullscreenChange', handleFullscreenChange);
    };
  }, []);

  return (
    <div className={`circular-progress-container1 ${isFullscreen ? 'visible' : ''} ${getSeverityClass1(value)}`}>
      <div className="circular-progress1">
        <CircularProgressbar
          value={value}
          maxValue={10}
          text={`${value}`}
          strokeWidth={10}
          styles={buildStyles({
            textColor: 'black',
            trailColor: '#d6d6d6',
            rotation: 0,
            strokeLinecap: 'round',
          })}
          initialAnimation={true}
          counterClockwise={false}
        />
        <div className="severity-text-box1">
          <span className={`severity-text1 ${getSeverityClass1(value)}`} style={{ color: getBorderColor(value) }}>
            {getSeverityText(value)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default CircularProgress1;

