import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/upload">Upload</Link>
      <Link to="/documents">Documents</Link>
    </nav>
  );
}

export default Navbar;