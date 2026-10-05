'use client';

import React from 'react';
import Link from 'next/link';
import AppLogo from '@/components/ui/AppLogo';
import Icon from '@/components/ui/AppIcon';

const quickLinks = [
  { label: 'Browse Trucks', href: '/products', icon: 'TruckIcon' },
  { label: 'Parts & Accessories', href: '/parts', icon: 'WrenchScrewdriverIcon' },
  { label: 'Import Process', href: '/import-process', icon: 'GlobeAltIcon' },
  { label: 'Contact Us', href: '/contact', icon: 'EnvelopeIcon' },
];

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Minimal header */}
      <header className="px-6 py-5 border-b border-border">
        <Link href="/" className="inline-flex items-center gap-2">
          <AppLogo size={32} />
          <span className="font-display font-bold text-base text-foreground tracking-tight">
            KeiTruckNation
          </span>
        </Link>
      </header>

      {/* Main content */}
      <main className="flex-1 flex items-center justify-center px-4 py-16">
        <div className="max-w-2xl w-full">
          {/* Big 404 with truck visual */}
          <div className="relative mb-10 select-none">
            <div className="flex items-center justify-center gap-2">
              <span className="text-[120px] sm:text-[160px] font-display font-black leading-none text-foreground/5 tracking-tighter">
                4
              </span>
              <div className="flex flex-col items-center justify-center">
                <div className="w-20 h-20 sm:w-28 sm:h-28 rounded-2xl bg-primary/10 border-2 border-primary/20 flex items-center justify-center">
                  <Icon name="TruckIcon" size={48} className="text-primary" />
                </div>
              </div>
              <span className="text-[120px] sm:text-[160px] font-display font-black leading-none text-foreground/5 tracking-tighter">
                4
              </span>
            </div>
            {/* Centered label over the visual */}
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-xs font-semibold tracking-[0.2em] uppercase text-primary bg-primary/10 px-3 py-1 rounded-full">
                404 - Page Not Found
              </span>
            </div>
          </div>

          {/* Message */}
          <div className="text-center mb-10">
            <h1 className="text-2xl sm:text-3xl font-display font-bold text-foreground mb-3">
              This road doesn&apos;t go anywhere.
            </h1>
            <p className="text-muted-foreground text-base max-w-md mx-auto">
              The page you&apos;re looking for took a wrong turn somewhere in Japan. Let&apos;s get
              you back on the right road.
            </p>
          </div>

          {/* Quick links grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
            {quickLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="flex flex-col items-center gap-2 p-4 rounded-xl border border-border bg-card hover:border-primary/40 hover:bg-primary/5 transition-all duration-200 group"
              >
                <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                  <Icon
                    name={link.icon}
                    size={18}
                    className="text-muted-foreground group-hover:text-primary transition-colors"
                  />
                </div>
                <span className="text-xs font-medium text-center text-foreground/80 group-hover:text-foreground transition-colors leading-tight">
                  {link.label}
                </span>
              </Link>
            ))}
          </div>

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors duration-200"
            >
              <Icon name="HomeIcon" size={16} />
              Back to Home
            </Link>
            <Link
              href="/inventory"
              className="inline-flex items-center justify-center gap-2 border border-border bg-background text-foreground px-6 py-3 rounded-lg font-semibold hover:bg-accent transition-colors duration-200"
            >
              <Icon name="MagnifyingGlassIcon" size={16} />
              Browse Inventory
            </Link>
          </div>
        </div>
      </main>

      {/* Footer strip */}
      <footer className="px-6 py-4 border-t border-border text-center">
        <p className="text-xs text-muted-foreground">© 2026 KeiTruckNation. All rights reserved.</p>
      </footer>
    </div>
  );
}
