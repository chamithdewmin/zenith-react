import React, { useState } from 'react';
import Header from '../components/Header';
import ScrollHeader from '../components/ScrollHeader';
import HeroSection from '../components/HeroSection';
import Footer from '../components/Footer';
import ScrollToTopButton from '../components/ScrollToTopButton';
import { submitContactForm, validateForm } from '../services/api/contactApi';
import './Page.css';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [notification, setNotification] = useState({ message: '', type: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form
    const validation = validateForm(formData);
    if (!validation.isValid) {
      setErrors(validation.errors);
      setNotification({ 
        message: 'Please fix the errors in the form', 
        type: 'error' 
      });
      setTimeout(() => setNotification({ message: '', type: '' }), 3000);
      return;
    }

    setIsSubmitting(true);
    setErrors({});

    try {
      // Submit form to API
      const result = await submitContactForm(formData);

      if (result.success) {
        // Show success notification
        setNotification({ 
          message: result.message || 'Message sent successfully! We will get back to you soon.', 
          type: 'success' 
        });

        // Clear form
        setFormData({
          name: '',
          email: '',
          phone: '',
          subject: '',
          message: ''
        });

        // Hide notification after 5 seconds
        setTimeout(() => setNotification({ message: '', type: '' }), 5000);
      } else {
        // Show error notification
        setNotification({ 
          message: result.message || 'Failed to send message. Please try again.', 
          type: 'error' 
        });
        setTimeout(() => setNotification({ message: '', type: '' }), 5000);
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setNotification({ 
        message: 'An unexpected error occurred. Please try again later.', 
        type: 'error' 
      });
      setTimeout(() => setNotification({ message: '', type: '' }), 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="page">
      <Header />
      <ScrollHeader />
      <HeroSection 
        title="Contact Us"
        subtitle="Get in Touch - We'd Love to Hear from You"
        backgroundImage="https://www.hlb.global/wp-content/uploads/2025/08/Tariffs-business-agility-article-August-2025-web.jpg"
      />

      {/* Notification Toast */}
      {notification.message && (
        <div className={`toast-notification ${notification.type === 'error' ? 'toast-error' : 'toast-success'}`}>
          {notification.message}
        </div>
      )}

      <div className="page-content">
        <section className="content-section">
          <div className="content-container">
            <div className="contact-grid">

              {/* Contact Info */}
              <div className="contact-info" data-animate="fade-right">
                <h2 className="section-title">Get in Touch</h2>
                <p className="section-description">
                  Have a question or want to discuss your project? We're here to help. 
                  Fill out the form or reach out to us using the contact information below.
                </p>

                <ul className="contact-details">
                  <li className="contact">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="contact-icon-form">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                    </svg>
                    <div>
                      <a href="tel:+61433881247">+61 433 881 247</a>
                    </div>
                  </li>
                  <li className="contact">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="contact-icon-form">
                      <rect x="2" y="4" width="20" height="16" rx="2"></rect>
                      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                    </svg>
                    <div>
                      <a href="mailto:info@zenith.com">isuru.warnakula@zenithscs.com.au</a>
                    </div>
                  </li>
                  <li className="contact">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="contact-icon-form">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                      <circle cx="12" cy="10" r="3"></circle>
                    </svg>
                    <span>
                      Melbourne, Victoria,<br />
                      Australia
                    </span>
                  </li>
                </ul>
              </div>

              {/* Contact Form */}
              <div className="contact-form-container" data-animate="fade-left">
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
                        className={errors.name ? 'input-error' : ''}
                        disabled={isSubmitting}
                        required
                      />
                      {errors.name && <span className="error-message">{errors.name}</span>}
                    </div>
                    <div className="form-group">
                      <label htmlFor="email">Email *</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={errors.email ? 'input-error' : ''}
                        disabled={isSubmitting}
                        required
                      />
                      {errors.email && <span className="error-message">{errors.email}</span>}
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
                        className={errors.phone ? 'input-error' : ''}
                        disabled={isSubmitting}
                      />
                      {errors.phone && <span className="error-message">{errors.phone}</span>}
                    </div>
                    <div className="form-group">
                      <label htmlFor="subject">Subject *</label>
                      <input
                        type="text"
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        className={errors.subject ? 'input-error' : ''}
                        disabled={isSubmitting}
                        required
                      />
                      {errors.subject && <span className="error-message">{errors.subject}</span>}
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="message">Message *</label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      className={errors.message ? 'input-error' : ''}
                      rows="6"
                      disabled={isSubmitting}
                      required
                    ></textarea>
                    {errors.message && <span className="error-message">{errors.message}</span>}
                  </div>

                  <button type="submit" className="form-submit-btn" disabled={isSubmitting}>
                    {isSubmitting ? 'Sending...' : 'Send Message'}
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
