import React from 'react';
import { Link } from 'react-router-dom';
 
import duke from '../images/duke.png';
import './Home.css';
 
function Home() {
  return (
    <div className="Home">
      <img src={duke} className="Duke-logo" alt="logo" />
      <div className="title1">Duke IT Security</div>
      <div className="title2">Advisory Dashboard</div>
      <div className="subtitle1">Duke’s database for open source vulnerabilities</div>
      <div className="subtitle2">and cloud misconfigurations</div>         
      
      <div className="content">
        <div className="subtitle3">Vulnerabilities in the last week</div>
        
        <div className="cards">
          <div className="card">
            <div className="score" style={{ color: '#ffa500' }}>6.5</div>
            <div className="notification-name">Notification Name</div>
            <p>Stuff</p>
            <Link to="/learn-more" className="learn-more">Learn More</Link>
          </div>
          <div className="card">
            <div className="score" style={{ color: '#ff7f50' }}>5.3</div>
            <div className="notification-name">Notification Name</div>
            <p>Stuff</p>
            <Link to="/learn-more" className="learn-more">Learn More</Link>
          </div>
          <div className="card">
            <div className="score" style={{ color: '#ff4500' }}>9.3</div>
            <div className="notification-name">Notification Name</div>
            <p>Stuff</p>
            <Link to="/learn-more" className="learn-more">Learn More</Link>
          </div>
        </div>
        
        <Link to="/vulnerabilities" className="view">View all</Link>
      </div>
    </div>
  );
}
 
export default Home;