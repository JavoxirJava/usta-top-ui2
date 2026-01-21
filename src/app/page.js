import {
  HeroSection,
  CategoriesSection,
  HowItWorksSection,
  TestimonialsSection,
  CTASection,
} from '@/components/home';

export const metadata = {
  title: 'ServiceHub - Find Trusted Home Service Professionals',
  description:
    'Connect with verified local professionals for plumbing, electrical, cleaning, repairs, and more. Quality service, fair prices, guaranteed satisfaction.',
};

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <CategoriesSection />
      <HowItWorksSection />
      <TestimonialsSection />
      <CTASection />
    </>
  );
}
