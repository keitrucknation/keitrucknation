'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';

interface Part {
  id: string;
  name: string;
  category: string;
  compatibility: string[];
  price: number;
  originalPrice?: number;
  image: string;
  imageAlt: string;
  inStock: number;
  badge?: string;
  sku: string;
  description: string;
  tags: string[];
}

const parts: Part[] = [
  {
    id: 'pt-001',
    name: 'OEM Timing Belt Kit, Carry/Hijet',
    category: 'Engine & Drivetrain',
    compatibility: ['Suzuki Carry', 'Daihatsu Hijet'],
    price: 89,
    image: 'https://img.rocket.new/generatedImages/rocket_gen_img_1896324a3-1771350065148.png',
    imageAlt: 'Automotive timing belt and tensioner kit on dark workshop surface',
    inStock: 14,
    sku: 'ENG-TB-001',
    description:
      'Complete OEM-spec timing belt kit including belt, tensioner, and idler pulley. Fits F6A and K6A engines.',
    tags: ['engine', 'maintenance', 'oem'],
  },
  {
    id: 'pt-002',
    name: 'Front CV Axle, Daihatsu Hijet 4WD',
    category: 'Engine & Drivetrain',
    compatibility: ['Daihatsu Hijet'],
    price: 145,
    image: 'https://images.unsplash.com/photo-1720236178658-ef1edfa8ac68',
    imageAlt: 'CV axle shaft for Japanese mini truck on white background',
    inStock: 6,
    sku: 'DRV-CV-002',
    description:
      'Remanufactured front CV axle for Hijet S80/S81/S82/S83 4WD models. Includes new boots and grease.',
    tags: ['drivetrain', '4wd'],
  },
  {
    id: 'pt-003',
    name: 'LED Work Light Bar, 12" Flood',
    category: 'Lighting & Electrical',
    compatibility: ['Universal'],
    price: 64,
    originalPrice: 89,
    image: 'https://img.rocket.new/generatedImages/rocket_gen_img_1ad9bf2b5-1772078562516.png',
    imageAlt: 'LED light bar mounted on kei truck roof, illuminating dark field',
    inStock: 22,
    badge: 'Sale',
    sku: 'LGT-LED-003',
    description:
      '3,600 lumen 12" LED flood bar. Waterproof IP67, 10–30V DC. Includes mounting brackets and wiring harness.',
    tags: ['lighting', 'accessories', 'electrical'],
  },
  {
    id: 'pt-004',
    name: 'Bed Liner, Spray-On Kit (Carry/Acty)',
    category: 'Bed & Body',
    compatibility: ['Suzuki Carry', 'Honda Acty'],
    price: 78,
    image: 'https://img.rocket.new/generatedImages/rocket_gen_img_16f27c114-1769326960905.png',
    imageAlt: 'Spray-on bed liner kit with applicator for mini truck bed',
    inStock: 18,
    sku: 'BDY-BL-004',
    description:
      'Rubberized spray-on bed liner kit. Covers full bed floor and side walls. UV-resistant, non-slip texture.',
    tags: ['bed', 'protection', 'accessories'],
  },
  {
    id: 'pt-005',
    name: 'Clutch Kit, Suzuki Carry F6A',
    category: 'Engine & Drivetrain',
    compatibility: ['Suzuki Carry'],
    price: 129,
    image: 'https://img.rocket.new/generatedImages/rocket_gen_img_1bb319e2e-1764745560506.png',
    imageAlt: 'Complete clutch kit with pressure plate and disc for Suzuki Carry',
    inStock: 9,
    sku: 'ENG-CL-005',
    description:
      'Complete clutch kit: pressure plate, disc, and release bearing. Fits all Carry models with F6A engine 1991–1998.',
    tags: ['engine', 'drivetrain', 'maintenance'],
  },
  {
    id: 'pt-006',
    name: 'Lift Kit, 2" Suspension Lift',
    category: 'Suspension & Steering',
    compatibility: ['Suzuki Carry', 'Daihatsu Hijet', 'Honda Acty'],
    price: 215,
    image: 'https://img.rocket.new/generatedImages/rocket_gen_img_1df541218-1783556846629.png',
    imageAlt: 'Suspension lift kit components for kei truck on workshop floor',
    inStock: 7,
    badge: 'Popular',
    sku: 'SUS-LK-006',
    description:
      '2" suspension lift kit with extended shocks, spacers, and all hardware. Allows 23" tires. Bolt-on installation.',
    tags: ['suspension', 'offroad', 'lift'],
  },
  {
    id: 'pt-007',
    name: 'Rear Differential Oil Seal Kit',
    category: 'Engine & Drivetrain',
    compatibility: ['Universal'],
    price: 34,
    image: 'https://img.rocket.new/generatedImages/rocket_gen_img_1109c9128-1780608208220.png',
    imageAlt: 'Differential oil seal kit in packaging on workshop bench',
    inStock: 31,
    sku: 'DRV-OS-007',
    description:
      'Complete rear differential seal kit. Includes pinion seal, axle seals, and gaskets. Fits most kei truck differentials.',
    tags: ['drivetrain', 'maintenance', 'seals'],
  },
  {
    id: 'pt-008',
    name: 'Snorkel Kit, Off-Road Water Crossing',
    category: 'Bed & Body',
    compatibility: ['Suzuki Carry', 'Daihatsu Hijet'],
    price: 189,
    image: 'https://img.rocket.new/generatedImages/rocket_gen_img_116393008-1772067332061.png',
    imageAlt: 'Snorkel kit installed on kei truck for water crossing capability',
    inStock: 4,
    badge: 'New',
    sku: 'BDY-SK-008',
    description:
      'Relocates air intake to roof height for water crossings up to 24". Powder-coated steel. Includes all mounting hardware.',
    tags: ['offroad', 'accessories', 'body'],
  },
  {
    id: 'pt-009',
    name: 'Brake Pad Set, Front (All Models)',
    category: 'Brakes',
    compatibility: ['Universal'],
    price: 42,
    image: 'https://img.rocket.new/generatedImages/rocket_gen_img_1ab7770f6-1772752488348.png',
    imageAlt: 'Front brake pad set for Japanese mini trucks in packaging',
    inStock: 45,
    sku: 'BRK-FP-009',
    description:
      'OEM-equivalent front brake pads. Fits Carry, Hijet, Acty, Sambar, and Minicab. Semi-metallic compound.',
    tags: ['brakes', 'maintenance', 'safety'],
  },
  {
    id: 'pt-010',
    name: 'Winch Mount, Front Bumper (Universal)',
    category: 'Bed & Body',
    compatibility: ['Universal'],
    price: 165,
    image: 'https://img.rocket.new/generatedImages/rocket_gen_img_1ac6616ac-1776153502823.png',
    imageAlt: 'Steel winch mount plate for kei truck front bumper',
    inStock: 11,
    sku: 'BDY-WM-010',
    description:
      'Heavy-duty steel winch mount plate. Fits 8,000–12,000 lb winches. Bolts to existing bumper mounting points.',
    tags: ['offroad', 'accessories', 'recovery'],
  },
  {
    id: 'pt-011',
    name: 'Air Filter, K&N Style High-Flow',
    category: 'Engine & Drivetrain',
    compatibility: ['Universal'],
    price: 38,
    image: 'https://img.rocket.new/generatedImages/rocket_gen_img_10a48e565-1775689404074.png',
    imageAlt: 'High-flow air filter for kei truck engine on white background',
    inStock: 28,
    sku: 'ENG-AF-011',
    description:
      'Washable and reusable high-flow air filter. Improves throttle response on 660cc engines. Universal fit with adapter rings.',
    tags: ['engine', 'performance', 'maintenance'],
  },
  {
    id: 'pt-012',
    name: 'Dump Bed Hydraulic Cylinder Rebuild Kit',
    category: 'Bed & Body',
    compatibility: ['Suzuki Carry', 'Daihatsu Hijet'],
    price: 55,
    image: 'https://img.rocket.new/generatedImages/rocket_gen_img_1087ba555-1772567366824.png',
    imageAlt: 'Hydraulic cylinder rebuild kit with seals and O-rings for dump bed',
    inStock: 16,
    sku: 'BDY-HY-012',
    description:
      'Complete rebuild kit for dump bed hydraulic cylinder. Includes all seals, O-rings, and backup rings.',
    tags: ['hydraulics', 'dump', 'maintenance'],
  },
];

const allCategories = ['All', ...Array.from(new Set(parts.map((p) => p.category)))];
const allCompatibility = [
  'All Makes',
  ...Array.from(new Set(parts.flatMap((p) => p.compatibility).filter((c) => c !== 'Universal'))),
];

export default function PartsClient() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [activeMake, setActiveMake] = useState('All Makes');
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState<'price-asc' | 'price-desc' | 'stock'>('price-asc');
  const [cart, setCart] = useState<Record<string, number>>({});
  const [addedId, setAddedId] = useState<string | null>(null);

  const filtered = useMemo(() => {
    let result = parts;
    if (activeCategory !== 'All') result = result.filter((p) => p.category === activeCategory);
    if (activeMake !== 'All Makes')
      result = result.filter(
        (p) => p.compatibility.includes(activeMake) || p.compatibility.includes('Universal')
      );
    if (search)
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(search.toLowerCase()) ||
          p.description.toLowerCase().includes(search.toLowerCase()) ||
          p.tags.some((t) => t.includes(search.toLowerCase()))
      );
    if (sortBy === 'price-asc') result = [...result].sort((a, b) => a.price - b.price);
    if (sortBy === 'price-desc') result = [...result].sort((a, b) => b.price - a.price);
    if (sortBy === 'stock') result = [...result].sort((a, b) => b.inStock - a.inStock);
    return result;
  }, [activeCategory, activeMake, search, sortBy]);

  const addToCart = (id: string) => {
    setCart((prev) => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
    setAddedId(id);
    setTimeout(() => setAddedId(null), 1500);
  };

  const cartCount = Object.values(cart).reduce((a, b) => a + b, 0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
        <div>
          <span className="tag-pill bg-accent/10 text-accent border border-accent/20 mb-3 inline-flex">
            <Icon name="WrenchScrewdriverIcon" size={10} />
            Parts Catalog
          </span>
          <h1 className="font-display text-section-xl text-foreground">Parts & Accessories</h1>
          <p className="text-muted-foreground mt-2 text-sm">
            OEM and aftermarket parts for Suzuki Carry, Daihatsu Hijet, Honda Acty, Subaru Sambar,
            and more.
          </p>
        </div>
        {cartCount > 0 && (
          <Link
            href="/cart"
            className="flex items-center gap-2 px-5 py-3 bg-primary text-primary-foreground rounded-full font-bold text-sm uppercase tracking-widest hover:scale-105 transition-transform flex-shrink-0"
          >
            <Icon name="ShoppingCartIcon" size={16} variant="solid" />
            Cart ({cartCount})
          </Link>
        )}
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-4 mb-8">
        {/* Search */}
        <div className="relative">
          <Icon
            name="MagnifyingGlassIcon"
            size={16}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground"
          />
          <input
            type="text"
            placeholder="Search parts by name, description, or tag..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-secondary border border-border rounded-xl text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
          />
        </div>

        <div className="flex flex-wrap gap-3 items-center">
          {/* Category Filter */}
          <div className="flex flex-wrap gap-2">
            {allCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all min-h-[36px] ${
                  activeCategory === cat
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-secondary border border-border text-muted-foreground hover:text-foreground'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="ml-auto flex items-center gap-2">
            {/* Make Filter */}
            <select
              value={activeMake}
              onChange={(e) => setActiveMake(e.target.value)}
              className="px-3 py-2 bg-secondary border border-border rounded-xl text-xs text-foreground focus:outline-none focus:border-primary min-h-[36px]"
            >
              {allCompatibility.map((m) => (
                <option key={m} value={m}>
                  {m}
                </option>
              ))}
            </select>

            {/* Sort */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
              className="px-3 py-2 bg-secondary border border-border rounded-xl text-xs text-foreground focus:outline-none focus:border-primary min-h-[36px]"
            >
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="stock">In Stock First</option>
            </select>
          </div>
        </div>
      </div>

      {/* Results count */}
      <p className="text-xs text-muted-foreground mb-6">
        Showing <span className="text-foreground font-bold">{filtered.length}</span> of{' '}
        {parts.length} parts
      </p>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <Icon name="MagnifyingGlassIcon" size={36} className="text-muted-foreground mb-4" />
          <p className="font-bold text-foreground mb-1">No parts found</p>
          <p className="text-muted-foreground text-sm">
            Try adjusting your filters or search term.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filtered.map((part) => (
            <div
              key={part.id}
              className="group relative rounded-2xl bg-card border border-border overflow-hidden card-hover flex flex-col"
            >
              {part.badge && (
                <div className="absolute top-3 left-3 z-10">
                  <span
                    className={`tag-pill ${part.badge === 'Sale' ? 'bg-accent text-accent-foreground' : 'bg-primary text-primary-foreground'}`}
                  >
                    {part.badge}
                  </span>
                </div>
              )}

              <div className="h-40 bg-muted overflow-hidden">
                <AppImage
                  src={part.image}
                  alt={part.imageAlt}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              <div className="p-4 flex flex-col flex-1">
                <div className="flex items-start justify-between gap-2 mb-1">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                    {part.category}
                  </span>
                  <span
                    className={`text-[10px] font-bold ${part.inStock > 10 ? 'text-primary' : part.inStock > 0 ? 'text-accent' : 'text-muted-foreground'}`}
                  >
                    {part.inStock > 0 ? `${part.inStock} in stock` : 'Out of stock'}
                  </span>
                </div>

                <h3 className="font-bold text-foreground text-sm mb-1.5 leading-snug">
                  {part.name}
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed mb-3 flex-1">
                  {part.description}
                </p>

                {/* Compatibility */}
                <div className="flex flex-wrap gap-1 mb-3">
                  {part.compatibility.slice(0, 2).map((c) => (
                    <span
                      key={c}
                      className="text-[10px] px-2 py-0.5 rounded-full bg-muted text-muted-foreground"
                    >
                      {c}
                    </span>
                  ))}
                  {part.compatibility.length > 2 && (
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-muted text-muted-foreground">
                      +{part.compatibility.length - 2}
                    </span>
                  )}
                </div>

                <div className="flex items-center justify-between mt-auto">
                  <div>
                    <span className="font-display font-bold text-xl text-primary">
                      ${part.price}
                    </span>
                    {part.originalPrice && (
                      <span className="text-xs text-muted-foreground line-through ml-2">
                        ${part.originalPrice}
                      </span>
                    )}
                  </div>
                  <button
                    onClick={() => addToCart(part.id)}
                    disabled={part.inStock === 0}
                    className={`flex items-center gap-1.5 px-4 py-2 rounded-full font-bold text-xs uppercase tracking-widest transition-all min-h-[36px] ${
                      addedId === part.id
                        ? 'bg-primary/20 text-primary border border-primary'
                        : part.inStock === 0
                          ? 'bg-muted text-muted-foreground cursor-not-allowed'
                          : 'bg-primary text-primary-foreground hover:scale-105'
                    }`}
                  >
                    {addedId === part.id ? (
                      <>
                        <Icon name="CheckIcon" size={12} />
                        Added
                      </>
                    ) : (
                      <>
                        <Icon name="ShoppingCartIcon" size={12} />
                        Add
                      </>
                    )}
                  </button>
                </div>

                <p className="text-[10px] text-muted-foreground mt-2">SKU: {part.sku}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Can't find it CTA */}
      <div className="mt-14 p-8 rounded-3xl bg-secondary border border-border text-center">
        <h3 className="font-display text-2xl text-foreground mb-2">
          Can&apos;t find the part you need?
        </h3>
        <p className="text-muted-foreground text-sm mb-6 max-w-md mx-auto">
          We can source most OEM and aftermarket parts from Japan within 2–3 weeks. Send us the part
          number or describe what you need.
        </p>
        <Link
          href="/contact"
          className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-full font-bold text-sm uppercase tracking-widest hover:scale-105 transition-transform"
        >
          <Icon name="MagnifyingGlassIcon" size={14} />
          Request a Part
        </Link>
      </div>
    </div>
  );
}
