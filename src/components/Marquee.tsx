import React, { useRef, useEffect } from 'react';
import { useInViewAnimation } from '../hooks/useInViewAnimation';

// Dynamically import all videos from the assets folder
const videoModules = import.meta.glob('../assets/videos/*.{mp4,webm,ogg,mov}', { eager: true });
const videoUrls = Object.values(videoModules).map((mod: any) => mod.default);

// Select a subset of videos to drastically improve performance and loading speed
const marqueeVideos = videoUrls.slice(0, 4);

const MarqueeVideo: React.FC<{ src: string }> = ({ src }) => {
  const { ref, isInView } = useInViewAnimation(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      if (isInView) {
        videoRef.current.play().catch(() => {});
      } else {
        videoRef.current.pause();
      }
    }
  }, [isInView]);

  return (
    <div ref={ref} className="h-[240px] sm:h-[280px] md:h-[500px] w-[260px] sm:w-[320px] md:w-[700px] shrink-0 mx-3">
      <video 
        ref={videoRef}
        src={src}
        loop
        muted
        playsInline
        className="w-full h-full object-cover rounded-[24px] md:rounded-[32px] shadow-lg bg-black/5"
      />
    </div>
  );
};

export const Marquee: React.FC = () => {
  return (
    <section className="w-full mt-16 md:mt-20 mb-16 overflow-hidden">
      <div className="flex w-max animate-marquee hover:[animation-play-state:paused]">
        {marqueeVideos.length > 0 ? (
          [...marqueeVideos, ...marqueeVideos].map((src, index) => (
            <MarqueeVideo key={index} src={src} />
          ))
        ) : (
          <div className="px-6 text-primary">Loading videos...</div>
        )}
      </div>
    </section>
  );
};
