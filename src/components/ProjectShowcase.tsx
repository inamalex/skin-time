import React from 'react';
import { useInViewAnimation } from '../hooks/useInViewAnimation';

// Dynamically import all videos from the assets folder
const videoModules = import.meta.glob('../assets/videos/*.{mp4,webm,ogg,mov}', { eager: true });
const videoUrls = Object.values(videoModules).map((mod: any) => mod.default);

// Use the first 3 videos for the big showcase boxes
const PROJECTS = [
  {
    title: "Brand Campaign",
    desc: "High-quality aesthetic storytelling for beauty products",
    video: videoUrls[0] || ""
  },
  {
    title: "Skincare Routine",
    desc: "Authentic demonstration and product showcase",
    video: videoUrls[1] || ""
  },
  {
    title: "Lifestyle Content",
    desc: "Engaging short-form content designed for conversion",
    video: videoUrls[2] || ""
  }
];

const ProjectItem: React.FC<{ project: any, index: number }> = ({ project, index }) => {
  const { ref, isInView } = useInViewAnimation(0.2);
  const videoRef = React.useRef<HTMLVideoElement>(null);

  React.useEffect(() => {
    if (videoRef.current) {
      if (isInView) {
        videoRef.current.play().catch(() => {});
      } else {
        videoRef.current.pause();
      }
    }
  }, [isInView]);

  return (
    <div 
      ref={ref}
      className={`flex flex-col gap-6 transition-all duration-700 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
    >
      <div className="ml-6 md:ml-28">
        <h3 className="font-serif text-2xl md:text-3xl font-semibold text-primary mb-2">{project.title}</h3>
        <p className="text-sm md:text-base text-primary/70">{project.desc}</p>
      </div>
      <video 
        ref={videoRef}
        src={project.video} 
        loop muted playsInline
        className="w-full max-h-[80vh] rounded-[32px] shadow-[0_16px_48px_rgba(43,22,34,0.12)] object-cover bg-black/5"
      />
    </div>
  );
};

export const ProjectShowcase: React.FC = () => {
  return (
    <section className="w-full max-w-[1200px] mx-auto px-6 py-12 flex flex-col gap-16 md:gap-24">
      {PROJECTS.map((project, idx) => (
        <ProjectItem key={idx} project={project} index={idx} />
      ))}
    </section>
  );
};
