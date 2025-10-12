import React, { useState, useEffect } from 'react';
import axios from 'axios';

function DocumentList() {
  const [documents, setDocuments] = useState([]);

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const response = await axios.get('/api/documents');
        setDocuments(response.data);
      } catch (error) {
        console.error('Error fetching documents:', error);
        setDocuments([]);
      }
    };
    fetchDocuments();
  }, []);

  return (
    <div>
      <h2>Document List</h2>
      <ul>
        {documents.map((doc, index) => (
          <li key={index}>{doc.filename}</li>
        ))}
      </ul>
    </div>
  );
}

export default DocumentList;