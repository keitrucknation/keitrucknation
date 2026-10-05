import React from 'react';
import type { Metadata, Viewport } from 'next';
import { Plus_Jakarta_Sans, Fraunces } from 'next/font/google';
import '../styles/tailwind.css';
import { CurrencyProvider } from '@/components/CurrencyToggle';
import { LanguageProvider } from '@/components/LanguageSelector';
import LiveChat from '@/components/LiveChat';
import CookieConsent from '@/components/CookieConsent';
import BackToTop from '@/components/BackToTop';
import Breadcrumb from '@/components/Breadcrumb';
import { localBusinessSchema } from '@/lib/structuredData';

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-plus-jakarta-sans',
  display: 'swap',
});

const fraunces = Fraunces({
  subsets: ['latin'],
  weight: ['400', '600', '700', '900'],
  variable: '--font-fraunces',
  display: 'swap',
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  title: 'KeiTruckNation - Japanese Mini Trucks for Sale',
  description:
    'Buy authentic imported Japanese kei trucks and genuine parts online. Serving farmers, contractors, and off-road enthusiasts across the USA.',
  keywords:
    'kei trucks, Japanese mini trucks, Suzuki Carry, Daihatsu Hijet, Honda Acty, Subaru Sambar, import trucks',
  icons: {
    icon: [{ url: '/favicon.ico', type: 'image/x-icon' }],
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
    siteName: 'KeiTruckNation',
    title: 'KeiTruckNation - Japanese Mini Trucks for Sale',
    description:
      'Buy authentic imported Japanese kei trucks and genuine parts online. Serving farmers, contractors, and off-road enthusiasts across the USA.',
    images: [
      {
        url: '/assets/images/app_logo.png',
        width: 1200,
        height: 630,
        alt: 'KeiTruckNation - Japanese Mini Trucks',
        type: 'image/png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'KeiTruckNation - Japanese Mini Trucks for Sale',
    description: 'Buy authentic imported Japanese kei trucks and genuine parts online.',
    images: ['/assets/images/app_logo.png'],
  },
  alternates: {
    canonical: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
  },
  robots: {
    index: true,
    follow: true,
    'max-image-preview': 'large',
    'max-snippet': -1,
    'max-video-preview': -1,
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'KeiTruckNation',
    url: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
    logo: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/assets/images/app_logo.png`,
    description:
      'Buy authentic imported Japanese kei trucks and genuine parts online. Serving farmers, contractors, and off-road enthusiasts across the USA.',
    sameAs: [
      'https://www.facebook.com/keitrucknation',
      'https://www.instagram.com/keitrucknation',
    ],
  };

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'KeiTruckNation',
    url: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/inventory?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };

  return (
    <html lang="en" className={`${plusJakartaSans.variable} ${fraunces.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema()) }}
        />
      </head>
      <body className={plusJakartaSans.className}>
        <LanguageProvider>
          <CurrencyProvider>
            <Breadcrumb />
            {children}
            <BackToTop />
            <CookieConsent />
            <LiveChat />
          </CurrencyProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
