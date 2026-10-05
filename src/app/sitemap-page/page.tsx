import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Icon from '@/components/ui/AppIcon';
import MappedIcon from '@/components/ui/MappedIcon';

export const metadata: Metadata = {
  title: 'Sitemap - KeiTruckNation',
  description: 'Browse all pages on KeiTruckNation - inventory, parts, resources, and more.',
};

interface SitemapLink {
  label: string;
  href: string;
  description?: string;
}

interface SitemapCategory {
  title: string;
  icon: string;
  links: SitemapLink[];
}

const sitemapData: SitemapCategory[] = [
  {
    title: 'Shop',
    icon: 'truck',
    links: [
      {
        label: 'All Trucks',
        href: '/products',
        description: 'Browse our full inventory of imported kei trucks',
      },
      {
        label: 'Inventory',
        href: '/inventory',
        description: 'Search and filter available trucks by make, model, and year',
      },
      {
        label: 'Parts & Accessories',
        href: '/parts',
        description: 'Genuine OEM and aftermarket kei truck parts',
      },
      {
        label: 'Compare Trucks',
        href: '/compare',
        description: 'Side-by-side comparison of kei truck models',
      },
      { label: 'Wishlist', href: '/wishlist', description: 'Save trucks and parts for later' },
      {
        label: 'Cart',
        href: '/cart',
        description: 'Review your selected items and proceed to checkout',
      },
    ],
  },
  {
    title: 'Buying & Financing',
    icon: 'card',
    links: [
      {
        label: 'Financing Options',
        href: '/financing',
        description: 'Flexible financing plans for kei truck purchases',
      },
      {
        label: 'Trade-In Program',
        href: '/trade-in',
        description: 'Get a quote for your current vehicle',
      },
      {
        label: 'Shipping Information',
        href: '/shipping',
        description: 'Domestic delivery options and rates',
      },
      {
        label: 'Order Tracking',
        href: '/order-tracking',
        description: 'Track your import from Japan to your door',
      },
    ],
  },
  {
    title: 'Import & Ownership',
    icon: 'globe',
    links: [
      {
        label: 'Import Process',
        href: '/import-process',
        description: 'Step-by-step guide: Japanese auction to your driveway',
      },
      {
        label: 'State Registration Guide',
        href: '/state-guide',
        description: 'How to register a kei truck in all 50 states',
      },
      {
        label: 'Maintenance Guide',
        href: '/maintenance',
        description: 'Service schedules, tips, and DIY guides',
      },
      {
        label: 'Glossary',
        href: '/glossary',
        description: 'Kei truck terminology and import jargon explained',
      },
    ],
  },
  {
    title: 'Dealers & Community',
    icon: 'handshake',
    links: [
      {
        label: 'Find a Dealer',
        href: '/dealers',
        description: 'Authorized KeiTruckNation dealers near you',
      },
      {
        label: 'Customer Reviews',
        href: '/reviews',
        description: 'Real stories from kei truck owners',
      },
      { label: 'Blog', href: '/blog', description: 'News, guides, and kei truck culture' },
    ],
  },
  {
    title: 'Company',
    icon: 'business',
    links: [
      { label: 'About KeiTruckNation', href: '/about', description: 'Our story, mission, and team' },
      { label: 'Contact Us', href: '/contact', description: 'Get in touch with our team' },
      {
        label: 'FAQ',
        href: '/faq',
        description: 'Answers to common questions about kei trucks and importing',
      },
    ],
  },
  {
    title: 'Legal & Policies',
    icon: 'document',
    links: [
      {
        label: 'Privacy Policy',
        href: '/privacy-policy',
        description: 'How we collect and protect your data',
      },
      {
        label: 'Terms & Conditions',
        href: '/terms',
        description: 'Terms governing purchases and use of our services',
      },
      {
        label: 'Sitemap',
        href: '/sitemap-page',
        description: 'This page - all KeiTruckNation pages in one place',
      },
    ],
  },
];

export default function SitemapPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        {/* Header */}
        <div className="mb-10">
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
            <Link href="/" className="hover:text-foreground transition-colors">
              Home
            </Link>
            <span>/</span>
            <span className="text-foreground">Sitemap</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-display font-bold text-foreground mb-3">
            Sitemap
          </h1>
          <p className="text-muted-foreground text-base max-w-2xl">
            Everything on KeiTruckNation, organized in one place. Find any page quickly - from truck
            inventory to import guides to legal policies.
          </p>
        </div>

        {/* Sitemap grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {sitemapData.map((category) => (
            <div key={category.title} className="bg-card border border-border rounded-xl p-5">
              {/* Category header */}
              <div className="flex items-center gap-2.5 mb-4 pb-3 border-b border-border">
                <MappedIcon icon={category.icon} size={22} />
                <h2 className="font-display font-bold text-foreground text-base">
                  {category.title}
                </h2>
              </div>

              {/* Links */}
              <ul className="space-y-3">
                {category.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="group block">
                      <span className="text-sm font-semibold text-primary group-hover:underline">
                        {link.label}
                      </span>
                      {link.description && (
                        <span className="block text-xs text-muted-foreground mt-0.5 leading-snug">
                          {link.description}
                        </span>
                      )}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* XML Sitemap note */}
        <div className="mt-10 p-4 bg-muted/40 border border-border rounded-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div>
            <p className="text-sm font-medium text-foreground">Looking for the XML sitemap?</p>
            <p className="text-xs text-muted-foreground mt-0.5">
              For search engines and crawlers, the machine-readable sitemap is available at
              /sitemap.xml
            </p>
          </div>
          <a
            href="/sitemap.xml"
            target="_blank"
            rel="noopener noreferrer"
            className="flex-shrink-0 inline-flex items-center gap-1.5 text-xs font-semibold text-primary border border-primary/30 px-3 py-1.5 rounded-lg hover:bg-primary/5 transition-colors"
          >
            View XML Sitemap
            <Icon name="ArrowRightIcon" size={12} />
          </a>
        </div>
      </main>

      <Footer />
    </div>
  );
}
