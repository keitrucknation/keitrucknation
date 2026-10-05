import React from 'react';
import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import VinLookupClient from './components/VinLookupClient';

export const metadata: Metadata = {
  title: 'VIN / Chassis Lookup Tool - KeiTruckNation',
  description:
    'Decode Japanese kei truck VIN and chassis numbers. Look up auction history, specs, and import eligibility for Suzuki Carry, Daihatsu Hijet, Honda Acty, and Subaru Sambar.',
  keywords:
    'VIN lookup, chassis number decoder, Japanese kei truck VIN, JDM chassis lookup, kei truck import eligibility',
};

export default function VinLookupPage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <VinLookupClient />
      <Footer />
    </main>
  );
}
