'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';
import { TRUCK_CATEGORIES } from '../inventory/data/categories';

// Precomputed once, at module load, on the server AND the client - identical
// every time, so there's nothing left for hydration to disagree about.
const SUN_RAYS = [0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg) => {
  const rad = (deg * Math.PI) / 180;
  return {
    deg,
    x2: Number((40 + 36 * Math.cos(rad)).toFixed(2)),
    y2: Number((40 + 36 * Math.sin(rad)).toFixed(2)),
  };
});

const HeroSection: React.FC = () => {
  const heroRef = useRef<HTMLElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [activeCategoryIndex, setActiveCategoryIndex] = useState(0);
  const rafRef = useRef<number | null>(null);

  const activeCategory = TRUCK_CATEGORIES[activeCategoryIndex];

  useEffect(() => {
    // Throttle to one update per animation frame instead of firing on every
    // single mousemove event - this is what was making the whole hero section
    // (and the page under it) re-render dozens of times a second, which shows
    // up as janky/heavy scrolling since the browser is busy repainting.
    const handleMouse = (e: MouseEvent) => {
      if (!heroRef.current) return;
      const rect = heroRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;

      if (rafRef.current !== null) return;
      rafRef.current = requestAnimationFrame(() => {
        setMousePos({ x, y });
        rafRef.current = null;
      });
    };
    const el = heroRef.current;
    el?.addEventListener('mousemove', handleMouse, { passive: true });
    return () => {
      el?.removeEventListener('mousemove', handleMouse);
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const stats = [
    { value: '200+', label: 'Trucks Sold' },
    { value: '7', label: 'Categories' },
    { value: '48', label: 'States Shipped' },
  ];

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex flex-col justify-center overflow-hidden pt-20"
    >
      {/* Layered backgrounds */}
      <div className="absolute inset-0 grid-lines-bg opacity-100" />
      <div className="absolute inset-0 hero-glow" />

      {/* Atmospheric blobs */}
      <div
        className="absolute top-1/4 left-1/4 w-96 h-96 blob-accent pointer-events-none will-change-transform"
        style={{ transform: `translate3d(${mousePos.x * -30}px, ${mousePos.y * -20}px, 0)` }}
      />
      <div
        className="absolute bottom-1/3 right-1/4 w-80 h-80 blob-primary pointer-events-none will-change-transform"
        style={{ transform: `translate3d(${mousePos.x * 20}px, ${mousePos.y * 15}px, 0)` }}
      />

      {/* Floating decorative blocks */}
      <div className="absolute top-[20%] right-[8%] size-16 bg-primary/10 border border-primary/20 rounded-2xl animate-float-a hidden md:block" />
      <div className="absolute top-[55%] left-[6%] size-12 bg-accent/10 border border-accent/20 rounded-xl animate-float-b hidden md:block" />
      <div className="absolute bottom-[25%] right-[12%] size-10 bg-muted border border-border rounded-lg animate-float-c hidden md:block" />

      {/* Rising sun decorative SVG */}
      <div className="absolute top-[18%] left-[8%] opacity-10 hidden lg:block animate-spin-slow">
        <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
          <circle cx="40" cy="40" r="16" fill="#E8FF3E" />
          {SUN_RAYS.map((ray) => (
            <line
              key={ray.deg}
              x1="40"
              y1="40"
              x2={ray.x2}
              y2={ray.y2}
              stroke="#E8FF3E"
              strokeWidth="2"
              strokeLinecap="round"
            />
          ))}
        </svg>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          {/* Left: Text Content */}
          <div className="flex flex-col gap-6 sm:gap-8">
            {/* Eyebrow */}
            <div className="flex items-center gap-3">
              <div className="size-2 bg-primary rounded-full animate-pulse-glow" />
              <span className="tag-pill bg-primary/10 text-primary border border-primary/20 inline-flex items-center gap-1.5">
                {/* eslint-disable-next-line @next/next/no-img-element -- small static UI icon */}
                <img
                  src="/assets/flags/jp.png"
                  alt=""
                  className="w-4 h-3 object-cover rounded-[2px]"
                />
                Imported Direct from Japan
              </span>
            </div>

            {/* Headline */}
            <h1 className="font-display text-hero-xl text-white">
              Japan&apos;s toughest
              <br />
              <span className="text-primary">mini trucks.</span>
              <br />
              America&apos;s
              <br />
              wildest rides.
            </h1>

            {/* Subheadline */}
            <p className="text-base sm:text-lg text-white/80 max-w-lg leading-relaxed font-medium">
              Street-legal, farm-ready, and built to last. Browse 7 categories of authentic Japanese
              kei trucks - flatbeds, dumps, vans, crew cabs, and specialty rigs shipped worldwide.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <Link
                href="/inventory"
                className="flex items-center justify-center gap-2 px-8 py-4 bg-primary text-primary-foreground font-black text-sm uppercase tracking-widest rounded-2xl hover:scale-105 transition-transform glow-lime min-h-[52px]"
              >
                Browse by Category
                <Icon name="ArrowRightIcon" size={18} />
              </Link>
              <Link
                href="/parts"
                className="flex items-center justify-center gap-2 px-8 py-4 bg-transparent border border-border text-foreground font-bold text-sm uppercase tracking-widest rounded-2xl hover:bg-muted hover:border-foreground/30 transition-all min-h-[52px]"
              >
                Shop Parts
              </Link>
            </div>

            {/* Stats Row */}
            <div className="flex gap-6 sm:gap-8 pt-2 border-t border-white/20">
              {stats.map((stat, i) => (
                <div key={i} className="flex flex-col gap-1">
                  <span className="font-display font-black text-2xl sm:text-3xl text-primary">
                    {stat.value}
                  </span>
                  <span className="text-xs font-bold uppercase tracking-widest text-white/70">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Category Switcher Visual */}
          <div className="relative flex flex-col gap-4 items-center">
            {/* Main truck image - changes with active category */}
            <div className="relative w-full max-w-lg aspect-[4/3] rounded-3xl overflow-hidden border border-border">
              <AppImage
                key={activeCategory.id}
                src={activeCategory.image}
                alt={activeCategory.imageAlt}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover transition-opacity duration-500"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />

              {/* Active category label */}
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                <div className="flex items-center gap-2 bg-card/90 backdrop-blur-sm border border-border rounded-2xl px-4 py-2">
                  <div className="size-2 bg-primary rounded-full" />
                  <span className="text-xs font-bold text-foreground">{activeCategory.label}</span>
                </div>
                <Link
                  href={`/inventory/${activeCategory.slug}`}
                  className="flex items-center gap-1.5 bg-primary/90 backdrop-blur-sm rounded-2xl px-3 py-2 text-xs font-bold text-primary-foreground hover:bg-primary transition-colors"
                >
                  View All
                  <Icon name="ArrowRightIcon" size={12} />
                </Link>
              </div>
            </div>

            {/* Category Selector Pills */}
            <div className="flex flex-wrap gap-2 justify-center w-full max-w-lg">
              {TRUCK_CATEGORIES.map((cat, i) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategoryIndex(i)}
                  className={`px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest transition-all min-h-[32px] ${
                    activeCategoryIndex === i
                      ? 'bg-primary text-primary-foreground scale-105'
                      : 'bg-card border border-border text-muted-foreground hover:text-foreground hover:border-primary/40'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Side stat card */}
            <div className="absolute -right-4 top-1/4 bg-card/90 backdrop-blur-md border border-border rounded-2xl p-4 hidden xl:flex flex-col gap-1 shadow-2xl">
              <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                Starting at
              </span>
              <span className="font-display font-black text-2xl text-primary">$4,500</span>
              <span className="text-xs text-muted-foreground">delivered to your door</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom scroll hint */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-60">
        <span className="text-xs font-bold uppercase tracking-widest text-white">Scroll</span>
        <Icon name="ChevronDoubleDownIcon" size={16} className="text-white animate-bounce" />
      </div>
    </section>
  );
};

export default HeroSection;