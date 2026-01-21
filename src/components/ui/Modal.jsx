'use client';

import { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import { useClickOutside } from '@/hooks';

const sizes = {
  sm: 'max-w-md',
  md: 'max-w-lg',
  lg: 'max-w-2xl',
  xl: 'max-w-4xl',
  full: 'max-w-[90vw]',
};

export default function Modal({
  isOpen,
  onClose,
  children,
  title,
  description,
  size = 'md',
  showClose = true,
  className,
}) {
  const modalRef = useRef(null);

  useClickOutside(modalRef, () => {
    if (isOpen) onClose?.();
  });

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose?.();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-charcoal-950/60 backdrop-blur-sm animate-fade-in"
        aria-hidden="true"
      />

      {/* Modal */}
      <div
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? 'modal-title' : undefined}
        className={cn(
          'relative w-full bg-white rounded-3xl shadow-soft-xl',
          'animate-scale-in',
          sizes[size],
          className
        )}
      >
        {/* Header */}
        {(title || showClose) && (
          <div className="flex items-start justify-between p-6 pb-0">
            <div>
              {title && (
                <h2
                  id="modal-title"
                  className="font-display text-2xl font-semibold text-charcoal-900"
                >
                  {title}
                </h2>
              )}
              {description && (
                <p className="mt-1 text-charcoal-600">{description}</p>
              )}
            </div>
            {showClose && (
              <button
                onClick={onClose}
                className="p-2 -m-2 text-charcoal-400 hover:text-charcoal-600 transition-colors rounded-xl hover:bg-charcoal-100"
                aria-label="Close modal"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            )}
          </div>
        )}

        {/* Content */}
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
}

export function ModalFooter({ children, className }) {
  return (
    <div
      className={cn(
        'flex items-center justify-end gap-3 pt-4 mt-4 border-t border-charcoal-100',
        className
      )}
    >
      {children}
    </div>
  );
}
