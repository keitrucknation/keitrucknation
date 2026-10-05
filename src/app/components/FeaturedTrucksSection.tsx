'use client';

import React, { useRef, useEffect, useState } from 'react';
import Link from 'next/link';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';
import { INVENTORY, InventoryTruck } from '@/lib/inventory';
import { cartStore } from '@/lib/cartStore';
import { useLanguage } from '@/components/LanguageSelector';

function conditionLabel(truck: InventoryTruck): string {
  return (
    truck.detailSpecs.find((s) => s.label === 'Condition')?.value ??
    (truck.inStock ? 'In Stock' : 'Sold')
  );
}

// Curated picks for the homepage - one per notable badge, falls back to first 3 in stock.
const FEATURED_SLUGS = ['carry-dump-4wd', 'hijet-jumbo-4wd', 'sambar-tc-awd'];
const trucks: InventoryTruck[] =
  FEATURED_SLUGS.map((slug) => INVENTORY.find((t) => t.slug === slug)).filter(
    (t): t is InventoryTruck => Boolean(t)
  ).length === FEATURED_SLUGS.length
    ? (FEATURED_SLUGS.map((slug) => INVENTORY.find((t) => t.slug === slug)) as InventoryTruck[])
    : INVENTORY.filter((t) => t.inStock).slice(0, 3);

const FeaturedTrucksSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const [addedToCart, setAddedToCart] = useState<string | null>(null);
  const { t } = useLanguage();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const handleAddToCart = (truck: InventoryTruck) => {
    cartStore.addItem({
      id: truck.id,
      name: truck.name,
      subtitle: `${truck.year} ${truck.make}`,
      price: truck.price,
      image: truck.image,
      imageAlt: truck.imageAlt,
      specs: truck.specs,
      category: 'truck',
    });
    setAddedToCart(truck.id);
    setTimeout(() => setAddedToCart(null), 2000);
  };

  return (
    <section ref={sectionRef} className="py-16 sm:py-24 bg-secondary/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div
          className={`flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 sm:mb-14 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="size-2 bg-primary rounded-full" />
              <span className="tag-pill bg-primary/10 text-primary border border-primary/20">
                Fresh Imports
              </span>
            </div>
            <h2 className="font-display text-section-xl text-foreground">Featured trucks</h2>
          </div>
          <Link
            href="/products"
            className="flex items-center gap-2 text-sm font-bold text-muted-foreground hover:text-primary transition-colors group"
          >
            View all inventory
            <Icon
              name="ArrowRightIcon"
              size={16}
              className="group-hover:translate-x-1 transition-transform"
            />
          </Link>
        </div>

        {/* Trucks Grid - 3 equal columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {trucks.map((truck, index) => (
            <div
              key={truck.id}
              className={`bg-card border border-border rounded-3xl overflow-hidden card-hover transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
              style={{ transitionDelay: `${index * 120}ms` }}
            >
              {/* Image */}
              <div className="relative aspect-[16/10] overflow-hidden">
                <AppImage
                  src={truck.image}
                  alt={truck.imageAlt}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover hover:scale-105 transition-transform duration-500"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-card/60 to-transparent" />

                {/* Badge */}
                {truck.badge && (
                  <div
                    className={`absolute top-3 left-3 tag-pill ${truck.badgeColor === 'accent' ? 'bg-accent text-white' : 'bg-primary text-primary-foreground'}`}
                  >
                    {truck.badge}
                  </div>
                )}

                {/* Condition */}
                <div className="absolute top-3 right-3 tag-pill bg-black/60 backdrop-blur-sm text-white border border-white/10">
                  {conditionLabel(truck)}
                </div>

                {/* Compare Badge */}
                <Link
                  href="/compare"
                  className="absolute bottom-3 right-3 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/70 backdrop-blur-sm border border-white/20 text-white text-xs font-bold uppercase tracking-wider hover:bg-primary hover:border-primary transition-all duration-200"
                  title="Compare this truck"
                >
                  <Icon name="ArrowsRightLeftIcon" size={12} />
                  Compare
                </Link>
              </div>

              {/* Content */}
              <div className="p-5 sm:p-6 flex flex-col gap-4">
                {/* Title */}
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                      {truck.year} {truck.make}
                    </span>
                    <span className="text-muted-foreground/40">·</span>
                    <span className="text-xs text-muted-foreground">{truck.mileage}</span>
                  </div>
                  <h3 className="font-display font-bold text-xl text-foreground">{truck.name}</h3>
                </div>

                {/* Specs chips */}
                <div className="flex flex-wrap gap-1.5">
                  {truck.specs.map((spec) => (
                    <span
                      key={spec}
                      className="text-xs px-2.5 py-1 bg-muted rounded-full text-muted-foreground border border-border"
                    >
                      {spec}
                    </span>
                  ))}
                </div>

                {/* Price + CTA */}
                <div className="flex items-center justify-between pt-2 border-t border-border">
                  <div>
                    <span className="font-display font-black text-2xl text-primary">
                      ${truck.price.toLocaleString()}
                    </span>
                    <span className="text-xs text-muted-foreground ml-1">+ shipping</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Link
                      href={`/trucks/${truck.slug}`}
                      className="flex items-center gap-1.5 px-3 py-2.5 rounded-xl font-bold text-xs uppercase tracking-widest border border-border text-muted-foreground hover:text-foreground hover:bg-muted transition-all min-h-[44px]"
                    >
                      {t.actions.viewDetails}
                    </Link>
                    <button
                      onClick={() => handleAddToCart(truck)}
                      className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs uppercase tracking-widest transition-all min-h-[44px] ${
                        addedToCart === truck.id
                          ? 'bg-green-500 text-white scale-95'
                          : 'bg-primary text-primary-foreground hover:scale-105 hover:glow-lime'
                      }`}
                    >
                      {addedToCart === truck.id ? (
                        <>
                          <Icon name="CheckIcon" size={14} />
                          Added!
                        </>
                      ) : (
                        <>
                          <Icon name="ShoppingCartIcon" size={14} />
                          {t.actions.addToCart}
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedTrucksSection;
