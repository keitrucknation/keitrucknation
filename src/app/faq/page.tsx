import React from 'react';
import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FAQClient from './components/FAQClient';
import { FAQ_CATEGORIES } from './data/faqData';
import { faqSchema } from '@/lib/structuredData';

// Built directly from the same data FAQClient.tsx renders, so the schema can
// never drift out of sync with what's actually visible on this page.
const flatFaqs = FAQ_CATEGORIES.flatMap((category) =>
  category.items.map((item) => ({ question: item.q, answer: item.a }))
);

export const metadata: Metadata = {
  title: 'FAQ - KeiTruckNation',
  description:
    'Answers to the most common questions about buying, importing, and registering Japanese kei trucks in the USA.',
  keywords: 'kei truck FAQ, frequently asked questions, kei truck questions, import FAQ',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/faq`,
    siteName: 'KeiTruckNation',
    title: 'FAQ - KeiTruckNation',
    description: 'Answers to the most common questions about buying and importing kei trucks.',
    images: [
      {
        url: '/assets/images/app_logo.png',
        width: 1200,
        height: 630,
        alt: 'KeiTruckNation FAQ',
      },
    ],
  },
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/faq`,
  },
};

export default function FAQPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema(flatFaqs)) }}
      />
      <Header />
      <main className="min-h-screen bg-background pt-20">
        <FAQClient />
      </main>
      <Footer />
    </>
  );
}
