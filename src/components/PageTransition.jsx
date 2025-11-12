import React, { useEffect, useRef, useState } from 'react';
import './PageTransition.css';

const PageTransition = ({ children, onContentReady }) => {
  const containerRef = useRef(null);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const onContentReadyRef = useRef(onContentReady);

  // Update ref when callback changes
  useEffect(() => {
    onContentReadyRef.current = onContentReady;
  }, [onContentReady]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Reset state
    setImagesLoaded(false);

    // Use requestAnimationFrame to ensure DOM is ready
    const rafId = requestAnimationFrame(() => {
      // Find all images in the page
      const images = container.querySelectorAll('img');
      const imagePromises = [];

      images.forEach((img) => {
        // Skip if image is already loaded
        if (img.complete && img.naturalHeight !== 0) {
          return;
        }

        const promise = new Promise((resolve) => {
          const timeout = setTimeout(() => {
            resolve(); // Timeout after 2 seconds to prevent indefinite waiting
          }, 2000);

          img.onload = () => {
            clearTimeout(timeout);
            resolve();
          };
          
          img.onerror = () => {
            clearTimeout(timeout);
            resolve(); // Resolve even on error to not block
          };
        });
        
        imagePromises.push(promise);
      });

      // Wait for all images or timeout
      if (imagePromises.length > 0) {
        Promise.all(imagePromises).then(() => {
          // Small delay to ensure DOM is ready
          setTimeout(() => {
            setImagesLoaded(true);
            if (onContentReadyRef.current) {
              onContentReadyRef.current();
            }
          }, 100);
        });
      } else {
        // If no images or all already loaded, mark as ready
        setTimeout(() => {
          setImagesLoaded(true);
          if (onContentReadyRef.current) {
            onContentReadyRef.current();
          }
        }, 100);
      }
    });

    return () => {
      cancelAnimationFrame(rafId);
    };
  }, [children]);

  return (
    <div 
      ref={containerRef} 
      className={`page-transition-wrapper ${imagesLoaded ? 'content-ready' : ''}`}
    >
      {children}
    </div>
  );
};

export default PageTransition;

