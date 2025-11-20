/**
 * Motion Observer System
 * Automatically triggers animations when elements enter viewport
 */

class MotionObserver {
  constructor(options = {}) {
    this.options = {
      threshold: options.threshold || 0.1,
      rootMargin: options.rootMargin || '0px 0px -100px 0px',
      once: options.once !== false, // Animate only once by default
      ...options
    };

    this.observer = null;
    this.prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    this.init();
  }

  init() {
    if (this.prefersReducedMotion) {
      // Skip animations for users who prefer reduced motion
      this.showAllElements();
      return;
    }

    this.observer = new IntersectionObserver(
      (entries) => this.handleIntersection(entries),
      {
        threshold: this.options.threshold,
        rootMargin: this.options.rootMargin
      }
    );

    this.observeElements();
  }

  observeElements() {
    const elements = document.querySelectorAll('[data-animate]:not(.animated)');
    elements.forEach(el => {
      this.observer.observe(el);
    });
  }

  handleIntersection(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        this.animateElement(entry.target);
        
        if (this.options.once) {
          this.observer.unobserve(entry.target);
        }
      } else if (!this.options.once) {
        // Reset animation if not 'once' mode
        entry.target.classList.remove('animated');
      }
    });
  }

  animateElement(element) {
    // Add a small delay for smoother experience
    requestAnimationFrame(() => {
      element.classList.add('animated');
    });
  }

  showAllElements() {
    // For reduced motion users, show everything immediately
    const elements = document.querySelectorAll('[data-animate]');
    elements.forEach(el => {
      el.style.opacity = '1';
      el.style.transform = 'none';
      el.style.filter = 'none';
    });
  }

  // Re-observe new elements (useful for dynamic content)
  refresh() {
    if (!this.observer || this.prefersReducedMotion) return;
    this.observeElements();
  }

  // Destroy observer
  destroy() {
    if (this.observer) {
      this.observer.disconnect();
      this.observer = null;
    }
  }
}

// Singleton instance
let motionObserverInstance = null;

export function initMotionObserver(options = {}) {
  if (motionObserverInstance) {
    motionObserverInstance.destroy();
  }
  
  motionObserverInstance = new MotionObserver(options);
  return motionObserverInstance;
}

export function refreshMotionObserver() {
  if (motionObserverInstance) {
    motionObserverInstance.refresh();
  }
}

export function destroyMotionObserver() {
  if (motionObserverInstance) {
    motionObserverInstance.destroy();
    motionObserverInstance = null;
  }
}

export default MotionObserver;
