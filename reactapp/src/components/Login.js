import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const loginTimer = useRef(null);

  useEffect(() => () => clearTimeout(loginTimer.current), []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (loading) return;
    setLoading(true);
    
    // Simulate login
    loginTimer.current = setTimeout(() => {
      setLoading(false);
      // Redirect to dashboard after login
      navigate('/upload');
    }, 1000);
  };

  return (
    <div className="auth-container">
      <div className="card cyber-border">
        <h2 className="card-title holographic">🔐 SECURE ACCESS</h2>
        
        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label htmlFor="login-email" className="form-label">Security Email</label>
            <input
              id="login-email"
              autoComplete="username"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-input"
              placeholder="Enter your security clearance email"
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="login-password" className="form-label">Access Code</label>
            <input
              id="login-password"
              autoComplete="current-password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-input"
              placeholder="Enter your access code"
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
                Authenticating...
              </>
            ) : (
              '🔓 AUTHENTICATE'
            )}
          </button>
        </form>
        
        <div className="auth-links">
          <p>Need security clearance? <Link to="/register" className="auth-link">Register Here</Link></p>
          <Link to="/" className="auth-link">← Back to Base</Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
