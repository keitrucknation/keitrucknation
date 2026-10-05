import React from 'react';
import type { Metadata } from 'next';
import TradeInClient from './components/TradeInClient';

export const metadata: Metadata = {
  title: 'Trade-In / Sell Your Truck | KeiTruckNation',
  description:
    'Already own a kei truck? Get a cash offer or trade it in toward a new one. KeiTruckNation buys kei trucks nationwide.',
  keywords: 'trade in kei truck, sell kei truck, cash offer, kei truck buyback',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/trade-in`,
    siteName: 'KeiTruckNation',
    title: 'Trade-In / Sell Your Truck | KeiTruckNation',
    description: 'Get a cash offer or trade it in toward a new one.',
    images: [
      {
        url: '/assets/images/app_logo.png',
        width: 1200,
        height: 630,
        alt: 'KeiTruckNation Trade-In',
      },
    ],
  },
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/trade-in`,
  },
};

export default function TradeInPage() {
  return <TradeInClient />;
}
