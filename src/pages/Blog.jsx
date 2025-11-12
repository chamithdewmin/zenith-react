import React from 'react';
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
      title: 'The Future of Digital Marketing in 2024',
      excerpt: 'Explore the latest trends and innovations shaping the digital marketing landscape this year.',
      author: 'John Doe',
      date: 'March 15, 2024',
      category: 'Marketing',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&q=80'
    },
    {
      id: 2,
      title: 'SEO Best Practices for Modern Websites',
      excerpt: 'Learn how to optimize your website for search engines and improve your online visibility.',
      author: 'Jane Smith',
      date: 'March 10, 2024',
      category: 'SEO',
      image: 'https://images.unsplash.com/photo-1432888622747-4eb9a8f2d1c6?w=400&q=80'
    },
    {
      id: 3,
      title: 'Building User-Friendly E-Commerce Platforms',
      excerpt: 'Discover the key elements that make e-commerce platforms successful and user-friendly.',
      author: 'Mike Johnson',
      date: 'March 5, 2024',
      category: 'E-Commerce',
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&q=80'
    },
    {
      id: 4,
      title: 'The Importance of Responsive Web Design',
      excerpt: 'Why responsive design is crucial for your website\'s success in today\'s mobile-first world.',
      author: 'Sarah Williams',
      date: 'February 28, 2024',
      category: 'Web Design',
      image: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=400&q=80'
    },
    {
      id: 5,
      title: 'Content Strategy: Creating Engaging Content',
      excerpt: 'Tips and strategies for creating content that engages your audience and drives results.',
      author: 'David Brown',
      date: 'February 20, 2024',
      category: 'Content',
      image: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=400&q=80'
    },
    {
      id: 6,
      title: 'Social Media Marketing: A Complete Guide',
      excerpt: 'Everything you need to know about leveraging social media for your business growth.',
      author: 'Emily Davis',
      date: 'February 15, 2024',
      category: 'Social Media',
      image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=400&q=80'
    }
  ];

  return (
    <div className="page">
      <Header />
      <ScrollHeader />
      <HeroSection 
        title="Our Blog"
        subtitle="Insights, Tips, and Latest News from Our Team"
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
                    <a href={`/blog/${post.id}`} className="blog-card-link">
                      Read More →
                    </a>
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

