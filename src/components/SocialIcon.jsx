// src/components/SocialIcon.jsx
import { useRef } from 'react';
import { gsap } from 'gsap';

export default function SocialIcon({ href, label, icon }) {
  const iconWrapperRef = useRef(null);

  // ================== INICIO DE LA NUEVA ANIMACIÓN ==================
  const handleMouseEnter = () => {
    const icon = iconWrapperRef.current;
    
    // Detenemos cualquier animación previa para evitar conflictos
    gsap.killTweensOf(icon);

    // Creamos una línea de tiempo para la secuencia de encoger y rebotar
    const tl = gsap.timeline();

    // 1. Primero, animamos el icono para que se encoja rápidamente
    tl.to(icon, {
      scale: 0.7,         // Lo reducimos al 70% de su tamaño
      duration: 0.15,
      ease: 'power2.inOut',
    });

    // 2. Luego, lo animamos de vuelta a su tamaño original con un efecto elástico
    tl.to(icon, {
      scale: 1,           // Vuelve a su tamaño completo
      duration: 0.8,
      ease: 'elastic.out(1, 0.5)', // ¡La clave del efecto rebote!
    });
  };
  // =================== FIN DE LA NUEVA ANIMACIÓN ===================

  return (
    <a
      href={href}
      aria-label={label}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={handleMouseEnter}
      className="cursor-none group w-12 h-12 flex items-center justify-center border-2 border-black rounded-full transition-colors duration-300 hover:bg-black hover:text-[#F7D449] overflow-hidden"
    >
      <span
        ref={iconWrapperRef}
        className="inline-block"
        dangerouslySetInnerHTML={{ __html: icon }}
      ></span>
    </a>
  );
}