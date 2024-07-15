// src/App.js
import React, { createContext, useState, useEffect, useContext } from 'react';
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
import Settings from './pages/Settings';
import dog from './images/dog.png';
import cat from './images/cat.png';
import capybara from './images/capybara.png';
import kelly from './images/kelly.png';
import katherine from './images/katherine.png';
import unicorn from './images/unicorn.png';
import unicorn1 from './images/unicorn1.png';

const profilePictures = [dog, cat, capybara, kelly, katherine, unicorn, unicorn1];

const UserProfileContext = createContext();

export const useUserProfile = () => {
  return useContext(UserProfileContext);
};

const UserProfileProvider = ({ children }) => {
  const [profilePictureIndex, setProfilePictureIndex] = useState(null);

  useEffect(() => {
    const fetchProfilePictureIndex = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/v3/users/get_profile_picture_index', { withCredentials: true });
        setProfilePictureIndex(response.data.profile_picture_index);
      } catch (error) {
        console.error('Error fetching profile picture index:', error);
      }
    };

    fetchProfilePictureIndex();
  }, []);

  const updateProfilePictureIndex = async (index) => {
    setProfilePictureIndex(index);
    try {
      await axios.put('http://localhost:3001/api/v3/users/set_profile_picture_index', {
        profile_picture_index: index
      }, { withCredentials: true });
    } catch (error) {
      console.error('Error setting profile picture index:', error);
    }
  };

  const profilePicture = profilePictureIndex !== null ? profilePictures[profilePictureIndex] : null;

  return (
    <UserProfileContext.Provider value={{ profilePicture, updateProfilePictureIndex }}>
      {children}
    </UserProfileContext.Provider>
  );
};

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

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

  if (isAuthenticated === null) {
    return <div>Loading...</div>;
  }

  if (isAuthenticated === false) {
    return <Auth />;
  }

  return (
    <UserProfileProvider>
      <Router>
        <NavigationBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/table" element={<Table />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/cve/:cveNumber" element={<CveDetail />} />
          <Route path="/learn-more/:cveId" element={<CVEpage />} />
        </Routes>
      </Router>
    </UserProfileProvider>
  );
}

export default App;
