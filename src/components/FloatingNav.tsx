import React from 'react';

export const FloatingNav: React.FC = () => {
  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
      <div className="bg-white/90 backdrop-blur-md px-2 py-2 rounded-full shadow-premium border border-gray-100 flex items-center gap-4 hover:shadow-premium-hover transition-shadow duration-300">
        <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center border border-gray-100">
          <span className="font-serif text-xl text-primary italic leading-none pt-1">V</span>
        </div>
        <button className="pr-6 font-medium text-primary text-sm hover:opacity-80 transition-opacity">
          Start a Chat
        </button>
      </div>
    </div>
  );
};
