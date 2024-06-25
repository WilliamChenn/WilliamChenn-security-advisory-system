import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import axios from 'axios';
import Home from './pages/Home';
import Vulnerabilities from './pages/Old Table/Vulnerabilities';
import NavigationBar from './components/NavigationBar';
import './App.css';
import Table from './pages/Table';
import CveDetail from './pages/CveDetail';
import CVEpage from './pages/CVEpage';
import Auth from './components/Auth'; 
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(null);//default changed


  useEffect(() => {
    axios.get('http://localhost:3001/is_logged_in', { withCredentials: true })
      .then(response => {
        console.log('Authentication response:', response.data);
        if (response.data.logged_in) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      })
      .catch(error => {
        console.error('Error during authentication check:', error);
        setIsAuthenticated(false);
      });
  }, []);

  // Handle the waiting for an answer
  if (isAuthenticated === null) {
    return <div>Loading...</div>; // Or a loading spinner
  }

  // Conditionally render Auth component inside the useEffect
  if (isAuthenticated === false) {
    return <Auth />;
  }

  return (
    <Router>
      <NavigationBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/vulnerabilities" element={<Vulnerabilities />} />
        <Route path="/table" element={<Table />} />
        <Route path="/cve/:cveNumber" element={<CveDetail />} />
        <Route path="/learn-more/:cveId" element={<CVEpage />} /> 
      </Routes>
    </Router>
  );
}

export default App;
