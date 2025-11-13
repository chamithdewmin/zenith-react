import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logoLight from '../assets/logo-light.svg';
import './Hero.css';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Hide header on home page
  if (location.pathname === '/') {
    return null;
  }

  const isActive = (path) => location.pathname === path;

  return (
    <header className="hero-header transparent-header">
      <div className="hero-header-content">
        {/* Logo */}
        <Link to="/" className="hero-logo">
          <img src={logoLight} alt=" Zenith Supply Chain Solutions Logo" className="hero-logo-img" />
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

export default Header;
