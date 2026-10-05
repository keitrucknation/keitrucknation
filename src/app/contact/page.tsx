import React from 'react';
import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ContactClient from './components/ContactClient';

export const metadata: Metadata = {
  title: 'Contact KeiTruckNation | Get a Quote',
  description:
    'Ask about a specific truck, request a shipping quote, or get help choosing the right kei truck for your needs. We answer every inquiry.',
  keywords: 'contact KeiTruckNation, get a quote, customer support, kei truck inquiry',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/contact`,
    siteName: 'KeiTruckNation',
    title: 'Contact KeiTruckNation | Get a Quote',
    description: 'Ask about a specific truck or request a shipping quote.',
    images: [
      {
        url: '/assets/images/app_logo.png',
        width: 1200,
        height: 630,
        alt: 'KeiTruckNation Contact',
      },
    ],
  },
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/contact`,
  },
};

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-background">
      <Header cartCount={0} />
      <ContactClient />
      <Footer />
    </main>
  );
}
