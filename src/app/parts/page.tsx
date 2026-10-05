import React from 'react';
import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PartsClient from './components/PartsClient';

export const metadata: Metadata = {
  title: 'Parts & Accessories | KeiTruckNation',
  description:
    'OEM and aftermarket parts for Suzuki Carry, Daihatsu Hijet, Honda Acty, Subaru Sambar, and more. Fast shipping on all parts.',
  keywords:
    'kei truck parts, OEM parts, aftermarket parts, Suzuki Carry parts, Daihatsu Hijet parts',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/parts`,
    siteName: 'KeiTruckNation',
    title: 'Parts & Accessories | KeiTruckNation',
    description:
      'OEM and aftermarket parts for Suzuki Carry, Daihatsu Hijet, Honda Acty, Subaru Sambar.',
    images: [
      {
        url: '/assets/images/app_logo.png',
        width: 1200,
        height: 630,
        alt: 'KeiTruckNation Parts',
      },
    ],
  },
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/parts`,
  },
};

export default function PartsPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-background pt-20">
        <PartsClient />
      </main>
      <Footer />
    </>
  );
}
