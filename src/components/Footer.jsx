import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

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
            <h2 className="footer-logo">Digitro</h2>
            <p className="footer-description">
              At Digitro, we believe in providing our clients with personalized
              and efficient digital solutions that meet their unique needs.
            </p>
          </div>
          <div className="footer-navigation">
            <h3 className="footer-heading">NAVIGATION</h3>
            <ul className="footer-links">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/services">Services</Link></li>
              <li><Link to="/contact">Contact Us</Link></li>
              <li><Link to="/blog">Blog</Link></li>
            </ul>
          </div>
          <div className="footer-recent">
            <h3 className="footer-heading">RECENT PROJECT</h3>
            <div className="recent-project-image">
              <div className="image-placeholder">
                <img src="https://via.placeholder.com/213x124/EDF0F3/5C6C7B?text=Project" alt="Recent Project" />
              </div>
            </div>
          </div>
          <div className="footer-subscribe">
            <h3 className="footer-heading">SUBSCRIBE US</h3>
            <form className="subscribe-form" onSubmit={handleSubscribe}>
              <input
                type="email"
                placeholder="Enter Your Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="subscribe-input"
                required
              />
              <button type="submit" className="subscribe-btn">
                SUBSCRIBE NOW
              </button>
            </form>
          </div>
        </div>
        <div className="footer-divider"></div>
        <div className="footer-bottom">
          <p className="footer-copyright">Copyright © 2024 Digitro</p>
          <p className="footer-designed">Designed by TokoTema</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

