import React from 'react';
import { Metadata } from 'next';
import MaintenanceClient from './components/MaintenanceClient';

export const metadata: Metadata = {
  title: 'Kei Truck Maintenance Guide | KeiTruckNation',
  description:
    'Complete maintenance schedule and service guide for Suzuki Carry, Daihatsu Hijet, Honda Acty, and Subaru Sambar kei trucks. Oil changes, timing belts, 4WD service, and more.',
  keywords:
    'kei truck maintenance, maintenance guide, service schedule, Suzuki Carry maintenance, Daihatsu Hijet maintenance',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/maintenance`,
    siteName: 'KeiTruckNation',
    title: 'Kei Truck Maintenance Guide | KeiTruckNation',
    description: 'Complete maintenance schedule and service guide for kei trucks.',
    images: [
      {
        url: '/assets/images/app_logo.png',
        width: 1200,
        height: 630,
        alt: 'KeiTruckNation Maintenance',
      },
    ],
  },
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/maintenance`,
  },
};

export default function MaintenancePage() {
  return <MaintenanceClient />;
}
