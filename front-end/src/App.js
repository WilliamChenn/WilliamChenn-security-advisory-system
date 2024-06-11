import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Vulnerabilities from './pages/Old Table/Vulnerabilities';
import './App.css';
import LearnMore1 from './pages/LearnMore1';
import LearnMore2 from './pages/LearnMore2';
import LearnMore3 from './pages/LearnMore3';
import Table from './pages/Table';
import CveDetail from './pages/CveDetail';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/vulnerabilities" element={<Vulnerabilities />} />
        <Route path="/learn-more/1" element={<LearnMore1 />} />
        <Route path="/learn-more/2" element={<LearnMore2 />} />
        <Route path="/learn-more/3" element={<LearnMore3 />} />
        <Route path="/table" element={<Table />} />
        <Route path="/cve/:cveNumber" element={<CveDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
