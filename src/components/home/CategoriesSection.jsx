'use client';

import Link from 'next/link';
import { cn } from '@/lib/utils';

const categories = [
  {
    id: 1,
    name: 'Home Cleaning',
    icon: '🏠',
    description: 'Deep cleaning, regular maintenance, move-in/out',
    color: 'from-emerald-400 to-teal-500',
    workers: 234,
  },
  {
    id: 2,
    name: 'Plumbing',
    icon: '🔧',
    description: 'Repairs, installations, emergency services',
    color: 'from-blue-400 to-indigo-500',
    workers: 156,
  },
  {
    id: 3,
    name: 'Electrical',
    icon: '⚡',
    description: 'Wiring, fixtures, panel upgrades',
    color: 'from-amber-400 to-orange-500',
    workers: 89,
  },
  {
    id: 4,
    name: 'Painting',
    icon: '🎨',
    description: 'Interior, exterior, decorative finishes',
    color: 'from-pink-400 to-rose-500',
    workers: 142,
  },
  {
    id: 5,
    name: 'Moving Help',
    icon: '📦',
    description: 'Packing, loading, furniture assembly',
    color: 'from-violet-400 to-purple-500',
    workers: 98,
  },
  {
    id: 6,
    name: 'Handyman',
    icon: '🛠️',
    description: 'General repairs, installations, odd jobs',
    color: 'from-primary-400 to-primary-600',
    workers: 203,
  },
  {
    id: 7,
    name: 'Landscaping',
    icon: '🌿',
    description: 'Lawn care, garden design, tree services',
    color: 'from-green-400 to-emerald-500',
    workers: 76,
  },
  {
    id: 8,
    name: 'HVAC',
    icon: '❄️',
    description: 'AC repair, heating, ventilation',
    color: 'from-cyan-400 to-blue-500',
    workers: 64,
  },
];

export default function CategoriesSection() {
  return (
    <section className="section bg-white relative overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, #1a1a1a 1px, transparent 0)`,
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      <div className="container-wide relative">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-block text-primary-600 font-medium mb-4">
            Browse Services
          </span>
          <h2 className="font-display text-display-sm md:text-display-md text-charcoal-950 mb-4">
            What do you need done?
          </h2>
          <p className="text-lg text-charcoal-600">
            Explore our most popular service categories and find the right
            professional for your project.
          </p>
        </div>

        {/* Categories Grid - Unique asymmetric layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {categories.map((category, index) => (
            <Link
              key={category.id}
              href={`/categories?category=${category.id}`}
              className={cn(
                'group relative overflow-hidden rounded-3xl transition-all duration-500',
                // Make first and last items span 2 columns on larger screens
                index === 0 && 'lg:col-span-2 lg:row-span-2',
                index === 7 && 'lg:col-span-2',
              )}
            >
              <div
                className={cn(
                  'relative p-6 lg:p-8 h-full min-h-[200px]',
                  index === 0 && 'lg:min-h-[420px]',
                  'bg-gradient-to-br',
                  category.color,
                )}
              >
                {/* Decorative shapes */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-black/5 rounded-full translate-y-1/2 -translate-x-1/2" />

                {/* Content */}
                <div className="relative z-10 h-full flex flex-col">
                  {/* Icon */}
                  <div className={cn(
                    'w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-sm',
                    'flex items-center justify-center text-3xl mb-4',
                    'group-hover:scale-110 transition-transform duration-300',
                    index === 0 && 'lg:w-20 lg:h-20 lg:text-5xl',
                  )}>
                    {category.icon}
                  </div>

                  {/* Text */}
                  <div className="mt-auto">
                    <h3 className={cn(
                      'font-display font-semibold text-white mb-1',
                      index === 0 ? 'text-2xl lg:text-3xl' : 'text-xl',
                    )}>
                      {category.name}
                    </h3>
                    <p className={cn(
                      'text-white/80 mb-3',
                      index === 0 ? 'text-base lg:text-lg' : 'text-sm',
                    )}>
                      {category.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-white/70 text-sm">
                        {category.workers} pros available
                      </span>
                      <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center
                                    group-hover:bg-white group-hover:text-charcoal-900 transition-all">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* View All Link */}
        <div className="text-center mt-12">
          <Link
            href="/categories"
            className="inline-flex items-center gap-2 text-primary-600 font-medium hover:text-primary-700 transition-colors group"
          >
            View all categories
            <svg
              className="w-4 h-4 group-hover:translate-x-1 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
