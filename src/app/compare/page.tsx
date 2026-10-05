import React from 'react';
import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CompareClient from './components/CompareClient';

export const metadata: Metadata = {
  title: 'Compare Trucks - KeiTruckNation',
  description:
    'Side-by-side comparison of kei trucks to find the right one for your needs. Compare specs, prices, and features.',
  keywords: 'compare kei trucks, truck comparison, kei truck specs, truck features',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/compare`,
    siteName: 'KeiTruckNation',
    title: 'Compare Trucks - KeiTruckNation',
    description: 'Side-by-side comparison of kei trucks.',
    images: [
      {
        url: '/assets/images/app_logo.png',
        width: 1200,
        height: 630,
        alt: 'KeiTruckNation Compare',
      },
    ],
  },
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/compare`,
  },
};

export default function ComparePage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-background pt-20">
        <CompareClient />
      </main>
      <Footer />
    </>
  );
}
