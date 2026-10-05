import React from 'react';
import type { Metadata } from 'next';
import DealersClient from './components/DealersClient';

export const metadata: Metadata = {
  title: 'Dealers & Partners | KeiTruckNation',
  description:
    'Become a KeiTruckNation authorized dealer or partner. Wholesale pricing, drop-ship programs, and co-branded inventory for dealers nationwide.',
  keywords:
    'kei truck dealer, wholesale pricing, drop-ship, dealer program, partner with KeiTruckNation',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/dealers`,
    siteName: 'KeiTruckNation',
    title: 'Dealers & Partners | KeiTruckNation',
    description: 'Become a KeiTruckNation authorized dealer or partner.',
    images: [
      {
        url: '/assets/images/app_logo.png',
        width: 1200,
        height: 630,
        alt: 'KeiTruckNation Dealers',
      },
    ],
  },
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/dealers`,
  },
};

export default function DealersPage() {
  return <DealersClient />;
}
