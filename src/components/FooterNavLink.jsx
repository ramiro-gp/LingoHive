import { useRef } from 'react';
import { gsap } from 'gsap';

export default function FooterNavLink({ href, text , className }) {
  const ballRef = useRef(null);
  const textRef = useRef(null);

  const handleMouseEnter = () => {
    gsap.killTweensOf([ballRef.current, textRef.current]);

    gsap.fromTo(ballRef.current, 
      { opacity: 0, y: -20, scale: 1 }, 
      { opacity: 1, y: 0, duration: 0.4, ease: 'power3.out' }
    );

    gsap.fromTo(textRef.current,
      { y: 0 },
      { y: 3, duration: 0.2, ease: 'power2.out', yoyo: true, repeat: 1 }
    );
  };

  const handleMouseLeave = () => {
    gsap.killTweensOf([ballRef.current, textRef.current]);

    gsap.to(ballRef.current, 
      { 
        opacity: 0, 
        scale: 0,
        duration: 0.3, 
        ease: 'power2.in' 
      }
    );
  };

  return (
    <a
      href={href}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative inline-block cursor-none text-lg font-medium ${className || ''}`}
    >
      <span
        ref={ballRef}
        className="absolute top-1/2 -translate-y-1/2 -left-3.5 block w-2 h-2 bg-neutral-900 rounded-full opacity-0"
      ></span>
      
      <span ref={textRef} className="inline-block">
        {text}
      </span>
    </a>
  );
}