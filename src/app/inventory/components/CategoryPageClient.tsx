'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';
import { cartStore } from '@/lib/cartStore';
import { TruckCategory, TRUCK_CATEGORIES } from '../data/categories';

interface Props {
  category: TruckCategory;
}

export default function CategoryPageClient({ category }: Props) {
  const [activeDrivetrain, setActiveDrivetrain] = useState<string>('all');
  const [visible, setVisible] = useState(false);
  const [addedId, setAddedId] = useState<string | null>(null);
  const trucksRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.05 }
    );
    if (trucksRef.current) observer.observe(trucksRef.current);
    return () => observer.disconnect();
  }, []);

  const handleAddToCart = (truck: TruckCategory['trucks'][number]) => {
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
    setAddedId(truck.id);
    setTimeout(() => setAddedId((cur) => (cur === truck.id ? null : cur)), 2500);
  };

  const filteredTrucks = category.trucks.filter(
    (t) =>
      activeDrivetrain === 'all' ||
      t.drivetrain.toLowerCase().includes(activeDrivetrain.toLowerCase())
  );

  const otherCategories = TRUCK_CATEGORIES.filter((c) => c.id !== category.id).slice(0, 3);

  return (
    <div className="pt-24 sm:pt-28">
      {/* Hero Section - uses the SAME image as the category card */}
      <div className="relative min-h-[55vh] sm:min-h-[65vh] flex flex-col justify-end overflow-hidden">
        {/* Full-bleed hero image - same as category thumbnail */}
        <div className="absolute inset-0">
          <AppImage
            src={category.image}
            alt={category.imageAlt}
            fill
            sizes="100vw"
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-background/10" />
          <div className="absolute inset-0 bg-gradient-to-r from-background/60 to-transparent" />
        </div>

        {/* Floating decorative elements */}
        <div className="absolute top-8 right-8 size-14 bg-primary/10 border border-primary/20 rounded-2xl animate-float-a hidden md:block" />
        <div className="absolute top-1/3 right-1/4 size-10 bg-accent/10 border border-accent/20 rounded-xl animate-float-b hidden md:block" />

        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 pb-12 sm:pb-16 pt-20">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 mb-5 text-xs font-bold uppercase tracking-widest text-muted-foreground">
            <Link href="/" className="hover:text-primary transition-colors">
              Home
            </Link>
            <Icon name="ChevronRightIcon" size={12} />
            <Link href="/inventory" className="hover:text-primary transition-colors">
              Inventory
            </Link>
            <Icon name="ChevronRightIcon" size={12} />
            <span className="text-foreground">{category.label}</span>
          </div>

          {/* Badge */}
          {category.badge && (
            <div className="inline-flex items-center gap-2 mb-4">
              <span className="tag-pill bg-primary text-primary-foreground font-bold">
                {category.badge}
              </span>
            </div>
          )}

          <h1
            className="font-display font-bold text-foreground mb-4"
            style={{ fontSize: 'clamp(2.2rem, 5vw, 4rem)', lineHeight: 1.05 }}
          >
            {category.label}
            <br />
            <span className="text-primary">Kei Trucks</span>
          </h1>
          <p className="text-muted-foreground text-base sm:text-lg max-w-xl leading-relaxed mb-6">
            {category.description}
          </p>

          {/* Quick stats */}
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-2 bg-card/80 backdrop-blur-sm border border-border rounded-2xl px-4 py-2.5">
              <div className="size-2 bg-primary rounded-full" />
              <span className="text-xs font-bold text-foreground">
                {category.trucks.length} trucks in stock
              </span>
            </div>
            <div className="flex items-center gap-2 bg-card/80 backdrop-blur-sm border border-border rounded-2xl px-4 py-2.5">
              <Icon name="TruckIcon" size={14} className="text-primary" />
              <span className="text-xs font-bold text-foreground">
                From ${Math.min(...category.trucks.map((t) => t.price)).toLocaleString()}
              </span>
            </div>
            <div className="flex items-center gap-2 bg-card/80 backdrop-blur-sm border border-border rounded-2xl px-4 py-2.5">
              <Icon name="GlobeAltIcon" size={14} className="text-primary" />
              <span className="text-xs font-bold text-foreground">Ships Worldwide</span>
            </div>
          </div>
        </div>
      </div>

      {/* Drivetrain Filter */}
      <div className="sticky top-16 sm:top-20 z-30 bg-background/95 backdrop-blur-md border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center gap-3 flex-wrap">
          <span className="text-xs font-black uppercase tracking-widest text-muted-foreground">
            Filter:
          </span>
          {[
            { id: 'all', label: 'All Drivetrains' },
            { id: '2wd', label: '2WD' },
            { id: '4wd', label: '4WD' },
          ].map((d) => (
            <button
              key={d.id}
              onClick={() => setActiveDrivetrain(d.id)}
              className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest transition-all min-h-[32px] ${
                activeDrivetrain === d.id
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-muted-foreground hover:text-foreground border border-border'
              }`}
            >
              {d.label}
            </button>
          ))}
          <Link
            href="/inventory"
            className="ml-auto flex items-center gap-1.5 text-xs font-bold text-muted-foreground hover:text-primary transition-colors"
          >
            <Icon name="ArrowLeftIcon" size={12} />
            All Categories
          </Link>
        </div>
      </div>

      {/* Trucks Grid */}
      <div ref={trucksRef} className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        {filteredTrucks.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-muted-foreground font-bold mb-4">
              No trucks match this drivetrain filter.
            </p>
            <button
              onClick={() => setActiveDrivetrain('all')}
              className="px-5 py-2.5 bg-primary text-primary-foreground rounded-full text-xs font-bold uppercase tracking-widest hover:scale-105 transition-transform"
            >
              Show All
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {filteredTrucks.map((truck, index) => (
              <div
                key={truck.id}
                className={`bg-card border border-border rounded-3xl overflow-hidden card-hover transition-all duration-700 ${
                  visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
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
                  <div className="absolute top-3 right-3 tag-pill bg-black/60 backdrop-blur-sm text-white border border-white/10 text-xs font-bold">
                    {truck.drivetrain}
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 sm:p-6 flex flex-col gap-4">
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

                  <div className="flex items-center justify-between pt-2 border-t border-border">
                    <div>
                      <span className="font-display font-black text-2xl text-primary">
                        ${truck.price.toLocaleString()}
                      </span>
                      <span className="text-xs text-muted-foreground ml-1">+ shipping</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Link
                        href={`/trucks/${truck.id}`}
                        className="flex items-center gap-1.5 px-3 py-2.5 rounded-xl font-bold text-xs uppercase tracking-widest border border-border text-muted-foreground hover:text-foreground hover:bg-muted transition-all min-h-[44px]"
                      >
                        Details
                      </Link>
                      {addedId === truck.id ? (
                        <Link
                          href="/cart"
                          className="flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs uppercase tracking-widest bg-primary text-primary-foreground min-h-[44px]"
                        >
                          <Icon name="CheckIcon" size={14} />
                          Added - View Cart
                        </Link>
                      ) : (
                        <button
                          type="button"
                          onClick={() => handleAddToCart(truck)}
                          className="flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs uppercase tracking-widest bg-primary text-primary-foreground hover:scale-105 transition-transform min-h-[44px]"
                        >
                          <Icon name="ShoppingCartIcon" size={14} />
                          Add to Cart
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Other Categories */}
        <div className="mt-16 sm:mt-20 pt-12 border-t border-border">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="size-2 bg-primary rounded-full" />
              <h2 className="font-display font-bold text-2xl text-foreground">Other Categories</h2>
            </div>
            <Link
              href="/inventory"
              className="flex items-center gap-1.5 text-xs font-bold text-muted-foreground hover:text-primary transition-colors"
            >
              View All
              <Icon name="ArrowRightIcon" size={12} />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {otherCategories.map((cat) => (
              <Link
                key={cat.id}
                href={`/inventory/${cat.slug}`}
                className="group relative rounded-2xl overflow-hidden border border-border hover:border-primary/50 transition-all"
              >
                <div className="relative aspect-[16/9] overflow-hidden">
                  <AppImage
                    src={cat.image}
                    alt={cat.imageAlt}
                    fill
                    sizes="(max-width: 640px) 100vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                    <span className="font-display font-bold text-sm text-foreground">
                      {cat.label}
                    </span>
                    <Icon
                      name="ArrowRightIcon"
                      size={14}
                      className="text-primary group-hover:translate-x-1 transition-transform"
                    />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}