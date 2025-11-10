import React, { useState } from 'react';
import './Header.css';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="header">
      <div className="header-top">
        <div className="header-contact">
          <span className="contact-email">EKSPRESS@MAIL.COM</span>
          <div className="contact-divider"></div>
          <span className="contact-phone">+1 (333) 000-0000</span>
        </div>
      </div>
      <div className="header-main">
        <div className="header-content">
          <div className="logo">EKSPRESS</div>
          <nav className={`nav ${isMenuOpen ? 'nav-open' : ''}`}>
            <a href="#home" className="nav-link active">HOME</a>
            <a href="#about" className="nav-link">ABOUT US</a>
            <a href="#services" className="nav-link">SERVICES</a>
            <a href="#contact" className="nav-link">CONTACT US</a>
            <a href="#blog" className="nav-link">BLOG</a>
          </nav>
          <button className="btn-get-quote">GET QUOTE</button>
          <button className="menu-toggle" onClick={toggleMenu}>
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;

