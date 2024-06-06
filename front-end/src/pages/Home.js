import React from 'react';
import { Link } from 'react-router-dom';
import CircularProgress from '../components/CircularProgress';
import duke from '../images/duke.png';
import './Home.css';
 
function Home() {
  return(
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
            <CircularProgress value={3.2} />
            <div className="notification-name">Notification Name</div>
            <p>Stuff</p>
            <Link to="/learn-more/1" className="learn-more">Learn More</Link>
          </div>
          <div className="card">
            <CircularProgress value={5.3} />
            <div className="notification-name">Notification Name</div>
            <p>Stuff</p>
            <Link to="/learn-more/2" className="learn-more">Learn More</Link>
          </div>
          <div className="card">
            <CircularProgress value={9.3} />
            <div className="notification-name">Notification Name</div>
            <p>Stuff</p>
            <Link to="/learn-more/3" className="learn-more">Learn More</Link>
          </div>
        </div>
        
        <Link to="/vulnerabilities" className="view">View all</Link>
      </div>
    </div>
  );
}
 
export default Home;