'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Button from '@/components/ui/Button';

export default function HeroSection() {
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/categories?search=${encodeURIComponent(searchQuery)}`);
    } else {
      router.push('/categories');
    }
  };

  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-hero" />
      
      {/* Decorative blobs */}
      <div className="blob-primary w-[500px] h-[500px] -top-20 -right-20 animate-float" />
      <div className="blob-sage w-[400px] h-[400px] bottom-0 -left-20 animate-float" style={{ animationDelay: '2s' }} />
      
      {/* Grid pattern overlay */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <div className="container-wide relative z-10 py-20">
        <div className="max-w-4xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full border border-primary-200 shadow-soft mb-8 animate-fade-in-down">
            <span className="w-2 h-2 rounded-full bg-sage-500 animate-pulse-soft" />
            <span className="text-sm font-medium text-charcoal-700">
              Over 10,000+ verified professionals
            </span>
          </div>

          {/* Headline */}
          <h1 className="font-display text-display-lg md:text-display-xl text-charcoal-950 mb-6 animate-fade-in-up text-balance">
            Find trusted pros
            <br />
            <span className="text-gradient">for every task</span>
          </h1>

          {/* Subheadline */}
          <p className="text-xl md:text-2xl text-charcoal-600 mb-10 max-w-2xl leading-relaxed animate-fade-in-up stagger-1">
            Connect with skilled local professionals for plumbing, electrical,
            cleaning, repairs, and more. Quality service, guaranteed.
          </p>

          {/* Search Box */}
          <form 
            onSubmit={handleSearch}
            className="animate-fade-in-up stagger-2"
          >
            <div className="flex flex-col sm:flex-row gap-3 max-w-2xl">
              <div className="relative flex-1">
                <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                  <svg
                    className="w-5 h-5 text-charcoal-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="What service do you need?"
                  className="w-full pl-14 pr-6 py-5 bg-white border-2 border-charcoal-200 rounded-2xl text-lg
                           placeholder:text-charcoal-400 text-charcoal-900
                           focus:outline-none focus:border-primary-400 focus:ring-4 focus:ring-primary-100
                           shadow-soft transition-all"
                />
              </div>
              <Button type="submit" size="lg" className="px-8 whitespace-nowrap">
                Find Pros
                <svg
                  className="w-5 h-5 ml-2"
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
            </div>
          </form>

          {/* Trust indicators */}
          <div className="mt-12 flex flex-wrap items-center gap-8 animate-fade-in-up stagger-3">
            <div className="flex items-center gap-2">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-200 to-sage-200 border-2 border-white"
                    style={{
                      backgroundImage: `url(https://i.pravatar.cc/80?img=${i + 10})`,
                      backgroundSize: 'cover',
                    }}
                  />
                ))}
              </div>
              <span className="text-charcoal-600 text-sm">
                <strong className="text-charcoal-900">2,500+</strong> pros joined this month
              </span>
            </div>
            
            <div className="flex items-center gap-2 text-charcoal-600">
              <svg className="w-5 h-5 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span>
                <strong className="text-charcoal-900">4.9</strong> average rating
              </span>
            </div>

            <div className="flex items-center gap-2 text-charcoal-600">
              <svg className="w-5 h-5 text-sage-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              <span>
                <strong className="text-charcoal-900">100%</strong> satisfaction guarantee
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Floating service cards decoration */}
      <div className="hidden xl:block absolute right-0 top-1/2 -translate-y-1/2 w-[500px]">
        <div className="relative">
          {/* Card 1 */}
          <div className="absolute top-0 right-0 w-64 bg-white rounded-3xl p-5 shadow-soft-lg animate-float">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 rounded-2xl bg-primary-100 flex items-center justify-center text-2xl">
                🔧
              </div>
              <div>
                <h4 className="font-semibold text-charcoal-900">Plumbing</h4>
                <p className="text-sm text-charcoal-500">156 pros available</p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((i) => (
                <svg key={i} className="w-4 h-4 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
              <span className="text-sm text-charcoal-500 ml-1">(234 reviews)</span>
            </div>
          </div>

          {/* Card 2 */}
          <div className="absolute top-40 right-32 w-64 bg-white rounded-3xl p-5 shadow-soft-lg animate-float" style={{ animationDelay: '1s' }}>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 rounded-2xl bg-sage-100 flex items-center justify-center text-2xl">
                🏠
              </div>
              <div>
                <h4 className="font-semibold text-charcoal-900">Cleaning</h4>
                <p className="text-sm text-charcoal-500">234 pros available</p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((i) => (
                <svg key={i} className="w-4 h-4 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
              <span className="text-sm text-charcoal-500 ml-1">(412 reviews)</span>
            </div>
          </div>

          {/* Card 3 */}
          <div className="absolute top-80 right-8 w-64 bg-white rounded-3xl p-5 shadow-soft-lg animate-float" style={{ animationDelay: '2s' }}>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 rounded-2xl bg-amber-100 flex items-center justify-center text-2xl">
                ⚡
              </div>
              <div>
                <h4 className="font-semibold text-charcoal-900">Electrical</h4>
                <p className="text-sm text-charcoal-500">89 pros available</p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((i) => (
                <svg key={i} className="w-4 h-4 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
              <span className="text-sm text-charcoal-500 ml-1">(178 reviews)</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
