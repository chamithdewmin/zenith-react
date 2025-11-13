import React, { useState, useEffect } from 'react';
import './ScrollToTopButton.css';
import whatsappIcon from '../assets/whatsapp.png'; // ✅ Use your actual icon file

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.scrollY > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  return (
    <div className="scroll-to-top-button">
      {isVisible && (
        <>
          {/* Scroll to top button */}
          <button
            type="button"
            onClick={scrollToTop}
            className="scroll-btn"
            aria-label="Scroll to top"
            title="Back to top"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <polyline points="18 15 12 9 6 15"></polyline>
            </svg>
          </button>

          {/* WhatsApp button */}
          <a
            href="https://wa.me/61433881247"
            className="whatsapp-btn"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chat on WhatsApp"
            title="Chat on WhatsApp"
          >
            <img src={whatsappIcon} alt="WhatsApp" className="whatsapp-icon" />
          </a>
        </>
      )}
    </div>
  );
};

export default ScrollToTopButton;
