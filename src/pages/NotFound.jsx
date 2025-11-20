import React from 'react';
import { Link } from 'react-router-dom';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import './NotFound.css';

const NotFound = () => {
  return (
    <div className="notfound-page">
      <div className="notfound-container">
        <div className="notfound-animation">
          <DotLottieReact
            src="https://lottie.host/9abac578-db6c-4268-8714-c01ae7ce2ac0/vmWUd8JLEo.lottie"
            loop
            autoplay
          />
        </div>
        <h1 className="notfound-title">404 - Page Not Found</h1>
        <p className="notfound-message">
          Oops! The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="notfound-actions">
          <Link to="/" className="notfound-btn primary">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
              <polyline points="9 22 9 12 15 12 15 22"></polyline>
            </svg>
            Back to Home
          </Link>
          <Link to="/contact" className="notfound-btn secondary">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
            </svg>
            Contact Support
          </Link>
        </div>
        <div className="notfound-links">
          <p>Maybe you're looking for:</p>
          <div className="quick-links">
            <Link to="/about">About Us</Link>
            <Link to="/services">Services</Link>
            <Link to="/blog">Blog</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
