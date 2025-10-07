import React from 'react';
import { cn } from '@/lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'teal-solid' | 'teal-outline' | 'teal-light';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', children, ...props }, ref) => {
    const baseClasses = 'flex items-center justify-center rounded-xl font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none';
    
    const variants = {
      primary: 'bg-primary-500 text-white hover:bg-primary-600 hover:shadow-lg hover:shadow-primary-300/40 hover:-translate-y-0.5 focus:ring-primary-400 border-2 border-transparent',
      secondary: 'bg-white text-primary-600 border-2 border-primary-400 hover:bg-primary-50 hover:border-primary-500 hover:shadow-md hover:shadow-primary-200/30 focus:ring-primary-400',
      ghost: 'bg-mint-light text-primary-700 border-2 border-primary-200 hover:bg-primary-100 hover:border-primary-300 hover:text-primary-800 focus:ring-primary-300',
      'teal-solid': 'bg-teal-500 text-white hover:bg-teal-600 border-2 border-transparent shadow-md shadow-teal-500/25 hover:shadow-lg hover:-translate-y-0.5 focus:ring-teal-400',
      'teal-outline': 'bg-white text-teal-700 border-2 border-teal-400 hover:bg-teal-50 hover:border-teal-500 shadow-sm shadow-teal-500/10 hover:shadow-md focus:ring-teal-400',
      'teal-light': 'bg-teal-50 text-teal-800 border-2 border-teal-200 hover:bg-teal-100 hover:border-teal-300 focus:ring-teal-300',
    };

    const sizes = {
      sm: 'px-3 py-1.5 text-sm',
      md: 'px-6 py-3 text-base',
      lg: 'px-8 py-4 text-lg min-w-[180px]',
    };

    return (
      <button
        className={cn(
          baseClasses,
          variants[variant],
          sizes[size],
          className
        )}
        ref={ref}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;
