import React from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import './index.css';
import './styles/motion.css';
import './polyfills/intlSegmenter';
import App from './App.jsx';

const container = document.getElementById('root');

if (container && container.hasChildNodes()) {
  hydrateRoot(
    container,
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
} else if (container) {
  createRoot(container).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
}

