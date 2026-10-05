'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Icon from '@/components/ui/AppIcon';

const ROUTE_LABELS: Record<string, string> = {
  inventory: 'Inventory',
  parts: 'Parts',
  blog: 'Blog',
  'import-process': 'Import Process',
  financing: 'Financing',
  maintenance: 'Maintenance',
  'state-guide': 'State Guide',
  about: 'About',
  contact: 'Contact',
  cart: 'Cart',
  wishlist: 'Wishlist',
  compare: 'Compare',
  dealers: 'Dealers',
  reviews: 'Reviews',
  glossary: 'Glossary',
  faq: 'FAQ',
  shipping: 'Shipping',
  'order-tracking': 'Order Tracking',
  'trade-in': 'Trade-In',
  'privacy-policy': 'Privacy Policy',
  terms: 'Terms & Conditions',
  'sitemap-page': 'Sitemap',
  products: 'All Trucks',
  configurator: 'Truck Configurator',
  trucks: 'Trucks',
};

export default function Breadcrumb() {
  const pathname = usePathname();

  if (!pathname || pathname === '/') return null;

  const segments = pathname.split('/').filter(Boolean);
  if (segments.length === 0) return null;

  const crumbs = [
    { label: 'Home', href: '/' },
    ...segments.map((seg, i) => ({
      label: ROUTE_LABELS[seg] || seg.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()),
      href: '/' + segments.slice(0, i + 1).join('/'),
    })),
  ];

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((crumb, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: crumb.label,
      item: `${process.env.NEXT_PUBLIC_SITE_URL || ''}${crumb.href}`,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <nav aria-label="Breadcrumb" className="max-w-7xl mx-auto px-4 sm:px-6 pt-4 pb-1">
        <ol className="flex items-center flex-wrap gap-1 text-xs text-muted-foreground" role="list">
          {crumbs.map((crumb, i) => {
            const isLast = i === crumbs.length - 1;
            return (
              <li key={crumb.href} className="flex items-center gap-1">
                {i > 0 && (
                  <Icon
                    name="ChevronRightIcon"
                    size={12}
                    className="text-muted-foreground/50 flex-shrink-0"
                  />
                )}
                {isLast ? (
                  <span className="font-semibold text-foreground" aria-current="page">
                    {crumb.label}
                  </span>
                ) : (
                  <Link href={crumb.href} className="hover:text-primary transition-colors">
                    {crumb.label}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
