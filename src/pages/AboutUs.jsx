import React from 'react';
import Header from '../components/Header';
import ScrollHeader from '../components/ScrollHeader';
import HeroSection from '../components/HeroSection';
import Footer from '../components/Footer';
import ScrollToTopButton from '../components/ScrollToTopButton';
import './Page.css';
import aboutImage from '../assets/about.jpg';
import aboutHeroCover from '../assets/all-hero-cover.jpg';

const AboutUs = () => {
  // Core competencies with descriptions
  const skills = [
    { 
      name: 'VRP Planning', 
      percentage: 98,
      description: 'End-to-end vendor replenishment process optimization'
    },
    { 
      name: 'Demand Forecasting', 
      percentage: 95,
      description: 'Advanced analytics and predictive modeling'
    },
    { 
      name: 'Logistics Optimization', 
      percentage: 80,
      description: 'Supply chain efficiency and cost reduction'
    },
  ];

  // Company achievements and milestones
  const stats = [
    { 
      value: '5+', 
      label: 'Years of Experience',
      description: 'Industry leadership and expertise'
    },
    { 
      value: '50+', 
      label: 'Projects Completed',
      description: 'Successful implementations'
    },
    { 
      value: '20+', 
      label: 'Companies Served',
      description: 'Growing partnerships'
    },
    { 
      value: '10', 
      label: 'Team Members',
      description: 'Expert professionals'
    },
  ];
  
  return (
    <div className="page">
      <Header />
      <ScrollHeader />
      <HeroSection 
        title="About Us"
        subtitle="Industry-Leading Supply Chain and Vendor Replenishment Solutions"
        backgroundImage={aboutHeroCover} // ✅ add this prop
      />
      
      <div className="page-content">
        {/* ===== ABOUT HERO SECTION ===== */}
        <section className="about-hero-section" aria-labelledby="about-title">
          <div className="content-container">
            <div className="about-hero-grid">
              {/* Image Column */}
              <div className="about-image-box">
                <img 
                  src={aboutImage} 
                  alt="Zenith Solutions - Professional team collaboration" 
                  className="about-image" 
                />
              </div>
              
              {/* Content Column */}
              <div className="about-text-box">
                <h1 className="about-title" id="about-title">
                  We Always Make The Best
                </h1>
                
                <p className="about-description">
                  At Zenith Solutions, we are a team of passionate professionals dedicated to delivering 
                  exceptional supply chain and vendor management solutions. With years of experience in the industry, 
                  we combine creativity, innovation, and technical expertise to help retail businesses thrive.
                </p>
                
                <p className="about-description">
                  Our mission is to empower businesses with cutting-edge technology solutions that drive growth, 
                  enhance efficiency, and create lasting value for our clients. We believe in building long-term 
                  partnerships based on trust, transparency, and outstanding results.
                </p>
                
                <button
                  className="about-cta-btn"
                  aria-label="Download brochure"
                  onClick={async () => {
                    // File ID from the provided Google Drive link
                    const fileId = '1gqrlhkezAAerfjDBmQdmwUSpdrMIL956';
                    const directLink = `https://drive.google.com/uc?export=download&id=${fileId}`;

                    // Try to fetch and download as a blob first (best UX, stays on page).
                    try {
                      const res = await fetch(directLink, { method: 'GET' });
                      if (!res.ok) throw new Error('Network response was not ok');
                      const blob = await res.blob();
                      const url = window.URL.createObjectURL(blob);
                      const a = document.createElement('a');
                      a.style.display = 'none';
                      a.href = url;
                      // Suggested filename
                      a.download = 'Zenith_Brochure.pdf';
                      document.body.appendChild(a);
                      a.click();
                      a.remove();
                      window.URL.revokeObjectURL(url);
                    } catch (err) {
                      // Fallback: load the direct link in an invisible iframe so the browser
                      // will trigger the download without opening a new tab.
                      try {
                        const iframe = document.createElement('iframe');
                        iframe.style.display = 'none';
                        iframe.src = directLink;
                        document.body.appendChild(iframe);
                        // remove after a short delay
                        setTimeout(() => {
                          try { document.body.removeChild(iframe); } catch (e) {}
                        }, 8000);
                      } catch (e) {
                        // Last resort: open direct link in same tab (will navigate away)
                        window.location.href = directLink;
                      }
                    }
                  }}
                >
                  {/* Inline download SVG icon */}
                  <span className="btn-icon" aria-hidden="true">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" focusable="false" aria-hidden="true">
                      <path d="M12 3v10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M8 11l4 4 4-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M21 21H3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </span>
                  <span>Download</span>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* ===== SKILLS AND STATS SECTION ===== */}
        <section className="skills-stats-section" aria-labelledby="skills-title">
          <div className="content-container">
            <div className="skills-stats-wrapper">
              
              {/* Skills Column */}
              <article className="skills-column">
                <h2 className="skills-heading" id="skills-title">
                  Our Core Competencies
                </h2>
                
                <p className="skills-subheading">
                  Expertise across critical supply chain functions, driving measurable results and operational excellence.
                </p>
                
                <div className="skills-list" role="list">
                  {skills.map((skill, idx) => (
                    <div key={idx} className="skill-item" role="listitem">
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
              
              {/* Stats Column */}
              <article className="stats-column">
                <div className="stats-grid" role="list">
                  {stats.map((stat, idx) => (
                    <div key={idx} className="stat-card" role="listitem">
                      <div className="stat-value" aria-label={stat.label}>
                        {stat.value}
                      </div>
                      <div className="stat-label">{stat.label}</div>
                      <p className="stat-description">{stat.description}</p>
                    </div>
                  ))}
                </div>
              </article>
            </div>
          </div>
        </section>
                <br></br><br></br><br></br><br></br><br></br><br></br><br></br>
      </div>
      
      <Footer />
      <ScrollToTopButton />
    </div>
  );
};

export default AboutUs;

