import React from 'react';
import { Button } from './Button';
import { useInViewAnimation } from '../hooks/useInViewAnimation';

export const Hero: React.FC = () => {
  const { ref, isInView } = useInViewAnimation();

  return (
    <section id="about" ref={ref} className="mx-auto flex flex-col items-center text-center max-w-[440px] px-6 pt-12 md:pt-16 scroll-mt-24">
      <div 
        className={`font-serif text-[32px] md:text-[40px] lg:text-[44px] font-semibold text-primary tracking-tight mb-4 ${isInView ? 'animate-fade-in-up' : 'opacity-0'}`}
        style={{ animationDelay: '0.1s' }}
      >
        Shifa Fathima
      </div>
      
      <div 
        className={`font-mono text-xs md:text-sm text-primary mb-2 ${isInView ? 'animate-fade-in-up' : 'opacity-0'}`}
        style={{ animationDelay: '0.2s' }}
      >
        The creative studio of Skin Time
      </div>

      <h1 
        className={`text-[32px] md:text-[40px] lg:text-[44px] leading-[1.1] text-secondary tracking-tight ${isInView ? 'animate-fade-in-up' : 'opacity-0'}`}
        style={{ animationDelay: '0.3s' }}
      >
        Tell your <span className="font-serif">brand's story</span>,<br />
        the <span className="font-serif">authentic way.</span>
      </h1>

      <div 
        className={`flex flex-col gap-6 text-sm md:text-base text-primary leading-relaxed mt-5 md:mt-6 ${isInView ? 'animate-fade-in-up' : 'opacity-0'}`}
        style={{ animationDelay: '0.4s' }}
      >
        <p>Hi, I'm Shifa, a UGC creator specializing in beauty, skincare, and lifestyle content.</p>
        <p>I create high-quality user-generated content that feels authentic, visually appealing, and relatable. My content style focuses on aesthetic storytelling, product demonstrations, flat lays, GRWM videos, skincare routines, and lifestyle content designed to build trust and engagement.</p>
        <p>My goal is to help brands showcase their products in a way that feels natural and resonates with their audience.</p>
      </div>

      <div 
        className={`flex flex-col sm:flex-row gap-3 md:gap-4 mt-5 md:mt-6 ${isInView ? 'animate-fade-in-up' : 'opacity-0'}`}
        style={{ animationDelay: '0.5s' }}
      >
        <Button variant="primary">Start a chat</Button>
        <Button variant="secondary">View projects</Button>
      </div>
    </section>
  );
};
