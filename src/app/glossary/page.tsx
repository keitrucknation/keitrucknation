import React from 'react';
import { Metadata } from 'next';
import GlossaryClient from './components/GlossaryClient';

export const metadata: Metadata = {
  title: 'Kei Truck Glossary | KeiTruckNation',
  description:
    'A plain-English glossary of kei truck terms, Japanese auction grades, import terminology, and drivetrain specs. Everything you need to know before buying.',
  keywords: 'kei truck glossary, kei truck terms, Japanese auction grades, import terminology',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/glossary`,
    siteName: 'KeiTruckNation',
    title: 'Kei Truck Glossary | KeiTruckNation',
    description: 'A plain-English glossary of kei truck terms and import terminology.',
    images: [
      {
        url: '/assets/images/app_logo.png',
        width: 1200,
        height: 630,
        alt: 'KeiTruckNation Glossary',
      },
    ],
  },
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/glossary`,
  },
};

export default function GlossaryPage() {
  return <GlossaryClient />;
}
