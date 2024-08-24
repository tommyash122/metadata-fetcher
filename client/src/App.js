import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';

function App() {
  return (
    <Router>
      <div className="font-mono container mx-auto pt-4 px-16 pb-16">
        <nav className="mb-6">
          <Link to="/" className="text-purple-500 hover:underline mr-4">Home</Link>
          <Link to="/about" className="text-purple-500 hover:underline">About</Link>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
