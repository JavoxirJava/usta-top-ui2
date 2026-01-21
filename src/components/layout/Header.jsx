'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { cn } from '@/lib/utils';
import { NAV_LINKS } from '@/lib/constants';
import Button from '@/components/ui/Button';
import Avatar from '@/components/ui/Avatar';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { user, isAuthenticated, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-40 transition-all duration-300',
        isScrolled
          ? 'bg-white/90 backdrop-blur-lg shadow-soft py-3'
          : 'bg-transparent py-5'
      )}
    >
      <nav className="container-wide">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center shadow-soft group-hover:shadow-glow transition-shadow">
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                />
              </svg>
            </div>
            <span className="font-display text-2xl font-semibold text-charcoal-900">
              Service<span className="text-primary-500">Hub</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'text-base font-medium transition-colors',
                  pathname === link.href
                    ? 'text-primary-600'
                    : 'text-charcoal-600 hover:text-charcoal-900'
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Desktop Auth/User */}
          <div className="hidden lg:flex items-center gap-4">
            {isAuthenticated ? (
              <div className="flex items-center gap-4">
                <Link
                  href="/dashboard"
                  className="text-charcoal-600 hover:text-charcoal-900 font-medium transition-colors"
                >
                  Dashboard
                </Link>
                <div className="relative group">
                  <button className="flex items-center gap-2">
                    <Avatar
                      src={user?.avatar}
                      name={user?.name}
                      size="sm"
                    />
                    <span className="font-medium text-charcoal-700">
                      {user?.name?.split(' ')[0]}
                    </span>
                    <svg
                      className="w-4 h-4 text-charcoal-400 group-hover:text-charcoal-600 transition-colors"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>
                  {/* Dropdown */}
                  <div className="absolute right-0 top-full mt-2 w-48 py-2 bg-white rounded-2xl shadow-soft-lg border border-charcoal-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                    <Link
                      href="/dashboard"
                      className="block px-4 py-2 text-charcoal-700 hover:bg-charcoal-50 hover:text-charcoal-900"
                    >
                      Dashboard
                    </Link>
                    <Link
                      href="/dashboard/profile"
                      className="block px-4 py-2 text-charcoal-700 hover:bg-charcoal-50 hover:text-charcoal-900"
                    >
                      Profile Settings
                    </Link>
                    <hr className="my-2 border-charcoal-100" />
                    <button
                      onClick={logout}
                      className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50"
                    >
                      Sign Out
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <>
                <Link href="/auth/login">
                  <Button variant="ghost">Sign In</Button>
                </Link>
                <Link href="/auth/register">
                  <Button>Get Started</Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 -mr-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6 text-charcoal-700"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={cn(
            'lg:hidden overflow-hidden transition-all duration-300',
            isMobileMenuOpen ? 'max-h-96 mt-4' : 'max-h-0'
          )}
        >
          <div className="py-4 space-y-2 border-t border-charcoal-100">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'block py-2 text-lg font-medium transition-colors',
                  pathname === link.href
                    ? 'text-primary-600'
                    : 'text-charcoal-600'
                )}
              >
                {link.label}
              </Link>
            ))}
            <hr className="border-charcoal-100 my-4" />
            {isAuthenticated ? (
              <>
                <Link
                  href="/dashboard"
                  className="block py-2 text-lg font-medium text-charcoal-600"
                >
                  Dashboard
                </Link>
                <button
                  onClick={logout}
                  className="block py-2 text-lg font-medium text-red-600"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <div className="flex flex-col gap-2 pt-2">
                <Link href="/auth/login">
                  <Button variant="outline" fullWidth>
                    Sign In
                  </Button>
                </Link>
                <Link href="/auth/register">
                  <Button fullWidth>Get Started</Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}
