import React from 'react';
import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import CircularProgress from '../components/CircularProgress';
import './Card.css';

function VulnerabilityCard({ title, text, link, value, image }) {
  return (
    <Card className="custom-card">
      <Card.Body>
        <div className="top-section">
          <img src={image} alt="Vendor Logo" className="card-logo" />
          <CircularProgress value={value} className="circular-progress" />
        </div>
        <div className="card-content">
          <Card.Title className="card-title">{title.split(" ")[0]}</Card.Title>
          <Card.Subtitle className="card-vendor">{title.split(" ").slice(1).join(" ")}</Card.Subtitle>
          <Card.Text className="card-summary">{text}</Card.Text>
          <Link to={link} className="learnMore">Learn More</Link>
        </div>
      </Card.Body>
    </Card>
  );
}

export default VulnerabilityCard;
