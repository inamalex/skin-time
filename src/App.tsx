import { motion } from 'framer-motion';
import logo1 from './assets/logo-1.png';
import { Hero } from './components/Hero';
import { Marquee } from './components/Marquee';
import { TestimonialQuote } from './components/TestimonialQuote';
import { Services } from './components/Services';
import { InfiniteGallery } from './components/InfiniteGallery';
import { ProjectShowcase } from './components/ProjectShowcase';
import { UgcTestimonials } from './components/UgcTestimonials';
import { PartnerSection } from './components/PartnerSection';
import { Footer } from './components/Footer';
import { CopyrightBar } from './components/CopyrightBar';
import { BottomNav } from './components/BottomNav';

function App() {
  return (
    <div className="relative w-full min-h-screen bg-transparent">
      {/* Creative Background Logo Integration */}
      <div className="fixed inset-0 pointer-events-none flex items-center justify-center z-[-1] overflow-hidden">
        <motion.img 
          src={logo1} 
          alt="Skin Time Watermark"
          animate={{ 
            y: [-20, 20, -20],
            rotate: [-1, 1, -1]
          }}
          transition={{ 
            duration: 15, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
          className="w-[140vw] md:w-[80vw] lg:w-[60vw] max-w-[1100px] object-contain opacity-[0.08] mix-blend-multiply" 
        />
      </div>

      <main>
        <Hero />
        <Marquee />
        <TestimonialQuote />
        <Services />
        <InfiniteGallery />
        <ProjectShowcase />
        <UgcTestimonials />
        <PartnerSection />
      </main>
      <Footer />
      <CopyrightBar />
      <BottomNav />
    </div>
  );
}

export default App;
