import React from 'react';
import { Link } from 'react-router-dom';
import aboutImage from '../assets/about-image.jpg';
import './AboutUs.css';

const AboutUs = () => {
  return (
    <section className="about-us" id="about">
      <div className="about-us-container">
        <div className="about-us-content">
          <div className="about-us-text">
            <div className="about-us-title">
              <p className="about-us-subheading">ABOUT US</p>
              <h2 className="about-us-heading">
                Empowering Your Business with Smarter Supply Solutions 
              </h2>
            </div>
            <p className="about-us-description">
          <div>
            <p>
              Zenith Supply Chain Solutions is a Melbourne-based team
              transforming Australia’s FMCG and liquor businesses’ vendor replenishment.
            </p>
            <p>
              We combine retailer experience, data analytics, and hands-on execution
              to manage forecasting, replenishment, and logistics seamlessly.
            </p>
          </div>
            </p>
            <Link to="/about" className="btn-learn-more">LEARN MORE</Link>
          </div>
          <div className="about-us-image">
            <div className="image-placeholder">
              <img src={aboutImage} alt="About Us" />
            </div>
          </div>
        </div>
        <div className="about-us-cards"> 
          <div className="about-card">
            <div className="card-header">
              <span className="card-number">01</span>
              <div className="card-divider"></div>
              <h3 className="card-title">Expertise and Experience</h3>
            </div>
          </div>
          <div className="about-card">
            <div className="card-header">
              <span className="card-number">02</span>
              <div className="card-divider"></div>
              <h3 className="card-title">Committed to Quality</h3>
            </div>
          </div>
          <div className="about-card">
            <div className="card-header">
              <span className="card-number">03</span>
              <div className="card-divider"></div>
              <h3 className="card-title">Comprehensive Services</h3>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;

