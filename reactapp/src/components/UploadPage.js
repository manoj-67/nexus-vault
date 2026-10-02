import React, { useState, useRef } from 'react';
import axios from 'axios';

function UploadPage() {
  const [file, setFile] = useState(null);
  const [email, setEmail] = useState('');
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setError('');
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const droppedFiles = e.dataTransfer.files;
    if (droppedFiles.length > 0) {
      const droppedFile = droppedFiles[0];
      setFile(droppedFile);
      setError('');
    }
  };

  const handleFileAreaClick = () => {
    fileInputRef.current?.click();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!file || !email) {
      setError('Please select a file and enter your email');
      return;
    }

    setUploading(true);
    setError('');
    setMessage('');

    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('email', email.trim());
      
      await axios.post('/api/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
      setMessage('✅ CLASSIFIED: Document secured in quantum vault');
      setFile(null);
      if (fileInputRef.current) fileInputRef.current.value = '';
      setEmail('');
    } catch (error) {
      console.error('Upload error:', error);
      setError(error.response?.data?.error || error.message || 'Upload failed');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="upload-container">
      <div className="card cyber-border scan-line">
        <h2 className="card-title holographic">🔐 SECURE DOCUMENT UPLOAD</h2>
        
        {message && <div className="alert alert-success">{message}</div>}
        {error && <div className="alert alert-error">{error}</div>}
        
        <form onSubmit={handleSubmit} className="upload-form">
          <div className="form-group">
            <label className="form-label">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-input"
              placeholder="Security clearance email"
              required
            />
          </div>
          
          <div className="form-group">
            <label className="form-label">Select File</label>
            <div 
              className={`file-drop-zone ${isDragOver ? 'drag-over' : ''} ${file ? 'has-file' : ''}`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={handleFileAreaClick}
            >
              <input
                ref={fileInputRef}
                type="file"
                onChange={handleFileChange}
                className="file-input-hidden"
                accept=".pdf,.doc,.docx,.txt,.jpg,.png"
                style={{ display: 'none' }}
              />
              <div className="file-upload-content">
                <div className="file-upload-icon">
                  {isDragOver ? '📁' : file ? '✅' : '🔒'}
                </div>
                <div className="file-upload-text">
                  {file ? file.name : isDragOver ? 'DROP FILES HERE' : 'DRAG FILES HERE OR CLICK TO SELECT'}
                </div>
                <div className="file-upload-subtext">
                  {file ? `Size: ${(file.size / 1024 / 1024).toFixed(2)} MB` : 'Supported: PDF, DOC, DOCX, TXT, JPG, PNG (Max 10MB)'}
                </div>
              </div>
            </div>
          </div>
          
          <button 
            type="submit" 
            className="btn-primary"
            disabled={uploading}
            style={{ width: '100%' }}
          >
            {uploading ? (
              <>
                <span className="spinner" style={{ width: '20px', height: '20px', marginRight: '10px' }}></span>
                Uploading...
              </>
            ) : (
'🔐 ENCRYPT & STORE'
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

export default UploadPage;
