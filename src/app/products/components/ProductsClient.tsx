'use client';

import React, { useState, useMemo } from 'react';

import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';

type Category = 'all' | 'trucks' | 'parts';
type SortOption = 'price-asc' | 'price-desc' | 'year-desc' | 'year-asc';

interface Product {
  id: string;
  category: 'trucks' | 'parts';
  name: string;
  year?: string;
  make?: string;
  price: number;
  image: string;
  imageAlt: string;
  badge?: string;
  badgeColor?: 'primary' | 'accent';
  specs: string[];
  mileage?: string;
  condition?: string;
  partCategory?: string;
  inStock?: number;
}

const allProducts: Product[] = [
  {
    id: 'p1',
    category: 'trucks',
    name: 'Carry Dump 4WD',
    year: '1998',
    make: 'Suzuki',
    price: 7495,
    mileage: '42,000 km',
    condition: 'Excellent',
    image: 'https://img.rocket.new/generatedImages/rocket_gen_img_11e03fff8-1772115583467.png',
    imageAlt: 'Compact Japanese kei pickup truck on rural road, side view',
    badge: 'Best Seller',
    badgeColor: 'primary',
    specs: ['660cc 3-cyl', '4WD', 'Dump Bed', '5-Speed'],
  },
  {
    id: 'p2',
    category: 'trucks',
    name: 'Hijet Jumbo',
    year: '2002',
    make: 'Daihatsu',
    price: 8950,
    mileage: '36,500 km',
    condition: 'Very Good',
    image: 'https://img.rocket.new/generatedImages/rocket_gen_img_1e0d5bf8c-1787267393908.png',
    imageAlt: 'Japanese mini truck with extended cab in open field, front quarter view',
    badge: 'Just Arrived',
    badgeColor: 'accent',
    specs: ['660cc EFI', '4WD Hi-Lo', 'Extended Cab', 'Power Steering'],
  },
  {
    id: 'p3',
    category: 'trucks',
    name: 'Sambar TC AWD',
    year: '2005',
    make: 'Subaru',
    price: 9200,
    mileage: '28,000 km',
    condition: 'Excellent',
    image: 'https://img.rocket.new/generatedImages/rocket_gen_img_1368ac357-1768369012782.png',
    imageAlt: 'Clean Japanese utility vehicle on mountain road with dramatic scenery',
    specs: ['EN07 4-cyl', 'AWD', 'Hi-Low 4WD', 'A/C'],
  },
  {
    id: 'p4',
    category: 'trucks',
    name: 'Acty Truck HA6',
    year: '2000',
    make: 'Honda',
    price: 6800,
    mileage: '58,000 km',
    condition: 'Good',
    image: 'https://images.unsplash.com/photo-1618172358700-d8d8d814acee',
    imageAlt: 'Small Japanese utility truck parked on gravel, country setting',
    specs: ['660cc SOHC', '4WD', 'Mid-Engine', 'Manual'],
  },
  {
    id: 'p5',
    category: 'trucks',
    name: 'Carry Van 4WD',
    year: '1997',
    make: 'Suzuki',
    price: 5900,
    mileage: '67,000 km',
    condition: 'Good',
    image: 'https://images.unsplash.com/photo-1687039588464-09f1b52208c7',
    imageAlt: 'Small Japanese mini van truck on dirt road, rural setting',
    badge: 'Value Pick',
    badgeColor: 'primary',
    specs: ['660cc', '4WD', 'Van Body', 'Rear Seats'],
  },
  {
    id: 'p6',
    category: 'trucks',
    name: 'Minicab MiEV',
    year: '2013',
    make: 'Mitsubishi',
    price: 11500,
    mileage: '22,000 km',
    condition: 'Excellent',
    image: 'https://img.rocket.new/generatedImages/rocket_gen_img_1ed0b96fe-1773613696974.png',
    imageAlt: 'Modern electric Japanese mini truck, clean white exterior',
    badge: 'Electric',
    badgeColor: 'accent',
    specs: ['Electric Motor', '4WD', '100km Range', 'Low Emissions'],
  },
  {
    id: 'part-1',
    category: 'parts',
    name: 'OEM Timing Belt Kit, Carry/Hijet',
    price: 89,
    image: 'https://img.rocket.new/generatedImages/rocket_gen_img_10a48e565-1775689404074.png',
    imageAlt: 'Automotive timing belt and tensioner kit on dark workshop surface',
    partCategory: 'Engine & Drivetrain',
    inStock: 14,
    specs: ['Fits 660cc F6A/3G83', 'OEM Quality', 'Includes Tensioner'],
  },
  {
    id: 'part-2',
    category: 'parts',
    name: 'All-Terrain Tire Set (4), 145R12LT',
    price: 340,
    image: 'https://images.unsplash.com/photo-1664800522478-9f94e0936b8f',
    imageAlt: 'Set of all-terrain tires in dark garage setting',
    partCategory: 'Tires & Wheels',
    inStock: 7,
    specs: ['145R12LT', '6-Ply Rated', 'All-Season', 'Set of 4'],
  },
  {
    id: 'part-3',
    category: 'parts',
    name: '3" Lift Kit, Universal Kei',
    price: 195,
    image: 'https://img.rocket.new/generatedImages/rocket_gen_img_1df541218-1783556846629.png',
    imageAlt: 'Suspension lift kit components on metal surface',
    partCategory: 'Suspension',
    inStock: 5,
    specs: ['3-inch Lift', 'Coil Spacers', 'Fits Most Models', 'Hardware Included'],
    badge: 'Popular',
    badgeColor: 'primary',
  },
  {
    id: 'part-4',
    category: 'parts',
    name: 'LED Light Bar, 20" Curved',
    price: 78,
    image: 'https://img.rocket.new/generatedImages/rocket_gen_img_160a1f947-1767475809364.png',
    imageAlt: 'LED light bar on dark surface, electronic components visible',
    partCategory: 'Electrical & Lighting',
    inStock: 22,
    specs: ['20 inch Curved', '126W', 'Flood/Spot Combo', 'IP67 Rated'],
  },
  {
    id: 'part-5',
    category: 'parts',
    name: 'Steel Roof Rack, Kei Truck',
    price: 245,
    image: 'https://img.rocket.new/generatedImages/rocket_gen_img_145643db6-1766255079162.png',
    imageAlt: 'Steel roof rack components in workshop, industrial setting',
    partCategory: 'Body & Exterior',
    inStock: 3,
    specs: ['Powder Coated', '400lb Capacity', 'Universal Fit', 'Hardware Included'],
  },
  {
    id: 'part-6',
    category: 'parts',
    name: 'Winch Mount Bumper, Front',
    price: 320,
    image: 'https://img.rocket.new/generatedImages/rocket_gen_img_1f297c8ed-1784259054866.png',
    imageAlt: 'Heavy duty steel front bumper on dark surface',
    partCategory: 'Body & Exterior',
    inStock: 6,
    specs: ['Fits Suzuki/Daihatsu', 'Winch-Ready', '3/16" Steel', 'Textured Black'],
    badge: 'New',
    badgeColor: 'accent',
  },
];

const ProductsClient: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<Category>('all');
  const [sortBy, setSortBy] = useState<SortOption>('price-asc');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 15000]);
  const [addedToCart, setAddedToCart] = useState<string | null>(null);
  const [filterOpen, setFilterOpen] = useState(false);

  const filtered = useMemo(() => {
    let result = allProducts.filter((p) => {
      if (activeCategory !== 'all' && p.category !== activeCategory) return false;
      if (p.price < priceRange[0] || p.price > priceRange[1]) return false;
      return true;
    });

    result = [...result].sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'year-desc') return parseInt(b.year || '0') - parseInt(a.year || '0');
      if (sortBy === 'year-asc') return parseInt(a.year || '0') - parseInt(b.year || '0');
      return 0;
    });

    return result;
  }, [activeCategory, sortBy, priceRange]);

  const handleAddToCart = (id: string) => {
    setAddedToCart(id);
    setTimeout(() => setAddedToCart(null), 2000);
  };

  return (
    <div className="min-h-screen pt-24 sm:pt-28">
      {/* Page Header */}
      <div className="relative overflow-hidden border-b border-border py-12 sm:py-16">
        <div className="absolute inset-0 grid-lines-bg opacity-30" />
        <div className="absolute inset-0 hero-glow opacity-50" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center gap-2 mb-4">
            <div className="size-2 bg-primary rounded-full animate-pulse-glow" />
            <span className="tag-pill bg-primary/10 text-primary border border-primary/20">
              Live Inventory
            </span>
          </div>
          <h1
            className="font-display font-bold text-foreground mb-3"
            style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', lineHeight: 1.05 }}
          >
            Browse Trucks & Parts
          </h1>
          <p className="text-muted-foreground text-base sm:text-lg max-w-xl">
            {allProducts.filter((p) => p.category === 'trucks').length} trucks ·{' '}
            {allProducts.filter((p) => p.category === 'parts').length} parts in stock, updated daily
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        {/* Controls Row */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 sm:items-center justify-between mb-8">
          {/* Category Tabs */}
          <div className="flex gap-2 bg-secondary/50 rounded-2xl p-1.5 border border-border w-fit">
            {(['all', 'trucks', 'parts'] as Category[]).map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-widest transition-all min-h-[40px] capitalize ${
                  activeCategory === cat
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {cat === 'all' ? 'All' : cat}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            {/* Sort */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="bg-card border border-border rounded-xl px-3 py-2 text-xs font-bold text-foreground uppercase tracking-widest min-h-[44px] focus:outline-none focus:ring-1 focus:ring-primary"
            >
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="year-desc">Year: Newest First</option>
              <option value="year-asc">Year: Oldest First</option>
            </select>

            {/* Filter toggle mobile */}
            <button
              onClick={() => setFilterOpen(!filterOpen)}
              className="flex items-center gap-2 px-4 py-2 bg-card border border-border rounded-xl text-xs font-bold text-foreground uppercase tracking-widest min-h-[44px] hover:bg-muted transition-colors sm:hidden"
            >
              <Icon name="AdjustmentsHorizontalIcon" size={16} />
              Filter
            </button>

            {/* Result count */}
            <span className="text-xs text-muted-foreground font-bold">
              {filtered.length} result{filtered.length !== 1 ? 's' : ''}
            </span>
          </div>
        </div>

        <div className="flex gap-6 lg:gap-8">
          {/* Sidebar Filter */}
          <aside
            className={`${filterOpen ? 'flex' : 'hidden'} sm:flex flex-col gap-5 w-56 flex-shrink-0`}
          >
            <div className="bg-card border border-border rounded-2xl p-5">
              <h3 className="text-xs font-black uppercase tracking-widest text-foreground mb-4">
                Price Range
              </h3>
              <div className="flex flex-col gap-3">
                <div className="flex justify-between text-xs text-muted-foreground font-bold">
                  <span>${priceRange[0].toLocaleString()}</span>
                  <span>${priceRange[1].toLocaleString()}</span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={15000}
                  step={500}
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                  className="w-full accent-primary"
                />
              </div>
            </div>

            <div className="bg-card border border-border rounded-2xl p-5">
              <h3 className="text-xs font-black uppercase tracking-widest text-foreground mb-4">
                Category
              </h3>
              <div className="flex flex-col gap-2">
                {['All', 'Trucks', 'Parts & Accessories'].map((opt) => (
                  <button
                    key={opt}
                    onClick={() =>
                      setActiveCategory(
                        opt === 'All' ? 'all' : opt === 'Trucks' ? 'trucks' : 'parts'
                      )
                    }
                    className={`text-left px-3 py-2.5 rounded-xl text-xs font-bold transition-all min-h-[40px] ${
                      (opt === 'All' && activeCategory === 'all') ||
                      (opt === 'Trucks' && activeCategory === 'trucks') ||
                      (opt === 'Parts & Accessories' && activeCategory === 'parts')
                        ? 'bg-primary text-primary-foreground'
                        : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-card border border-border rounded-2xl p-5">
              <h3 className="text-xs font-black uppercase tracking-widest text-foreground mb-4">
                Condition
              </h3>
              {['Excellent', 'Very Good', 'Good'].map((cond) => (
                <label
                  key={cond}
                  className="flex items-center gap-2 py-2 cursor-pointer min-h-[44px]"
                >
                  <input type="checkbox" className="accent-primary" defaultChecked />
                  <span className="text-xs font-bold text-muted-foreground">{cond}</span>
                </label>
              ))}
            </div>
          </aside>

          {/* Product Grid */}
          <div className="flex-1 min-w-0">
            {filtered.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 gap-4 text-center">
                <Icon name="MagnifyingGlassIcon" size={48} className="text-muted-foreground/40" />
                <h3 className="font-display font-bold text-xl text-foreground">No results found</h3>
                <p className="text-sm text-muted-foreground">Try adjusting your filters</p>
                <button
                  onClick={() => {
                    setActiveCategory('all');
                    setPriceRange([0, 15000]);
                  }}
                  className="px-6 py-3 bg-primary text-primary-foreground rounded-xl font-bold text-xs uppercase tracking-widest"
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-5">
                {filtered.map((product) => (
                  <div
                    key={product.id}
                    className="bg-card border border-border rounded-3xl overflow-hidden card-hover flex flex-col"
                  >
                    {/* Image */}
                    <div className="relative aspect-[16/10] overflow-hidden flex-shrink-0">
                      <AppImage
                        src={product.image}
                        alt={product.imageAlt}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover hover:scale-105 transition-transform duration-500"
                      />

                      <div className="absolute inset-0 bg-gradient-to-t from-card/50 to-transparent" />
                      {product.badge && (
                        <div
                          className={`absolute top-3 left-3 tag-pill ${product.badgeColor === 'accent' ? 'bg-accent text-white' : 'bg-primary text-primary-foreground'}`}
                        >
                          {product.badge}
                        </div>
                      )}
                      {product.category === 'parts' && product.inStock !== undefined && (
                        <div className="absolute top-3 right-3 tag-pill bg-black/60 backdrop-blur-sm text-white border border-white/10">
                          {product.inStock} in stock
                        </div>
                      )}
                      {product.condition && (
                        <div className="absolute top-3 right-3 tag-pill bg-black/60 backdrop-blur-sm text-white border border-white/10">
                          {product.condition}
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="p-4 sm:p-5 flex flex-col gap-3 flex-1">
                      <div>
                        {product.category === 'trucks' ? (
                          <div className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-1">
                            {product.year} {product.make} · {product.mileage}
                          </div>
                        ) : (
                          <div className="text-xs font-bold uppercase tracking-widest text-accent mb-1">
                            {product.partCategory}
                          </div>
                        )}
                        <h3 className="font-display font-bold text-base sm:text-lg text-foreground leading-tight">
                          {product.name}
                        </h3>
                      </div>

                      <div className="flex flex-wrap gap-1.5">
                        {product.specs.map((spec) => (
                          <span
                            key={spec}
                            className="text-xs px-2 py-0.5 bg-muted rounded-full text-muted-foreground border border-border"
                          >
                            {spec}
                          </span>
                        ))}
                      </div>

                      <div className="flex items-center justify-between pt-2 border-t border-border mt-auto">
                        <div>
                          <span className="font-display font-black text-xl text-primary">
                            ${product.price.toLocaleString()}
                          </span>
                          {product.category === 'trucks' && (
                            <span className="text-xs text-muted-foreground ml-1">+ shipping</span>
                          )}
                        </div>
                        <button
                          onClick={() => handleAddToCart(product.id)}
                          className={`flex items-center gap-1.5 px-3 py-2.5 rounded-xl font-bold text-xs uppercase tracking-widest transition-all min-h-[44px] ${
                            addedToCart === product.id
                              ? 'bg-green-500 text-white'
                              : 'bg-primary text-primary-foreground hover:scale-105'
                          }`}
                        >
                          {addedToCart === product.id ? (
                            <>
                              <Icon name="CheckIcon" size={12} /> Added!
                            </>
                          ) : (
                            <>
                              <Icon name="ShoppingCartIcon" size={12} /> Add
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsClient;
