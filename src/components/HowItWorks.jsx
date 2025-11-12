import React from 'react';
import './HowItWorks.css';
import howItWorksImage from '../assets/howit-image.jpg';

const HowItWorks = () => {
  const steps = [
    {
      id: 1,
      title: 'Request a Quote',
      description: 'At FastGo, we believe in providing our clients with personalized and efficient logistics solutions that meet their unique needs.',
      icon: '📝'
    },
    {
      id: 2,
      title: 'Provide Details',
      description: 'At FastGo, we believe in providing our clients with personalized and efficient logistics solutions that meet their unique needs.',
      icon: '📋'
    },
    {
      id: 3,
      title: 'Schedule Pick-Up',
      description: 'At FastGo, we believe in providing our clients with personalized and efficient logistics solutions that meet their unique needs.',
      icon: '🚚'
    }
  ];

  return (
    <section className="how-it-works">
      <div className="how-it-works-container">
        <div className="how-it-works-content">
          <div className="how-it-works-text">
            <div className="how-it-works-title">
              <p className="how-it-works-subheading">HOW IT WORKS</p>
              <h2 className="how-it-works-heading">
                Simplify Your Shipping Experience with Our Easy Step Process
              </h2>
            </div>
            <p className="how-it-works-description">
              At FastGo, we believe in providing our clients with personalized
              and efficient logistics solutions that meet their unique needs.
              With years of experience and a team of experts, we are dedicated
              to empowering your business with seamless shipping experiences.
            </p>
          </div>
          <div className="how-it-works-image">
            <div className="image-placeholder">
              <img src={howItWorksImage} alt="How It Works" />
            </div>
          </div>
        </div>
        <div className="steps-container">
          <div className="steps-line"></div>
          <div className="steps">
            {steps.map((step) => (
              <div key={step.id} className="step">
                <div className="step-label">STEP {step.id}</div>
                <div className="step-icon">{step.icon}</div>
                <div className="step-content">
                  <h3 className="step-title">{step.title}</h3>
                  <p className="step-description">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;

