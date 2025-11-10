import React from 'react';
import Header from '../components/Header';
import ScrollHeader from '../components/ScrollHeader';
import HeroSection from '../components/HeroSection';
import Footer from '../components/Footer';
import './Page.css';

const AboutUs = () => {
  return (
    <div className="page">
      <Header />
      <ScrollHeader />
      <HeroSection 
        title="About Us"
        subtitle="Showcasing Our Expertise and Successful Projects"
      />
      <div className="page-content">
        <section className="content-section">
          <div className="content-container">
            <div className="content-grid">
              <div className="content-text">
                <h2 className="section-title">Who We Are</h2>
                <p className="section-description">
                  At Digitro, we are a team of passionate professionals dedicated to delivering 
                  exceptional digital solutions. With years of experience in the industry, we 
                  combine creativity, innovation, and technical expertise to help businesses 
                  thrive in the digital landscape.
                </p>
                <p className="section-description">
                  Our mission is to empower businesses with cutting-edge technology solutions 
                  that drive growth, enhance efficiency, and create lasting value for our clients. 
                  We believe in building long-term partnerships based on trust, transparency, 
                  and outstanding results.
                </p>
              </div>
              <div className="content-image">
                <div className="image-placeholder">
                  <img 
                    src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&q=80" 
                    alt="Our Team" 
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="content-section content-section-alt">
          <div className="content-container">
            <h2 className="section-title-centered">Our Values</h2>
            <div className="values-grid">
              <div className="value-card">
                <div className="value-icon">✓</div>
                <h3 className="value-title">Excellence</h3>
                <p className="value-description">
                  We strive for excellence in every project, ensuring the highest quality 
                  standards and attention to detail.
                </p>
              </div>
              <div className="value-card">
                <div className="value-icon">✓</div>
                <h3 className="value-title">Innovation</h3>
                <p className="value-description">
                  We embrace innovation and stay ahead of industry trends to provide 
                  cutting-edge solutions.
                </p>
              </div>
              <div className="value-card">
                <div className="value-icon">✓</div>
                <h3 className="value-title">Integrity</h3>
                <p className="value-description">
                  We conduct business with honesty, transparency, and ethical practices 
                  in all our interactions.
                </p>
              </div>
              <div className="value-card">
                <div className="value-icon">✓</div>
                <h3 className="value-title">Client Focus</h3>
                <p className="value-description">
                  Our clients' success is our priority. We listen, understand, and deliver 
                  solutions that exceed expectations.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default AboutUs;

