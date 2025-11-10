import React from 'react';
import './Testimonials.css';

const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      name: 'John Doe, Business Owner',
      text: 'I have been using FastGo cargo logistic & transportation services for over a year now and I am extremely satisfied with their service. They are efficient, reliable, and always deliver on time. I highly recommend them to anyone in need of logistics services.',
      featured: true
    },
    {
      id: 2,
      name: 'Jane Smith, Freelance Consultant',
      text: 'I was very impressed with FastGo handling of my recent shipment. They went above and beyond to ensure my cargo arrived safely and on time. I will definitely be using their services again in the future.',
      featured: false
    },
    {
      id: 3,
      name: 'Michael Johnson, CEO',
      text: 'I was very impressed with FastGo handling of my recent shipment. They went above and beyond to ensure my cargo arrived safely and on time. I will definitely be using their services again in the future.',
      featured: false
    },
    {
      id: 4,
      name: 'Sarah Lee, Online Retailer',
      text: 'I was very impressed with FastGo handling of my recent shipment. They went above and beyond to ensure my cargo arrived safely and on time. I will definitely be using their services again in the future.',
      featured: false
    }
  ];

  const renderStars = () => {
    return (
      <div className="stars">
        {[...Array(5)].map((_, i) => (
          <span key={i} className="star">★</span>
        ))}
      </div>
    );
  };

  return (
    <section className="testimonials">
      <div className="testimonials-container">
        <div className="testimonials-title">
          <p className="testimonials-subheading">TESTIMONIALS</p>
          <h2 className="testimonials-heading">Our Clients Speak for Us</h2>
        </div>
        <div className="testimonials-content">
          <div className="testimonial-hero">
            <div className="testimonial-icon"></div>
            <div className="testimonial-image">
              <div className="image-placeholder">
                <img src="https://via.placeholder.com/506x336/121D50/FFFFFF?text=Testimonial" alt="Testimonial" />
              </div>
            </div>
            <div className="testimonial-card featured">
              {renderStars()}
              <p className="testimonial-text">{testimonials[0].text}</p>
              <p className="testimonial-name">{testimonials[0].name}</p>
            </div>
          </div>
          <div className="testimonials-grid">
            {testimonials.slice(1).map((testimonial) => (
              <div key={testimonial.id} className="testimonial-card">
                {renderStars()}
                <p className="testimonial-text">{testimonial.text}</p>
                <p className="testimonial-name">{testimonial.name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;

