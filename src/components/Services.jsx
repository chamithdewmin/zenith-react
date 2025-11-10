import React from 'react';
import './Services.css';

const Services = () => {
  const services = [
    {
      id: 1,
      title: 'Ocean Shipping',
      description: 'At FastGo, we believe in providing our clients with personalized and efficient logistics solutions that meet their unique needs.',
      icon: '🌊',
      featured: true
    },
    {
      id: 2,
      title: 'Air Shipping',
      description: 'At FastGo, we believe in providing our clients with personalized and efficient logistics solutions that meet their unique needs.',
      icon: '✈️',
      featured: false
    },
    {
      id: 3,
      title: 'Truck Shipping',
      description: 'At FastGo, we believe in providing our clients with personalized and efficient logistics solutions that meet their unique needs.',
      icon: '🚚',
      featured: false
    },
    {
      id: 4,
      title: 'Custom Clearance',
      description: 'At FastGo, we believe in providing our clients with personalized and efficient logistics solutions that meet their unique needs.',
      icon: '📋',
      featured: false
    },
    {
      id: 5,
      title: 'Freight Forwarding',
      description: 'At FastGo, we believe in providing our clients with personalized and efficient logistics solutions that meet their unique needs.',
      icon: '📦',
      featured: false
    },
    {
      id: 6,
      title: 'Insurance',
      description: 'At FastGo, we believe in providing our clients with personalized and efficient logistics solutions that meet their unique needs.',
      icon: '🛡️',
      featured: false
    }
  ];

  return (
    <section className="services" id="services">
      <div className="services-container">
        <div className="services-title">
          <p className="services-subheading">OUR SERVICES</p>
          <h2 className="services-heading">
            Efficient and Reliable Shipping with FastGo
          </h2>
        </div>
        <div className="services-grid">
          {services.map((service) => (
            <div
              key={service.id}
              className={`service-card ${service.featured ? 'featured' : ''}`}
            >
              <div className="service-icon">{service.icon}</div>
              <div className="service-content">
                <h3 className="service-title">{service.title}</h3>
                <p className="service-description">{service.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;

