import React from 'react';
import { useInViewAnimation } from '../hooks/useInViewAnimation';

const SERVICES_LIST = [
  "UGC Video Content",
  "Product Demonstrations",
  "Product Photography",
  "Skincare Content",
  "Beauty Content",
  "GRWM Videos",
  "ASMR Videos",
  "Lifestyle Content",
  "Unboxing Videos",
  "Aesthetic Flatlays",
  "Instagram Reels",
  "Voiceover Videos"
];

export const Services: React.FC = () => {
  const { ref, isInView } = useInViewAnimation();

  return (
    <section id="services" ref={ref} className="w-full py-24 px-6 flex justify-center scroll-mt-24">
      <div className="w-full max-w-5xl flex flex-col items-center">
        <div 
          className={`text-center mb-16 ${isInView ? 'animate-fade-in-up' : 'opacity-0'}`}
          style={{ animationDelay: '0.1s' }}
        >
          <h2 className="text-[32px] md:text-[48px] leading-[1.1] text-secondary tracking-tight">
            Creative <span className="font-serif italic">Services</span>
          </h2>
          <p className="mt-4 text-primary/80 text-sm md:text-base max-w-xl mx-auto">
            Elevating your brand with authentic, high-converting content tailored for modern social platforms.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-3 md:gap-4">
          {SERVICES_LIST.map((service, idx) => (
            <div
              key={idx}
              className={`px-6 py-3 rounded-full border border-primary/10 bg-white/60 backdrop-blur-md shadow-sm hover:shadow-md hover:bg-secondary hover:text-white transition-all duration-300 text-primary font-medium text-sm md:text-base cursor-default ${isInView ? 'animate-fade-in-up' : 'opacity-0'}`}
              style={{ animationDelay: `0.${(idx % 5) + 2}s` }}
            >
              {service}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
