import { useState, useEffect, useRef } from 'react';

export default function BubbleMessage({ children, className = '' }) {
  const [isVisible, setIsVisible] = useState(false);
  const bubbleRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 0.9,
      }
    );

    if (bubbleRef.current) {
      observer.observe(bubbleRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const baseClasses = `transition-all duration-700 ease-out ${
    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
  }`;

  return (
    <div ref={bubbleRef} className={`${baseClasses} ${className}`}>
      {children}
    </div>
  );
}
