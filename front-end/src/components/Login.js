import React from 'react';
import './Login.css';

function Login({ isVisible, onClose }) {
  return (
    <div className={`sliding-drawer ${isVisible ? 'visible' : ''}`}>
      <div className="drawer-content">
        <button className="close-button" onClick={onClose}>Close</button>
        <h2>Login</h2>
        <form>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" name="email" />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input type="password" id="password" name="password" />
          </div>
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
}

export default Login;
