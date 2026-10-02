import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

function DocumentList() {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [emailFilter, setEmailFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);
  const pageSize = 5;

  const fetchDocuments = useCallback(async () => {
    try {
      setLoading(true);
      const params = {
        page: currentPage,
        size: pageSize
      };
      if (emailFilter.trim()) {
        params.email = emailFilter.trim();
      }
      const response = await axios.get('/api/documents/search', { params });
      setDocuments(response.data.documents);
      setTotalPages(response.data.totalPages);
      setTotalElements(response.data.totalElements);
      setError('');
    } catch (error) {
      console.error('Error fetching documents:', error);
      setError('Failed to load documents');
      setDocuments([]);
    } finally {
      setLoading(false);
    }
  }, [currentPage, emailFilter]);

  useEffect(() => {
    fetchDocuments();
  }, [fetchDocuments]);

  const handleSearch = (e) => {
    e.preventDefault();
    setCurrentPage(0);
    fetchDocuments();
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleDownload = async (id, filename) => {
    try {
      const response = await axios.get(`/api/documents/${id}/download`, {
        responseType: 'blob',
      });
      
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', filename);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading file:', error);
      alert('Failed to download file');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this document?')) {
      try {
        await axios.delete(`/api/documents/${id}`);
        fetchDocuments(); // Refresh the list
      } catch (error) {
        console.error('Error deleting document:', error);
        alert('Failed to delete document');
      }
    }
  };

  if (loading) {
    return (
      <div className="documents-container">
        <div className="card">
          <div className="loading">
            <div className="quantum-loader"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="documents-container">
      <div className="card cyber-border data-stream">
        <h2 className="card-title holographic">📊 CLASSIFIED DOCUMENTS</h2>
        
        {error && <div className="alert alert-error">{error}</div>}
        
        <form onSubmit={handleSearch} style={{ marginBottom: '1rem' }}>
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <input
              type="email"
              value={emailFilter}
              onChange={(e) => setEmailFilter(e.target.value)}
              placeholder="🔍 Search by email..."
              className="form-input"
              style={{ flex: 1 }}
            />
            <button type="submit" className="btn-small btn-primary">🔍 SEARCH</button>
            <button 
              type="button" 
              onClick={() => { setEmailFilter(''); setCurrentPage(0); }}
              className="btn-small btn-secondary"
            >
              🔄 CLEAR
            </button>
          </div>
        </form>
        
        {totalElements > 0 && (
          <div style={{ marginBottom: '1rem', color: '#00d4ff' }}>
            📊 Found {totalElements} document(s) {emailFilter && `for "${emailFilter}"`}
          </div>
        )}
        
        {documents.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '2rem', color: '#666' }}>
            <p>🔒 VAULT EMPTY</p>
            <p>No classified documents stored. Upload to secure your files.</p>
          </div>
        ) : (
          <div className="documents-grid">
            {documents.map((doc) => (
              <div key={doc.id} className="document-card">
                <div className="document-name">{doc.filename}</div>
                <div className="document-email">🔑 {doc.email}</div>
                <div className="document-actions">
                  <button
                    onClick={() => handleDownload(doc.id, doc.filename)}
                    className="btn-small btn-download"
                  >
                    📎 EXTRACT
                  </button>
                  <button
                    onClick={() => handleDelete(doc.id)}
                    className="btn-small btn-delete"
                  >
                    🗑️ PURGE
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
        
        {totalPages > 1 && (
          <div className="pagination" style={{ marginTop: '1rem', textAlign: 'center' }}>
            <button 
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 0}
              className="btn-small btn-secondary"
              style={{ marginRight: '5px' }}
            >
              ⬅️ PREV
            </button>
            
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                onClick={() => handlePageChange(i)}
                className={`btn-small ${i === currentPage ? 'btn-primary' : 'btn-secondary'}`}
                style={{ margin: '0 2px' }}
              >
                {i + 1}
              </button>
            ))}
            
            <button 
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage >= totalPages - 1}
              className="btn-small btn-secondary"
              style={{ marginLeft: '5px' }}
            >
              NEXT ➡️
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default DocumentList;