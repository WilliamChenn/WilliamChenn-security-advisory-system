import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import axios from 'axios';
import Home from './pages/Home';
import NavigationBar from './components/NavigationBar';
import './App.css';
import Table from './pages/Table';
import CveDetail from './pages/CveDetail';
import CVEpage from './pages/CVEpage';
import Auth from './components/Auth'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import About from './pages/About';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(null);//default changed


  useEffect(() => {
    axios.get('http://localhost:3001/is_logged_in', { withCredentials: true })
      .then(response => {
        setIsAuthenticated(response.data.logged_in);
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
        <Route path="/about" element={<About />} />
        <Route path="/table" element={<Table />} />
        <Route path="/cve/:cveNumber" element={<CveDetail />} />
        <Route path="/learn-more/:cveId" element={<CVEpage />} /> 
      </Routes>
    </Router>
  );
}

export default App;
