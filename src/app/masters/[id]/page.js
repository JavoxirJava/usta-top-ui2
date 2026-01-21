'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { formatDate, cn } from '@/lib/utils';
import Avatar from '@/components/ui/Avatar';
import Badge from '@/components/ui/Badge';
import Rating from '@/components/ui/Rating';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import { LoadingPage } from '@/components/ui/Loading';
import { ErrorState } from '@/components/ui/Empty';
import { PortfolioGrid } from '@/components/masters/PortfolioCard';
import JobRequestForm from '@/components/masters/JobRequestForm';

export default function MasterProfilePage() {
  const { id } = useParams();
  const { isAuthenticated, isUser } = useAuth();

  const [master, setMaster] = useState(null);
  const [portfolios, setPortfolios] = useState([]);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showRequestForm, setShowRequestForm] = useState(false);
  const [activeTab, setActiveTab] = useState('portfolio');

  useEffect(() => {
    const fetchMasterData = async () => {
      setLoading(true);
      setError(null);

      try {
        await new Promise((resolve) => setTimeout(resolve, 600));
        const mockMaster = generateMockMaster(id);
        setMaster(mockMaster);
        setPortfolios(generateMockPortfolios(id));
        setComments(generateMockComments());
      } catch (err) {
        setError(err.message || 'Failed to load profile');
      } finally {
        setLoading(false);
      }
    };

    fetchMasterData();
  }, [id]);

  if (loading) return <LoadingPage />;

  if (error || !master) {
    return (
      <div className="container-wide py-16">
        <ErrorState
          title="Profile not found"
          description="The professional you're looking for doesn't exist or has been removed."
          onRetry={() => window.location.reload()}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-cream-50 to-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-b from-charcoal-950 to-charcoal-900 text-white">
        <div className="container-wide py-12">
          <nav className="mb-8 flex items-center gap-2 text-sm text-charcoal-400">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <Link href="/categories" className="hover:text-white transition-colors">Professionals</Link>
            <span>/</span>
            <span className="text-white">{master.name}</span>
          </nav>

          <div className="flex flex-col md:flex-row gap-8 items-start">
            <div className="flex items-start gap-6">
              <div className="relative">
                <Avatar src={master.avatar} name={master.name} size="3xl" />
                {master.verified && (
                  <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-sage-500 rounded-full flex items-center justify-center shadow-soft">
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                )}
              </div>

              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="font-display text-3xl font-semibold">{master.name}</h1>
                  {master.available && (
                    <span className="flex items-center gap-1 text-xs text-sage-400 bg-sage-500/20 px-2 py-1 rounded-full">
                      <span className="w-1.5 h-1.5 rounded-full bg-sage-400 animate-pulse" />
                      Available
                    </span>
                  )}
                </div>
                <p className="text-lg text-charcoal-300 mb-4">{master.title}</p>
                <Rating value={master.rating} showValue reviewCount={master.reviewCount} />
              </div>
            </div>

            <div className="md:ml-auto">
              {isUser && (
                <Button size="lg" onClick={() => setShowRequestForm(true)}>
                  Request Service
                  <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Button>
              )}
              {!isAuthenticated && (
                <Link href="/auth/login">
                  <Button size="lg">Sign In to Request</Button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="bg-white border-b border-charcoal-100 shadow-soft">
        <div className="container-wide">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-charcoal-100">
            <StatItem label="Experience" value={`${master.experience}+ years`} />
            <StatItem label="Jobs Completed" value={master.completedJobs} />
            <StatItem label="Response Time" value="< 2 hours" />
            <StatItem label="Repeat Clients" value="85%" />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container-wide py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            {/* Tabs */}
            <div className="flex gap-2 border-b border-charcoal-200">
              <TabButton active={activeTab === 'portfolio'} onClick={() => setActiveTab('portfolio')}>
                Portfolio ({portfolios.length})
              </TabButton>
              <TabButton active={activeTab === 'reviews'} onClick={() => setActiveTab('reviews')}>
                Reviews ({comments.length})
              </TabButton>
              <TabButton active={activeTab === 'about'} onClick={() => setActiveTab('about')}>
                About
              </TabButton>
            </div>

            {activeTab === 'portfolio' && <PortfolioGrid portfolios={portfolios} masterId={id} />}
            
            {activeTab === 'reviews' && (
              <div className="space-y-4">
                {comments.map((comment) => (
                  <ReviewCard key={comment.id} comment={comment} />
                ))}
              </div>
            )}

            {activeTab === 'about' && (
              <Card>
                <h3 className="font-display text-xl font-semibold text-charcoal-900 mb-4">
                  About {master.name}
                </h3>
                <p className="text-charcoal-600 leading-relaxed mb-6">
                  {master.bio || `${master.name} is a verified ${master.title} with ${master.experience}+ years of experience. Known for quality work and excellent customer service.`}
                </p>
                <h4 className="font-semibold text-charcoal-900 mb-3">Services Offered</h4>
                <div className="flex flex-wrap gap-2 mb-6">
                  {['General Repairs', 'Emergency Service', 'Installation', 'Maintenance'].map((s) => (
                    <Badge key={s} variant="sage">{s}</Badge>
                  ))}
                </div>
                <h4 className="font-semibold text-charcoal-900 mb-3">Service Areas</h4>
                <p className="text-charcoal-600">{master.region} region and surrounding areas</p>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card>
              <h3 className="font-display text-lg font-semibold text-charcoal-900 mb-4">Quick Contact</h3>
              <div className="space-y-3">
                <ContactInfo icon="location" text={`${master.region} Region`} />
                <ContactInfo icon="time" text="Usually responds within 2 hours" />
                <ContactInfo icon="verified" text="Background verified" />
              </div>
              <div className="mt-6">
                {isUser ? (
                  <Button fullWidth onClick={() => setShowRequestForm(true)}>Send Job Request</Button>
                ) : (
                  <Link href="/auth/login">
                    <Button fullWidth variant="outline">Sign In to Contact</Button>
                  </Link>
                )}
              </div>
            </Card>

            <Card>
              <h3 className="font-display text-lg font-semibold text-charcoal-900 mb-4">Achievements</h3>
              <div className="space-y-3">
                {[
                  { icon: '🏆', title: 'Top Rated', desc: 'Consistently 5-star reviews' },
                  { icon: '⚡', title: 'Fast Responder', desc: 'Replies within 1 hour' },
                  { icon: '🔒', title: 'Verified Pro', desc: 'Identity & skills verified' },
                ].map((badge) => (
                  <div key={badge.title} className="flex items-center gap-3">
                    <span className="text-2xl">{badge.icon}</span>
                    <div>
                      <p className="font-medium text-charcoal-900 text-sm">{badge.title}</p>
                      <p className="text-xs text-charcoal-500">{badge.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>

      <JobRequestForm
        master={master}
        isOpen={showRequestForm}
        onClose={() => setShowRequestForm(false)}
        onSuccess={() => setShowRequestForm(false)}
      />
    </div>
  );
}

function StatItem({ label, value }) {
  return (
    <div className="py-6 text-center">
      <p className="font-display text-2xl font-bold text-charcoal-900">{value}</p>
      <p className="text-sm text-charcoal-500">{label}</p>
    </div>
  );
}

function TabButton({ children, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'px-4 py-3 font-medium text-sm transition-all border-b-2 -mb-px',
        active
          ? 'text-primary-600 border-primary-500'
          : 'text-charcoal-500 border-transparent hover:text-charcoal-700'
      )}
    >
      {children}
    </button>
  );
}

function ContactInfo({ icon, text }) {
  const icons = {
    location: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />,
    time: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />,
    verified: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />,
  };

  return (
    <div className="flex items-center gap-3 text-charcoal-600">
      <svg className="w-5 h-5 text-charcoal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        {icons[icon]}
      </svg>
      <span>{text}</span>
    </div>
  );
}

function ReviewCard({ comment }) {
  return (
    <Card>
      <div className="flex items-start gap-4">
        <Avatar src={comment.user?.avatar} name={comment.user?.name} size="md" />
        <div className="flex-1">
          <div className="flex items-center justify-between mb-1">
            <h4 className="font-medium text-charcoal-900">{comment.user?.name}</h4>
            <span className="text-xs text-charcoal-400">{formatDate(comment.createdAt)}</span>
          </div>
          <Rating value={comment.rating} size="sm" className="mb-2" />
          <p className="text-charcoal-600">{comment.text}</p>
        </div>
      </div>
    </Card>
  );
}

// Mock data generators
function generateMockMaster(id) {
  return {
    id,
    name: 'John Martinez',
    avatar: 'https://i.pravatar.cc/150?img=12',
    title: 'Licensed Master Plumber',
    category: 'Plumbing',
    experience: 12,
    rating: 4.9,
    reviewCount: 156,
    completedJobs: 423,
    region: 'North',
    verified: true,
    available: true,
    bio: 'With over 12 years of experience in residential and commercial plumbing, I take pride in delivering quality work that stands the test of time. From simple repairs to complete installations, I handle every job with professionalism and attention to detail.',
  };
}

function generateMockPortfolios(masterId) {
  return [
    {
      id: 1,
      title: 'Kitchen Renovation Plumbing',
      description: 'Complete plumbing installation for a modern kitchen remodel including sink, dishwasher, and garbage disposal.',
      category: 'Renovation',
      images: [
        { id: 1, url: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600' },
        { id: 2, url: 'https://images.unsplash.com/photo-1556909172-54557c7e4fb7?w=600' },
      ],
    },
    {
      id: 2,
      title: 'Bathroom Pipe Replacement',
      description: 'Full pipe replacement and upgrade for a residential bathroom including new fixtures.',
      category: 'Repair',
      images: [
        { id: 3, url: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=600' },
      ],
    },
    {
      id: 3,
      title: 'Water Heater Installation',
      description: 'Installed a new tankless water heater with all necessary connections and safety features.',
      category: 'Installation',
      images: [
        { id: 4, url: 'https://images.unsplash.com/photo-1585704032915-c3400ca199e7?w=600' },
      ],
    },
  ];
}

function generateMockComments() {
  return [
    {
      id: 1,
      user: { name: 'Sarah M.', avatar: 'https://i.pravatar.cc/150?img=32' },
      rating: 5,
      text: 'John was amazing! He arrived on time, quickly diagnosed the issue, and had it fixed within an hour. Very professional and fair pricing.',
      createdAt: '2024-01-15',
    },
    {
      id: 2,
      user: { name: 'David L.', avatar: 'https://i.pravatar.cc/150?img=11' },
      rating: 5,
      text: 'Excellent work on our bathroom renovation. John went above and beyond to make sure everything was perfect. Highly recommend!',
      createdAt: '2024-01-10',
    },
    {
      id: 3,
      user: { name: 'Emily R.', avatar: 'https://i.pravatar.cc/150?img=44' },
      rating: 4,
      text: 'Good service overall. The job was completed well, though scheduling took a bit longer than expected.',
      createdAt: '2024-01-05',
    },
  ];
}
