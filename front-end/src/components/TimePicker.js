import React, { useState, useEffect } from 'react';
import './TimePicker.css';

const hours = Array.from({ length: 12 }, (_, i) => i + 1); // Array for 1 to 12 hours
const minutes = Array.from({ length: 12 }, (_, i) => i * 5); // Array for 0, 5, 10, ..., 55 minutes

const TimePicker = ({ value, onChange }) => {
  const [selectedHour, setSelectedHour] = useState(value ? parseInt(value.substr(0, 2), 10) : 12);
  const [selectedMinute, setSelectedMinute] = useState(value ? parseInt(value.substr(3, 2), 10) : 0);
  const [selectedPeriod, setSelectedPeriod] = useState(value && value.substr(6, 2) === 'AM' ? 'AM' : 'PM');

  useEffect(() => {
    const formattedTime = `${pad(selectedHour)}:${pad(selectedMinute)} ${selectedPeriod}`;
    onChange(formattedTime);
  }, [selectedHour, selectedMinute, selectedPeriod]);

  const handleHourChange = (e) => {
    setSelectedHour(parseInt(e.target.value, 10));
  };

  const handleMinuteChange = (e) => {
    setSelectedMinute(parseInt(e.target.value, 10));
  };

  const handlePeriodChange = (e) => {
    setSelectedPeriod(e.target.value);
  };

  const pad = (num) => {
    return num < 10 ? `0${num}` : `${num}`;
  };

  return (
    <div className="time-picker">
      <select value={selectedHour} onChange={handleHourChange}>
        {hours.map((hour) => (
          <option key={hour} value={hour}>{pad(hour)}</option>
        ))}
      </select>
      <span>:</span>
      <select value={selectedMinute} onChange={handleMinuteChange}>
        {minutes.map((minute) => (
          <option key={minute} value={minute}>{pad(minute)}</option>
        ))}
      </select>
      <select value={selectedPeriod} onChange={handlePeriodChange}>
        <option value="AM">AM</option>
        <option value="PM">PM</option>
      </select>
    </div>
  );
};

export default TimePicker;
