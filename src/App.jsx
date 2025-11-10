import React from 'react';
import './App.css';
import Hero from './components/Hero.jsx';
import AboutUs from './components/AboutUs.jsx';
import Services from './components/Services.jsx';
import SocialProof from './components/SocialProof.jsx';
import HowItWorks from './components/HowItWorks.jsx';
import VideoBox from './components/VideoBox.jsx';
import Testimonials from './components/Testimonials.jsx';
import Footer from './components/Footer.jsx';

function App() {
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
}

export default App;

