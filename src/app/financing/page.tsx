import React from 'react';
import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FinancingClient from './components/FinancingClient';

export const metadata: Metadata = {
  title: 'Financing | KeiTruckNation',
  description:
    'Get pre-qualified for kei truck financing. Competitive rates for specialty vehicles, flexible terms, and a fast online application.',
  keywords: 'kei truck financing, kei truck loans, financing options, auto financing',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/financing`,
    siteName: 'KeiTruckNation',
    title: 'Financing | KeiTruckNation',
    description: 'Get pre-qualified for kei truck financing with competitive rates.',
    images: [
      {
        url: '/assets/images/app_logo.png',
        width: 1200,
        height: 630,
        alt: 'KeiTruckNation Financing',
      },
    ],
  },
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/financing`,
  },
};

export default function FinancingPage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <FinancingClient />
      <Footer />
    </main>
  );
}
