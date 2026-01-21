'use client';

import { cn } from '@/lib/utils';

export default function Card({
  children,
  className,
  hover = false,
  padding = 'md',
  ...props
}) {
  const paddings = {
    none: '',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
    xl: 'p-10',
  };

  return (
    <div
      className={cn(
        'bg-white rounded-3xl shadow-soft border border-charcoal-100/50',
        paddings[padding],
        hover && 'card-hover cursor-pointer',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardHeader({ children, className, ...props }) {
  return (
    <div className={cn('mb-4', className)} {...props}>
      {children}
    </div>
  );
}

export function CardTitle({ children, className, as: Component = 'h3', ...props }) {
  return (
    <Component
      className={cn('font-display text-xl font-semibold text-charcoal-900', className)}
      {...props}
    >
      {children}
    </Component>
  );
}

export function CardDescription({ children, className, ...props }) {
  return (
    <p className={cn('text-charcoal-600 mt-1', className)} {...props}>
      {children}
    </p>
  );
}

export function CardContent({ children, className, ...props }) {
  return (
    <div className={cn('', className)} {...props}>
      {children}
    </div>
  );
}

export function CardFooter({ children, className, ...props }) {
  return (
    <div className={cn('mt-6 pt-4 border-t border-charcoal-100', className)} {...props}>
      {children}
    </div>
  );
}
