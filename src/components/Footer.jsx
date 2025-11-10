import React, { useState } from 'react';
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
            <h2 className="footer-logo">EKSPRESS</h2>
            <p className="footer-description">
              At FastGo, we believe in providing our clients with personalized
              and efficient logistics solutions that meet their unique needs.
            </p>
          </div>
          <div className="footer-navigation">
            <h3 className="footer-heading">NAVIGATION</h3>
            <ul className="footer-links">
              <li><a href="#home">Home</a></li>
              <li><a href="#about">About Us</a></li>
              <li><a href="#services">Services</a></li>
              <li><a href="#contact">Contact Us</a></li>
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
          <p className="footer-copyright">Copyright © 2023 Ekspress</p>
          <p className="footer-designed">Designed by TokoTema</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

