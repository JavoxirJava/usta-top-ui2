'use client';

import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { jobRequestsAPI } from '@/lib/api';
import { formatDate, formatRelativeTime, cn } from '@/lib/utils';
import Avatar from '@/components/ui/Avatar';
import Badge, { StatusBadge } from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';

export default function JobRequestCard({ request, onUpdate }) {
  const { isMaster } = useAuth();
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState(null);

  const {
    id,
    title,
    description,
    status,
    preferredDate,
    preferredTime,
    budget,
    address,
    createdAt,
    user,
    master,
  } = request;

  const isPending = status === 'PENDING';

  const handleAccept = async () => {
    setLoading('accept');
    setError(null);
    try {
      const updated = await jobRequestsAPI.accept(id);
      onUpdate?.(updated);
    } catch (err) {
      setError(err.message || 'Failed to accept request');
    } finally {
      setLoading(null);
    }
  };

  const handleReject = async () => {
    setLoading('reject');
    setError(null);
    try {
      const updated = await jobRequestsAPI.reject(id);
      onUpdate?.(updated);
    } catch (err) {
      setError(err.message || 'Failed to reject request');
    } finally {
      setLoading(null);
    }
  };

  // Determine which user to show based on current user role
  const displayUser = isMaster ? user : master;

  return (
    <Card className="overflow-hidden">
      {/* Header */}
      <div className="flex items-start justify-between gap-4 mb-4">
        <div className="flex items-center gap-3">
          <Avatar
            src={displayUser?.avatar}
            name={displayUser?.name}
            size="lg"
          />
          <div>
            <h3 className="font-display text-lg font-semibold text-charcoal-900">
              {title}
            </h3>
            <p className="text-sm text-charcoal-500">
              {isMaster ? 'From' : 'To'}: {displayUser?.name}
            </p>
          </div>
        </div>
        <StatusBadge status={status} />
      </div>

      {/* Description */}
      <p className="text-charcoal-600 mb-4 line-clamp-3">{description}</p>

      {/* Details Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
        {preferredDate && (
          <div>
            <span className="text-xs text-charcoal-400 uppercase tracking-wide">
              Preferred Date
            </span>
            <p className="font-medium text-charcoal-700">
              {formatDate(preferredDate, { month: 'short', day: 'numeric' })}
            </p>
          </div>
        )}
        {preferredTime && (
          <div>
            <span className="text-xs text-charcoal-400 uppercase tracking-wide">
              Time
            </span>
            <p className="font-medium text-charcoal-700">{preferredTime}</p>
          </div>
        )}
        {budget && (
          <div>
            <span className="text-xs text-charcoal-400 uppercase tracking-wide">
              Budget
            </span>
            <p className="font-medium text-charcoal-700">${budget}</p>
          </div>
        )}
        <div>
          <span className="text-xs text-charcoal-400 uppercase tracking-wide">
            Requested
          </span>
          <p className="font-medium text-charcoal-700">
            {formatRelativeTime(createdAt)}
          </p>
        </div>
      </div>

      {/* Address */}
      {address && (
        <div className="mb-4 flex items-start gap-2 text-charcoal-600">
          <svg
            className="w-4 h-4 mt-0.5 text-charcoal-400 flex-shrink-0"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
          <span className="text-sm">{address}</span>
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-red-600 text-sm">
          {error}
        </div>
      )}

      {/* Actions (for masters on pending requests) */}
      {isMaster && isPending && (
        <div className="pt-4 border-t border-charcoal-100 flex gap-3">
          <Button
            variant="secondary"
            onClick={handleAccept}
            loading={loading === 'accept'}
            disabled={loading !== null}
            className="flex-1"
          >
            Accept
          </Button>
          <Button
            variant="outline"
            onClick={handleReject}
            loading={loading === 'reject'}
            disabled={loading !== null}
            className="flex-1"
          >
            Decline
          </Button>
        </div>
      )}

      {/* Status message for non-pending */}
      {!isPending && (
        <div
          className={cn(
            'pt-4 border-t border-charcoal-100 text-sm',
            status === 'ACCEPTED' && 'text-sage-600',
            status === 'REJECTED' && 'text-red-600',
            status === 'COMPLETED' && 'text-primary-600'
          )}
        >
          {status === 'ACCEPTED' && '✓ This request has been accepted'}
          {status === 'REJECTED' && '✗ This request was declined'}
          {status === 'COMPLETED' && '✓ This job has been completed'}
        </div>
      )}
    </Card>
  );
}

// List of job requests
export function JobRequestList({ requests, onUpdate, emptyMessage }) {
  if (!requests || requests.length === 0) {
    return (
      <div className="text-center py-12">
        <svg
          className="w-16 h-16 mx-auto text-charcoal-300 mb-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
          />
        </svg>
        <h3 className="font-display text-lg font-semibold text-charcoal-900 mb-2">
          No job requests
        </h3>
        <p className="text-charcoal-600">
          {emptyMessage || "You don't have any job requests yet."}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {requests.map((request) => (
        <JobRequestCard key={request.id} request={request} onUpdate={onUpdate} />
      ))}
    </div>
  );
}
