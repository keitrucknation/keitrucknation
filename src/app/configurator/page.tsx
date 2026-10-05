import React from 'react';
import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ConfiguratorClient from './components/ConfiguratorClient';

export const metadata: Metadata = {
  title: 'Truck Configurator - Build Your Ideal Kei Truck | KeiTruckNation',
  description:
    'Configure your perfect Japanese kei truck. Choose make, body style, drivetrain, and add-ons. Get a personalized quote matched to available inventory.',
  keywords:
    'kei truck configurator, build kei truck, custom kei truck, Japanese mini truck builder',
};

export default function ConfiguratorPage() {
  return (
    <>
      <Header />
      <main id="main-content">
        <ConfiguratorClient />
      </main>
      <Footer />
    </>
  );
}
