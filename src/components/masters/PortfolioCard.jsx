'use client';

import { useState } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import Button from '@/components/ui/Button';
import Modal from '@/components/ui/Modal';

export default function PortfolioCard({ portfolio, masterId, className }) {
  const [showImages, setShowImages] = useState(false);
  const { id, title, description, category, images = [], createdAt } = portfolio;

  const previewImage = images[0]?.url || '/images/placeholder-portfolio.jpg';

  return (
    <>
      <div
        className={cn(
          'group bg-white rounded-3xl overflow-hidden shadow-soft border border-charcoal-100/50',
          'hover:shadow-soft-lg transition-all duration-300',
          className
        )}
      >
        {/* Image */}
        <div className="relative aspect-[4/3] overflow-hidden bg-charcoal-100">
          <img
            src={previewImage}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          {images.length > 1 && (
            <div className="absolute bottom-3 right-3 px-2 py-1 bg-black/60 backdrop-blur-sm rounded-lg text-white text-xs">
              +{images.length - 1} more
            </div>
          )}
          {/* Overlay on hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
            <Button
              size="sm"
              onClick={() => setShowImages(true)}
              className="w-full"
            >
              Preview Images
            </Button>
          </div>
        </div>

        {/* Content */}
        <div className="p-5">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-medium text-primary-600 bg-primary-50 px-2 py-0.5 rounded-full">
              {category}
            </span>
          </div>
          <h3 className="font-display text-lg font-semibold text-charcoal-900 mb-2 line-clamp-1">
            {title}
          </h3>
          <p className="text-charcoal-600 text-sm line-clamp-2 mb-4">
            {description}
          </p>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowImages(true)}
            className="w-full"
          >
            View Details
            <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
          </Button>
        </div>
      </div>

      {/* Images Modal */}
      <PortfolioImagesModal
        isOpen={showImages}
        onClose={() => setShowImages(false)}
        portfolio={portfolio}
      />
    </>
  );
}

function PortfolioImagesModal({ isOpen, onClose, portfolio }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const { title, description, images = [] } = portfolio;

  if (!isOpen) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      description={description}
      size="xl"
    >
      {images.length > 0 ? (
        <div className="space-y-4">
          {/* Main Image */}
          <div className="relative aspect-video rounded-2xl overflow-hidden bg-charcoal-100">
            <img
              src={images[activeIndex]?.url}
              alt={`${title} - Image ${activeIndex + 1}`}
              className="w-full h-full object-contain"
            />
          </div>

          {/* Thumbnails */}
          {images.length > 1 && (
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
              {images.map((image, index) => (
                <button
                  key={image.id || index}
                  onClick={() => setActiveIndex(index)}
                  className={cn(
                    'flex-shrink-0 w-20 h-20 rounded-xl overflow-hidden border-2 transition-all',
                    activeIndex === index
                      ? 'border-primary-500 ring-2 ring-primary-200'
                      : 'border-transparent hover:border-charcoal-200'
                  )}
                >
                  <img
                    src={image.url}
                    alt={`Thumbnail ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}

          {/* Image counter */}
          <p className="text-center text-sm text-charcoal-500">
            {activeIndex + 1} of {images.length} images
          </p>
        </div>
      ) : (
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
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          <p className="text-charcoal-600">No images available for this portfolio</p>
        </div>
      )}
    </Modal>
  );
}

// Grid of portfolios
export function PortfolioGrid({ portfolios, masterId, className }) {
  if (!portfolios || portfolios.length === 0) {
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
            d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
          />
        </svg>
        <h3 className="font-display text-lg font-semibold text-charcoal-900 mb-2">
          No portfolio items yet
        </h3>
        <p className="text-charcoal-600">
          This professional hasn't added any work samples to their portfolio.
        </p>
      </div>
    );
  }

  return (
    <div className={cn('grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6', className)}>
      {portfolios.map((portfolio) => (
        <PortfolioCard
          key={portfolio.id}
          portfolio={portfolio}
          masterId={masterId}
        />
      ))}
    </div>
  );
}
