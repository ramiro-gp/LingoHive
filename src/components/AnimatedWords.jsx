// src/components/AnimatedWords.jsx
import { useState, useEffect } from 'react';

// 1. Array actualizado con las nuevas frases completas.
const words = [
  "con confianza.",
  "con nativos.",
  "a tu ritmo.",
  "en tus horarios."
];

export default function AnimatedWords() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex(prevIndex => (prevIndex + 1) % words.length);
    }, 2000); // Cambia cada 2 segundos

    return () => clearInterval(intervalId);
  }, []);

  return (
    // 2. Se simplificó el contenedor principal.
    <div className="flex flex-wrap items-center justify-center text-3xl font-light tracking-wide">
      <span className="text-neutral-200 mr-2">
        Hablá inglés
      </span>
      
      <div className="relative inline-block h-[1.5em] min-w-[280px] overflow-hidden align-middle text-[#F7D449] font-bold text-left">
        {words.map((word, index) => {
          const isCurrent = index === currentIndex;
          const wasPrevious = index === (currentIndex - 1 + words.length) % words.length;

          let transform = 'translateY(100%)';
          if (isCurrent) {
            transform = 'translateY(0)';
          } else if (wasPrevious) {
            transform = 'translateY(-100%)';
          }

          return (
            <span
              key={word}
              className="absolute inset-0 flex items-center justify-center md:justify-start transition-all duration-500"
              style={{
                transform: transform,
                opacity: isCurrent ? 1 : 0,
              }}
            >
              {word}
            </span>
          );
        })}
      </div>
    </div>
  );
}