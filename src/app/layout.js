import { Footer, Header } from '@/components/layout';
import { AuthProvider } from '@/context/AuthContext';
import './globals.css';

export const metadata = {
  metadataBase: new URL((process.env.NEXT_PUBLIC_SITE_URL || 'https://usta-top-api.javohir-dev.uz/api').replace('/api', '')),
  title: {
    default: 'ServiceHub - Find Trusted Home Service Professionals',
    template: '%s | ServiceHub',
  },
  description:
    'Connect with verified local professionals for plumbing, electrical, cleaning, repairs, and more. Quality service, fair prices, guaranteed satisfaction.',
  keywords: [
    'home services',
    'local professionals',
    'plumbing',
    'electrical',
    'cleaning',
    'handyman',
    'repairs',
  ],
  authors: [{ name: 'ServiceHub' }],
  creator: 'ServiceHub',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://servicehub.com',
    siteName: 'ServiceHub',
    title: 'ServiceHub - Find Trusted Home Service Professionals',
    description:
      'Connect with verified local professionals for all your home service needs.',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'ServiceHub',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ServiceHub - Find Trusted Home Service Professionals',
    description:
      'Connect with verified local professionals for all your home service needs.',
    images: ['/images/twitter-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className="min-h-screen flex flex-col bg-cream-50 antialiased">
        <AuthProvider>
          <Header />
          <main className="flex-grow pt-20">{children}</main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
