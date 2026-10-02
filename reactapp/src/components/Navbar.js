import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-content">
        <Link to="/" className="navbar-brand">NEXUS VAULT</Link>
        <div className="navbar-links">
          <Link to="/" className="navbar-link">Home</Link>
          <Link to="/login" className="navbar-link">Sign In</Link>
          <Link to="/register" className="navbar-link">Sign Up</Link>
          <Link to="/upload" className="navbar-link">Upload</Link>
          <Link to="/documents" className="navbar-link">Documents</Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;