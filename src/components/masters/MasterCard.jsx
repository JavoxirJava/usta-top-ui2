'use client';

import Link from 'next/link';
import { cn } from '@/lib/utils';
import Avatar from '@/components/ui/Avatar';
import Badge from '@/components/ui/Badge';
import Rating from '@/components/ui/Rating';
import Button from '@/components/ui/Button';

export default function MasterCard({ master, className }) {
  const {
    id,
    name,
    avatar,
    title,
    category,
    experience,
    rating,
    reviewCount,
    completedJobs,
    region,
    verified,
    available,
  } = master;

  return (
    <div
      className={cn(
        'group bg-white rounded-3xl p-6 shadow-soft border border-charcoal-100/50',
        'hover:shadow-soft-lg hover:-translate-y-1 transition-all duration-300',
        className
      )}
    >
      <div className="flex items-start gap-4">
        {/* Avatar */}
        <div className="relative flex-shrink-0">
          <Avatar src={avatar} name={name} size="2xl" />
          {verified && (
            <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-sage-500 rounded-full flex items-center justify-center shadow-soft">
              <svg className="w-3.5 h-3.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </div>
          )}
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-1">
            <h3 className="font-display text-lg font-semibold text-charcoal-900 truncate">
              {name}
            </h3>
            {available && (
              <span className="flex items-center gap-1 text-xs text-sage-600 bg-sage-100 px-2 py-0.5 rounded-full whitespace-nowrap">
                <span className="w-1.5 h-1.5 rounded-full bg-sage-500 animate-pulse" />
                Available
              </span>
            )}
          </div>

          <p className="text-charcoal-600 text-sm mb-2">{title || category}</p>

          <div className="flex items-center gap-3 mb-3">
            <Rating value={rating} showValue reviewCount={reviewCount} size="sm" />
          </div>

          <div className="flex flex-wrap gap-2">
            {experience && (
              <Badge variant="neutral" size="sm">
                {experience}+ years exp.
              </Badge>
            )}
            {completedJobs && (
              <Badge variant="primary" size="sm">
                {completedJobs} jobs done
              </Badge>
            )}
            {region && (
              <Badge variant="sage" size="sm">
                {region}
              </Badge>
            )}
          </div>
        </div>
      </div>

      {/* Action */}
      <div className="mt-5 pt-5 border-t border-charcoal-100">
        <Link href={`/masters/${id}`}>
          <Button
            variant="outline"
            fullWidth
            className="group-hover:border-primary-500 group-hover:text-primary-600"
          >
            View Profile
            <svg
              className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </Button>
        </Link>
      </div>
    </div>
  );
}

// Compact version for sidebars or lists
export function MasterCardCompact({ master, className }) {
  const { id, name, avatar, title, rating, reviewCount, verified } = master;

  return (
    <Link
      href={`/masters/${id}`}
      className={cn(
        'flex items-center gap-3 p-3 rounded-2xl bg-white border border-charcoal-100',
        'hover:shadow-soft hover:border-primary-200 transition-all',
        className
      )}
    >
      <div className="relative flex-shrink-0">
        <Avatar src={avatar} name={name} size="md" />
        {verified && (
          <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-sage-500 rounded-full flex items-center justify-center">
            <svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </div>
        )}
      </div>
      <div className="flex-1 min-w-0">
        <h4 className="font-medium text-charcoal-900 truncate text-sm">{name}</h4>
        <p className="text-charcoal-500 text-xs truncate">{title}</p>
      </div>
      <div className="flex items-center gap-1 text-sm">
        <svg className="w-4 h-4 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
        <span className="font-medium text-charcoal-700">{rating}</span>
      </div>
    </Link>
  );
}
