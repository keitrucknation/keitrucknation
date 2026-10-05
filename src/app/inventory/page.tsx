import React from 'react';
import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import InventoryClient from './components/InventoryClient';

export const metadata: Metadata = {
  title: 'Browse Kei Trucks by Category | KeiTruckNation',
  description:
    'Shop kei trucks by body style: flatbed, dump, box van, crew cab, stake-side, refrigerated, and specialty novelty trucks. Filter by drivetrain and manufacturer.',
  keywords:
    'kei truck categories, dump trucks, flatbed trucks, box van, crew cab, Japanese mini trucks',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/inventory`,
    siteName: 'KeiTruckNation',
    title: 'Browse Kei Trucks by Category | KeiTruckNation',
    description: 'Shop kei trucks by body style and features.',
    images: [
      {
        url: '/assets/images/app_logo.png',
        width: 1200,
        height: 630,
        alt: 'KeiTruckNation Categories',
      },
    ],
  },
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/inventory`,
  },
};

export default function InventoryPage() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

  const collectionSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Kei Trucks by Category',
    description: 'Shop kei trucks by body style and features.',
    url: `${baseUrl}/inventory`,
    publisher: {
      '@type': 'Organization',
      name: 'KeiTruckNation',
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }}
      />
      <main className="min-h-screen bg-background">
        <Header cartCount={0} />
        <InventoryClient />
        <Footer />
      </main>
    </>
  );
}
