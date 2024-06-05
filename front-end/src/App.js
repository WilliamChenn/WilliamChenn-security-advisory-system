import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Vulnerabilities from './components/Vulnerabilities';
import './App.css';
import TableComponent from './TableComponent';
import LearnMore1 from './components/LearnMore1';
import LearnMore2 from './components/LearnMore2';
import LearnMore3 from './components/LearnMore3';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/vulnerabilities" element={<Vulnerabilities />} />
        <Route path="/learn-more/1" element={<LearnMore1 />} />
        <Route path="/learn-more/2" element={<LearnMore2 />} />
        <Route path="/learn-more/3" element={<LearnMore3 />} />
      </Routes>
    </Router>
  );
}

export default App;

