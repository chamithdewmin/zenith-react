import React from 'react';
import './HowItWorks.css';
import howItWorksImage from '../assets/howit-image.jpg';

const HowItWorks = () => {
  const steps = [
    {
      id: 1,
      title: 'Schedule a Consult',
      description: 'Share your business needs, retail partners, and replenishment challenges.\nWe assess your requirements and deliver a tailored VRP service proposal.',
      icon: '📝'
    },
    {
      id: 2,
      title: 'Provide Details',
      description: 'Provide your sales, inventory, and forecast data (or system access). We’ll analyse performance, identify demand patterns, and create an optimised replenishment plan for each retailer.',
      icon: '📋'
    },
    {
      id: 3,
      title: 'Confirm Engagement',
      description: 'Review the proposed VRP strategy, service scope, and reporting structure. Once approved, we handle the full replenishment process—managing orders, tracking stock, and ensuring on-shelf availability.',
      icon: '✍️'
    }
  ];

  return (
    <section className="how-it-works">
      <div className="how-it-works-container">
        <div className="how-it-works-content">
          <div className="how-it-works-text" data-animate="fade-right">
            <div className="how-it-works-title">
              <p className="how-it-works-subheading">HOW IT WORKS</p>
              <h2 className="how-it-works-heading">
                Streamlined Vendor Replenishment in Just a Few Simple Steps
              </h2>
            </div>
            <p className="how-it-works-description">
             At Zenith, we specialise in empowering suppliers with tailored Vendor Replenishment Planning solutions that optimise stock flow, reduce workload, and keep your retail partners satisfied—fast, seamless, and efficient.
            </p>
          </div>
          <div className="how-it-works-image" data-animate="fade-left">
            <div className="image-placeholder">
              <img src={howItWorksImage} alt="How It Works" />
            </div>
          </div>
        </div>
        <div className="steps-container">
          <div className="steps-line"></div>
          <div className="steps">
            {steps.map((step, idx) => (
              <div key={step.id} className="step" data-animate="fade-up" data-delay={idx * 150}>
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

