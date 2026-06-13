import React from 'react';

export const CopyrightBar: React.FC = () => {
  return (
    <div className="w-full flex justify-center">
      <div className="w-full max-w-[1200px] px-6 py-4 flex justify-between items-center text-sm text-primary/70">
        <span>© {new Date().getFullYear()} its skin time. All rights reserved.</span>
        <span>Made with 🤍</span>
      </div>
    </div>
  );
};
