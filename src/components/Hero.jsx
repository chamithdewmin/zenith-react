import React, { useState } from 'react';
import './Hero.css';

const Hero = () => {
  const [activeTab, setActiveTab] = useState('tracking');
  const [trackingId, setTrackingId] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle tracking submission
    console.log('Tracking ID:', trackingId);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <section className="hero" id="home">
      <div className="hero-background"></div>
      <div className="hero-lottie-animation">
        <iframe
          src="https://lottie.host/embed/3f3171c1-f853-4b30-9b05-ded7756b906f/afPDfTRd1L.lottie"
          title="Hero Animation"
          className="lottie-iframe"
          allow="autoplay"
        ></iframe>
      </div>
      <div className="hero-header">
        <div className="hero-header-content">
          <div className="hero-logo">EKSPRESS</div>
          <nav className={`hero-nav ${isMenuOpen ? 'nav-open' : ''}`}>
            <a href="#home" className="hero-nav-link active">HOME</a>
            <a href="#about" className="hero-nav-link">ABOUT US</a>
            <a href="#services" className="hero-nav-link">SERVICES</a>
            <a href="#contact" className="hero-nav-link">CONTACT US</a>
            <a href="#blog" className="hero-nav-link">BLOG</a>
          </nav>
          <button className="menu-toggle" onClick={toggleMenu}>
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>
      <div className="hero-content">
        <div className="hero-left-section">
          <div className="hero-text">
            <div className="hero-title">
              <p className="hero-subheading">WE ARE BEST LOGISTIC COMPANY</p>
              <h1 className="hero-heading">
                STREAMLINE YOUR SHIPPING WITH OUR CARGO SERVICES
              </h1>
            </div>
            <p className="hero-description">
              Simplify your shipping process and make it more efficient with
              our cargo services. From start to finish, we'll handle
              everything to ensure your cargo arrives safely.
            </p>
          </div>
          <div className="hero-fun-facts">
            <div className="fun-fact-item">
              <div className="fun-fact-image">
                <img src="https://via.placeholder.com/100x100/0E33CB/FFFFFF?text=26K" alt="Satisfied Clients" />
              </div>
              <div className="fun-fact-content">
                <h2 className="fun-fact-number">26 K</h2>
                <p className="fun-fact-label">Satisfied Clients</p>
              </div>
            </div>
            <div className="fun-fact-divider"></div>
            <div className="fun-fact-item">
              <div className="fun-fact-content">
                <h2 className="fun-fact-number">12 +</h2>
                <p className="fun-fact-label">Years of Experience</p>
              </div>
            </div>
          </div>
        </div>
        <div className="hero-right-section">
          <div className="tracking-form-box">
            <div className="tracking-tabs">
              <button
                className={`tab ${activeTab === 'tracking' ? 'active' : ''}`}
                onClick={() => setActiveTab('tracking')}
              >
                TRACKING
              </button>
              <button
                className={`tab ${activeTab === 'rate' ? 'active' : ''}`}
                onClick={() => setActiveTab('rate')}
              >
                RATE & SHIP
              </button>
            </div>
            <div className="tracking-form-container">
              <form className="tracking-form" onSubmit={handleSubmit}>
                <input
                  type="text"
                  placeholder="TRACKING ID"
                  value={trackingId}
                  onChange={(e) => setTrackingId(e.target.value)}
                  className="tracking-input"
                />
                <button type="submit" className="tracking-btn">
                  TRACK
                </button>
              </form>
              <p className="tracking-help">
                See the tracking id on shipping document, <span className="help-link">Help</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

