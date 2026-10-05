import React from 'react';
import type { Metadata } from 'next';
import ImportProcessClient from './components/ImportProcessClient';

export const metadata: Metadata = {
  title: 'How We Import Kei Trucks | KeiTruckNation',
  description:
    'The complete guide to how KeiTruckNation sources, inspects, ships, and delivers Japanese kei trucks to the United States: every step explained.',
  keywords:
    'kei truck import process, how to import kei trucks, Japanese truck import, import guide',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/import-process`,
    siteName: 'KeiTruckNation',
    title: 'How We Import Kei Trucks | KeiTruckNation',
    description:
      'The complete guide to how KeiTruckNation sources, inspects, and delivers kei trucks.',
    images: [
      {
        url: '/assets/images/app_logo.png',
        width: 1200,
        height: 630,
        alt: 'KeiTruckNation Import Process',
      },
    ],
  },
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/import-process`,
  },
};

export default function ImportProcessPage() {
  return <ImportProcessClient />;
}
