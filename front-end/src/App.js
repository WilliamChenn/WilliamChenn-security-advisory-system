import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Cookies from 'js-cookie';
import Home from './pages/Home';
import Vulnerabilities from './pages/Old Table/Vulnerabilities';
import NavigationBar from './components/NavigationBar';
import './App.css';
import Table from './pages/Table';
import CveDetail from './pages/CveDetail';
import CVEpage from './pages/CVEpage';
import Auth from './components/Auth'; // Import the Auth component
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const isAuthenticated = Cookies.get('auth_token'); // Check if the auth token cookie is set

  
  if (!isAuthenticated) {
    return <Auth />; // Render Auth component to redirect to IdP
  }
  //create endpoint to return user data
  //

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
