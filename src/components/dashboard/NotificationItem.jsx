'use client';

import { formatRelativeTime, cn } from '@/lib/utils';

const notificationIcons = {
  JOB_REQUEST: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
    </svg>
  ),
  JOB_ACCEPTED: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  JOB_REJECTED: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  NEW_COMMENT: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
    </svg>
  ),
  SYSTEM: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
};

const notificationColors = {
  JOB_REQUEST: 'bg-primary-100 text-primary-600',
  JOB_ACCEPTED: 'bg-sage-100 text-sage-600',
  JOB_REJECTED: 'bg-red-100 text-red-600',
  NEW_COMMENT: 'bg-blue-100 text-blue-600',
  SYSTEM: 'bg-charcoal-100 text-charcoal-600',
};

export default function NotificationItem({ notification, onClick }) {
  const { id, type, title, message, read, createdAt } = notification;

  return (
    <div
      onClick={() => onClick?.(notification)}
      className={cn(
        'flex items-start gap-4 p-4 rounded-2xl transition-all cursor-pointer',
        read
          ? 'bg-white hover:bg-charcoal-50'
          : 'bg-primary-50/50 hover:bg-primary-50'
      )}
    >
      {/* Icon */}
      <div
        className={cn(
          'w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0',
          notificationColors[type] || notificationColors.SYSTEM
        )}
      >
        {notificationIcons[type] || notificationIcons.SYSTEM}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <h4
            className={cn(
              'font-medium line-clamp-1',
              read ? 'text-charcoal-700' : 'text-charcoal-900'
            )}
          >
            {title}
          </h4>
          {!read && (
            <span className="w-2 h-2 rounded-full bg-primary-500 flex-shrink-0 mt-1.5" />
          )}
        </div>
        <p className="text-sm text-charcoal-600 line-clamp-2 mt-0.5">{message}</p>
        <p className="text-xs text-charcoal-400 mt-1">
          {formatRelativeTime(createdAt)}
        </p>
      </div>
    </div>
  );
}

export function NotificationList({ notifications, onItemClick, emptyMessage }) {
  if (!notifications || notifications.length === 0) {
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
            d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
          />
        </svg>
        <h3 className="font-display text-lg font-semibold text-charcoal-900 mb-2">
          No notifications
        </h3>
        <p className="text-charcoal-600">
          {emptyMessage || "You're all caught up!"}
        </p>
      </div>
    );
  }

  return (
    <div className="divide-y divide-charcoal-100">
      {notifications.map((notification) => (
        <NotificationItem
          key={notification.id}
          notification={notification}
          onClick={onItemClick}
        />
      ))}
    </div>
  );
}
