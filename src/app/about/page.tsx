import React from 'react';
import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AboutClient from './components/AboutClient';

export const metadata: Metadata = {
  title: 'About KeiTruckNation - Our Story',
  description:
    'We source, inspect, and import the best kei trucks from Japan. Learn about our team, our process, and why we started KeiTruckNation.',
  keywords: 'about KeiTruckNation, our story, kei truck company, Japanese truck import',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/about`,
    siteName: 'KeiTruckNation',
    title: 'About KeiTruckNation - Our Story',
    description: 'We source, inspect, and import the best kei trucks from Japan.',
    images: [
      {
        url: '/assets/images/app_logo.png',
        width: 1200,
        height: 630,
        alt: 'About KeiTruckNation',
      },
    ],
  },
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/about`,
  },
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-background">
      <Header cartCount={0} />
      <AboutClient />
      <Footer />
    </main>
  );
}
