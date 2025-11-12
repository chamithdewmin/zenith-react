import React, { useState, useRef } from 'react';
import Header from '../components/Header';
import ScrollHeader from '../components/ScrollHeader';
import HeroSection from '../components/HeroSection';
import Footer from '../components/Footer';
import './ServicesPage.css';

const Services = () => {
  const [expandedService, setExpandedService] = useState(null);
  const serviceRefs = useRef({});

  const services = [
    {
      id: 1,
      title: 'Vendor Replenishment Planning (VRP)',
      shortDescription: 'End-to-end management of vendor replenishment processes to maximise on-shelf availability, reduce excess inventory, and improve supply chain efficiency.',
      detailedDescription: `Vendor Replenishment Planning (VRP) is a comprehensive solution designed to optimize your retail supply chain operations. Our VRP service provides end-to-end management of vendor replenishment processes, ensuring maximum on-shelf availability while minimizing excess inventory.

Key features include:
• Automated replenishment calculations based on sales velocity and demand patterns
• Real-time inventory tracking across multiple locations
• Vendor collaboration tools for seamless communication
• Performance monitoring and optimization recommendations
• Integration with existing retail systems and platforms

Our VRP solution helps retailers maintain optimal stock levels, reduce waste, and improve overall supply chain efficiency. By leveraging advanced analytics and machine learning, we ensure your shelves are always stocked with the right products at the right time.`,
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
      shortDescription: 'Accurate, demand-driven forecasts using seasonality, trend, and promotion data to ensure optimal inventory levels across multiple retail locations.',
      detailedDescription: `Our Forecasting & Inventory Planning service uses advanced analytics and machine learning to provide accurate, demand-driven forecasts. We analyze seasonality patterns, historical trends, and promotional data to ensure optimal inventory levels across all your retail locations.

The service includes:
• Multi-location demand forecasting with location-specific adjustments
• Seasonal pattern recognition and holiday planning
• Promotion impact analysis and planning
• Safety stock optimization
• Automated reorder point calculations
• What-if scenario planning and sensitivity analysis

By combining statistical models with retail expertise, we help you maintain the perfect balance between stock availability and inventory costs. Our forecasts adapt to changing market conditions, ensuring you're always prepared for demand fluctuations.`,
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
      shortDescription: 'Comprehensive logistics and freight management solutions that minimise transportation delays, reduce operational costs, and improve service levels.',
      detailedDescription: `Logistics & Freight Planning is a comprehensive solution designed to optimize your transportation and distribution operations. We help minimize transportation delays, reduce operational costs, and improve service levels through intelligent route planning and freight optimization.

Our service covers:
• Multi-carrier freight management and optimization
• Route planning and load consolidation
• Real-time shipment tracking and visibility
• Cost analysis and optimization recommendations
• Carrier performance monitoring and management
• Delivery window optimization
• Reverse logistics and returns management

We work with a network of trusted carriers to ensure reliable, cost-effective transportation solutions. Our platform provides real-time visibility into your shipments, allowing you to proactively manage exceptions and ensure on-time delivery.`,
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
      shortDescription: 'Qualified VRP professionals available to maintain performance, stability, and continuity during staff leave or unexpected workforce shortages.',
      detailedDescription: `Leave-Cover VRP provides qualified vendor replenishment planning professionals to maintain performance, stability, and continuity during staff leave or unexpected workforce shortages. Our experienced team seamlessly integrates with your operations to ensure no disruption to your replenishment processes.

Service highlights:
• Experienced VRP professionals with retail expertise
• Rapid deployment within 48-72 hours
• Seamless integration with existing systems and processes
• Full knowledge transfer and documentation
• Performance monitoring and reporting
• Flexible engagement terms (short-term or extended coverage)

Whether you need coverage for planned leave, unexpected absences, or peak periods, our Leave-Cover VRP service ensures your replenishment operations continue smoothly. Our professionals are trained on industry best practices and can quickly adapt to your specific processes and systems.`,
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
      shortDescription: 'Retail-specific training and onboarding programs designed to build confident, capable, and effective vendor replenishment teams for sustained success.',
      detailedDescription: `VRP Training & Onboarding provides comprehensive, retail-specific training programs designed to build confident, capable, and effective vendor replenishment teams. Our training curriculum is tailored to your specific processes, systems, and business requirements.

Training program includes:
• Comprehensive VRP fundamentals and best practices
• Hands-on system training on your specific platforms
• Process documentation and standard operating procedures
• Role-specific training paths (planners, analysts, managers)
• Ongoing support and refresher training
• Performance assessment and certification
• Knowledge base and resource library

Our training approach combines classroom learning with practical, hands-on experience. We work closely with your team to ensure they understand not just the "how" but also the "why" behind each process. This builds a strong foundation for long-term success and continuous improvement.`,
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
      shortDescription: 'Custom dashboards, KPIs, and analytics tools providing real-time visibility, trend analysis, and early warnings on stock, service, and performance.',
      detailedDescription: `Reporting & Analytics provides custom dashboards, KPIs, and analytics tools that deliver real-time visibility into your operations. Our comprehensive reporting suite helps you identify trends, spot issues early, and make data-driven decisions.

Key features:
• Customizable dashboards tailored to your KPIs
• Real-time inventory and service level monitoring
• Trend analysis and predictive insights
• Automated alerts and early warning systems
• Performance benchmarking and comparisons
• Export capabilities for further analysis
• Mobile-responsive dashboards for on-the-go access

Our analytics platform transforms raw data into actionable insights. Whether you need to monitor stock levels, track service performance, or analyze trends, our reporting tools provide the visibility you need to optimize your operations and drive continuous improvement.`,
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="18" y1="20" x2="18" y2="10"></line>
          <line x1="12" y1="20" x2="12" y2="4"></line>
          <line x1="6" y1="20" x2="6" y2="14"></line>
        </svg>
      )
    }
  ];

  const toggleService = (serviceId) => {
    if (expandedService === serviceId) {
      setExpandedService(null);
    } else {
      setExpandedService(serviceId);
      // Smooth scroll to the expanded service
      setTimeout(() => {
        const element = serviceRefs.current[serviceId];
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    }
  };

  return (
    <div className="page">
      <Header />
      <ScrollHeader />
      <HeroSection 
        title="Our Services"
        subtitle="Comprehensive vendor replenishment, logistics, and inventory planning solutions to help you optimise your retail performance."
      />
      <div className="page-content">
        <section className="services-page-section">
          <div className="services-page-container">
            <div className="services-list">
              {services.map((service) => (
                <div
                  key={service.id}
                  ref={(el) => (serviceRefs.current[service.id] = el)}
                  className={`service-item ${expandedService === service.id ? 'expanded' : ''}`}
                >
                  <div 
                    className="service-item-header"
                    onClick={() => toggleService(service.id)}
                  >
                    <div className="service-item-icon">{service.icon}</div>
                    <h3 className="service-item-title">{service.title}</h3>
                    <button 
                      className="service-learn-more-btn-page"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleService(service.id);
                      }}
                    >
                      Learn More
                    </button>
                    <div className="service-expand-icon">
                      <svg 
                        width="24" 
                        height="24" 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        stroke="currentColor" 
                        strokeWidth="2" 
                        strokeLinecap="round" 
                        strokeLinejoin="round"
                        className={expandedService === service.id ? 'rotated' : ''}
                      >
                        <polyline points="6 9 12 15 18 9"></polyline>
                      </svg>
                    </div>
                  </div>
                  <div className="service-item-content">
                    <p className="service-item-short">{service.shortDescription}</p>
                    {expandedService === service.id && (
                      <div className="service-item-details">
                        <p className="service-item-detailed">{service.detailedDescription}</p>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default Services;
