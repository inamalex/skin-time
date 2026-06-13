import React, { useState, useEffect, useRef } from 'react';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { useInViewAnimation } from '../hooks/useInViewAnimation';

const TESTIMONIALS = [
  {
    name: "Marcus Anderson",
    role: "CEO, Data.storage",
    quote: "With very little guidance team delivered designs that were consistently spot on. The attention to detail and ability to understand our product vision was unmatched.",
    avatar: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150"
  },
  {
    name: "alexwu",
    role: "Founder, Nexgate",
    quote: "Viktor led the creation of our best fundraising deck to date! The strategic thinking behind every slide was incredible.",
    avatar: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150"
  },
  {
    name: "James Mitchell",
    role: "VP Product, LaunchPad",
    quote: "Working with Viktor transformed our product vision. The entire user experience feels cohesive and deeply considered.",
    avatar: "https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=150"
  },
  {
    name: "Rachel Foster",
    role: "Co-founder, Nexus Labs",
    quote: "The design quality exceeded our expectations. Every interaction feels premium and perfectly aligned with our brand.",
    avatar: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150"
  },
  {
    name: "David Zhang",
    role: "Head of Design, Paradigm Labs",
    quote: "Incredible work from start to finish. The team consistently delivered high-fidelity designs that were easy to implement.",
    avatar: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150"
  }
];

export const TestimonialCarousel: React.FC = () => {
  const { ref, isInView } = useInViewAnimation();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const total = TESTIMONIALS.length;

  // For infinite scroll effect, we render them multiple times or just slide index.
  // The prompt said "tripled for infinite scroll effect", but standard approach is to loop over a wide flex.
  // We'll just manage the index to loop around.

  useEffect(() => {
    if (isHovered) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % total);
    }, 3000);
    return () => clearInterval(timer);
  }, [isHovered, total]);

  const next = () => setCurrentIndex((prev) => (prev + 1) % total);
  const prev = () => setCurrentIndex((prev) => (prev - 1 + total) % total);

  return (
    <section ref={ref} className="w-full py-20 overflow-hidden">
      <div 
        className={`w-full px-6 mb-12 ${isInView ? 'animate-fade-in-up' : 'opacity-0'}`}
        style={{ animationDelay: '0.1s' }}
      >
        <div className="md:max-w-4xl md:ml-auto flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <h2 className="text-[32px] md:text-[40px] lg:text-[44px] leading-[1.1] text-secondary tracking-tight">
            What <span className="font-serif">builders</span> say
          </h2>
          <div className="flex items-center gap-3">
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map(i => (
                <Star key={i} className="w-5 h-5 text-black" fill="black" />
              ))}
            </div>
            <span className="text-sm font-medium text-secondary">Clutch 5/5</span>
          </div>
        </div>
      </div>

      <div 
        className={`relative w-full px-6 md:pl-[calc(50vw-28rem)] md:pr-0 ${isInView ? 'animate-fade-in-up' : 'opacity-0'}`}
        style={{ animationDelay: '0.2s' }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="flex gap-6 items-stretch transition-transform duration-800 ease-[cubic-bezier(0.4,0,0.2,1)]"
             style={{ transform: `translateX(calc(-${currentIndex} * (min(427.5px, 100vw - 48px) + 24px)))` }}>
          {[...TESTIMONIALS, ...TESTIMONIALS, ...TESTIMONIALS].map((test, i) => (
            <div 
              key={i} 
              className="w-[calc(100vw-48px)] md:w-[427.5px] shrink-0 bg-white rounded-[32px] md:rounded-[40px] shadow-[0_4px_16px_rgba(0,0,0,0.08)] px-6 md:pl-10 md:pr-24 py-8 flex flex-col justify-between transition-all duration-800 ease-[cubic-bezier(0.4,0,0.2,1)]"
              style={{
                opacity: i < currentIndex ? 0 : 1,
                transform: i < currentIndex ? 'scale(0.95)' : 'scale(1)'
              }}
            >
              <div>
                <svg className="w-8 h-8 text-secondary mb-6 opacity-20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
                <p className="text-base text-secondary leading-relaxed mb-8">
                  "{test.quote}"
                </p>
              </div>
              <div className="flex items-center gap-4">
                <img src={test.avatar} alt={test.name} className="w-12 h-12 rounded-full object-cover" />
                <div>
                  <div className="font-semibold text-sm text-secondary">{test.name}</div>
                  <div className="text-sm text-[#273C46]">➔ {test.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="flex gap-4 mt-8 justify-end md:max-w-4xl pr-6">
          <button onClick={prev} className="w-12 h-12 rounded-full border border-secondary/20 flex items-center justify-center text-secondary hover:bg-gray-50 transition-colors">
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button onClick={next} className="w-12 h-12 rounded-full border border-secondary/20 flex items-center justify-center text-secondary hover:bg-gray-50 transition-colors">
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
};
