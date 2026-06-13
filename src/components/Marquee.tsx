import React from 'react';

// Dynamically import all videos from the assets folder
const videoModules = import.meta.glob('../assets/videos/*.{mp4,webm,ogg,mov}', { eager: true });
const videoUrls = Object.values(videoModules).map((mod: any) => mod.default);

// Select a subset of videos to drastically improve performance and loading speed
const marqueeVideos = videoUrls.slice(0, 4);

export const Marquee: React.FC = () => {
  return (
    <section className="w-full mt-16 md:mt-20 mb-16 overflow-hidden">
      <div className="flex w-max animate-marquee hover:[animation-play-state:paused]">
        {marqueeVideos.length > 0 ? (
          [...marqueeVideos, ...marqueeVideos].map((src, index) => (
            <video 
              key={index}
              src={src}
              autoPlay
              loop
              muted
              playsInline
              className="h-[240px] sm:h-[280px] md:h-[500px] w-[260px] sm:w-[320px] md:w-[700px] object-cover mx-3 rounded-[24px] md:rounded-[32px] shadow-lg shrink-0 bg-black/5"
            />
          ))
        ) : (
          <div className="px-6 text-primary">Loading videos...</div>
        )}
      </div>
    </section>
  );
};
