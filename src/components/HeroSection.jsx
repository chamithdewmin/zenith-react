import React from 'react';
import './HeroSection.css';

const HeroSection = ({ title, subtitle, backgroundImage }) => {
  return (
    <section className="hero-section">
      {/* Background container */}
      <div
        className="hero-section-background"
        style={{
          backgroundImage: backgroundImage ? `url(${backgroundImage})` : 'none',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <div className="hero-section-overlay"></div>
        <div className="hero-section-orange-glow"></div>
      </div>

      {/* Hero Content */}
      <div className="hero-section-content">
        <h1 className="hero-section-title">{title}</h1>
        {subtitle && <p className="hero-section-subtitle">{subtitle}</p>}
      </div>
    </section>
  );
};

export default HeroSection;
