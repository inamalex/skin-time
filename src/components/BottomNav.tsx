import React from 'react';
import { Button } from './Button';
import logo1 from '../assets/logo-1.png';

export const BottomNav: React.FC = () => {
  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
      <div className="bg-white/90 backdrop-blur-md rounded-full px-2 py-2 pl-4 md:pl-6 flex items-center gap-3 md:gap-4 shadow-[0_8px_30px_rgba(0,0,0,0.12),0_0_0_1px_rgba(0,0,0,0.05)]">
        <img src={logo1} alt="Logo" className="w-8 h-8 md:w-10 md:h-10 object-contain drop-shadow-sm" />
        <a href="https://www.instagram.com/its_skin_time?igsh=MW5rMGlpOWxraHRleg==" target="_blank" rel="noopener noreferrer">
          <Button variant="primary" className="!px-6 !py-2 !text-sm">Start a chat</Button>
        </a>
      </div>
    </div>
  );
};
