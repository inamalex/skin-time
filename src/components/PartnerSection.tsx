import React, { useEffect, useRef, useState } from 'react';
import { useInViewAnimation } from '../hooks/useInViewAnimation';

const TRAIL_IMAGES = [
  "https://motionsites.ai/assets/hero-space-voyage-preview-eECLH3Yc.gif",
  "https://motionsites.ai/assets/hero-portfolio-cosmic-preview-BpvWJ3Nc.gif",
  "https://motionsites.ai/assets/hero-velorah-preview-CJNTtbpd.gif",
  "https://motionsites.ai/assets/hero-asme-preview-B_nGDnTP.gif",
  "https://motionsites.ai/assets/hero-transform-data-preview-Cx5OU29N.gif",
  "https://motionsites.ai/assets/hero-aethera-preview-DknSlcTa.gif",
  "https://motionsites.ai/assets/hero-orbit-web3-preview-BXt4OttD.gif",
  "https://motionsites.ai/assets/hero-nexora-preview-cx5HmUgo.gif"
];

interface TrailItem {
  id: number;
  x: number;
  y: number;
  rotation: number;
  image: string;
}

export const PartnerSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [trail, setTrail] = useState<TrailItem[]>([]);
  const trailIdCounter = useRef(0);
  const lastTime = useRef(0);
  const { ref, isInView } = useInViewAnimation();

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const now = Date.now();
      if (now - lastTime.current < 80) return; // spawn every 80ms min
      lastTime.current = now;

      const rect = containerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const id = trailIdCounter.current++;
      const rotation = (Math.random() * 20) - 10; // -10 to +10
      const image = TRAIL_IMAGES[id % TRAIL_IMAGES.length];
      
      setTrail(prev => [...prev, { id, x, y, rotation, image }]);

      setTimeout(() => {
        setTrail(prev => prev.filter(item => item.id !== id));
      }, 1000);
    };

    const container = containerRef.current;
    if (container) container.addEventListener('mousemove', handleMouseMove);

    return () => {
      if (container) container.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <section ref={ref} className="w-full py-12 px-6 flex justify-center">
      <div 
        ref={containerRef}
        className={`w-full max-w-7xl py-24 md:py-48 rounded-[32px] md:rounded-[40px] shadow-[0_4px_30px_rgba(0,0,0,0.05)] bg-white relative overflow-hidden flex flex-col items-center justify-center cursor-default ${isInView ? 'animate-fade-in-up' : 'opacity-0'}`}
        style={{ animationDelay: '0.1s' }}
      >
        {trail.map((item) => (
          <div
            key={item.id}
            className="absolute w-[140px] md:w-[180px] h-[100px] md:h-[130px] rounded-2xl overflow-hidden pointer-events-none z-0 transition-all duration-1000 ease-out hidden md:block"
            style={{ 
              left: item.x, 
              top: item.y,
              transform: `translate(-50%, -50%) rotate(${item.rotation}deg)`,
              opacity: 1,
              animation: 'fadeScaleOut 1s forwards ease-out'
            }}
          >
            <img src={item.image} alt="Trail" className="w-full h-full object-cover" />
          </div>
        ))}
        <style>{`
          @keyframes fadeScaleOut {
            0% { opacity: 0.8; transform: translate(-50%, -50%) rotate(var(--rot)) scale(1); }
            100% { opacity: 0; transform: translate(-50%, -50%) rotate(var(--rot)) scale(0.5); }
          }
        `}</style>

        <h2 className="relative z-10 font-serif text-[36px] sm:text-[48px] md:text-[64px] lg:text-[80px] text-secondary mb-8 md:mb-12 text-center leading-[1.1] px-4">
          Partner with us
        </h2>

        <button className="relative z-10 bg-primary text-white rounded-full pl-2 pr-5 md:pr-7 py-2 font-medium transition-opacity hover:opacity-90 flex items-center justify-center gap-2 md:gap-3 text-sm md:text-base shadow-[0_1px_2px_0_rgba(43,22,34,0.1),inset_0_2px_8px_0_rgba(255,255,255,0.5)]">
          <img src="https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150" alt="Avatar" className="w-8 h-8 md:w-10 md:h-10 rounded-full object-cover" />
          <span>Start chat with Shifa</span>
        </button>
      </div>
    </section>
  );
};
