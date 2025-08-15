// src/components/TestimonialsSlider.jsx

import React , { useEffect, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCards, Pagination, Navigation } from 'swiper/modules';
import AnimateOnScroll from './AnimateOnScroll';

import 'swiper/css';
import 'swiper/css/effect-cards';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import '../styles/TestimonialsSlider.css';

const LinkedInIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="text-[#F7D449] ml-2">
        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
    </svg>
);

export default function TestimonialsSlider({ testimonials }) {
  const swiperContainerRef = useRef(null);

  useEffect(() => {
    const customCursor = document.querySelector('.custom-cursor');
    const swiperSlides = document.querySelectorAll('.swiper-slide-cursor-oculto');
    if (!customCursor || swiperSlides.length === 0) return;

    const hideCursor = () => customCursor.style.opacity = '0';
    const showCursor = () => customCursor.style.opacity = '1';

    swiperSlides.forEach(slide => {
      slide.addEventListener('mouseenter', hideCursor);
      slide.addEventListener('mouseleave', showCursor);
    });

    return () => {
      swiperSlides.forEach(slide => {
        slide.removeEventListener('mouseenter', hideCursor);
        slide.removeEventListener('mouseleave', showCursor);
      });
    };
  }, []);

  

   return (
    <AnimateOnScroll
      childSelector=".swiper-slide" // Le decimos que anime los slides dentro del contenedor
      stagger={0.2}                // Le damos un retraso de 0.2s entre cada slide
      y={60}                       // Una pequeña bajada para que se note más
    >
       {/* 1. Contenedor principal con Flexbox
          - items-center: alinea verticalmente las flechas con el carrusel.
          - justify-center: centra todo el bloque en la página.
          - gap-x-4 o gap-x-8: crea el "buen espacio" entre los elementos. */}
      <div className="flex items-center justify-center gap-x-14 lg:gap-x-20">

        {/* 2. Botón de navegación izquierdo (fuera del carrusel) */}
        <button className="testimonial-button-prev hidden md:block text-white hover:text-[#F7D449] transition text-4xl font-bold">
          ‹
        </button>

        {/* 3. El carrusel se mantiene casi igual, pero ya no necesita ser 'relative' */}
        <div ref={swiperContainerRef} className="testimonial-swiper-container ">
          <Swiper
            modules={[EffectCards, Pagination, Navigation]}
            effect="cards"
            grabCursor={true}
            pagination={{ clickable: true }}
            navigation={{
              // La configuración de Swiper no cambia, ya que busca las clases en todo el documento
              nextEl: '.testimonial-button-next',
              prevEl: '.testimonial-button-prev'
            }}
            loop={false}
            className="w-[90vw] max-w-xs h-[34rem] lg:max-w-xl lg:h-88"
          >
            {testimonials.map((t, i) => (
              <SwiperSlide key={i} className='swiper-slide-cursor-oculto'>
                {/* El contenido de tu SwiperSlide no necesita cambios */}
                <div className="w-full h-full p-[3px] rounded-2xl bg-[#F7D449] shadow-lg">
                  <div
                    className="w-full h-full flex flex-col lg:flex-row relative rounded-[calc(theme(borderRadius.2xl)-3px)] overflow-hidden text-white"
                    style={{ backgroundImage: 'url("/starfield.jpg")', backgroundSize: 'cover', backgroundPosition: 'center' }}
                  >
                    {/* ... tu contenido interno de la tarjeta ... */}
                    <div className="p-5 pb-0 lg:p-0 rounded-t w-full h-2/5 lg:w-2/5 lg:h-full flex-shrink-0 z-10">
                      <picture className="w-full h-full">
                        <source media="(min-width: 1024px)" srcSet={`${t.imageBase}-PC.png`} />
                        <img
                          src={`${t.imageBase}-Movil.png`}
                          alt={`Foto de ${t.author}`}
                          loading="lazy"
                          className="w-full h-full object-cover rounded-t-xl lg:rounded-l-xl lg:rounded-tr-none lg:ml-[-2px]"
                        />
                      </picture>
                    </div>
                    <div className="w-full h-full p-6 flex flex-col items-center justify-around text-center z-10">
                      <div>
                        <a href={t.linkedinUrl} target="_blank" rel="noopener noreferrer" className="link-testimonio-linkedin text-[#F7D449] inline-flex items-center mb-4 group">
                          <h3 className="text-xl font-bold group-hover:underline">{t.author}</h3>
                          <LinkedInIcon />
                        </a>
                        <blockquote className="text-sm text-neutral-100 ">
                          “{t.text}”
                        </blockquote>
                      </div>
                      <div className="flex items-center gap-6 mt-4">
                        {t.universityLogo && (
                          <img src={t.universityLogo} loading="lazy" alt="Logo de Universidad" className="h-12 object-contain" />
                        )}
                        {t.companyLogo && (
                          <img src={t.companyLogo} loading="lazy" alt="Logo de Empresa" className="h-12 object-contain" />
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* 4. Botón de navegación derecho (fuera del carrusel) */}
        <button className="testimonial-button-next hidden md:block text-white hover:text-[#F7D449] transition text-4xl font-bold">
          ›
        </button>

      </div>
    </AnimateOnScroll>
  );
}
