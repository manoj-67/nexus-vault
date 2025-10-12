import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './components/Home';
import UploadPage from './components/UploadPage';
import DocumentList from './components/DocumentList';

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