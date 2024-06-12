import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Vulnerabilities from './pages/Old Table/Vulnerabilities';
import NavigationBar from './components/NavigationBar'
import './App.css';
import Table from './pages/Table';
import CveDetail from './pages/CveDetail';
import CVEpage from './pages/CVEpage';
import 'bootstrap/dist/css/bootstrap.min.css';
 
 
function App() {
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

