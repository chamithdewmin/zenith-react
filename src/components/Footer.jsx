import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';
import logoLight from '../assets/logo-light.svg';

const Footer = () => {
  const [email, setEmail] = useState('');

  const handleSubscribe = (e) => {
    e.preventDefault();
    // Handle subscription
    console.log('Subscribe:', email);
    setEmail('');
  };

  return (
    <footer className="footer" id="contact">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-brand">
            {/* Replace text logo with the light SVG */}
            <img src={logoLight} alt="Zenith supply chain solutions" className="footer-logo" />
            <p className="footer-description">
              Simplifying vendor replenishment for Australia’s FMCG and liquor industry through data-driven planning and execution.
            </p>
          </div>
          <div className="footer-navigation">
            <h3 className="footer-heading">Useful Links</h3>
            <ul className="footer-links">
              <li><Link to="/#home">Home</Link></li>
              <li><Link to="/#about">About Us</Link></li>
              <li><Link to="/#services">Services</Link></li>
              <li><Link to="/#how-it-works">How It Works</Link></li>
              <li><Link to="/#testimonials">Testimonials</Link></li>
            </ul>
          </div>
          <div className="footer-recent">
            <div className="footer-navigation">
              <h3 className="footer-heading-s">SERVICES WE OFFER</h3>
              <ul className="footer-links">
                <li><Link to="/services">Vendor Replenishment Planning </Link></li>
                <li><Link to="/services">Forecasting &amp; Inventory Planning</Link></li>
                <li><Link to="/services">Logistics &amp; Freight Planning</Link></li>
                <li><Link to="/services">Leave-Cover VRP</Link></li>
                <li><Link to="/services">VRP Training &amp; Onboarding</Link></li>
                <li><Link to="/services">Reporting &amp; Analytics</Link></li>
              </ul>
            </div>
          </div>
          <div className="footer-contact">
            <h3 className="footer-heading">CONTACT US</h3>
            <ul className="contact-list">
              <li className="contact-item">
                {/* map-pin icon (inline small SVG matching Services icon style) */}
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="contact-icon" aria-hidden>
                  <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 1 1 18 0z"></path>
                  <circle cx="12" cy="10" r="3"></circle>
                </svg>
                <span>Melbourne, Victoria, Australia</span>
              </li>
              <li className="contact-item">
                {/* mail icon */}
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="contact-icon" aria-hidden>
                  <path d="M4 4h16v16H4z"></path>
                  <polyline points="22,6 12,13 2,6"></polyline>
                </svg>
                <a href="mailto:info@zenithsupply.com">info@zenithsupply.com</a>
              </li>
              <li className="contact-item">
                {/* phone icon */}
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="contact-icon" aria-hidden>
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.86 19.86 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.86 19.86 0 0 1-3.07-8.63A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.12 1.21.36 2.39.7 3.53a2 2 0 0 1-.45 2.11L8.09 10.91a16 16 0 0 0 6 6l1.55-1.27a2 2 0 0 1 2.11-.45c1.14.34 2.32.58 3.53.7A2 2 0 0 1 22 16.92z"></path>
                </svg>
                <a href="tel:+61390000000">+61 3 9000 0000</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="footer-divider"></div>
        <div className="footer-bottom">
          <p className="footer-copyright">© 2025 Zenith Supply Chain Solutions. All rights reserved.</p>
          <p className="footer-designed">Designed & Built by <a href="https://logozodev.com" target="_blank" rel="noopener noreferrer" className="text-color">Logozodev</a></p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

