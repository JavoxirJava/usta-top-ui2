'use client';

import { useState, useEffect, useCallback } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { categoriesAPI, usersAPI } from '@/lib/api';
import { useFetch, useDebounce } from '@/hooks';
import { REGIONS, SORT_OPTIONS } from '@/lib/constants';
import { cn } from '@/lib/utils';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import Button from '@/components/ui/Button';
import { SkeletonMasterCard } from '@/components/ui/Loading';
import { NoResults } from '@/components/ui/Empty';
import MasterCard from '@/components/masters/MasterCard';

export default function CategoriesPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  // Filters state
  const [search, setSearch] = useState(searchParams.get('search') || '');
  const [category, setCategory] = useState(searchParams.get('category') || '');
  const [region, setRegion] = useState(searchParams.get('region') || '');
  const [sortBy, setSortBy] = useState(searchParams.get('sort') || 'rating');

  const debouncedSearch = useDebounce(search, 300);

  // Fetch categories
  const { data: categories, loading: categoriesLoading } = useFetch(
    () => categoriesAPI.getAll(),
    []
  );

  // Fetch masters (simulated - would be a real API call)
  const [masters, setMasters] = useState([]);
  const [loading, setLoading] = useState(true);

  // Simulated masters data
  useEffect(() => {
    setLoading(true);
    // Simulate API call delay
    const timer = setTimeout(() => {
      setMasters(generateMockMasters());
      setLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, [debouncedSearch, category, region, sortBy]);

  // Update URL params when filters change
  useEffect(() => {
    const params = new URLSearchParams();
    if (debouncedSearch) params.set('search', debouncedSearch);
    if (category) params.set('category', category);
    if (region) params.set('region', region);
    if (sortBy !== 'rating') params.set('sort', sortBy);

    const newUrl = params.toString() ? `?${params.toString()}` : '/categories';
    router.replace(newUrl, { scroll: false });
  }, [debouncedSearch, category, region, sortBy, router]);

  const clearFilters = () => {
    setSearch('');
    setCategory('');
    setRegion('');
    setSortBy('rating');
  };

  const hasFilters = search || category || region;

  // Filter masters based on search
  const filteredMasters = masters.filter((master) => {
    if (debouncedSearch) {
      const searchLower = debouncedSearch.toLowerCase();
      return (
        master.name.toLowerCase().includes(searchLower) ||
        master.title?.toLowerCase().includes(searchLower) ||
        master.category?.toLowerCase().includes(searchLower)
      );
    }
    return true;
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-cream-50 to-white">
      {/* Header */}
      <div className="bg-gradient-to-b from-cream-100 to-cream-50 border-b border-charcoal-100">
        <div className="container-wide py-12">
          <h1 className="font-display text-display-sm md:text-display-md text-charcoal-950 mb-4">
            Find Service Professionals
          </h1>
          <p className="text-lg text-charcoal-600 max-w-2xl">
            Browse our network of verified professionals ready to help with your
            project. Filter by service type, location, and more.
          </p>
        </div>
      </div>

      <div className="container-wide py-8">
        {/* Filters */}
        <div className="bg-white rounded-3xl p-6 shadow-soft border border-charcoal-100/50 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Search */}
            <Input
              placeholder="Search professionals..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              leftIcon={
                <svg
                  className="w-5 h-5"
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
              }
            />

            {/* Category */}
            <Select
              placeholder="All Categories"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              options={[
                { id: '', name: 'All Categories' },
                ...(categories || []),
              ]}
            />

            {/* Region */}
            <Select
              placeholder="All Regions"
              value={region}
              onChange={(e) => setRegion(e.target.value)}
              options={REGIONS}
            />

            {/* Sort */}
            <Select
              placeholder="Sort by"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              options={SORT_OPTIONS}
            />
          </div>

          {/* Active filters */}
          {hasFilters && (
            <div className="mt-4 pt-4 border-t border-charcoal-100 flex items-center gap-2 flex-wrap">
              <span className="text-sm text-charcoal-500">Active filters:</span>
              {search && (
                <FilterTag
                  label={`Search: "${search}"`}
                  onRemove={() => setSearch('')}
                />
              )}
              {category && (
                <FilterTag
                  label={categories?.find((c) => c.id === category)?.name || category}
                  onRemove={() => setCategory('')}
                />
              )}
              {region && (
                <FilterTag
                  label={REGIONS.find((r) => r.id === region)?.name || region}
                  onRemove={() => setRegion('')}
                />
              )}
              <button
                onClick={clearFilters}
                className="text-sm text-primary-600 hover:text-primary-700 font-medium ml-2"
              >
                Clear all
              </button>
            </div>
          )}
        </div>

        {/* Results count */}
        {!loading && (
          <div className="flex items-center justify-between mb-6">
            <p className="text-charcoal-600">
              <span className="font-semibold text-charcoal-900">
                {filteredMasters.length}
              </span>{' '}
              professionals found
            </p>
          </div>
        )}

        {/* Results */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <SkeletonMasterCard key={i} />
            ))}
          </div>
        ) : filteredMasters.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMasters.map((master) => (
              <MasterCard key={master.id} master={master} />
            ))}
          </div>
        ) : (
          <NoResults searchTerm={debouncedSearch} onClear={clearFilters} />
        )}
      </div>
    </div>
  );
}

function FilterTag({ label, onRemove }) {
  return (
    <span className="inline-flex items-center gap-1 px-3 py-1 bg-primary-50 text-primary-700 rounded-full text-sm">
      {label}
      <button
        onClick={onRemove}
        className="hover:text-primary-900 transition-colors"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </span>
  );
}

// Mock data generator
function generateMockMasters() {
  const names = [
    'John Martinez', 'Sarah Johnson', 'Michael Chen', 'Emily Davis',
    'Robert Wilson', 'Lisa Anderson', 'David Brown', 'Jennifer Taylor',
    'James Garcia', 'Michelle Lee', 'William Moore', 'Amanda White',
  ];

  const titles = [
    'Licensed Plumber', 'Master Electrician', 'Professional Cleaner',
    'Certified Handyman', 'HVAC Technician', 'Painting Specialist',
    'Landscaping Expert', 'Moving Professional',
  ];

  const categories = [
    'Plumbing', 'Electrical', 'Cleaning', 'Handyman',
    'HVAC', 'Painting', 'Landscaping', 'Moving',
  ];

  const regions = ['North', 'South', 'East', 'West', 'Central'];

  return names.map((name, index) => ({
    id: `master-${index + 1}`,
    name,
    avatar: `https://i.pravatar.cc/150?img=${index + 10}`,
    title: titles[index % titles.length],
    category: categories[index % categories.length],
    experience: Math.floor(Math.random() * 15) + 2,
    rating: (4 + Math.random()).toFixed(1),
    reviewCount: Math.floor(Math.random() * 200) + 20,
    completedJobs: Math.floor(Math.random() * 500) + 50,
    region: regions[index % regions.length],
    verified: Math.random() > 0.2,
    available: Math.random() > 0.3,
  }));
}
