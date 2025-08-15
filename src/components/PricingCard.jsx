// src/components/PricingCard.jsx

import { useRef } from 'react';
import { gsap } from 'gsap';

/**
 * Componente para una tarjeta de precios individual.
 * Maneja su propia animación de hover.
 * @param {{ plan: { title: string, price: string, features: string[] } }} props
 */
export default function PricingCard({ plan, planType, isHighlighted }) {
  const cardRef = useRef(null);

  // Animaciones de hover con GSAP para un control total.
  const handleMouseEnter = () => {
    gsap.to(cardRef.current, {
      y: -10, // Se mueve 10px hacia arriba
      //scale: 1.02, // Se agranda un 2%
      duration: 0.3,
      ease: 'power2.out',
    });
  };

  const handleMouseLeave = () => {
    gsap.to(cardRef.current, {
      y: 0,
      //scale: 1,
      duration: 0.3,
      ease: 'power2.out',
    });
  };

  // 1. Determinar la clase de fondo correcta
  let bgClass = '';
  if (isHighlighted) {
    bgClass = 'bg-[#F7D449]'; // Fondo amarillo para la primera card individual
  } 

  // 2. Determinar colores de texto para legibilidad
  const titleColor = isHighlighted ? 'text-black' : 'text-[#F7D449]';
  const featuresColor = isHighlighted ? 'text-neutral-900' : 'text-neutral-300';
  const featureBulletColor = isHighlighted ? 'text-black' : 'text-[#F7D449]';
  const priceColor = isHighlighted ? 'text-black' : 'text-[#F7D449]';

  return (
    <div
      ref={cardRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`pricing-card z-50 ${bgClass} border-3 border-[#F7D449] rounded-2xl p-6 shadow-lg flex flex-col w-full max-w-xs h-[380px] xl:h-[400px]`}
    >
      <div>
        <h3 className={`text-xl font-bold ${titleColor} mb-4`}>{plan.title}</h3>
        <ul className={`space-y-2 ${featuresColor} mb-6`}>
          {plan.features.map((feature) => (
            <li key={feature}><span className={`${featureBulletColor} mr-2`}>•</span>{feature}</li>
          ))}
        </ul>
      </div>
      {/* CAMBIO PRINCIPAL: Lógica para mostrar el botón o el precio */}
      <div className="text-right mt-auto">
        {plan.title === 'Clase de Prueba' ? (
          // Si es la clase de prueba, muestra un botón
          <a href="https://calendly.com/marcterrera/english-sparring-free-1-hour-session" target="_blank" 
          className="bg-neutral-900 text-[#F7D449] font-bold py-3 px-6 rounded-full duration-300">
            GRATIS
          </a>
        ) : (
          // Para las demás tarjetas, muestra el precio
          <p className={`text-xl font-semibold ${priceColor}`}>{plan.price}</p>
        )}
      </div>
    </div>
  );
}