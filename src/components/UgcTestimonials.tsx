import React from 'react';
import { Star, Quote } from 'lucide-react';
import { useInViewAnimation } from '../hooks/useInViewAnimation';

const testimonials = [
  {
    quote: "Shifa perfectly captured our brand's aesthetic. The engagement on her reel was absolutely insane. We can't wait to work with her again!",
    author: "Priya Sharma",
    brand: "Dot & Key",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=60"
  },
  {
    quote: "Her storytelling is next level. The UGC content she delivered felt so authentic and native to the platform. It converted beautifully.",
    author: "Rohan Desai",
    brand: "Aqualogica",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&auto=format&fit=crop&q=60"
  },
  {
    quote: "A true professional. She understood our brief instantly and added her own creative flair that made the final video pop. Highly recommended.",
    author: "Ananya Patel",
    brand: "Rare Beauty PR",
    image: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=100&auto=format&fit=crop&q=60"
  }
];

export const UgcTestimonials: React.FC = () => {
  const { ref, isInView } = useInViewAnimation();

  return (
    <section ref={ref} className="py-24 px-6 max-w-6xl mx-auto w-full relative z-10">
      <div 
        className={`text-center mb-16 ${isInView ? 'animate-fade-in-up' : 'opacity-0'}`}
        style={{ animationDelay: '0.1s' }}
      >
        <h2 className="text-[32px] md:text-[48px] leading-[1.1] text-secondary tracking-tight px-4">
          Loved by <span className="font-serif italic">Brands</span>
        </h2>
        <p className="mt-4 text-primary/80 text-sm md:text-base max-w-md mx-auto">
          Don't just take my word for it. Here's what my partners have to say about the content we create together.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
        {testimonials.map((test, index) => (
          <div 
            key={index}
            className={`relative p-8 rounded-[32px] bg-white/40 backdrop-blur-md border border-white/50 shadow-[0_8px_32px_rgba(0,0,0,0.04)] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_16px_48px_rgba(43,22,34,0.08)] group flex flex-col ${isInView ? 'animate-fade-in-up' : 'opacity-0'}`}
            style={{ animationDelay: `0.${(index + 2) * 2}s` }}
          >
            <div className="absolute top-6 right-6 opacity-10 group-hover:opacity-20 transition-opacity duration-300">
              <Quote size={48} className="text-secondary" />
            </div>
            
            <div className="flex gap-1 mb-6">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-secondary text-secondary" />
              ))}
            </div>
            
            <p className="text-secondary/90 text-base md:text-lg leading-relaxed mb-8 relative z-10">
              "{test.quote}"
            </p>
            
            <div className="flex items-center gap-4 mt-auto">
              <img 
                src={test.image} 
                alt={test.author} 
                className="w-12 h-12 rounded-full object-cover border-2 border-white/60 shadow-sm"
              />
              <div>
                <h4 className="text-secondary font-medium text-sm">{test.author}</h4>
                <p className="text-primary/70 text-xs mt-0.5">{test.brand}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
