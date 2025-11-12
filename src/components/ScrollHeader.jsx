import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logoLight from '../assets/logo-light.svg';
import './ScrollHeader.css';

const ScrollHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const location = useLocation();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const isActive = (path) => location.pathname === path;

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      // Show header when scrolled down more than 100px
      setIsVisible(scrollPosition > 100);
    };

    window.addEventListener('scroll', handleScroll);
    // Check initial scroll position
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header className={`scroll-header ${isVisible ? 'visible' : ''}`}>
      <div className="hero-header-content">
        {/* Logo */}
        <Link to="/" className="hero-logo">
          <img src={logoLight} alt="EKSPRESS Logo" className="hero-logo-img" />
        </Link>

        {/* Navigation */}
        <nav className={`hero-nav ${isMenuOpen ? 'nav-open' : ''}`}>
          <Link to="/" className={`hero-nav-link ${isActive('/') ? 'active' : ''}`}>HOME</Link>
          <Link to="/about" className={`hero-nav-link ${isActive('/about') ? 'active' : ''}`}>ABOUT US</Link>
          <Link to="/services" className={`hero-nav-link ${isActive('/services') ? 'active' : ''}`}>SERVICES</Link>
          <Link to="/contact" className={`hero-nav-link ${isActive('/contact') ? 'active' : ''}`}>CONTACT US</Link>
          <Link to="/blog" className={`hero-nav-link ${isActive('/blog') ? 'active' : ''}`}>BLOG</Link>
        </nav>

        {/* Mobile Menu Toggle */}
        <button className="menu-toggle" onClick={toggleMenu} aria-label="Toggle menu">
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </header>
  );
};

export default ScrollHeader;


