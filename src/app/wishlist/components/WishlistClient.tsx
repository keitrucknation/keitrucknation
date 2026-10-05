'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';
import { wishlistStore, WishlistItem } from '@/lib/wishlistStore';

export default function WishlistClient() {
  const [items, setItems] = useState<WishlistItem[]>([]);
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const [removingId, setRemovingId] = useState<string | null>(null);

  // Load from localStorage on mount and subscribe to changes
  useEffect(() => {
    setItems(wishlistStore.getItems());
    const unsub = wishlistStore.subscribe(() => setItems(wishlistStore.getItems()));
    return unsub;
  }, []);

  const removeItem = (id: string) => {
    setRemovingId(id);
    setTimeout(() => {
      wishlistStore.removeItem(id);
      setRemovingId(null);
    }, 350);
  };

  const trucks = items.filter((i) => i.category === 'truck');
  const parts = items.filter((i) => i.category === 'part');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="tag-pill bg-primary/10 text-primary border border-primary/20">
              <Icon name="HeartIcon" size={10} variant="solid" />
              Saved Items
            </span>
          </div>
          <h1 className="font-display text-section-xl text-foreground">Your Wishlist</h1>
          <p className="text-muted-foreground mt-2 text-sm">
            {items.length} item{items.length !== 1 ? 's' : ''} saved - trucks and parts you&apos;re
            eyeing
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setView('grid')}
            className={`size-9 flex items-center justify-center rounded-lg border transition-all ${view === 'grid' ? 'bg-primary text-primary-foreground border-primary' : 'border-border text-muted-foreground hover:text-foreground'}`}
            aria-label="Grid view"
          >
            <Icon name="Squares2X2Icon" size={16} />
          </button>
          <button
            onClick={() => setView('list')}
            className={`size-9 flex items-center justify-center rounded-lg border transition-all ${view === 'list' ? 'bg-primary text-primary-foreground border-primary' : 'border-border text-muted-foreground hover:text-foreground'}`}
            aria-label="List view"
          >
            <Icon name="ListBulletIcon" size={16} />
          </button>
        </div>
      </div>

      {items.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-32 text-center">
          <div className="size-20 rounded-full bg-muted flex items-center justify-center mb-6">
            <Icon name="HeartIcon" size={36} className="text-muted-foreground" />
          </div>
          <h2 className="font-display text-2xl text-foreground mb-2">Nothing saved yet</h2>
          <p className="text-muted-foreground text-sm mb-8 max-w-xs">
            Browse trucks and parts, then tap the heart icon to save them here for later.
          </p>
          <Link
            href="/products"
            className="px-6 py-3 bg-primary text-primary-foreground rounded-full font-bold text-sm uppercase tracking-widest hover:scale-105 transition-transform"
          >
            Browse Inventory
          </Link>
        </div>
      ) : (
        <div className="space-y-12">
          {/* Trucks Section */}
          {trucks.length > 0 && (
            <section>
              <h2 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-5 flex items-center gap-2">
                <Icon name="TruckIcon" size={14} />
                Trucks ({trucks.length})
              </h2>
              <div
                className={
                  view === 'grid'
                    ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5'
                    : 'flex flex-col gap-4'
                }
              >
                {trucks.map((item) => (
                  <WishlistCard
                    key={item.id}
                    item={item}
                    view={view}
                    onRemove={removeItem}
                    removing={removingId === item.id}
                  />
                ))}
              </div>
            </section>
          )}

          {/* Parts Section */}
          {parts.length > 0 && (
            <section>
              <h2 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-5 flex items-center gap-2">
                <Icon name="WrenchScrewdriverIcon" size={14} />
                Parts & Accessories ({parts.length})
              </h2>
              <div
                className={
                  view === 'grid'
                    ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5'
                    : 'flex flex-col gap-4'
                }
              >
                {parts.map((item) => (
                  <WishlistCard
                    key={item.id}
                    item={item}
                    view={view}
                    onRemove={removeItem}
                    removing={removingId === item.id}
                  />
                ))}
              </div>
            </section>
          )}

          {/* CTA Strip */}
          <div className="mt-8 p-6 rounded-2xl bg-secondary border border-border flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <p className="font-bold text-foreground text-sm">Ready to move forward?</p>
              <p className="text-muted-foreground text-xs mt-0.5">
                Get a quote on any truck or add parts to your cart.
              </p>
            </div>
            <div className="flex gap-3">
              <Link
                href="/contact"
                className="px-5 py-2.5 border border-border text-foreground rounded-full font-bold text-xs uppercase tracking-widest hover:bg-muted transition-colors"
              >
                Get a Quote
              </Link>
              <Link
                href="/products"
                className="px-5 py-2.5 bg-primary text-primary-foreground rounded-full font-bold text-xs uppercase tracking-widest hover:scale-105 transition-transform"
              >
                Browse More
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

interface WishlistCardProps {
  item: WishlistItem;
  view: 'grid' | 'list';
  onRemove: (id: string) => void;
  removing: boolean;
}

function WishlistCard({ item, view, onRemove, removing }: WishlistCardProps) {
  const isTruck = item.category === 'truck';

  if (view === 'list') {
    return (
      <div
        className={`flex items-center gap-4 p-4 rounded-2xl bg-card border border-border transition-all duration-350 ${removing ? 'opacity-0 scale-95' : 'opacity-100'}`}
      >
        <div className="w-24 h-16 rounded-xl overflow-hidden flex-shrink-0 bg-muted">
          <AppImage src={item.image} alt={item.imageAlt} className="w-full h-full object-cover" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-xs text-muted-foreground mb-0.5">
            {item.year ? `${item.year} ${item.make}` : item.partCategory}
          </p>
          <p className="font-bold text-foreground text-sm truncate">{item.name}</p>
          {item.specs && (
            <div className="flex flex-wrap gap-1 mt-1">
              {item.specs.slice(0, 3).map((s) => (
                <span
                  key={s}
                  className="text-[10px] px-2 py-0.5 rounded-full bg-muted text-muted-foreground"
                >
                  {s}
                </span>
              ))}
            </div>
          )}
        </div>
        <div className="flex items-center gap-3 flex-shrink-0">
          <span className="font-display font-bold text-lg text-primary">
            ${item.price.toLocaleString()}
          </span>
          <Link
            href={isTruck ? `/trucks/${item.id}` : '/parts'}
            className="px-4 py-2 bg-primary text-primary-foreground rounded-full font-bold text-xs uppercase tracking-widest hover:scale-105 transition-transform"
          >
            View
          </Link>
          <button
            onClick={() => onRemove(item.id)}
            className="size-8 flex items-center justify-center rounded-full border border-border text-muted-foreground hover:text-accent hover:border-accent transition-colors"
            aria-label="Remove from wishlist"
          >
            <Icon name="TrashIcon" size={14} />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`group relative rounded-2xl bg-card border border-border overflow-hidden card-hover transition-all duration-350 ${removing ? 'opacity-0 scale-95' : 'opacity-100'}`}
    >
      {/* Remove button */}
      <button
        onClick={() => onRemove(item.id)}
        className="absolute top-3 right-3 z-10 size-8 flex items-center justify-center rounded-full bg-background/80 backdrop-blur-sm border border-border text-muted-foreground hover:text-accent hover:border-accent transition-all opacity-0 group-hover:opacity-100"
        aria-label="Remove from wishlist"
      >
        <Icon name="HeartIcon" size={14} variant="solid" className="text-accent" />
      </button>

      {item.badge && (
        <div className="absolute top-3 left-3 z-10">
          <span className="tag-pill bg-primary text-primary-foreground">{item.badge}</span>
        </div>
      )}

      <div className={`${isTruck ? 'h-44' : 'h-36'} bg-muted overflow-hidden`}>
        <AppImage
          src={item.image}
          alt={item.imageAlt}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>

      <div className="p-4">
        <p className="text-xs text-muted-foreground mb-1">
          {item.year ? `${item.year} ${item.make}` : item.partCategory}
        </p>
        <h3 className="font-bold text-foreground text-sm mb-2 leading-tight">{item.name}</h3>

        {item.specs && (
          <div className="flex flex-wrap gap-1 mb-3">
            {item.specs.slice(0, 3).map((s) => (
              <span
                key={s}
                className="text-[10px] px-2 py-0.5 rounded-full bg-muted text-muted-foreground"
              >
                {s}
              </span>
            ))}
          </div>
        )}

        {item.inStock !== undefined && (
          <p className="text-xs text-muted-foreground mb-3">
            <span className="text-primary font-bold">{item.inStock}</span> in stock
          </p>
        )}

        <div className="flex items-center justify-between">
          <span className="font-display font-bold text-xl text-primary">
            ${item.price.toLocaleString()}
          </span>
          <Link
            href={isTruck ? `/trucks/${item.id}` : '/parts'}
            className="px-4 py-2 bg-primary text-primary-foreground rounded-full font-bold text-xs uppercase tracking-widest hover:scale-105 transition-transform"
          >
            {isTruck ? 'Details' : 'Buy Now'}
          </Link>
        </div>
      </div>
    </div>
  );
}
