'use client';

import { forwardRef } from 'react';
import { cn } from '@/lib/utils';

const Select = forwardRef(function Select(
  {
    label,
    error,
    hint,
    options = [],
    placeholder = 'Select an option',
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
        <select
          ref={ref}
          className={cn(
            'w-full bg-white border-2 font-body text-charcoal-900',
            'transition-all duration-200 ease-smooth appearance-none cursor-pointer',
            'focus:outline-none focus:ring-4',
            error
              ? 'border-red-300 focus:border-red-500 focus:ring-red-100'
              : 'border-charcoal-200 focus:border-primary-400 focus:ring-primary-100',
            sizes[size],
            'pr-10',
            className
          )}
          {...props}
        >
          <option value="" disabled>
            {placeholder}
          </option>
          {options.map((option) => (
            <option key={option.id || option.value} value={option.id || option.value}>
              {option.name || option.label}
            </option>
          ))}
        </select>
        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
          <svg
            className="h-5 w-5 text-charcoal-400"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      </div>
      {(error || hint) && (
        <p className={cn('text-sm', error ? 'text-red-500' : 'text-charcoal-500')}>
          {error || hint}
        </p>
      )}
    </div>
  );
});

export default Select;
