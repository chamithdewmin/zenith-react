import React from 'react';
import './HowItWorks.css';
import howItWorksImage from '../assets/howit-image.jpg';

const HowItWorks = () => {
  const steps = [
    {
      id: 1,
      title: 'SCHEDULE A CONSULT',
      description: 'Share your business needs, retail partners, and replenishment challenges.\nWe assess your requirements and deliver a tailored VRP service proposal.',
      icon: '📝'
    },
    {
      id: 2,
      title: 'Provide Details',
      description: 'Share all necessary shipment information, including items, addresses, and preferred schedules, so we can plan an efficient delivery.',
      icon: '📋'
    },
    {
      id: 3,
      title: 'Finalize Deal',
      description: 'Review and approve the VRP strategy and scope.\nOnce approved, we manage replenishment, stock monitoring, and on-shelf availability for your business.',
      icon: '✍️'
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
                Streamlined Shipping in Just a Few Simple Step process
              </h2>
            </div>
            <p className="how-it-works-description">
             At Zenith, we believe in providing our clients with personalized and efficient VRP solutions that meet their unique needs. With years of experience and a team of experts, we are dedicated to empowering your business with seamless shipping experiences.
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

