import React from 'react';
import './HeroSection.css';

const HeroSection = ({ title, subtitle }) => {
  return (
    <section className="hero-section">
      <div className="hero-section-background">
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


