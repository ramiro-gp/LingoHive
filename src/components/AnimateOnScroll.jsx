import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';

export default function AnimateOnScroll({
  children, y = 50, duration = 0.8, delay = 0, stagger = 0,
  className = '', childSelector = null,
}) {
  const el = useRef(null);

  useEffect(() => {
    const root = el.current;
    if (!root || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const targets = childSelector ? root.querySelectorAll(childSelector) : [root];
    if (!targets.length) return;
    let animation;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      observer.disconnect();
      animation = gsap.fromTo(targets,
        { opacity: 0, y },
        { opacity: 1, y: 0, duration, delay, stagger, ease: 'power3.out' }
      );
    }, { threshold: 0.1 });
    observer.observe(root);
    return () => { observer.disconnect(); animation?.kill(); gsap.set(targets, { clearProps: 'opacity,transform' }); };
  }, [y, duration, delay, stagger, childSelector]);

  return <div ref={el} className={className}>{children}</div>;
}
