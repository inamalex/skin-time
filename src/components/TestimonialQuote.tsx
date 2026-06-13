import React from 'react';
import { Quote } from 'lucide-react';
import { useInViewAnimation } from '../hooks/useInViewAnimation';
import actorImg from '../assets/actor.jpg';

// Automatically import all brand images from the assets folder
const brandModules = import.meta.glob('../assets/brands/*.{png,jpg,jpeg,svg,webp}', { eager: true });
const logoUrls = Object.values(brandModules).map((mod: any) => mod.default);

const BrandLogo = ({ url, index }: { url: string, index: number }) => {
  return (
    <div className="px-4 md:px-8 inline-flex items-center justify-center w-[160px] md:w-[220px] h-[80px] md:h-[100px] shrink-0 group">
      <img 
        src={url} 
        alt={`Brand Logo ${index}`}
        className="w-full h-full object-contain transition-transform duration-300 hover:scale-110 drop-shadow-md"
      />
    </div>
  );
};

export const TestimonialQuote: React.FC = () => {
  const { ref, isInView } = useInViewAnimation();

  return (
    <section ref={ref} className="py-12 w-full overflow-hidden flex flex-col items-center text-center">
      <div 
        className={`mb-6 px-6 ${isInView ? 'animate-fade-in-up' : 'opacity-0'}`}
        style={{ animationDelay: '0.1s' }}
      >
        <Quote className="w-6 h-6 text-slate-900" fill="currentColor" strokeWidth={0} />
      </div>

      <h2 
        className={`text-[32px] md:text-[40px] lg:text-[44px] leading-[1.1] text-secondary tracking-tight mb-8 px-6 max-w-2xl ${isInView ? 'animate-fade-in-up' : 'opacity-0'}`}
        style={{ animationDelay: '0.2s' }}
      >
        'Creating <span className="font-serif">content</span> that doesn't just look beautiful, but feels beautifully <span className="font-serif">real.</span>'
      </h2>

      <div 
        className={`italic text-sm text-[#273C46] mb-12 px-6 ${isInView ? 'animate-fade-in-up' : 'opacity-0'}`}
        style={{ animationDelay: '0.3s' }}
      >
        Shifa Fathima
      </div>

      <div 
        className={`w-full max-w-6xl mx-auto overflow-hidden mb-16 relative ${isInView ? 'animate-fade-in-up' : 'opacity-0'}`}
        style={{ animationDelay: '0.4s' }}
      >
        <div className="flex whitespace-nowrap items-center animate-marquee w-max">
          {logoUrls.length > 0 ? (
            [...logoUrls, ...logoUrls].map((url, i) => (
              <BrandLogo key={i} url={url} index={i} />
            ))
          ) : (
            <span className="text-secondary font-serif px-6">Loading brand logos...</span>
          )}
        </div>
      </div>

      <div 
        className={`w-full max-w-sm px-6 ${isInView ? 'animate-fade-in-up' : 'opacity-0'}`}
        style={{ animationDelay: '0.5s' }}
      >
        <img 
          src={actorImg}
          alt="Shifa Fathima" 
          className="w-full h-auto object-cover rounded-2xl shadow-lg"
        />
      </div>
    </section>
  );
};
