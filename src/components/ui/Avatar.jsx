'use client';

import { cn, getInitials, stringToColor } from '@/lib/utils';

const sizes = {
  xs: 'w-6 h-6 text-xs',
  sm: 'w-8 h-8 text-sm',
  md: 'w-10 h-10 text-base',
  lg: 'w-12 h-12 text-lg',
  xl: 'w-16 h-16 text-xl',
  '2xl': 'w-20 h-20 text-2xl',
  '3xl': 'w-24 h-24 text-3xl',
};

export default function Avatar({
  src,
  alt,
  name,
  size = 'md',
  className,
  ...props
}) {
  const initials = getInitials(name || alt);
  const bgColor = stringToColor(name || alt);

  if (src) {
    return (
      <div
        className={cn(
          'relative rounded-full overflow-hidden flex-shrink-0 ring-2 ring-white shadow-soft',
          sizes[size],
          className
        )}
        {...props}
      >
        <img
          src={src}
          alt={alt || name || 'Avatar'}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.style.display = 'none';
            e.target.nextSibling.style.display = 'flex';
          }}
        />
        <div
          className="hidden absolute inset-0 items-center justify-center font-semibold text-white"
          style={{ backgroundColor: bgColor }}
        >
          {initials}
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        'relative rounded-full overflow-hidden flex-shrink-0 flex items-center justify-center font-semibold text-white ring-2 ring-white shadow-soft',
        sizes[size],
        className
      )}
      style={{ backgroundColor: bgColor }}
      {...props}
    >
      {initials}
    </div>
  );
}

export function AvatarGroup({ children, max = 4, size = 'md', className }) {
  const childArray = Array.isArray(children) ? children : [children];
  const visibleChildren = childArray.slice(0, max);
  const remainingCount = childArray.length - max;

  return (
    <div className={cn('flex -space-x-2', className)}>
      {visibleChildren}
      {remainingCount > 0 && (
        <div
          className={cn(
            'relative rounded-full flex items-center justify-center bg-charcoal-200 text-charcoal-700 font-semibold ring-2 ring-white',
            sizes[size]
          )}
        >
          +{remainingCount}
        </div>
      )}
    </div>
  );
}
