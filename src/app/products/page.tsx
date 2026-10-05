import React from 'react';
import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProductsClient from '@/app/products/components/ProductsClient';

export const metadata: Metadata = {
  title: 'Kei Trucks for Sale | Browse Inventory | KeiTruckNation',
  description:
    'Browse our complete inventory of Japanese kei trucks. Filter by make, model, price, and features. Find the perfect truck for your needs.',
  keywords:
    'kei trucks for sale, Japanese mini trucks, Suzuki Carry, Daihatsu Hijet, Honda Acty, Subaru Sambar',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/products`,
    siteName: 'KeiTruckNation',
    title: 'Kei Trucks for Sale | Browse Inventory | KeiTruckNation',
    description: 'Browse our complete inventory of Japanese kei trucks.',
    images: [
      {
        url: '/assets/images/app_logo.png',
        width: 1200,
        height: 630,
        alt: 'KeiTruckNation Inventory',
      },
    ],
  },
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/products`,
  },
};

export default function ProductsPage() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

  const collectionSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Kei Trucks for Sale',
    description: 'Browse our complete inventory of Japanese kei trucks.',
    url: `${baseUrl}/products`,
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
        <ProductsClient />
        <Footer />
      </main>
    </>
  );
}
