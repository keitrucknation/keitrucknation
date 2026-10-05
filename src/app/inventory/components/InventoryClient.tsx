'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';
import MappedIcon from '@/components/ui/MappedIcon';
import { TRUCK_CATEGORIES, MANUFACTURERS, DRIVETRAINS } from '../data/categories';

export default function InventoryClient() {
  const [activeDrivetrain, setActiveDrivetrain] = useState<string>('all');
  const [activeMake, setActiveMake] = useState<string>('all');
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.05 }
    );
    if (sectionRef?.current) observer?.observe(sectionRef?.current);
    return () => observer?.disconnect();
  }, []);

  const filteredCategories = TRUCK_CATEGORIES?.filter((cat) => {
    if (activeDrivetrain === 'all' && activeMake === 'all') return true;
    return cat?.trucks?.some((t) => {
      const driveMatch =
        activeDrivetrain === 'all' ||
        t?.drivetrain?.toLowerCase()?.includes(activeDrivetrain?.toLowerCase());
      const makeMatch =
        activeMake === 'all' || t?.make?.toLowerCase() === activeMake?.toLowerCase();
      return driveMatch && makeMatch;
    });
  });

  return (
    <div className="pt-24 sm:pt-28">
      {/* Page Header */}
      <div className="relative overflow-hidden border-b border-border py-14 sm:py-20">
        <div className="absolute inset-0 grid-lines-bg opacity-30" />
        <div className="absolute inset-0 hero-glow opacity-60" />
        <div className="absolute top-1/3 right-1/4 w-72 h-72 blob-primary pointer-events-none opacity-40" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center gap-2 mb-4">
            <div className="size-2 bg-primary rounded-full animate-pulse-glow" />
            <span className="tag-pill bg-primary/10 text-primary border border-primary/20 inline-flex items-center gap-1.5">
              {/* eslint-disable-next-line @next/next/no-img-element -- small static UI icon */}
              <img
                src="/assets/flags/ja.png"
                alt=""
                className="w-4 h-3 object-cover rounded-[2px]"
              />
              Direct Japan Imports
            </span>
          </div>
          <h1
            className="font-display font-bold text-foreground mb-4"
            style={{ fontSize: 'clamp(2.2rem, 5vw, 4rem)', lineHeight: 1.05 }}
          >
            Browse by <span className="text-primary">Category</span>
          </h1>
          <p className="text-muted-foreground text-base sm:text-lg max-w-2xl leading-relaxed">
            Every kei truck organized the way buyers actually search - by body style first, then
            drivetrain and manufacturer. Find your perfect rig in seconds.
          </p>
        </div>
      </div>
      {/* Filter Bar */}
      <div className="sticky top-16 sm:top-20 z-30 bg-background/95 backdrop-blur-md border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex flex-wrap gap-3 items-center">
          {/* Drivetrain Filter */}
          <div className="flex items-center gap-1.5">
            <span className="text-xs font-black uppercase tracking-widest text-muted-foreground mr-1">
              Drive:
            </span>
            {[{ id: 'all', label: 'All' }, ...DRIVETRAINS]?.map((d) => (
              <button
                key={d?.id}
                onClick={() => setActiveDrivetrain(d?.id)}
                className={`px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest transition-all min-h-[32px] ${
                  activeDrivetrain === d?.id
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-muted-foreground hover:text-foreground border border-border'
                }`}
              >
                {d?.label}
              </button>
            ))}
          </div>

          <div className="w-px h-5 bg-border hidden sm:block" />

          {/* Make Filter */}
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-xs font-black uppercase tracking-widest text-muted-foreground mr-1">
              Make:
            </span>
            <button
              onClick={() => setActiveMake('all')}
              className={`px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest transition-all min-h-[32px] ${
                activeMake === 'all'
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-muted-foreground hover:text-foreground border border-border'
              }`}
            >
              All
            </button>
            {MANUFACTURERS?.map((m) => (
              <button
                key={m?.id}
                onClick={() => setActiveMake(m?.id)}
                className={`px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest transition-all min-h-[32px] ${
                  activeMake === m?.id
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-muted-foreground hover:text-foreground border border-border'
                }`}
              >
                <span
                  className="inline-block size-2 rounded-full mr-1.5"
                  style={{ backgroundColor: m?.color }}
                  aria-hidden="true"
                />
                {m?.label?.split(' ')?.[1]}
              </button>
            ))}
          </div>
        </div>
      </div>
      {/* Categories Grid */}
      <div ref={sectionRef} className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        {filteredCategories?.length === 0 ? (
          <div className="text-center py-24 flex flex-col items-center gap-4">
            <div className="size-16 bg-muted rounded-full flex items-center justify-center">
              <Icon name="MagnifyingGlassIcon" size={28} className="text-muted-foreground/40" />
            </div>
            <p className="text-muted-foreground font-bold">No categories match your filters.</p>
            <button
              onClick={() => {
                setActiveDrivetrain('all');
                setActiveMake('all');
              }}
              className="px-5 py-2.5 bg-primary text-primary-foreground rounded-full text-xs font-bold uppercase tracking-widest hover:scale-105 transition-transform"
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {filteredCategories?.map((cat, index) => (
              <Link
                key={cat?.id}
                href={`/inventory/${cat?.slug}`}
                className={`group relative bg-card border border-border rounded-3xl overflow-hidden card-hover transition-all duration-700 ${
                  visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                } ${cat?.id === 'specialty' ? 'sm:col-span-2 lg:col-span-1' : ''}`}
                style={{ transitionDelay: `${index * 80}ms` }}
              >
                {/* Category Image */}
                <div className="relative aspect-[16/10] overflow-hidden">
                  <AppImage
                    src={cat?.image}
                    alt={cat?.imageAlt}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-card/80 via-card/20 to-transparent" />

                  {/* Badge */}
                  {cat?.badge && (
                    <div className="absolute top-3 left-3 tag-pill bg-primary text-primary-foreground font-bold text-xs">
                      {cat?.badge}
                    </div>
                  )}

                  {/* Truck count */}
                  <div className="absolute top-3 right-3 tag-pill bg-black/60 backdrop-blur-sm text-white border border-white/10 text-xs font-bold">
                    {cat?.trucks?.length} trucks
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 sm:p-6 flex flex-col gap-3">
                  <div>
                    <h2 className="font-display font-bold text-xl text-foreground group-hover:text-primary transition-colors">
                      {cat?.label}
                    </h2>
                    <p className="text-sm text-muted-foreground mt-1.5 leading-relaxed line-clamp-2">
                      {cat?.description}
                    </p>
                  </div>

                  {/* Makes available */}
                  <div className="flex flex-wrap gap-1.5">
                    {Array.from(new Set(cat.trucks.map((t) => t.make)))?.map((make) => (
                      <span
                        key={make}
                        className="text-xs px-2.5 py-1 bg-muted rounded-full text-muted-foreground border border-border"
                      >
                        {make}
                      </span>
                    ))}
                  </div>

                  {/* Price range + CTA */}
                  <div className="flex items-center justify-between pt-2 border-t border-border">
                    <div>
                      <span className="text-xs text-muted-foreground">From </span>
                      <span className="font-display font-black text-xl text-primary">
                        {(() => {
                          const prices = (cat?.trucks ?? []).map((t) => t?.price ?? 0);
                          return prices.length > 0
                            ? `$${Math.min(...prices).toLocaleString()}`
                            : ' - ';
                        })()}
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs font-bold text-primary group-hover:gap-2.5 transition-all">
                      Browse Category
                      <Icon
                        name="ArrowRightIcon"
                        size={14}
                        className="group-hover:translate-x-1 transition-transform"
                      />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* Manufacturer Spotlight */}
        <div className="mt-16 sm:mt-20">
          <div className="flex items-center gap-3 mb-8">
            <div className="size-2 bg-primary rounded-full" />
            <h2 className="font-display font-bold text-2xl text-foreground">
              Browse by Manufacturer
            </h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
            {MANUFACTURERS?.map((m) => (
              <Link
                key={m?.id}
                href={`/inventory?make=${m?.id}`}
                className="flex flex-col items-center gap-3 p-5 bg-card border border-border rounded-2xl hover:border-primary/50 hover:bg-primary/5 transition-all group"
              >
                <span className="size-14 rounded-full flex-shrink-0 bg-white flex items-center justify-center p-2.5">
                  <MappedIcon icon={m?.id ?? ''} size={36} color="none" />
                </span>
                <span className="text-xs font-black uppercase tracking-widest text-foreground group-hover:text-primary transition-colors text-center">
                  {m?.label}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
