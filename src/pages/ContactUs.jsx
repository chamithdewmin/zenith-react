import React, { useState } from 'react';
import Header from '../components/Header';
import ScrollHeader from '../components/ScrollHeader';
import HeroSection from '../components/HeroSection';
import Footer from '../components/Footer';
import ScrollToTopButton from '../components/ScrollToTopButton';
import aboutHeroCover from '../assets/all-hero-cover.jpg';
import './Page.css';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [notification, setNotification] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);

    // Show notification
    setNotification('Thank you! Your message has been sent.');

    // Clear form
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: ''
    });

    // Hide notification after 3 seconds
    setTimeout(() => setNotification(''), 3000);
  };

  return (
    <div className="page">
      <Header />
      <ScrollHeader />
      <HeroSection 
        title="Contact Us"
        subtitle="Get in Touch - We'd Love to Hear from You"
        backgroundImage={aboutHeroCover}
      />

      {/* Notification */}
      {notification && (
        <div className="notification">
          {notification}
        </div>
      )}

      <div className="page-content">
        <section className="content-section">
          <div className="content-container">
            <div className="contact-grid">

              {/* Contact Info */}
              <div className="contact-info">
                <h2 className="section-title">Get in Touch</h2>
                <p className="section-description">
                  Have a question or want to discuss your project? We're here to help. 
                  Fill out the form or reach out to us using the contact information below.
                </p>

                <ul className="contact-details">
                 {/* Address */}
                  <li className="contact">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="contact-icon-form">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                      <circle cx="12" cy="10" r="3"></circle>
                    </svg>
                    <span>
                      123 Business Street<br />
                      City, State 12345<br />
                      United States
                    </span>
                  </li>

                  {/* Email */}
                  <li className="contact">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="contact-icon-form">
                      <rect x="2" y="4" width="20" height="16" rx="2"></rect>
                      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                    </svg>
                    <div>
                      <a href="mailto:info@zenith.com">info@zenith.com</a><br />
                      <a href="mailto:support@zenith.com">support@zenith.com</a>
                    </div>
                  </li>

                  {/* Phone */}
                  <li className="contact">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="contact-icon-form">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                    </svg>
                    <div>
                      <a href="tel:+15551234567">+1 (555) 123-4567</a><br />
                      <a href="tel:+15559876543">+1 (555) 987-6543</a>
                    </div>
                  </li>
                </ul>
              </div>

              {/* Contact Form */}
              <div className="contact-form-container">
                <form className="contact-form" onSubmit={handleSubmit}>
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="name">Name *</label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="email">Email *</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="phone">Phone</label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="subject">Subject *</label>
                      <input
                        type="text"
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="message">Message *</label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
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
