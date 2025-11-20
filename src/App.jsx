import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import AboutUs from './pages/AboutUs';
import Services from './pages/Services';
import ContactUs from './pages/ContactUs';
import Blog from './pages/Blog';
import ScrollToTop from './components/ScrollToTop';
import { initMotionObserver, destroyMotionObserver } from './utils/motionObserver';

function App() {
  useEffect(() => {
    // Initialize motion observer for scroll animations
    const observer = initMotionObserver({
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px',
      once: true
    });

    return () => {
      destroyMotionObserver();
    };
  }, []);

  return (
    <Router>
      <div className="App">
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/services" element={<Services />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/blog" element={<Blog />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

