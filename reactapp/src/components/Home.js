import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="home-container fade-in">
      <h1 className="home-title holographic neon-glow">NEXUS VAULT</h1>
      <p className="home-subtitle">
        Military-grade digital fortress for your most sensitive documents. 
        Advanced encryption, biometric access, and quantum-secure storage.
      </p>
      <div className="home-actions">
        <Link to="/login" className="btn-primary holo-btn scan-line">
          🔓 SIGN IN
        </Link>
        <Link to="/register" className="btn-secondary holo-btn">
          🛡️ SIGN UP
        </Link>
      </div>
      
      <div className="home-actions" style={{ marginTop: '1rem' }}>
        <Link to="/upload" className="btn-secondary">
          🔒 SECURE UPLOAD
        </Link>
        <Link to="/documents" className="btn-secondary">
          📊 ACCESS VAULT
        </Link>
      </div>
    </div>
  );
}

export default Home;