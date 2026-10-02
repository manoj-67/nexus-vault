import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');
    
    if (formData.password !== formData.confirmPassword) {
      setError('Access codes do not match');
      setLoading(false);
      return;
    }
    
    // Simulate registration
    setTimeout(() => {
      setLoading(false);
      setSuccess('✅ Security clearance granted! Redirecting to login...');
      setTimeout(() => {
        window.location.href = '/login';
      }, 2000);
    }, 1000);
  };

  return (
    <div className="auth-container">
      <div className="card cyber-border scan-line">
        <h2 className="card-title holographic">🛡️ SECURITY CLEARANCE</h2>
        
        {error && <div className="alert alert-error">{error}</div>}
        {success && <div className="alert alert-success">{success}</div>}
        
        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label className="form-label">Agent Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="form-input"
              placeholder="Enter your agent name"
              required
            />
          </div>
          
          <div className="form-group">
            <label className="form-label">Security Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="form-input"
              placeholder="Enter your security email"
              required
            />
          </div>
          
          <div className="form-group">
            <label className="form-label">Access Code</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="form-input"
              placeholder="Create your access code"
              required
            />
          </div>
          
          <div className="form-group">
            <label className="form-label">Confirm Access Code</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="form-input"
              placeholder="Confirm your access code"
              required
            />
          </div>
          
          <button 
            type="submit" 
            className="btn-primary holo-btn"
            disabled={loading}
            style={{ width: '100%' }}
          >
            {loading ? (
              <>
                <div className="quantum-loader" style={{ width: '20px', height: '20px', marginRight: '10px' }}></div>
                Processing Clearance...
              </>
            ) : (
              '🔒 REQUEST CLEARANCE'
            )}
          </button>
        </form>
        
        <div className="auth-links">
          <p>Already have clearance? <Link to="/login" className="auth-link">Sign In</Link></p>
          <Link to="/" className="auth-link">← Back to Base</Link>
        </div>
      </div>
    </div>
  );
}

export default Register;