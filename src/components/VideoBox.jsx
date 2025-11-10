import React from 'react';
import './VideoBox.css';

const VideoBox = () => {
  const handlePlayVideo = () => {
    // Handle video play functionality
    console.log('Play video');
  };

  return (
    <section className="video-box">
      <div className="video-box-container">
        <div className="video-background"></div>
        <div className="video-content">
          <button className="play-button" onClick={handlePlayVideo}>
            <span className="play-icon">▶</span>
          </button>
          <div className="video-text">
            <h1 className="video-heading">See it in Action</h1>
            <p className="video-description">
              Watch Our Video to Get a Clear Understanding of How It Works
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VideoBox;

