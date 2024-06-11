import React from 'react';
import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import CircularProgress from '../components/CircularProgress';
import './Card.css';

function VulnerabilityCard({ title, text, link, value }) {
  return (
    <Card className="custom-card">
      <Card.Body>
        <CircularProgress value={value} />
        <div className="card-content">
          <Card.Title>{title}</Card.Title>
          <Card.Text>{text}</Card.Text>
          <Link to={link} className="learnMore">Learn More</Link>
        </div>
      </Card.Body>
    </Card>
  );
}

export default VulnerabilityCard;
