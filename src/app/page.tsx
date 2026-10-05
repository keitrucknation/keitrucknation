import React from 'react';
import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SocialProofBar from '@/components/SocialProofBar';
import HeroSection from '@/app/components/HeroSection';
import WhyKeiSection from '@/app/components/WhyKeiSection';
import FeaturedTrucksSection from '@/app/components/FeaturedTrucksSection';
import PartsSection from '@/app/components/PartsSection';
import HowItWorksSection from '@/app/components/HowItWorksSection';
import TestimonialsSection from '@/app/components/TestimonialsSection';
import StateGuideSection from '@/app/components/StateGuideSection';

export const metadata: Metadata = {
  title: 'KeiTruckNation - Japanese Mini Trucks for Sale',
  description:
    'Buy authentic imported Japanese kei trucks and genuine parts online. Serving farmers, contractors, and off-road enthusiasts across the USA.',
  keywords:
    'kei trucks, Japanese mini trucks, Suzuki Carry, Daihatsu Hijet, Honda Acty, Subaru Sambar',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
    siteName: 'KeiTruckNation',
    title: 'KeiTruckNation - Japanese Mini Trucks for Sale',
    description: 'Buy authentic imported Japanese kei trucks and genuine parts online.',
    images: [
      {
        url: '/assets/images/app_logo.png',
        width: 1200,
        height: 630,
        alt: 'KeiTruckNation - Japanese Mini Trucks',
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
};

export default function HomePage() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

  const webPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'KeiTruckNation - Japanese Mini Trucks for Sale',
    description:
      'Buy authentic imported Japanese kei trucks and genuine parts online. Serving farmers, contractors, and off-road enthusiasts across the USA.',
    url: baseUrl,
    image: `${baseUrl}/assets/images/app_logo.png`,
    publisher: {
      '@type': 'Organization',
      name: 'KeiTruckNation',
      logo: {
        '@type': 'ImageObject',
        url: `${baseUrl}/assets/images/app_logo.png`,
      },
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }}
      />
      <main className="min-h-screen bg-background">
        <Header cartCount={0} />
        <HeroSection />
        <SocialProofBar />
        <WhyKeiSection />
        <FeaturedTrucksSection />
        <PartsSection />
        <HowItWorksSection />
        <StateGuideSection />
        <TestimonialsSection />
        <Footer />
      </main>
    </>
  );
}
