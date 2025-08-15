import { useState, useEffect } from 'react';
import InteractiveButton from './InteractiveButton.jsx';
import AnimateOnScroll from "./AnimateOnScroll.jsx";
// Los datos de los botones se mantienen igual
const features = [
  {
    text: 'Con nativos reales',
    icon: <svg class="text-[#F7D449]" width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 15.5H7.5C6.10444 15.5 5.40665 15.5 4.83886 15.6722C3.56045 16.06 2.56004 17.0605 2.17224 18.3389C2 18.9067 2 19.6044 2 21M16 18L18 20L22 16M14.5 7.5C14.5 9.98528 12.4853 12 10 12C7.51472 12 5.5 9.98528 5.5 7.5C5.5 5.01472 7.51472 3 10 3C12.4853 3 14.5 5.01472 14.5 7.5Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
  },
  {
    text: 'A tu ritmo, en tus horarios',
    icon: <svg class="text-[#F7D449]" width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 6V12L16 14M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
  },
  {
    text: 'Personalizado a tus intereses',
    icon: <svg class="text-[#F7D449]" width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9 12L11 14L15.5 9.5M7.33377 3.8187C8.1376 3.75455 8.90071 3.43846 9.51447 2.91542C10.9467 1.69486 13.0533 1.69486 14.4855 2.91542C15.0993 3.43846 15.8624 3.75455 16.6662 3.8187C18.5421 3.96839 20.0316 5.45794 20.1813 7.33377C20.2455 8.1376 20.5615 8.90071 21.0846 9.51447C22.3051 10.9467 22.3051 13.0533 21.0846 14.4855C20.5615 15.0993 20.2455 15.8624 20.1813 16.6662C20.0316 18.5421 18.5421 20.0316 16.6662 20.1813C15.8624 20.2455 15.0993 20.5615 14.4855 21.0846C13.0533 22.3051 10.9467 22.3051 9.51447 21.0846C8.90071 20.5615 8.1376 20.2455 7.33377 20.1813C5.45794 20.0316 3.96839 18.5421 3.8187 16.6662C3.75455 15.8624 3.43846 15.0993 2.91542 14.4855C1.69486 13.0533 1.69486 10.9467 2.91542 9.51447C3.43846 8.90071 3.75455 8.1376 3.8187 7.33377C3.96839 5.45794 5.45794 3.96839 7.33377 3.8187Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
  },
  {
    text: 'Con apoyo constante y real',
    icon: <svg class="text-[#F7D449]" width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10 15L6.92474 18.1137C6.49579 18.548 6.28131 18.7652 6.09695 18.7805C5.93701 18.7938 5.78042 18.7295 5.67596 18.6076C5.55556 18.4672 5.55556 18.162 5.55556 17.5515V15.9916C5.55556 15.444 5.10707 15.0477 4.5652 14.9683V14.9683C3.25374 14.7762 2.22378 13.7463 2.03168 12.4348C2 12.2186 2 11.9605 2 11.4444V6.8C2 5.11984 2 4.27976 2.32698 3.63803C2.6146 3.07354 3.07354 2.6146 3.63803 2.32698C4.27976 2 5.11984 2 6.8 2H14.2C15.8802 2 16.7202 2 17.362 2.32698C17.9265 2.6146 18.3854 3.07354 18.673 3.63803C19 4.27976 19 5.11984 19 6.8V11M19 22L16.8236 20.4869C16.5177 20.2742 16.3647 20.1678 16.1982 20.0924C16.0504 20.0255 15.8951 19.9768 15.7356 19.9474C15.5558 19.9143 15.3695 19.9143 14.9969 19.9143H13.2C12.0799 19.9143 11.5198 19.9143 11.092 19.6963C10.7157 19.5046 10.4097 19.1986 10.218 18.8223C10 18.3944 10 17.8344 10 16.7143V14.2C10 13.0799 10 12.5198 10.218 12.092C10.4097 11.7157 10.7157 11.4097 11.092 11.218C11.5198 11 12.0799 11 13.2 11H18.8C19.9201 11 20.4802 11 20.908 11.218C21.2843 11.4097 21.5903 11.7157 21.782 12.092C22 12.5198 22 13.0799 22 14.2V16.9143C22 17.8462 22 18.3121 21.8478 18.6797C21.6448 19.1697 21.2554 19.5591 20.7654 19.762C20.3978 19.9143 19.9319 19.9143 19 19.9143V22Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
  },
];


export default function InteractiveButtonGroup() {
  const [activeIndex, setActiveIndex] = useState(0);
  // Nuevo estado para controlar si el carrusel está pausado por el usuario
  const [isPaused, setIsPaused] = useState(false);

  // Hook para manejar el ciclo de vida del temporizador
  useEffect(() => {
    // Si el carrusel está pausado, no hacemos nada.
    if (isPaused) {
      return;
    }

    // Creamos un temporizador que se ejecuta cada 5 segundos
    const timer = setInterval(() => {
      // Avanzamos al siguiente índice, volviendo al principio si llegamos al final
      setActiveIndex(prevIndex => (prevIndex + 1) % features.length);
    }, 4000);

    // Función de limpieza: se ejecuta cuando el componente se desmonta o cuando el efecto vuelve a correr
    return () => {
      clearInterval(timer);
    };
  }, [isPaused]); // El efecto se reinicia cada vez que el estado 'isPaused' cambia

  return (
      <div
        className="z-10 mt-10 flex flex-col items-center gap-6 md:flex-row md:justify-center md:items-center md:gap-4"
        // Cuando el mouse entra en el área del grupo, pausamos el carrusel
        onMouseEnter={() => setIsPaused(true)}
        // Cuando el mouse sale, lo reanudamos
        onMouseLeave={() => setIsPaused(false)}
      >
        {features.map((feature, index) => (
          <AnimateOnScroll client:load y={60} delay={index * 0.2}>
                <InteractiveButton
                  key={index}
                  text={feature.text}
                  isExpanded={activeIndex === index}
                  // Al interactuar con un botón, se actualiza el índice activo inmediatamente
                  onInteraction={() => setActiveIndex(index)}
                >
                  {feature.icon}
                </InteractiveButton>
          </AnimateOnScroll>
        ))}
      </div>
  );
}