import React from 'react';
import { Link } from 'react-router-dom';
import './Services.css';

const Services = () => {
  const services = [
    {
      id: 1,
      title: 'Vendor Replenishment Planning (VRP)',
      description: 'End-to-end management of vendor replenishment processes to maximise on-shelf availability, reduce excess inventory, and improve supply chain efficiency.',
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
          <polyline points="9 22 9 12 15 12 15 22"></polyline>
        </svg>
      )
    },
    {
      id: 2,
      title: 'Forecasting & Inventory Planning',
      description: 'Accurate, demand-driven forecasts using seasonality, trend, and promotion data to ensure optimal inventory levels across multiple retail locations.',
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="12" y1="20" x2="12" y2="10"></line>
          <line x1="18" y1="20" x2="18" y2="4"></line>
          <line x1="6" y1="20" x2="6" y2="16"></line>
        </svg>
      )
    },
    {
      id: 3,
      title: 'Logistics & Freight Planning',
      description: 'Comprehensive logistics and freight management solutions that minimise transportation delays, reduce operational costs, and improve service levels.',
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M1 3h15v13H1zM16 8h4l3 3v5h-7V8z"></path>
          <path d="M5 8h10"></path>
        </svg>
      )
    },
    {
      id: 4,
      title: 'Leave-Cover VRP',
      description: 'Qualified VRP professionals available to maintain performance, stability, and continuity during staff leave or unexpected workforce shortages.',
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
          <circle cx="9" cy="7" r="4"></circle>
          <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
          <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
        </svg>
      )
    },
    {
      id: 5,
      title: 'VRP Training & Onboarding',
      description: 'Retail-specific training and onboarding programs designed to build confident, capable, and effective vendor replenishment teams for sustained success.',
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
          <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
        </svg>
      )
    },
    {
      id: 6,
      title: 'Reporting & Analytics',
      description: 'Custom dashboards, KPIs, and analytics tools providing real-time visibility, trend analysis, and early warnings on stock, service, and performance.',
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="18" y1="20" x2="18" y2="10"></line>
          <line x1="12" y1="20" x2="12" y2="4"></line>
          <line x1="6" y1="20" x2="6" y2="14"></line>
        </svg>
      )
    }
  ];

  return (
    <section className="services" id="services">
      <div className="services-container">
        <div className="services-title">
          <p className="about-us-subheading">OUR SERVICES</p>
          <h2 className="about-us-heading">
            Vendor Replenishment Solutions
          </h2>
        </div>
        <div className="services-grid"> 
          {services.map((service) => (
            <div key={service.id} className="service-card">
              <div className="service-icon">{service.icon}</div>
              <div className="service-content">
                <h3 className="service-title">{service.title}</h3>
                <p className="service-description">{service.description}</p>
                <Link to="/services" className="service-learn-more-btn">
                  Learn More
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
