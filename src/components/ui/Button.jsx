'use client';

import { forwardRef } from 'react';
import { cn } from '@/lib/utils';

const variants = {
  primary: 'bg-primary-500 text-white hover:bg-primary-600 focus:ring-primary-500 shadow-soft hover:shadow-glow',
  secondary: 'bg-sage-500 text-white hover:bg-sage-600 focus:ring-sage-500 shadow-soft hover:shadow-glow-sage',
  outline: 'border-2 border-charcoal-200 text-charcoal-700 hover:border-primary-500 hover:text-primary-600 bg-transparent',
  ghost: 'text-charcoal-600 hover:bg-charcoal-100 hover:text-charcoal-900 bg-transparent',
  danger: 'bg-red-500 text-white hover:bg-red-600 focus:ring-red-500 shadow-soft',
  success: 'bg-emerald-500 text-white hover:bg-emerald-600 focus:ring-emerald-500 shadow-soft',
};

const sizes = {
  sm: 'px-4 py-2 text-sm rounded-xl',
  md: 'px-6 py-3 text-base rounded-2xl',
  lg: 'px-8 py-4 text-lg rounded-2xl',
  xl: 'px-10 py-5 text-xl rounded-3xl',
};

const Button = forwardRef(function Button(
  {
    children,
    variant = 'primary',
    size = 'md',
    className,
    disabled = false,
    loading = false,
    leftIcon,
    rightIcon,
    fullWidth = false,
    type = 'button',
    ...props
  },
  ref
) {
  return (
    <button
      ref={ref}
      type={type}
      disabled={disabled || loading}
      className={cn(
        'inline-flex items-center justify-center font-medium',
        'transition-all duration-300 ease-smooth',
        'focus:outline-none focus:ring-2 focus:ring-offset-2',
        'disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:transform-none',
        variants[variant],
        sizes[size],
        fullWidth && 'w-full',
        className
      )}
      {...props}
    >
      {loading ? (
        <>
          <svg
            className="animate-spin -ml-1 mr-2 h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
          Loading...
        </>
      ) : (
        <>
          {leftIcon && <span className="mr-2 -ml-1">{leftIcon}</span>}
          {children}
          {rightIcon && <span className="ml-2 -mr-1">{rightIcon}</span>}
        </>
      )}
    </button>
  );
});

export default Button;
