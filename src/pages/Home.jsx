import React from 'react';
import Hero from '../components/Hero';
import AboutUs from '../components/AboutUs';
import Services from '../components/Services';
import SocialProof from '../components/SocialProof';
import HowItWorks from '../components/HowItWorks';
import VideoBox from '../components/VideoBox';
import Testimonials from '../components/Testimonials';
import Footer from '../components/Footer';

const Home = () => {
  return (
    <div className="App">
      <Hero />
      <AboutUs />
      <Services />
      <SocialProof />
      <HowItWorks />
      <VideoBox />
      <Testimonials />
      <Footer />
    </div>
  );
};

export default Home;

