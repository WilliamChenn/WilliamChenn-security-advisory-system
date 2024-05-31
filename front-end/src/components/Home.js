import React from 'react';
import { Link } from 'react-router-dom';
import duke from './images/duke.png';
import './Home.css';

function Home() {
  return (
    <div className="Home">
      <header className="Home-header">
        <img src={duke} className="Duke-logo" alt="logo" />
        <div className="title">Duke IT Security Advisory Dashboard</div>
        <div className="subtitle">
          Duke’s database for open source vulnerabilities and cloud misconfigurations
        </div>
        <a href="#" className="button">Get Started</a>
      </header>
      
      


      <div className="content">
        <h2>Vulnerabilities in the last week </h2>
        <div className="cards">
          <div className="card">
            <div className="score" style={{ color: '#ffa500' }}>6.5 </div>
            <div className="notification-name">Notification Name </div>
            <p> Stuff</p>
            <a href="#" className="learn-more">Learn More </a>
          </div>
          <div className="card">
            <div className="score" style={{ color: '#ff7f50' }}>5.3 </div>
            <div className="notification-name">Notification Name </div>
            <p> Stuff </p>
            <a href="#" className="learn-more">Learn More </a>
          </div>
          <div className="card">
            <div className="score" style={{ color: '#ff4500' }}>9.3 </div>
            <div className="notification-name">Notification Name </div>
            <p> Stuff </p>
            <a href="#" className="learn-more">Learn More </a>
          </div>
        </div>
        <Link to="/vulnerabilities" className="view-all">View all</Link>
      </div>
    </div>
  );
}

export default Home;
