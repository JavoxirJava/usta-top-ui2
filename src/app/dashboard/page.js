'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { cn, roleLabels } from '@/lib/utils';
import Avatar from '@/components/ui/Avatar';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import { LoadingPage, Skeleton } from '@/components/ui/Loading';
import { JobRequestList } from '@/components/dashboard/JobRequestCard';
import { NotificationList } from '@/components/dashboard/NotificationItem';

export default function DashboardPage() {
  const router = useRouter();
  const { user, isAuthenticated, loading: authLoading, isUser, isMaster, isAdmin } = useAuth();
  
  const [activeTab, setActiveTab] = useState('overview');
  const [jobRequests, setJobRequests] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [dataLoading, setDataLoading] = useState(true);

  // Redirect if not authenticated
  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push('/auth/login');
    }
  }, [authLoading, isAuthenticated, router]);

  // Load dashboard data
  useEffect(() => {
    if (isAuthenticated) {
      loadDashboardData();
    }
  }, [isAuthenticated]);

  const loadDashboardData = async () => {
    setDataLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 800));
    
    setJobRequests(generateMockJobRequests());
    setNotifications(generateMockNotifications());
    setDataLoading(false);
  };

  const handleJobUpdate = (updatedJob) => {
    setJobRequests((prev) =>
      prev.map((job) => (job.id === updatedJob.id ? updatedJob : job))
    );
  };

  if (authLoading) {
    return <LoadingPage />;
  }

  if (!isAuthenticated) {
    return null;
  }

  const stats = [
    { label: 'Pending Requests', value: jobRequests.filter(j => j.status === 'PENDING').length, color: 'text-amber-500' },
    { label: 'Completed Jobs', value: 12, color: 'text-sage-500' },
    { label: 'Total Earnings', value: '$2,450', color: 'text-primary-500' },
    { label: 'Avg. Rating', value: '4.9', color: 'text-charcoal-900' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-cream-50 to-white">
      {/* Header */}
      <div className="bg-white border-b border-charcoal-100 shadow-soft">
        <div className="container-wide py-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <Avatar src={user?.avatar} name={user?.name} size="xl" />
              <div>
                <h1 className="font-display text-2xl font-semibold text-charcoal-900">
                  Welcome back, {user?.name?.split(' ')[0]}!
                </h1>
                <p className="text-charcoal-500 flex items-center gap-2">
                  <Badge variant={isMaster ? 'sage' : isAdmin ? 'primary' : 'neutral'} size="sm">
                    {roleLabels[user?.role] || 'User'}
                  </Badge>
                  <span>{user?.email}</span>
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              {isUser && (
                <Link href="/categories">
                  <Button>Find a Pro</Button>
                </Link>
              )}
              {isMaster && (
                <Link href={`/masters/${user?.id}`}>
                  <Button variant="outline">View My Profile</Button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="container-wide py-8">
        {/* Stats Grid */}
        {(isMaster || isAdmin) && (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {stats.map((stat) => (
              <Card key={stat.label} className="text-center">
                <p className={cn('font-display text-3xl font-bold', stat.color)}>
                  {stat.value}
                </p>
                <p className="text-sm text-charcoal-500">{stat.label}</p>
              </Card>
            ))}
          </div>
        )}

        {/* Tabs */}
        <div className="flex gap-2 border-b border-charcoal-200 mb-8">
          <TabButton
            active={activeTab === 'overview'}
            onClick={() => setActiveTab('overview')}
          >
            Overview
          </TabButton>
          <TabButton
            active={activeTab === 'requests'}
            onClick={() => setActiveTab('requests')}
          >
            Job Requests
            {jobRequests.filter(j => j.status === 'PENDING').length > 0 && (
              <span className="ml-2 w-5 h-5 rounded-full bg-primary-500 text-white text-xs flex items-center justify-center">
                {jobRequests.filter(j => j.status === 'PENDING').length}
              </span>
            )}
          </TabButton>
          <TabButton
            active={activeTab === 'notifications'}
            onClick={() => setActiveTab('notifications')}
          >
            Notifications
            {notifications.filter(n => !n.read).length > 0 && (
              <span className="ml-2 w-5 h-5 rounded-full bg-red-500 text-white text-xs flex items-center justify-center">
                {notifications.filter(n => !n.read).length}
              </span>
            )}
          </TabButton>
        </div>

        {/* Tab Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <Card>
                  <h2 className="font-display text-xl font-semibold text-charcoal-900 mb-4">
                    Recent Activity
                  </h2>
                  {dataLoading ? (
                    <div className="space-y-4">
                      {[1, 2, 3].map((i) => (
                        <div key={i} className="flex items-center gap-4">
                          <Skeleton className="w-10 h-10 rounded-full" />
                          <div className="flex-1">
                            <Skeleton className="h-4 w-3/4 mb-2" />
                            <Skeleton className="h-3 w-1/2" />
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {jobRequests.slice(0, 3).map((job) => (
                        <div key={job.id} className="flex items-center gap-4 p-3 rounded-xl hover:bg-charcoal-50 transition-colors">
                          <Avatar
                            src={isMaster ? job.user?.avatar : job.master?.avatar}
                            name={isMaster ? job.user?.name : job.master?.name}
                            size="md"
                          />
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-charcoal-900 truncate">{job.title}</p>
                            <p className="text-sm text-charcoal-500">
                              {isMaster ? `From ${job.user?.name}` : `To ${job.master?.name}`}
                            </p>
                          </div>
                          <Badge
                            variant={
                              job.status === 'ACCEPTED' ? 'success' :
                              job.status === 'REJECTED' ? 'error' : 'warning'
                            }
                            size="sm"
                          >
                            {job.status}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  )}
                </Card>

                {isUser && (
                  <Card>
                    <h2 className="font-display text-xl font-semibold text-charcoal-900 mb-4">
                      Quick Actions
                    </h2>
                    <div className="grid grid-cols-2 gap-4">
                      <Link href="/categories">
                        <div className="p-4 rounded-2xl border-2 border-charcoal-200 hover:border-primary-500 hover:bg-primary-50 transition-all cursor-pointer">
                          <div className="w-10 h-10 rounded-xl bg-primary-100 flex items-center justify-center mb-3">
                            <svg className="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                          </div>
                          <h3 className="font-semibold text-charcoal-900">Find Services</h3>
                          <p className="text-sm text-charcoal-500">Browse professionals</p>
                        </div>
                      </Link>
                      <Link href="/dashboard/history">
                        <div className="p-4 rounded-2xl border-2 border-charcoal-200 hover:border-sage-500 hover:bg-sage-50 transition-all cursor-pointer">
                          <div className="w-10 h-10 rounded-xl bg-sage-100 flex items-center justify-center mb-3">
                            <svg className="w-5 h-5 text-sage-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                          </div>
                          <h3 className="font-semibold text-charcoal-900">Job History</h3>
                          <p className="text-sm text-charcoal-500">View past jobs</p>
                        </div>
                      </Link>
                    </div>
                  </Card>
                )}
              </div>
            )}

            {activeTab === 'requests' && (
              <JobRequestList
                requests={jobRequests}
                onUpdate={handleJobUpdate}
                emptyMessage={
                  isMaster
                    ? "You haven't received any job requests yet."
                    : "You haven't sent any job requests yet."
                }
              />
            )}

            {activeTab === 'notifications' && (
              <Card padding="none">
                <NotificationList
                  notifications={notifications}
                  onItemClick={(n) => console.log('Clicked:', n)}
                />
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card>
              <h3 className="font-display text-lg font-semibold text-charcoal-900 mb-4">
                Profile Completion
              </h3>
              <div className="mb-4">
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-charcoal-600">Progress</span>
                  <span className="font-medium text-charcoal-900">75%</span>
                </div>
                <div className="h-2 bg-charcoal-100 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-primary-400 to-primary-600 rounded-full" style={{ width: '75%' }} />
                </div>
              </div>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2 text-sage-600">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Basic info added
                </li>
                <li className="flex items-center gap-2 text-sage-600">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Email verified
                </li>
                <li className="flex items-center gap-2 text-charcoal-400">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Add profile photo
                </li>
                <li className="flex items-center gap-2 text-charcoal-400">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Complete verification
                </li>
              </ul>
            </Card>

            <Card>
              <h3 className="font-display text-lg font-semibold text-charcoal-900 mb-4">
                Need Help?
              </h3>
              <p className="text-charcoal-600 text-sm mb-4">
                Check our help center for guides and FAQs, or contact our support team.
              </p>
              <Button variant="outline" fullWidth size="sm">
                Visit Help Center
              </Button>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

function TabButton({ children, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'flex items-center px-4 py-3 font-medium text-sm transition-all border-b-2 -mb-px',
        active
          ? 'text-primary-600 border-primary-500'
          : 'text-charcoal-500 border-transparent hover:text-charcoal-700'
      )}
    >
      {children}
    </button>
  );
}

// Mock data generators
function generateMockJobRequests() {
  return [
    {
      id: 1,
      title: 'Kitchen sink repair',
      description: 'The kitchen sink is leaking from under the cabinet. Need someone to fix it ASAP.',
      status: 'PENDING',
      preferredDate: '2024-02-15',
      preferredTime: '10:00',
      budget: 150,
      address: '123 Main St, Apt 4B',
      createdAt: '2024-02-10T08:30:00Z',
      user: { name: 'John Doe', avatar: 'https://i.pravatar.cc/150?img=12' },
      master: { name: 'Mike Johnson', avatar: 'https://i.pravatar.cc/150?img=33' },
    },
    {
      id: 2,
      title: 'Bathroom faucet installation',
      description: 'Need to install a new faucet in the master bathroom.',
      status: 'ACCEPTED',
      preferredDate: '2024-02-18',
      preferredTime: '14:00',
      budget: 200,
      address: '456 Oak Ave',
      createdAt: '2024-02-08T14:20:00Z',
      user: { name: 'Sarah Smith', avatar: 'https://i.pravatar.cc/150?img=26' },
      master: { name: 'Mike Johnson', avatar: 'https://i.pravatar.cc/150?img=33' },
    },
    {
      id: 3,
      title: 'Water heater check',
      description: 'Annual maintenance check for the water heater.',
      status: 'REJECTED',
      preferredDate: '2024-02-12',
      preferredTime: '09:00',
      budget: 100,
      createdAt: '2024-02-05T11:00:00Z',
      user: { name: 'Emily Chen', avatar: 'https://i.pravatar.cc/150?img=44' },
      master: { name: 'Mike Johnson', avatar: 'https://i.pravatar.cc/150?img=33' },
    },
  ];
}

function generateMockNotifications() {
  return [
    {
      id: 1,
      type: 'JOB_REQUEST',
      title: 'New job request',
      message: 'John Doe sent you a request for "Kitchen sink repair"',
      read: false,
      createdAt: '2024-02-10T08:30:00Z',
    },
    {
      id: 2,
      type: 'JOB_ACCEPTED',
      title: 'Request accepted',
      message: 'Your request for "Bathroom faucet installation" has been accepted',
      read: false,
      createdAt: '2024-02-09T16:45:00Z',
    },
    {
      id: 3,
      type: 'NEW_COMMENT',
      title: 'New review',
      message: 'Sarah Smith left a 5-star review on your profile',
      read: true,
      createdAt: '2024-02-07T10:20:00Z',
    },
    {
      id: 4,
      type: 'SYSTEM',
      title: 'Profile tip',
      message: 'Complete your profile to get more job requests',
      read: true,
      createdAt: '2024-02-01T09:00:00Z',
    },
  ];
}
