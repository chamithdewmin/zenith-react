import React, { useState } from 'react';
import Header from '../components/Header';
import ScrollHeader from '../components/ScrollHeader';
import HeroSection from '../components/HeroSection';
import Footer from '../components/Footer';
import ScrollToTopButton from '../components/ScrollToTopButton';
import './Page.css';
import aboutImage from '../assets/about.jpg';

const AboutUs = () => {
  const [isDownloading, setIsDownloading] = useState(false);

  const skills = [
    { name: 'VRP Planning', percentage: 98, description: 'End-to-end vendor replenishment process optimization' },
    { name: 'Demand Forecasting', percentage: 95, description: 'Advanced analytics and predictive modeling' },
    { name: 'Logistics Optimization', percentage: 80, description: 'Supply chain efficiency and cost reduction' },
  ];

  const stats = [
    { value: '5+', label: 'Years of Experience', description: 'Industry leadership and expertise' },
    { value: '50+', label: 'Projects Completed', description: 'Successful implementations' },
    { value: '20+', label: 'Companies Served', description: 'Growing partnerships' },
    { value: '10', label: 'Team Members', description: 'Expert professionals' },
  ];

  const isMobile = () => /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

  const handleDownload = async () => {
    setIsDownloading(true); // Start downloading state
    const fileId = '1MH5OPopr1BqvJmDbRgiGhFoZaNAQ898E';
    const directLink = `https://drive.google.com/uc?export=download&id=${fileId}`;

    if (isMobile()) {
      window.location.href = directLink;
      setTimeout(() => setIsDownloading(false), 3000); // Reset after a short delay
    } else {
      try {
        const res = await fetch(directLink);
        if (!res.ok) throw new Error('Network response was not ok');
        const blob = await res.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = url;
        a.download = 'Zenith_Brochure.pdf';
        document.body.appendChild(a);
        a.click();
        a.remove();
        window.URL.revokeObjectURL(url);
      } catch (err) {
        window.open(directLink, '_blank');
      } finally {
        setIsDownloading(false); // Reset after download
      }
    }
  };

  return (
    <div className="page">
      <Header />
      <ScrollHeader />
      <HeroSection 
        title="About Us"
        subtitle="Industry-Leading Supply Chain and Vendor Replenishment Solutions"
        backgroundImage="https://www.hlb.global/wp-content/uploads/2025/08/Tariffs-business-agility-article-August-2025-web.jpg"
      />

      <div className="page-content">
        <section className="about-hero-section" aria-labelledby="about-title">
          <div className="content-container">
            <div className="about-hero-grid">
              <div className="about-image-box" data-animate="fade-right">
                <img src={aboutImage} alt="Zenith Solutions - Professional team collaboration" className="about-image" />
              </div>
              <div className="about-text-box" data-animate="fade-left">
                <h1 className="about-title" id="about-title">Who Are We?</h1>
                <p className="about-description">
                  Zenith Supply Chain Solutions is a forward-thinking company based in Melbourne that focuses on improving how goods are restocked for fast-moving consumer goods (FMCG) and liquor businesses throughout Australia. Our approach goes beyond simply delivering products; we aim to transform the way suppliers and retailers manage inventory and stock levels.
                </p>
                <p className="about-description">
                  We leverage extensive retail experience, advanced data analytics, and practical, on-the-ground support to act as an extension of your team. This means we don’t just provide advice — we actively manage key aspects like replenishment, demand forecasting, and logistics, ensuring your products are available when and where they are needed.
                </p>

                 

                {/* ===== DOWNLOAD BUTTON ===== */}
                <button 
                  className={`about-cta-btn ${isDownloading ? 'downloading' : ''}`} 
                  aria-label="Download brochure" 
                  onClick={handleDownload}
                  disabled={isDownloading}
                >
                  {isDownloading ? (
                    <span className="downloading-text">Downloading...</span>
                  ) : (
                    <>
                      <span className="btn-icon" aria-hidden="true">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" focusable="false">
                          <path d="M12 3v10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M8 11l4 4 4-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M21 21H3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </span>
                      <span>Download Brochure</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* ===== SKILLS AND STATS SECTION ===== */}
        <section className="skills-stats-section" aria-labelledby="skills-title">
          <div className="content-container">
            <div className="skills-stats-wrapper">
              <article className="skills-column" data-animate="fade-up">
                <h2 className="skills-heading" id="skills-title">Our Core Competencies</h2>
                <p className="skills-subheading">
                  Expertise across critical supply chain functions, driving measurable results and operational excellence.
                </p>
                <div className="skills-list" role="list">
                  {skills.map((skill, idx) => (
                    <div key={idx} className="skill-item" role="listitem" data-animate="fade-up" data-delay={idx * 100}>
                      <div className="skill-header">
                        <div className="skill-info">
                          <h3 className="skill-name">{skill.name}</h3>
                          <p className="skill-description">{skill.description}</p>
                        </div>
                        <span className="skill-percentage" aria-label={`${skill.percentage} percent proficiency`}>
                          {skill.percentage}%
                        </span>
                      </div>
                      <div className="skill-bar" role="progressbar" aria-valuenow={skill.percentage} aria-valuemin="0" aria-valuemax="100">
                        <div className="skill-bar-fill" style={{ width: `${skill.percentage}%` }}></div>
                      </div>
                    </div>
                  ))}
                </div>
              </article>

              <article className="stats-column" data-animate="fade-up" data-delay="200">
                <div className="stats-grid" role="list">
                  {stats.map((stat, idx) => (
                    <div key={idx} className="service-card" role="listitem" data-animate="scale" data-delay={(idx + 1) * 100}>
                      <div className="stat-value" aria-label={stat.label}>{stat.value}</div>
                      <div className="stat-label">{stat.label}</div>
                      <p className="stat-description">{stat.description}</p>
                    </div>
                  ))}
                </div>
              </article>
            </div>
          </div>
        </section>

        <br /><br /><br /><br /><br /><br /><br />
      </div>

      <Footer />
      <ScrollToTopButton />
    </div>
  );
};

export default AboutUs;
