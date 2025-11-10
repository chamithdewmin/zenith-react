import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './PageHero.css';

const PageHero = ({ title, subtitle }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <section className="page-hero">
      <div className="page-hero-background">
        <div className="page-hero-overlay"></div>
        <div className="page-hero-orange-glow"></div>
      </div>

      {/* Header */}
      <div className="page-hero-header">
        <div className="page-hero-header-content">
          <Link to="/" className="page-hero-logo">
            <div className="page-hero-logo-icon"></div>
            <span>Digitro</span>
          </Link>
          <nav className={`page-hero-nav ${isMenuOpen ? 'nav-open' : ''}`}>
            <Link to="/" className={`page-hero-nav-link ${isActive('/') ? 'active' : ''}`}>
              Home
            </Link>
            <Link to="/about" className={`page-hero-nav-link ${isActive('/about') ? 'active' : ''}`}>
              About
            </Link>
            <Link to="/services" className={`page-hero-nav-link ${isActive('/services') ? 'active' : ''}`}>
              Services
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
            <Link to="/blog" className={`page-hero-nav-link ${isActive('/blog') ? 'active' : ''}`}>
              Blog
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
            <Link to="/pages" className="page-hero-nav-link">
              Pages
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
          </nav>
          <div className="page-hero-header-right">
            <button className="page-hero-search-icon">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 17C13.4183 17 17 13.4183 17 9C17 4.58172 13.4183 1 9 1C4.58172 1 1 4.58172 1 9C1 13.4183 4.58172 17 9 17Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M19 19L14.65 14.65" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <Link to="/contact" className="page-hero-contact-btn">
              Contact us
            </Link>
          </div>
          <button className="page-hero-menu-toggle" onClick={toggleMenu}>
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>

      {/* Hero Content */}
      <div className="page-hero-content">
        <h1 className="page-hero-title">{title}</h1>
        {subtitle && <p className="page-hero-subtitle">{subtitle}</p>}
      </div>
    </section>
  );
};

export default PageHero;

