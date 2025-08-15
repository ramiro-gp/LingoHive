'use client';
import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';

export default function AnimateOnScroll({
  children,
  y = 50,
  duration = 0.8,
  delay = 0,
  stagger = 0,
  className = '',
  index = 0,
  childSelector = null,
}) {
  const el = useRef(null);
  const hasAnimated = useRef(false); // ✅ Flag para prevenir reanimaciones

  useEffect(() => {
  let anim;
  let observer;

  import('gsap/ScrollTrigger').then(({ ScrollTrigger }) => {
    gsap.registerPlugin(ScrollTrigger);

    const targets = childSelector
      ? el.current.querySelectorAll(childSelector)
      : [el.current]; // ¡ojo! que sea array siempre para gsap.set()

    if (!targets || targets.length === 0) return;

    // 🔒 Estado inicial invisible ANTES de cualquier scroll
    gsap.set(targets, { opacity: 0, y });

    const playAnimation = () => {
      if (hasAnimated.current) return;

      hasAnimated.current = true;

      anim = gsap.to(targets, {
        opacity: 1,
        y: 0,
        duration,
        delay,
        stagger: {
          each: stagger,
          from: 'start',
        },
        ease: 'power3.out',
      });
    };

    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            playAnimation();
            observer.disconnect();
          }
        });
      },
      {
        threshold: 0.3,
      }
    );

    observer.observe(el.current);

    ScrollTrigger.create({
      trigger: el.current,
      start: 'top 95%',
      onEnter: playAnimation,
      once: true,
    });
  });

  return () => {
    if (anim) anim.kill();
    if (observer) observer.disconnect();
  };
}, [y, duration, delay, stagger, childSelector]);


  return (
    <div ref={el} className={className}>
      {children}
    </div>
  );
}
