import React, { useState } from 'react';
import Header from '../components/Header';
import ScrollHeader from '../components/ScrollHeader';
import HeroSection from '../components/HeroSection';
import Footer from '../components/Footer';
import ScrollToTopButton from '../components/ScrollToTopButton';
import './Page.css';

const Blog = () => {
  const blogPosts = [
    {
      id: 1,
      title: '5 Ways Data-Driven Replenishment Boosts On-Shelf Availability',
      excerpt: 'How consistent replenishment and smarter forecasting reduce out-of-stocks and improve sales.',
      details:
        'By using real-time data and analytics, retailers can predict demand more accurately, plan replenishment cycles efficiently, and reduce stockouts. Data-driven approaches also improve supplier coordination and inventory accuracy, ensuring customers always find products when they need them.',
      author: 'Isuru Warnakula',
      date: 'November 10, 2025',
      category: 'Replenishment',
      image: 'https://media.istockphoto.com/id/2188236845/photo/digital-logistics-and-supply-chain-network-icons-over-warehouse-background.webp?a=1&b=1&s=612x612&w=0&k=20&c=xxLxIGHqFYUjtbN1utlToVJSjZlsCiExcXm9g4sB4Tc='
    },
    {
      id: 2,
      title: 'Why Outsourcing VRP Can Reduce Costs Without Losing Control',
      excerpt: 'The benefits of fractional VRP and leave-cover services for small and growing suppliers.',
      details:
        'Outsourcing Vendor Replenishment Planning (VRP) enables companies to maintain control of supply operations while minimizing overhead costs. Fractional services provide expert support during peak seasons or staff leave, ensuring continuity without permanent hiring.',
      author: 'Zenith Supply Team',
      date: 'November 8, 2025',
      category: 'Supply Chain',
      image: 'https://media.istockphoto.com/id/2189303812/photo/robotic-arm-operating-in-a-modern-logistics-warehouse.webp?a=1&b=1&s=612x612&w=0&k=20&c=4atouIQS13amf0FDNbnAcTsGJaMKq_HuJZvAqKalylg='
    },
    {
      id: 3,
      title: 'Forecasting for Growth: How Start-Ups Can Compete With Big Brands',
      excerpt: 'Simple forecasting techniques that deliver strong stock performance for lean teams.',
      details:
        'Start-ups can use lightweight forecasting models and historical data trends to plan smarter replenishment strategies. Leveraging tools like Excel-based forecasting or cloud analytics helps maintain optimal stock levels and drive profitability.',
      author: 'Isuru Warnakula',
      date: 'November 5, 2025',
      category: 'Forecasting',
      image: 'https://images.unsplash.com/photo-1711606815631-38d32cdaec3e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8YW5hbHl6ZXxlbnwwfHwwfHx8MA%3D%3D'
    }
  ];

  const [expanded, setExpanded] = useState({});

  const toggleExpand = (id) => {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="page">
      <Header />
      <ScrollHeader />
      <HeroSection 
        title="Our Blog"
        subtitle="Insights, Tips, and Latest News from Our Team"
        backgroundImage="https://www.hlb.global/wp-content/uploads/2025/08/Tariffs-business-agility-article-August-2025-web.jpg"
      />

      <div className="page-content">
        <section className="content-section">
          <div className="content-container">
            <div className="blog-grid">
              {blogPosts.map((post) => (
                <article key={post.id} className="blog-card">
                  <div className="blog-card-image">
                    <img src={post.image} alt={post.title} />
                    <div className="blog-card-category">{post.category}</div>
                  </div>

                  <div className="blog-card-content">
                    <div className="blog-card-meta">
                      <span className="blog-card-author">{post.author}</span>
                      <span className="blog-card-date">{post.date}</span>
                    </div>

                    <h3 className="blog-card-title">{post.title}</h3>
                    <p className="blog-card-excerpt">{post.excerpt}</p>

                    <div
                      className={`blog-card-details-wrapper ${expanded[post.id] ? 'expanded' : ''}`}
                    >
                      <p className="blog-card-details">{post.details}</p>
                    </div>

                    <button
                      className="blog-card-toggle"
                      onClick={() => toggleExpand(post.id)}
                    >
                      {expanded[post.id] ? 'Show Less ▲' : 'Show More ▼'}
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      </div>

      <Footer />
      <ScrollToTopButton />
    </div>
  );
};

export default Blog;
