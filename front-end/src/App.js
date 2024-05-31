import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Vulnerabilities from './components/Vulnerabilities';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/vulnerabilities" element={<Vulnerabilities />} />
      </Routes>
    </Router>
  );
}

export default App;
