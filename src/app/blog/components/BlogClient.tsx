'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';

interface Article {
  slug: string;
  category: string;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  readTime: string;
  image: string;
  imageAlt: string;
  featured?: boolean;
  tags: string[];
}

const articles: Article[] = [
  {
    slug: 'kei-trucks-street-legal-by-state',
    category: 'Regulations',
    title: 'Are Kei Trucks Street Legal? A State-by-State Breakdown',
    excerpt:
      "The most common question we get. The short answer: it depends on your state. Here's what we know about all 50 states, updated for 2026.",
    author: 'Marcus Webb',
    date: 'Aug 14, 2026',
    readTime: '8 min read',
    image: 'https://images.unsplash.com/photo-1675779528088-0185d2a89313',
    imageAlt: 'Open rural highway with farmland on both sides, representing kei truck road use',
    featured: true,
    tags: ['Regulations', 'Street Legal', 'State Laws'],
  },
  {
    slug: 'suzuki-carry-vs-daihatsu-hijet',
    category: 'Buying Guide',
    title: 'Suzuki Carry vs. Daihatsu Hijet: Which Kei Truck Should You Buy?',
    excerpt:
      "Two of the most popular kei trucks in the US. Both are reliable, affordable, and capable - but they're not the same. Here's how to choose.",
    author: 'Marcus Webb',
    date: 'Aug 7, 2026',
    readTime: '6 min read',
    image: 'https://img.rocket.new/generatedImages/rocket_gen_img_1529eecc9-1787334265162.png',
    imageAlt: 'Two compact Japanese mini trucks parked side by side for comparison',
    featured: true,
    tags: ['Buying Guide', 'Suzuki', 'Daihatsu'],
  },
  {
    slug: 'kei-truck-farm-use-guide',
    category: 'Use Cases',
    title: "The Kei Truck as a Farm Vehicle: A Working Farmer's Honest Review",
    excerpt:
      "We asked five KeiTruckNation customers who use their trucks daily on farms to tell us what works, what doesn't, and what they wish they'd known.",
    author: 'Derek Okafor',
    date: 'Jul 28, 2026',
    readTime: '10 min read',
    image: 'https://img.rocket.new/generatedImages/rocket_gen_img_15231ff4f-1768925895666.png',
    imageAlt: 'Green farmland with tractor tracks, representing agricultural use of kei trucks',
    tags: ['Farm', 'Use Cases', 'Real World'],
  },
  {
    slug: 'importing-kei-truck-process',
    category: 'Import Process',
    title: 'How We Import Kei Trucks: From Japanese Auction to Your Driveway',
    excerpt:
      'A step-by-step look at the full import process - Japanese auction, export paperwork, ocean freight, US customs, and domestic delivery. No mystery.',
    author: 'Yuki Tanaka',
    date: 'Jul 15, 2026',
    readTime: '7 min read',
    image: 'https://img.rocket.new/generatedImages/rocket_gen_img_19e8e5aa6-1772797423447.png',
    imageAlt:
      'Container ship at port with cargo containers being loaded, representing vehicle import',
    tags: ['Import', 'Process', 'Customs'],
  },
  {
    slug: 'kei-truck-maintenance-basics',
    category: 'Maintenance',
    title: 'Kei Truck Maintenance: What You Need to Know in Year One',
    excerpt:
      "These trucks are simple and reliable, but they're not zero-maintenance. Here's what to check, what to change, and where to find parts in the US.",
    author: 'Marcus Webb',
    date: 'Jul 3, 2026',
    readTime: '9 min read',
    image: 'https://img.rocket.new/generatedImages/rocket_gen_img_10c9547a6-1767767682618.png',
    imageAlt: 'Mechanic working under the hood of a small truck, performing maintenance',
    tags: ['Maintenance', 'Parts', 'DIY'],
  },
  {
    slug: 'subaru-sambar-en07-engine-guide',
    category: 'Technical',
    title: "The Subaru Sambar EN07 Engine: Why It's the Best Kei Truck Powerplant",
    excerpt:
      "The EN07 is a 4-cylinder in a class of 3-cylinders. Here's why that matters, what makes it special, and how to keep it running for 200,000+ km.",
    author: 'Marcus Webb',
    date: 'Jun 20, 2026',
    readTime: '11 min read',
    image: 'https://img.rocket.new/generatedImages/rocket_gen_img_179d53c3a-1772710670276.png',
    imageAlt: 'Close-up of a small engine compartment showing clean engine components',
    tags: ['Subaru', 'Technical', 'Engine'],
  },
];

const categories = [
  'All',
  'Buying Guide',
  'Regulations',
  'Use Cases',
  'Import Process',
  'Maintenance',
  'Technical',
];

export default function BlogClient() {
  const [activeCategory, setActiveCategory] = useState('All');

  const filtered =
    activeCategory === 'All' ? articles : articles.filter((a) => a.category === activeCategory);

  const featured = articles.filter((a) => a.featured);

  return (
    <div className="pt-24 sm:pt-28">
      {/* Page Header */}
      <div className="relative overflow-hidden border-b border-border py-12 sm:py-16">
        <div className="absolute inset-0 grid-lines-bg opacity-30" />
        <div className="absolute inset-0 hero-glow opacity-40" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center gap-2 mb-4">
            <div className="size-2 bg-accent rounded-full animate-pulse-glow" />
            <span className="tag-pill bg-accent/10 text-accent border border-accent/20">
              Field Notes & Guides
            </span>
          </div>
          <h1
            className="font-display font-bold text-foreground mb-3"
            style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', lineHeight: 1.05 }}
          >
            The Kei Truck Journal
          </h1>
          <p className="text-muted-foreground text-base sm:text-lg max-w-xl">
            Real guides from people who import, drive, and wrench on kei trucks every day. No fluff,
            no filler.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        {/* Featured Articles - only shown in "All" view */}
        {activeCategory === 'All' && (
          <div className="mb-14">
            <h2 className="text-xs font-black uppercase tracking-widest text-muted-foreground mb-6">
              Featured
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {featured.map((article) => (
                <FeaturedCard key={article.slug} article={article} />
              ))}
            </div>
          </div>
        )}

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full font-bold text-xs uppercase tracking-widest transition-all min-h-[40px] border ${
                activeCategory === cat
                  ? 'bg-primary text-primary-foreground border-primary'
                  : 'bg-card border-border text-muted-foreground hover:text-foreground hover:border-muted-foreground'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Article Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {(activeCategory === 'All' ? articles : filtered).map((article) => (
            <ArticleCard key={article.slug} article={article} />
          ))}
        </div>

        {/* Newsletter CTA */}
        <div className="mt-16 relative overflow-hidden bg-card border border-border rounded-3xl p-8 sm:p-12">
          <div className="absolute inset-0 grid-lines-bg opacity-20" />
          <div className="absolute top-0 right-0 size-64 blob-primary opacity-20 pointer-events-none" />
          <div className="relative flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div>
              <h3 className="font-display font-bold text-2xl text-foreground mb-2">
                New articles, new trucks.
              </h3>
              <p className="text-muted-foreground text-sm max-w-md">
                Get notified when we publish new guides or add trucks to inventory. No spam: we send
                maybe 2 emails a month.
              </p>
            </div>
            <div className="flex gap-2 w-full sm:w-auto">
              <input
                type="email"
                placeholder="your@email.com"
                className="flex-1 sm:w-64 bg-input border border-border rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors min-h-[48px]"
              />

              <button className="px-5 py-3 bg-primary text-primary-foreground rounded-xl font-black text-xs uppercase tracking-widest hover:scale-105 transition-transform min-h-[48px] flex-shrink-0">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function FeaturedCard({ article }: { article: Article }) {
  return (
    <Link
      href={`/blog/${article.slug}`}
      className="group block bg-card border border-border rounded-3xl overflow-hidden hover:border-primary/40 transition-all duration-300 card-hover"
    >
      <div className="relative aspect-[16/9] overflow-hidden">
        <AppImage
          src={article.image}
          alt={article.imageAlt}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
        <span className="absolute top-4 left-4 tag-pill bg-accent/90 text-accent-foreground">
          {article.category}
        </span>
      </div>
      <div className="p-6">
        <h3 className="font-display font-bold text-xl text-foreground mb-2 group-hover:text-primary transition-colors leading-tight">
          {article.title}
        </h3>
        <p className="text-muted-foreground text-sm leading-relaxed mb-4 line-clamp-2">
          {article.excerpt}
        </p>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="size-6 rounded-full bg-primary/20 flex items-center justify-center">
              <Icon name="UserIcon" size={12} className="text-primary" />
            </div>
            <span className="text-xs text-muted-foreground font-bold">{article.author}</span>
          </div>
          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            <span>{article.date}</span>
            <span className="size-1 rounded-full bg-border" />
            <span>{article.readTime}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}

function ArticleCard({ article }: { article: Article }) {
  return (
    <Link
      href={`/blog/${article.slug}`}
      className="group block bg-card border border-border rounded-2xl overflow-hidden hover:border-primary/40 transition-all duration-300 card-hover"
    >
      <div className="relative aspect-[16/9] overflow-hidden">
        <AppImage
          src={article.image}
          alt={article.imageAlt}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />

        <span className="absolute top-3 left-3 tag-pill bg-background/80 backdrop-blur-sm text-foreground border border-border">
          {article.category}
        </span>
      </div>
      <div className="p-5">
        <h3 className="font-bold text-base text-foreground mb-2 group-hover:text-primary transition-colors leading-snug line-clamp-2">
          {article.title}
        </h3>
        <p className="text-muted-foreground text-xs leading-relaxed mb-4 line-clamp-2">
          {article.excerpt}
        </p>
        <div className="flex items-center justify-between">
          <span className="text-xs text-muted-foreground font-bold">{article.author}</span>
          <span className="text-xs text-muted-foreground">{article.readTime}</span>
        </div>
      </div>
    </Link>
  );
}
