'use client';

import { cn } from '@/lib/utils';

const steps = [
  {
    number: '01',
    title: 'Tell us what you need',
    description: 'Browse our service categories or search for specific tasks. Describe your project details and requirements to help us match you with the right professionals.',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
    ),
    color: 'primary',
  },
  {
    number: '02',
    title: 'Get matched with pros',
    description: 'Review detailed profiles of verified service providers. Compare ratings, read reviews, browse portfolios, and check availability in your area.',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
    color: 'sage',
  },
  {
    number: '03',
    title: 'Book with confidence',
    description: 'Send a job request directly to your chosen professional. Discuss details, agree on pricing and schedule, then get your project completed by trusted experts.',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    color: 'amber',
  },
];

export default function HowItWorksSection() {
  return (
    <section className="section relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-cream-100 to-white" />
      
      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-64 h-64 bg-primary-200/30 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-64 h-64 bg-sage-200/30 rounded-full blur-3xl" />

      <div className="container-wide relative">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-20">
          <span className="inline-block text-sage-600 font-medium mb-4">
            Simple Process
          </span>
          <h2 className="font-display text-display-sm md:text-display-md text-charcoal-950 mb-4">
            How ServiceHub works
          </h2>
          <p className="text-lg text-charcoal-600">
            Get your project done in three easy steps. No hassle, no hidden fees,
            just quality service.
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          {steps.map((step, index) => (
            <div
              key={step.number}
              className="relative group"
            >
              {/* Connector line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-16 left-[60%] w-full h-[2px]">
                  <div className="h-full bg-gradient-to-r from-charcoal-200 to-charcoal-100" />
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-charcoal-200" />
                </div>
              )}

              {/* Card */}
              <div className="relative bg-white rounded-[2rem] p-8 shadow-soft border border-charcoal-100/50 
                            group-hover:shadow-soft-lg group-hover:-translate-y-1 transition-all duration-300">
                {/* Step number */}
                <div className="absolute -top-4 -left-4 w-12 h-12 rounded-2xl bg-charcoal-950 text-white
                              flex items-center justify-center font-display font-bold text-lg
                              shadow-soft">
                  {step.number}
                </div>

                {/* Icon */}
                <div className={cn(
                  'w-16 h-16 rounded-2xl flex items-center justify-center mb-6',
                  step.color === 'primary' && 'bg-primary-100 text-primary-600',
                  step.color === 'sage' && 'bg-sage-100 text-sage-600',
                  step.color === 'amber' && 'bg-amber-100 text-amber-600',
                )}>
                  {step.icon}
                </div>

                {/* Content */}
                <h3 className="font-display text-xl font-semibold text-charcoal-900 mb-3">
                  {step.title}
                </h3>
                <p className="text-charcoal-600 leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Stats Bar */}
        <div className="mt-20 bg-charcoal-950 rounded-[2rem] p-8 md:p-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="font-display text-4xl md:text-5xl font-bold text-white mb-2">
                50K+
              </div>
              <div className="text-charcoal-400">Jobs Completed</div>
            </div>
            <div className="text-center">
              <div className="font-display text-4xl md:text-5xl font-bold text-primary-400 mb-2">
                10K+
              </div>
              <div className="text-charcoal-400">Verified Pros</div>
            </div>
            <div className="text-center">
              <div className="font-display text-4xl md:text-5xl font-bold text-sage-400 mb-2">
                4.9
              </div>
              <div className="text-charcoal-400">Avg. Rating</div>
            </div>
            <div className="text-center">
              <div className="font-display text-4xl md:text-5xl font-bold text-amber-400 mb-2">
                98%
              </div>
              <div className="text-charcoal-400">Satisfaction</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
