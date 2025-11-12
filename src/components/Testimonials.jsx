import React, { useState, useEffect } from 'react';
import './Testimonials.css';
import feedbackImage from '../assets/feedback-image.jpg';
import flaticonIcon from '../assets/google.png';

const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      name: 'John Doe, Business Owner',
      text: 'I have been using Zenith Supply Chain Solutions logistic & transportation services for over a year now and I am extremely satisfied with their service. They are efficient, reliable, and always deliver on time. I highly recommend them to anyone in need of logistics services.',
      featured: true
    },
    {
      id: 2,
      name: 'Jane Smith, Freelance Consultant',
      text: 'I was very impressed with Zenith Supply Chain Solutions handling of my recent shipment. They went above and beyond to ensure my cargo arrived safely and on time. I will definitely be using their services again in the future.',
      featured: false
    },
    {
      id: 3,
      name: 'Michael Johnson, CEO',
      text: 'I was very impressed with Zenith Supply Chain Solutions handling of my recent shipment. They went above and beyond to ensure my cargo arrived safely and on time. I will definitely be using their services again in the future.',
      featured: false
    },
    {
      id: 4,
      name: 'Sarah Lee, Online Retailer',
      text: 'I was very impressed with Zenith Supply Chain Solutions handling of my recent shipment. They went above and beyond to ensure my cargo arrived safely and on time. I will definitely be using their services again in the future.',
      featured: false
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-slide every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  const goToPrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

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
          <h2 className="testimonials-heading">What Our Clients Say</h2>
        </div>
        <div className="testimonials-carousel">
          <button className="carousel-arrow carousel-prev" onClick={goToPrev} aria-label="Previous testimonial">
            ‹
          </button>
          
          <div className="carousel-content">
            <div className="carousel-image">
              <img src={feedbackImage} alt="Testimonial" />
            </div>
            <div className="carousel-card">
              {renderStars()}
              <p className="testimonial-text">{testimonials[currentIndex].text}</p>
              <p className="testimonial-name">{testimonials[currentIndex].name}</p>
                <div className="review-box-corner">
                  <img src={flaticonIcon} alt="Brand icon" className="brand-icon-only" />
                </div>
              </div>
          </div>

          <button className="carousel-arrow carousel-next" onClick={goToNext} aria-label="Next testimonial">
            ›
          </button>

          <div className="carousel-dots">
            {testimonials.map((_, index) => (
              <button
                key={index}
                className={`dot ${index === currentIndex ? 'active' : ''}`}
                onClick={() => goToSlide(index)}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default Testimonials;

