import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'tertiary';
  children: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', children, className = '', ...props }, ref) => {
    let styleClass = '';
    
    if (variant === 'primary') {
      styleClass = 'bg-primary text-white shadow-[0_1px_2px_0_rgba(43,22,34,0.1),0_4px_4px_0_rgba(43,22,34,0.09),0_9px_6px_0_rgba(43,22,34,0.05),0_17px_7px_0_rgba(43,22,34,0.01),0_26px_7px_0_rgba(43,22,34,0),inset_0_2px_8px_0_rgba(255,255,255,0.5)]';
    } else if (variant === 'secondary') {
      styleClass = 'bg-white text-primary shadow-[0_0_0_0.5px_rgba(0,0,0,0.05),0_4px_30px_rgba(0,0,0,0.08)]';
    } else if (variant === 'tertiary') {
      styleClass = 'bg-white text-primary shadow-[0_1px_2px_0_rgba(43,22,34,0.1),0_4px_4px_0_rgba(43,22,34,0.09),0_9px_6px_0_rgba(43,22,34,0.05),0_17px_7px_0_rgba(43,22,34,0.01),0_26px_7px_0_rgba(43,22,34,0),inset_0_2px_8px_0_rgba(255,255,255,0.5)]';
    }

    return (
      <button
        ref={ref}
        className={`rounded-full px-7 py-3 font-medium transition-opacity hover:opacity-90 flex items-center justify-center ${styleClass} ${className}`}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
