'use client';

import { forwardRef } from 'react';
import { cn } from '@/lib/utils';

const Input = forwardRef(function Input(
  {
    label,
    error,
    hint,
    leftIcon,
    rightIcon,
    className,
    containerClassName,
    size = 'md',
    ...props
  },
  ref
) {
  const sizes = {
    sm: 'px-3 py-2 text-sm rounded-lg',
    md: 'px-4 py-3 rounded-xl',
    lg: 'px-6 py-4 text-lg rounded-2xl',
  };

  return (
    <div className={cn('space-y-1.5', containerClassName)}>
      {label && (
        <label className="block text-sm font-medium text-charcoal-700">
          {label}
        </label>
      )}
      <div className="relative">
        {leftIcon && (
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-charcoal-400">
            {leftIcon}
          </div>
        )}
        <input
          ref={ref}
          className={cn(
            'w-full bg-white border-2 font-body text-charcoal-900',
            'placeholder:text-charcoal-400',
            'transition-all duration-200 ease-smooth',
            'focus:outline-none focus:ring-4',
            error
              ? 'border-red-300 focus:border-red-500 focus:ring-red-100'
              : 'border-charcoal-200 focus:border-primary-400 focus:ring-primary-100',
            sizes[size],
            leftIcon && 'pl-11',
            rightIcon && 'pr-11',
            className
          )}
          {...props}
        />
        {rightIcon && (
          <div className="absolute inset-y-0 right-0 pr-4 flex items-center text-charcoal-400">
            {rightIcon}
          </div>
        )}
      </div>
      {(error || hint) && (
        <p className={cn('text-sm', error ? 'text-red-500' : 'text-charcoal-500')}>
          {error || hint}
        </p>
      )}
    </div>
  );
});

export default Input;
