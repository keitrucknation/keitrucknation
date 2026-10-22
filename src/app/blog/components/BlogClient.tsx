'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';

import { articles, type Article } from '../data/articles';

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
