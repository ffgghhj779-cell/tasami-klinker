"use client";

import { cn } from '@/lib/utils';
import { forwardRef } from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'dark';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  href?: string;
}

const variants: Record<ButtonVariant, string> = {
  primary: 'bg-primary text-white hover:bg-[#e06d15] shadow-md hover:shadow-lg',
  secondary: 'bg-text-main text-white hover:bg-[#363b42] shadow-md hover:shadow-lg',
  outline: 'bg-white text-text-main border-2 border-border-main hover:border-primary hover:text-primary shadow-sm hover:shadow-md',
  dark: 'bg-text-main text-white hover:bg-primary shadow-md hover:shadow-lg',
};

const sizes: Record<ButtonSize, string> = {
  sm: 'px-5 py-2.5 text-sm',
  md: 'px-7 py-3.5 text-sm',
  lg: 'px-8 py-4 text-base',
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', href, children, ...props }, ref) => {
    const classes = cn(
      'inline-flex items-center justify-center gap-2 rounded-lg font-bold transition-all duration-200',
      'hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none',
      variants[variant],
      sizes[size],
      className
    );

    if (href) {
      return (
        <a href={href} className={classes}>
          {children}
        </a>
      );
    }

    return (
      <button ref={ref} className={classes} {...props}>
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
