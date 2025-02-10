import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import MetadataPage from './pages/MetadataPage';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import { ToastManager } from './components/common/ToastManager';


function App() {
  return (
    <>
      <Router>
        <Header />
        <div className="font-mono container mx-auto pb-16">
          <div className="mt-8">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/metadataPage/:index" element={<MetadataPage />} />
            </Routes>
          </div>
          <Footer />
        </div>
      </Router>
      <ToastManager />
    </>
  );
}

export default App;
