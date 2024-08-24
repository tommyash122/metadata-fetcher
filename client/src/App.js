import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Header from './components/common/Header';

function App() {
  return (
    <Router>
      <div className="font-mono container mx-auto pt-4 pb-16">
        <Header />
        <div className="mt-8"> {/* Add margin to avoid overlap with the sticky header */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
