import React from 'react';
import Header from '../components/Header';
import ScrollHeader from '../components/ScrollHeader';
import HeroSection from '../components/HeroSection';
import Footer from '../components/Footer';
import './Page.css';

const Services = () => {
  const services = [
    {
      title: 'Web Development',
      description: 'Custom web applications built with modern technologies to meet your business needs.',
      icon: '🌐'
    },
    {
      title: 'Digital Marketing',
      description: 'Comprehensive digital marketing strategies to boost your online presence and reach.',
      icon: '📈'
    },
    {
      title: 'SEO Optimization',
      description: 'Expert SEO services to improve your search engine rankings and drive organic traffic.',
      icon: '🔍'
    },
    {
      title: 'UI/UX Design',
      description: 'Beautiful and intuitive user interfaces designed to enhance user experience.',
      icon: '🎨'
    },
    {
      title: 'E-Commerce Solutions',
      description: 'Complete e-commerce platforms to help you sell online and grow your business.',
      icon: '🛒'
    },
    {
      title: 'Consulting Services',
      description: 'Strategic consulting to help you make informed decisions about your digital transformation.',
      icon: '💼'
    }
  ];

  return (
    <div className="page">
      <Header />
      <ScrollHeader />
      <HeroSection 
        title="Our Services"
        subtitle="Comprehensive Digital Solutions for Your Business"
      />
      <div className="page-content">
        <section className="content-section">
          <div className="content-container">
            <h2 className="section-title-centered">What We Offer</h2>
            <p className="section-description-centered">
              We provide a wide range of digital services designed to help your business 
              succeed in today's competitive market. Our team of experts is ready to 
              assist you with innovative solutions tailored to your specific needs.
            </p>
            <div className="services-grid">
              {services.map((service, index) => (
                <div key={index} className="service-card">
                  <div className="service-icon">{service.icon}</div>
                  <h3 className="service-title">{service.title}</h3>
                  <p className="service-description">{service.description}</p>
                  <a href="#contact" className="service-link">Learn More →</a>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="content-section content-section-alt">
          <div className="content-container">
            <div className="content-grid">
              <div className="content-image">
                <div className="image-placeholder">
                  <img 
                    src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&q=80" 
                    alt="Our Services" 
                  />
                </div>
              </div>
              <div className="content-text">
                <h2 className="section-title">Why Choose Us</h2>
                <ul className="features-list">
                  <li className="feature-item">
                    <span className="feature-check">✓</span>
                    <span>Proven track record of successful projects</span>
                  </li>
                  <li className="feature-item">
                    <span className="feature-check">✓</span>
                    <span>Experienced team of professionals</span>
                  </li>
                  <li className="feature-item">
                    <span className="feature-check">✓</span>
                    <span>Customized solutions for your business</span>
                  </li>
                  <li className="feature-item">
                    <span className="feature-check">✓</span>
                    <span>Competitive pricing and flexible packages</span>
                  </li>
                  <li className="feature-item">
                    <span className="feature-check">✓</span>
                    <span>Ongoing support and maintenance</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default Services;

