import React from 'react';
import type { Metadata } from 'next';
import ReviewsClient from './components/ReviewsClient';

export const metadata: Metadata = {
  title: 'Customer Reviews | KeiTruckNation',
  description:
    'Real reviews from real kei truck owners. See what customers say about buying from KeiTruckNation, from purchase to delivery.',
  keywords: 'kei truck reviews, customer reviews, KeiTruckNation reviews, customer testimonials',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/reviews`,
    siteName: 'KeiTruckNation',
    title: 'Customer Reviews | KeiTruckNation',
    description: 'Real reviews from real kei truck owners.',
    images: [
      {
        url: '/assets/images/app_logo.png',
        width: 1200,
        height: 630,
        alt: 'KeiTruckNation Reviews',
      },
    ],
  },
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/reviews`,
  },
};

export default function ReviewsPage() {
  return <ReviewsClient />;
}
