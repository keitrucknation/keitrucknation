import React from 'react';
import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ShippingClient from './components/ShippingClient';

export const metadata: Metadata = {
  title: 'Shipping & Returns | KeiTruckNation',
  description:
    'Learn how we ship kei trucks across the USA and our return policy. Fast, secure delivery to your location.',
  keywords: 'kei truck shipping, delivery, returns policy, USA shipping',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/shipping`,
    siteName: 'KeiTruckNation',
    title: 'Shipping & Returns | KeiTruckNation',
    description: 'Learn how we ship kei trucks across the USA and our return policy.',
    images: [
      {
        url: '/assets/images/app_logo.png',
        width: 1200,
        height: 630,
        alt: 'KeiTruckNation Shipping',
      },
    ],
  },
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/shipping`,
  },
};

export default function ShippingPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-background pt-20">
        <ShippingClient />
      </main>
      <Footer />
    </>
  );
}
