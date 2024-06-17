import React from 'react';
import Spinner from 'react-bootstrap/Spinner';
import './LoadingSpinner.css';

const LoadingSpinner = () => (
  <div className="loading-spinner">
    <Spinner animation="border" role="status" size="sm">
      <span className="sr-only"></span>
    </Spinner>
  </div>
);

export default LoadingSpinner;
