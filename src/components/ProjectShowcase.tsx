import React from 'react';
import { useInViewAnimation } from '../hooks/useInViewAnimation';

import campaignVideo from '../assets/videos/campaign.mp4';
import skincareVideo from '../assets/videos/skincare.mp4';
import lifestyleVideo from '../assets/videos/lifestyle.mp4';

// Use the explicit videos for the big showcase boxes
const PROJECTS = [
  {
    title: "Brand Campaign",
    desc: "High-quality aesthetic storytelling for beauty products",
    video: campaignVideo
  },
  {
    title: "Skincare Routine",
    desc: "Authentic demonstration and product showcase",
    video: skincareVideo
  },
  {
    title: "Lifestyle Content",
    desc: "Engaging short-form content designed for conversion",
    video: lifestyleVideo
  }
];

const ProjectItem: React.FC<{ project: any }> = ({ project }) => {
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
        <ProjectItem key={idx} project={project} />
      ))}
    </section>
  );
};
