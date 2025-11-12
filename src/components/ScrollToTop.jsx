import { useLayoutEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function ScrollToTop() {
  const location = useLocation();

  // Use layout effect to jump to top before the browser paints
  useLayoutEffect(() => {
    // If navigating to a path (no hash) jump to top immediately
    if (!location.hash) {
      try {
        window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
      } catch (e) {
        window.scrollTo(0, 0);
      }
      return;
    }

    // If there's a hash, try to scroll to it after a short delay to allow render
    const id = location.hash.replace('#', '');
    const t = setTimeout(() => {
      const el = document.getElementById(id) || document.querySelector(location.hash);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else {
        // fallback to top
        try {
          window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
        } catch (e) {
          window.scrollTo(0, 0);
        }
      }
    }, 80);

    return () => clearTimeout(t);
  }, [location.pathname, location.hash]);

  return null;
}
