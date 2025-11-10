import React, { useState } from 'react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import './Hero.css';

const Hero = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <section className="hero" id="home">
      <div className="hero-background"></div>

      {/* Header */}
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

      {/* Hero Content */}
      <div className="hero-content">
        {/* Left side: text */}
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
              our cargo services. From start to finish, we'll handle everything to ensure your cargo arrives safely.
            </p>
          </div>
          <div className="hero-fun-facts">
            <div className="fun-fact-item">
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

        {/* Right side: Lottie animation */}
        <div className="hero-right-section">
          <DotLottieReact
            autoplay
            loop
            style={{ width: '500px', height: '500px' }}
            src="https://lottie.host/ee5e348c-5b04-4529-ad8c-5a1d1c26183a/sbkr0ioOCO.lottie"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
