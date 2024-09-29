// Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; // Create a CSS file for styling the navbar

const Navbar = () => {
  return (
    <nav className="navbar">
      <h1 className="navbar-title">QUORAL</h1>
      <div className="navbar-links">
        <Link to="/" className="navbar-link">HOME</Link>
        <Link to="/map" className="navbar-link">MAP</Link>
      </div>
    </nav>
  );
};

export default Navbar;