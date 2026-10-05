import React from 'react';
import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import StateGuideClient from './components/StateGuideClient';

export const metadata: Metadata = {
  title: 'Kei Truck State Legality Guide - KeiTruckNation',
  description:
    'Find out if kei trucks are street legal in your state. Updated 2026 guide covering all 50 states, registration requirements, and speed restrictions.',
  keywords:
    'kei truck legal, state laws, registration requirements, street legal, kei truck legality',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/state-guide`,
    siteName: 'KeiTruckNation',
    title: 'Kei Truck State Legality Guide - KeiTruckNation',
    description: 'Find out if kei trucks are street legal in your state.',
    images: [
      {
        url: '/assets/images/app_logo.png',
        width: 1200,
        height: 630,
        alt: 'KeiTruckNation State Guide',
      },
    ],
  },
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/state-guide`,
  },
};

export default function StateGuidePage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <StateGuideClient />
      <Footer />
    </main>
  );
}
