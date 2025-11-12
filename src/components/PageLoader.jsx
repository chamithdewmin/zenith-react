import React, { useState, useEffect } from 'react';
import './PageLoader.css';

const PuffLoader = ({ color = "#0E33CB", size = 60 }) => {
  return (
    <div 
      className="puff-loader" 
      style={{ 
        width: `${size}px`, 
        height: `${size}px`,
        '--puff-color': color
      }}
    >
      <div className="puff-circle puff-circle-1"></div>
      <div className="puff-circle puff-circle-2"></div>
      <div className="puff-circle puff-circle-3"></div>
    </div>
  );
};

const PageLoader = ({ isLoading }) => {
  const [shouldRender, setShouldRender] = useState(false);
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    if (isLoading) {
      setShouldRender(true);
      setIsFadingOut(false);
    } else {
      setIsFadingOut(true);
      // Match fade-out animation duration (400ms)
      const timer = setTimeout(() => {
        setShouldRender(false);
        setIsFadingOut(false);
      }, 400);
      return () => clearTimeout(timer);
    }
  }, [isLoading]);

  if (!shouldRender) return null;

  return (
    <div className={`page-loader-overlay ${isFadingOut ? 'fade-out' : ''}`}>
      <div className="page-loader-container">
        <PuffLoader 
          color="#0E33CB" 
          size={60}
        />
      </div>
    </div>
  );
};

export default PageLoader;

