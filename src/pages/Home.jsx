import React from 'react';
import Hero from '../components/Hero';
import AboutUs from '../components/AboutUs';
import Services from '../components/Services';
 import HowItWorks from '../components/HowItWorks';
import Testimonials from '../components/Testimonials';
import Footer from '../components/Footer';
import ScrollToTopButton from '../components/ScrollToTopButton';

const Home = () => {
  return (
    <div className="App">
      <div id="home"><Hero /></div>
      <div id="about"><AboutUs /></div>
      <div id="services"><Services /></div>
      <div id="how-it-works"><HowItWorks /></div>
      <div id="testimonials"><Testimonials /></div>
      <Footer />
      <ScrollToTopButton />
    </div>
  );
};

export default Home;

