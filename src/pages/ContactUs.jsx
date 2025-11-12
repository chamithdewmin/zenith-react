import React, { useState } from 'react';
import Header from '../components/Header';
import ScrollHeader from '../components/ScrollHeader';
import HeroSection from '../components/HeroSection';
import Footer from '../components/Footer';
import ScrollToTopButton from '../components/ScrollToTopButton';
import './Page.css';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
    alert('Thank you for your message! We will get back to you soon.');
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: ''
    });
  };

  return (
    <div className="page">
      <Header />
      <ScrollHeader />
      <HeroSection 
        title="Contact Us"
        subtitle="Get in Touch - We'd Love to Hear from You"
      />
      <div className="page-content">
        <section className="content-section">
          <div className="content-container">
            <div className="contact-grid">
              <div className="contact-info">
                <h2 className="section-title">Get in Touch</h2>
                <p className="section-description">
                  Have a question or want to discuss your project? We're here to help. 
                  Fill out the form or reach out to us using the contact information below.
                </p>
                
                <div className="contact-details">
                  <div className="contact-detail-item">
                    <div className="contact-detail-icon">📍</div>
                    <div className="contact-detail-content">
                      <h3 className="contact-detail-title">Address</h3>
                      <p className="contact-detail-text">
                        123 Business Street<br />
                        City, State 12345<br />
                        United States
                      </p>
                    </div>
                  </div>
                  
                  <div className="contact-detail-item">
                    <div className="contact-detail-icon">📧</div>
                    <div className="contact-detail-content">
                      <h3 className="contact-detail-title">Email</h3>
                      <p className="contact-detail-text">
                        info@digitro.com<br />
                        support@digitro.com
                      </p>
                    </div>
                  </div>
                  
                  <div className="contact-detail-item">
                    <div className="contact-detail-icon">📞</div>
                    <div className="contact-detail-content">
                      <h3 className="contact-detail-title">Phone</h3>
                      <p className="contact-detail-text">
                        +1 (555) 123-4567<br />
                        +1 (555) 987-6543
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="contact-form-container">
                <form className="contact-form" onSubmit={handleSubmit}>
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="name" className="form-label">Name *</label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="form-input"
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="email" className="form-label">Email *</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="form-input"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="phone" className="form-label">Phone</label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="form-input"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="subject" className="form-label">Subject *</label>
                      <input
                        type="text"
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        className="form-input"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="message" className="form-label">Message *</label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      className="form-textarea"
                      rows="6"
                      required
                    ></textarea>
                  </div>
                  
                  <button type="submit" className="form-submit-btn">
                    Send Message
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
      <ScrollToTopButton />
    </div>
  );
};

export default ContactUs;

