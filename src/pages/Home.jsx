import React from 'react';
import Hero from '../components/Hero';
import AboutUs from '../components/AboutUs';
import Services from '../components/Services';
 import HowItWorks from '../components/HowItWorks';
import Testimonials from '../components/Testimonials';
import Footer from '../components/Footer';

const Home = () => {
  return (
    <div className="App">
      <Hero />
      <AboutUs />
      <Services />
      <HowItWorks />
      <Testimonials />
      <Footer />
    </div>
  );
};

export default Home;

