import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { Button } from './Button';
import { useInViewAnimation } from '../hooks/useInViewAnimation';

export const Footer: React.FC = () => {
  const { ref, isInView } = useInViewAnimation();

  return (
    <footer ref={ref} className="w-full flex justify-center">
      <div 
        className={`w-full max-w-[1200px] py-12 px-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-12 border-t border-primary/10 ${isInView ? 'animate-fade-in-up' : 'opacity-0'}`}
        style={{ animationDelay: '0.1s' }}
      >
        <a href="https://www.instagram.com/its_skin_time?igsh=MW5rMGlpOWxraHRleg==" target="_blank" rel="noopener noreferrer">
          <Button variant="primary">Start a chat</Button>
        </a>
        
        <div className="flex gap-12 md:gap-24 items-start">
          <ArrowUpRight className="w-6 h-6 text-primary hidden md:block" />
          
          <div className="flex flex-col gap-4">
            <a href="#services" className="text-base text-primary hover:text-secondary hover:font-medium transition-all">Services</a>
            <a href="#work" className="text-base text-primary hover:text-secondary hover:font-medium transition-all">Work</a>
            <a href="#about" className="text-base text-primary hover:text-secondary hover:font-medium transition-all">About</a>
          </div>
          
          <div className="flex flex-col gap-4">
            <a href="https://www.instagram.com/its_skin_time?igsh=MW5rMGlpOWxraHRleg==" target="_blank" rel="noreferrer" className="text-base text-primary hover:text-secondary hover:font-medium transition-all">Instagram</a>
            <a href="mailto:itsskintime01@gmail.com" className="text-base text-primary hover:text-secondary hover:font-medium transition-all">Email</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
