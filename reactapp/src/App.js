import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import UploadPage from './components/UploadPage';
import DocumentList from './components/DocumentList';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/upload" element={<UploadPage />} />
            <Route path="/documents" element={<DocumentList />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;