import React from 'react';
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
                Empowering Your Business with Tailored Logistics Solutions
              </h2>
            </div>
            <p className="about-us-description">
              At FastGo, we believe in providing our clients with
              personalized and efficient logistics solutions that meet their
              unique needs. With years of experience and a team of experts,
              we are dedicated to empowering your business with seamless
              shipping experiences.
            </p>
            <button className="btn-learn-more">LEARN MORE</button>
          </div>
          <div className="about-us-image">
            <div className="image-placeholder">
              <img src="https://via.placeholder.com/506x410/121D50/FFFFFF?text=About+Us" alt="About Us" />
            </div>
            <div className="ornament-box">
              <div className="ornament-icon">
                <svg width="59" height="59" viewBox="0 0 59 59" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect width="59" height="59" rx="8" fill="#0E33CB"/>
                </svg>
              </div>
              <div className="award-badge">
                <div className="award-label">AWARDS WINNING</div>
                <div className="award-number">647 +</div>
              </div>
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

