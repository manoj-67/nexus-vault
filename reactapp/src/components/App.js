import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import Home from './Home';
import UploadPage from './UploadPage';
import DocumentList from './DocumentList';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/upload" element={<UploadPage />} />
          <Route path="/documents" element={<DocumentList />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;