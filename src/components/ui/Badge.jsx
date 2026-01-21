'use client';

import { cn } from '@/lib/utils';

const variants = {
  primary: 'bg-primary-100 text-primary-700 border-primary-200',
  sage: 'bg-sage-100 text-sage-700 border-sage-200',
  warning: 'bg-amber-100 text-amber-700 border-amber-200',
  success: 'bg-emerald-100 text-emerald-700 border-emerald-200',
  error: 'bg-red-100 text-red-700 border-red-200',
  neutral: 'bg-charcoal-100 text-charcoal-700 border-charcoal-200',
};

const sizes = {
  sm: 'px-2 py-0.5 text-xs',
  md: 'px-3 py-1 text-sm',
  lg: 'px-4 py-1.5 text-base',
};

export default function Badge({
  children,
  variant = 'primary',
  size = 'md',
  dot = false,
  className,
  ...props
}) {
  return (
    <span
      className={cn(
        'inline-flex items-center font-medium rounded-full border',
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {dot && (
        <span
          className={cn(
            'w-1.5 h-1.5 rounded-full mr-1.5',
            variant === 'primary' && 'bg-primary-500',
            variant === 'sage' && 'bg-sage-500',
            variant === 'warning' && 'bg-amber-500',
            variant === 'success' && 'bg-emerald-500',
            variant === 'error' && 'bg-red-500',
            variant === 'neutral' && 'bg-charcoal-500'
          )}
        />
      )}
      {children}
    </span>
  );
}

// Status badge mapping
export function StatusBadge({ status, className }) {
  const statusConfig = {
    PENDING: { variant: 'warning', label: 'Pending' },
    ACCEPTED: { variant: 'success', label: 'Accepted' },
    REJECTED: { variant: 'error', label: 'Rejected' },
    COMPLETED: { variant: 'sage', label: 'Completed' },
    CANCELLED: { variant: 'neutral', label: 'Cancelled' },
  };

  const config = statusConfig[status] || { variant: 'neutral', label: status };

  return (
    <Badge variant={config.variant} dot className={className}>
      {config.label}
    </Badge>
  );
}
