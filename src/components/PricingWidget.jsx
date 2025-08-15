// src/components/PricingWidget.jsx

import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import AnimateOnScroll from './AnimateOnScroll.jsx';
import PricingCard from './PricingCard.jsx';

const individualPlans = [
  { title: 'Clase de Prueba', price: 'GRATIS', features: ['1 hora', 'Pack esencial de recursos', 'Te damos una bienvenida a LingoHive para que puedas probar sin compromiso con nativos!'] },
  { title: 'Hora Individual', price: '$19.990 / hora', features: ['1 hora', 'Acceso a Drive con todo el material del curso', 'Lo agendás cuando quieras. Perfecto si buscas una hora suelta para practicar'] },
  { title: 'Pack Mensual', price: '$69.990 / mes', features: ['1 hora semanal', 'Acceso a todo el material del curso', 'Ideal para ganar fluidez, ganar ritmo y confianza'] }
];

const grupalPlans = [
  { title: 'Grupal Duo', price: '$44.990 / mes', features: ['4 horas (1 por semana)', 'Aprendé con alguien más', 'Pack premium de recursos', 'Ideal para quienes prefieren practicar en pareja'] },
  { title: 'Grupal de Tres', price: '$34.990 / mes', features: ['4 horas (1 por semana)', 'Grupos pequeños, mejor dinámica', 'Pack premium de recursos', 'Perfecto para perder el miedo'] }
];

export default function PricingWidget() {
  const [planType, setPlanType] = useState('individual');
  const plansContainerRef = useRef(null);
  const widgetRef = useRef(null);

  const plansToShow = planType === 'individual' ? individualPlans : grupalPlans;

  useEffect(() => {
    const container = document.getElementById('pricing-widget-container');
    if (container) {
      container.classList.remove('opacity-0');
    }
    
    if (plansContainerRef.current) {
      const cards = plansContainerRef.current.children;
      gsap.fromTo(cards,
        { y: -40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          stagger: 0.15,
          ease: 'power3.out',
        }
      );
    }
  }, [planType]);

  

  const containerClasses = `
    flex overflow-x-auto snap-x snap-mandatory no-scrollbar gap-6 py-4
     lg:justify-center px-2
    ${planType === 'individual' 
      ? '' 
      : 'md:justify-center lg:gap-12'
    }
  `;

  return (
    <div ref={widgetRef}>
      {/* El Switch para cambiar de plan */}
      <AnimateOnScroll y={-40} duration={0.8}>
        <div className="flex justify-center">
          <div className="flex border-3 border-[#F7D449] rounded-full p-1 shadow-md">
            <button
              onClick={() => setPlanType('individual')}
              className={`cursor-none w-30 px-4 py-2 rounded-full text-lg font-medium transition-colors duration-300 ${planType === 'individual' ? 'bg-[#F7D449] text-black' : 'text-white'}`}
            >
              Individual
            </button>
            <button
              onClick={() => setPlanType('grupal')}
              className={`cursor-none w-30 px-4 py-2 rounded-full text-lg font-medium transition-colors duration-300 ${planType === 'grupal' ? 'bg-[#F7D449] text-black' : 'text-white'}`}
            >
              Grupal
            </button>
          </div>
        </div>
      </AnimateOnScroll>

      {/* Cards */}
      <AnimateOnScroll y={60} duration={0.8} stagger={0.12} childSelector=".pricing-card">
        <div
          ref={plansContainerRef}
          className={containerClasses + ' overscroll-x-contain'}
        >
          {plansToShow.map((plan, index) => (
            <div key={plan.title} className="flex-shrink-0 snap-center w-auto mt-10 flex justify-center">
              <PricingCard 
                plan={plan} 
                planType={planType}
                isHighlighted={planType === 'individual' && index === 0}
              />
            </div>
          ))}
        </div>
      </AnimateOnScroll>
    </div>
  );
}