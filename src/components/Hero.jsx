import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import logoLight from '../assets/logo-light.svg';
import SplitText from './SplitText';
import './Hero.css';

const Hero = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const isActive = (path) => location.pathname === path;

  return (
    <section className="hero" id="home">
      <div className="hero-background"></div>

      {/* ================= HEADER ================= */}
      <header className="hero-header">
        <div className="hero-header-content">
          <Link to="/" className="hero-logo">
            <img src={logoLight} alt="EKSPRESS Logo" className="hero-logo-img" />
          </Link>

          <nav className={`hero-nav ${isMenuOpen ? 'nav-open' : ''}`}>
            <Link to="/" className={`hero-nav-link ${isActive('/') ? 'active' : ''}`}>HOME</Link>
            <Link to="/about" className={`hero-nav-link ${isActive('/about') ? 'active' : ''}`}>ABOUT US</Link>
            <Link to="/services" className={`hero-nav-link ${isActive('/services') ? 'active' : ''}`}>SERVICES</Link>
            <Link to="/contact" className={`hero-nav-link ${isActive('/contact') ? 'active' : ''}`}>CONTACT US</Link>
            <Link to="/blog" className={`hero-nav-link ${isActive('/blog') ? 'active' : ''}`}>BLOG</Link>
          </nav>

          <button className="menu-toggle" onClick={toggleMenu} aria-label="Toggle menu">
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </header>

      {/* ================= HERO CONTENT ================= */}
      <div className="hero-content">
        <div className="hero-left-section">
          <div className="hero-text">
            <div className="hero-title">
              <p className="hero-subheading">WE ARE BEST LOGISTIC COMPANY</p>
              <SplitText
                text="STREAMLINE YOUR SHIPPING WITH OUR CARGO SERVICES"
                className="hero-heading"
                tag="h1"
                delay={10}
                duration={0.2}
                ease="power1.out"
                splitType="chars"
                from={{ opacity: 0, y: 40 }}
                to={{ opacity: 1, y: 0 }}
                threshold={0.1}
                rootMargin="-100px"
                textAlign="left"
              />
            </div>

            <p className="hero-description">
              Simplify your shipping process and make it more efficient with our cargo services.
              From start to finish, we'll handle everything to ensure your cargo arrives safely.
            </p>
            <div className="hero-cta-buttons">
              <Link to="/contact" className="hero-cta-primary">
                Get Started Now
              </Link>
              <Link to="/services" className="hero-cta-secondary">
                Learn More
              </Link>
            </div>
          </div>

          <br></br>

          <div className="hero-fun-facts">
            <div className="fun-fact-item">
              <div className="fun-fact-content">
                <h2 className="fun-fact-number">26K</h2>
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
          <DotLottieReact
            autoplay
            loop
            style={{ width: '650px', height: '650px' }}
            src="https://lottie.host/ee5e348c-5b04-4529-ad8c-5a1d1c26183a/sbkr0ioOCO.lottie"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
