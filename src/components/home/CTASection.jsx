'use client';

import Link from 'next/link';
import Button from '@/components/ui/Button';

export default function CTASection() {
  return (
    <section className="section relative overflow-hidden">
      <div className="container-wide">
        <div className="relative bg-charcoal-950 rounded-[3rem] overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0">
            {/* Gradient orbs */}
            <div className="absolute -top-32 -left-32 w-96 h-96 bg-primary-500/20 rounded-full blur-3xl" />
            <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-sage-500/20 rounded-full blur-3xl" />
            
            {/* Grid pattern */}
            <div 
              className="absolute inset-0 opacity-[0.03]"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              }}
            />
          </div>

          <div className="relative z-10 px-8 py-16 md:px-16 md:py-24 lg:py-32">
            <div className="max-w-3xl mx-auto text-center">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/10 mb-8">
                <span className="w-2 h-2 rounded-full bg-sage-400 animate-pulse-soft" />
                <span className="text-sm font-medium text-white/80">
                  Join 10,000+ happy customers
                </span>
              </div>

              {/* Headline */}
              <h2 className="font-display text-display-sm md:text-display-md lg:text-display-lg text-white mb-6">
                Ready to get started?
              </h2>

              {/* Description */}
              <p className="text-xl text-charcoal-300 mb-10 max-w-xl mx-auto">
                Find trusted professionals for your next project. Quality work,
                fair prices, and peace of mind guaranteed.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="/categories">
                  <Button size="xl" className="min-w-[200px]">
                    Find a Pro
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
                </Link>
                <Link href="/auth/register?role=master">
                  <Button variant="outline" size="xl" className="min-w-[200px] border-white/20 text-white hover:bg-white hover:text-charcoal-900">
                    Become a Pro
                  </Button>
                </Link>
              </div>

              {/* Trust indicators */}
              <div className="mt-12 pt-12 border-t border-white/10">
                <div className="flex flex-wrap items-center justify-center gap-8 text-charcoal-400">
                  <div className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-sage-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Free to use</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-sage-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>No hidden fees</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-sage-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Verified professionals</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-sage-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Satisfaction guaranteed</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
