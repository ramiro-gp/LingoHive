// src/components/HeaderIsland.jsx
import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export default function HeaderIsland(props) { 
  const [isOpen, setIsOpen] = useState(false);
  const navRef = useRef(null);

  useEffect(() => {
    // Animamos el nav desde una posición fuera de la pantalla (-120%) hasta su posición final
    gsap.fromTo(navRef.current, 
      { y: '-120%', opacity: 0 }, // Estado inicial (arriba y transparente)
      { 
        y: '0%',                 // Estado final
        opacity: 1,
        duration: 0.25,             // Duración de la animación
        ease: 'power3.out',      // Efecto de desaceleración suave
        delay: 0.5               // Un pequeño retraso para que no sea tan brusco
      }
    );
  }, []);
  
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  useEffect(() => {
    const navElement = navRef.current;
    if (!navElement) return;

    const handleHomeClick = (event) => {
      const link = event.target.closest('a');

      if (link && link.getAttribute('href') === '#') {
        event.preventDefault(); 
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
        setIsOpen(false);
      }
    };

    navElement.addEventListener('click', handleHomeClick);

    return () => {
      navElement.removeEventListener('click', handleHomeClick);
    };
  }, []);

useEffect(() => {
  const nav = navRef.current;
  if (!nav) return;

  const handleCloseOnLinkClick = (e) => {
    const link = e.target.closest('a');
    if (link && link.getAttribute('href')?.startsWith('#')) {
      setIsOpen(false);
    }
  };

  nav.addEventListener('click', handleCloseOnLinkClick);

  return () => {
    nav.removeEventListener('click', handleCloseOnLinkClick);
  };
}, []);

  const navClasses = `
    fixed inset-x-4 top-4 mx-auto max-w-5xl bg-neutral-800/60 backdrop-blur-xl 
    px-6 py-3  flex flex-col items-center overflow-hidden z-50 
    duration-300 ease-in rounded-4xl
    ${isOpen ? 'max-h-[80vh]' : ''}
    opacity-0
  `;

  return (
    <nav id="header" ref={navRef} className={navClasses}>
      <div className="w-full flex items-center">
        {props.logo}

        {/* Menú de navegación principal */}
        <ul className="hidden lg:flex flex-1 justify-center space-x-6 text-neutral-300">
          <li><a href="#home" className="scroll-to-top cursor-none underline-slider font-semibold hover:text-white">Home</a></li>
          <li><a href="#whyus" className="cursor-none underline-slider font-semibold hover:text-white">Nosotros</a></li>
          <li><a href="#pricing" className="cursor-none underline-slider font-semibold hover:text-white">Precios</a></li>
          <li><a href="#testimonials" className="cursor-none underline-slider font-semibold hover:text-white">Testimonios</a></li>
        </ul>

        <div className="flex items-center ml-auto">
          <div className="hidden md:block">
            {props.buttonBookNowDesktop}
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden ml-4 text-2xl text-neutral-300 cursor-none"
            aria-expanded={isOpen}
            type="button"
          >
            {isOpen ? '✕' : '☰'}
          </button>
        </div>
      </div>

      {/* Menú desplegable móvil */}
      <ul
        id="mobile-list"
        className={`w-full mt-4 flex flex-col items-center space-y-4 text-neutral-300
          ${isOpen ? 'opacity-100' : 'hidden opacity-0 invisible'}
        `}
      >
        <li className="w-full lg:hidden"><a href="#home" className="scroll-to-top cursor-none underline-slider block w-full font-semibold">Home</a></li>
        <li className="w-full lg:hidden"><a href="#whyus" className="cursor-none underline-slider block w-full font-semibold">Nosotros</a></li>
        <li className="w-full lg:hidden"><a href="#pricing" className="cursor-none underline-slider block w-full font-semibold">Precios</a></li>
        <li className="w-full lg:hidden"><a href="#testimonials" className="cursor-none underline-slider block w-full font-semibold">Testimonios</a></li>
        
        {/* botón de agendar en el menú desplegable SOLO en móvil (hasta 'md') */}
        <li className="w-full md:hidden">
          {props.buttonBookNowMobile}
        </li>
      </ul>
    </nav>
  );
}