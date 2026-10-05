import React from 'react';
import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BlogClient from './components/BlogClient';

export const metadata: Metadata = {
  title: 'Kei Truck Blog | KeiTruckNation',
  description:
    'Guides, news, and real-world stories about kei trucks in the USA. Learn about maintenance, state laws, use cases, and what to look for when buying.',
  keywords:
    'kei truck blog, kei truck guides, kei truck news, kei truck maintenance, kei truck tips',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/blog`,
    siteName: 'KeiTruckNation',
    title: 'Kei Truck Blog | KeiTruckNation',
    description: 'Guides, news, and real-world stories about kei trucks in the USA.',
    images: [
      {
        url: '/assets/images/app_logo.png',
        width: 1200,
        height: 630,
        alt: 'KeiTruckNation Blog',
      },
    ],
  },
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/blog`,
  },
};

export default function BlogPage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <BlogClient />
      <Footer />
    </main>
  );
}
