'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import Avatar from '@/components/ui/Avatar';
import Rating from '@/components/ui/Rating';

const testimonials = [
  {
    id: 1,
    name: 'Sarah Mitchell',
    role: 'Homeowner in Brooklyn',
    avatar: 'https://i.pravatar.cc/150?img=32',
    rating: 5,
    text: "Found an amazing electrician within hours. The platform made it so easy to compare professionals and read genuine reviews. Marcus arrived on time, explained everything clearly, and fixed our issue quickly. Highly recommend!",
    service: 'Electrical Work',
  },
  {
    id: 2,
    name: 'David Chen',
    role: 'Property Manager',
    avatar: 'https://i.pravatar.cc/150?img=11',
    rating: 5,
    text: "As someone managing 15+ properties, ServiceHub has been invaluable. Quick response times, verified professionals, and competitive prices. I've used them for plumbing, HVAC, and general repairs. Every experience has been excellent.",
    service: 'Multiple Services',
  },
  {
    id: 3,
    name: 'Elena Rodriguez',
    role: 'Small Business Owner',
    avatar: 'https://i.pravatar.cc/150?img=44',
    rating: 5,
    text: "The quality of work has been consistently excellent. I needed my office repainted on a tight deadline, and they connected me with a professional team who delivered beyond expectations. The space looks brand new!",
    service: 'Painting',
  },
  {
    id: 4,
    name: 'Michael Thompson',
    role: 'First-time Homeowner',
    avatar: 'https://i.pravatar.cc/150?img=59',
    rating: 5,
    text: "Being new to homeownership, I had no idea who to call for anything. ServiceHub took all the stress away. I've now used them for cleaning, plumbing repairs, and even assembled my furniture. Total lifesaver!",
    service: 'Home Services',
  },
  {
    id: 5,
    name: 'Amanda Foster',
    role: 'Interior Designer',
    avatar: 'https://i.pravatar.cc/150?img=26',
    rating: 5,
    text: "I recommend ServiceHub to all my clients who need contractors. The portfolio feature lets me review work quality before hiring, and the professionals are always punctual and courteous. It's elevated my client experience.",
    service: 'Various Projects',
  },
];

export default function TestimonialsSection() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="section bg-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-cream-50 to-transparent" />

      <div className="container-wide relative">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-block text-primary-600 font-medium mb-4">
            Customer Stories
          </span>
          <h2 className="font-display text-display-sm md:text-display-md text-charcoal-950 mb-4">
            Loved by thousands
          </h2>
          <p className="text-lg text-charcoal-600">
            See what our customers have to say about their experience with
            ServiceHub professionals.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Featured Testimonial */}
          <div className="lg:col-span-2 lg:row-span-2">
            <div className="h-full bg-gradient-to-br from-primary-500 to-primary-700 rounded-[2rem] p-8 md:p-12 text-white relative overflow-hidden">
              {/* Decorative elements */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-black/10 rounded-full translate-y-1/2 -translate-x-1/2" />
              
              <div className="relative z-10 h-full flex flex-col">
                {/* Quote icon */}
                <svg className="w-12 h-12 text-white/30 mb-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>

                {/* Quote */}
                <blockquote className="font-display text-2xl md:text-3xl leading-relaxed mb-8 flex-grow">
                  "{testimonials[0].text}"
                </blockquote>

                {/* Author */}
                <div className="flex items-center gap-4">
                  <Avatar
                    src={testimonials[0].avatar}
                    name={testimonials[0].name}
                    size="xl"
                    className="ring-4 ring-white/20"
                  />
                  <div>
                    <div className="font-semibold text-lg">{testimonials[0].name}</div>
                    <div className="text-white/70">{testimonials[0].role}</div>
                    <div className="flex items-center gap-2 mt-1">
                      <Rating value={testimonials[0].rating} size="sm" />
                      <span className="text-white/60 text-sm">for {testimonials[0].service}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Other Testimonials */}
          {testimonials.slice(1, 5).map((testimonial, index) => (
            <div
              key={testimonial.id}
              className="bg-white rounded-[2rem] p-6 shadow-soft border border-charcoal-100/50
                       hover:shadow-soft-lg hover:-translate-y-1 transition-all duration-300"
            >
              <Rating value={testimonial.rating} size="sm" className="mb-4" />
              
              <blockquote className="text-charcoal-700 mb-6 line-clamp-4">
                "{testimonial.text}"
              </blockquote>

              <div className="flex items-center gap-3">
                <Avatar
                  src={testimonial.avatar}
                  name={testimonial.name}
                  size="md"
                />
                <div>
                  <div className="font-semibold text-charcoal-900 text-sm">
                    {testimonial.name}
                  </div>
                  <div className="text-charcoal-500 text-sm">{testimonial.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Trust badges */}
        <div className="mt-16 pt-16 border-t border-charcoal-100">
          <p className="text-center text-charcoal-500 mb-8">Trusted by homeowners and businesses</p>
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16 opacity-50">
            {['TrustPilot', 'Google', 'BBB Accredited', 'Angi', 'HomeAdvisor'].map((brand) => (
              <div
                key={brand}
                className="font-display text-xl font-semibold text-charcoal-400"
              >
                {brand}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
