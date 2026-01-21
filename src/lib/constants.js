/**
 * Application constants
 */

export const ROLES = {
  USER: 'USER',
  MASTER: 'MASTER',
  ADMIN: 'ADMIN',
};

export const JOB_STATUS = {
  PENDING: 'PENDING',
  ACCEPTED: 'ACCEPTED',
  REJECTED: 'REJECTED',
  COMPLETED: 'COMPLETED',
  CANCELLED: 'CANCELLED',
};

export const NOTIFICATION_TYPES = {
  JOB_REQUEST: 'JOB_REQUEST',
  JOB_ACCEPTED: 'JOB_ACCEPTED',
  JOB_REJECTED: 'JOB_REJECTED',
  NEW_COMMENT: 'NEW_COMMENT',
  SYSTEM: 'SYSTEM',
};

export const REGIONS = [
  { id: 'all', name: 'All Regions' },
  { id: 'north', name: 'North' },
  { id: 'south', name: 'South' },
  { id: 'east', name: 'East' },
  { id: 'west', name: 'West' },
  { id: 'central', name: 'Central' },
];

export const SORT_OPTIONS = [
  { id: 'rating', name: 'Highest Rated' },
  { id: 'experience', name: 'Most Experienced' },
  { id: 'reviews', name: 'Most Reviews' },
  { id: 'newest', name: 'Newest' },
];

export const MAX_PORTFOLIO_IMAGES = 5;

export const TESTIMONIALS = [
  {
    id: 1,
    name: 'Sarah Mitchell',
    role: 'Homeowner',
    avatar: null,
    rating: 5,
    text: 'Found an amazing electrician within hours. The platform made it so easy to compare professionals and read reviews. Highly recommend!',
  },
  {
    id: 2,
    name: 'Marcus Chen',
    role: 'Property Manager',
    avatar: null,
    rating: 5,
    text: 'As someone who manages multiple properties, this service has been invaluable. Quick responses, verified professionals, and great prices.',
  },
  {
    id: 3,
    name: 'Elena Rodriguez',
    role: 'Small Business Owner',
    avatar: null,
    rating: 5,
    text: 'The quality of work has been consistently excellent. I use ServiceHub for all my office maintenance needs now.',
  },
];

export const HOW_IT_WORKS = [
  {
    step: 1,
    title: 'Tell us what you need',
    description: 'Browse categories or search for specific services. Describe your project and requirements.',
    icon: 'search',
  },
  {
    step: 2,
    title: 'Get matched with pros',
    description: 'Review profiles, ratings, and portfolios of verified service providers in your area.',
    icon: 'users',
  },
  {
    step: 3,
    title: 'Book with confidence',
    description: 'Send a job request, agree on terms, and get your project done by trusted professionals.',
    icon: 'check',
  },
];

export const POPULAR_SERVICES = [
  { id: 1, name: 'Home Cleaning', icon: '🏠', count: 234 },
  { id: 2, name: 'Plumbing', icon: '🔧', count: 189 },
  { id: 3, name: 'Electrical Work', icon: '⚡', count: 156 },
  { id: 4, name: 'Painting', icon: '🎨', count: 142 },
  { id: 5, name: 'Moving Help', icon: '📦', count: 128 },
  { id: 6, name: 'Handyman', icon: '🛠️', count: 203 },
];

export const NAV_LINKS = [
  { href: '/categories', label: 'Services' },
  { href: '/how-it-works', label: 'How It Works' },
  { href: '/about', label: 'About' },
];

export const FOOTER_LINKS = {
  services: [
    { href: '/categories', label: 'Browse All Services' },
    { href: '/categories?popular=true', label: 'Popular Services' },
    { href: '/masters', label: 'Find Professionals' },
  ],
  company: [
    { href: '/about', label: 'About Us' },
    { href: '/careers', label: 'Careers' },
    { href: '/press', label: 'Press' },
  ],
  support: [
    { href: '/help', label: 'Help Center' },
    { href: '/contact', label: 'Contact Us' },
    { href: '/safety', label: 'Trust & Safety' },
  ],
  legal: [
    { href: '/terms', label: 'Terms of Service' },
    { href: '/privacy', label: 'Privacy Policy' },
    { href: '/cookies', label: 'Cookie Policy' },
  ],
};
