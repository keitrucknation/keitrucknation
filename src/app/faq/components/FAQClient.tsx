'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Icon from '@/components/ui/AppIcon';
import { FAQ_CATEGORIES as categories } from '../data/faqData';

export default function FAQClient() {
  const [activeCategory, setActiveCategory] = useState('buying');
  const [openItems, setOpenItems] = useState<Set<string>>(new Set());

  const toggleItem = (key: string) => {
    setOpenItems((prev) => {
      const next = new Set(prev);
      if (next.has(key)) {
        next.delete(key);
      } else {
        next.add(key);
      }
      return next;
    });
  };

  const activeData = categories.find((c) => c.id === activeCategory);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
      {/* Hero */}
      <div className="text-center mb-14">
        <span className="tag-pill bg-primary/10 text-primary border border-primary/20 mb-4 inline-flex">
          <Icon name="QuestionMarkCircleIcon" size={10} />
          Frequently Asked Questions
        </span>
        <h1 className="font-display text-section-xl text-foreground mb-4">
          Everything you need to know
        </h1>
        <p className="text-muted-foreground max-w-xl mx-auto text-sm leading-relaxed">
          Buying a Japanese kei truck is different from buying a regular used car. Here are honest
          answers to the questions we get every day.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Category Sidebar */}
        <aside className="lg:w-56 flex-shrink-0">
          <nav className="flex lg:flex-col gap-2 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`flex items-center gap-2.5 px-4 py-3 rounded-xl text-sm font-bold whitespace-nowrap transition-all text-left min-h-[44px] ${
                  activeCategory === cat.id
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-secondary text-muted-foreground hover:text-foreground hover:bg-muted border border-border'
                }`}
              >
                <Icon name={cat.icon as Parameters<typeof Icon>[0]['name']} size={15} />
                {cat.label}
              </button>
            ))}
          </nav>

          {/* Contact CTA */}
          <div className="hidden lg:block mt-8 p-5 rounded-2xl bg-card border border-border">
            <p className="text-xs font-bold text-foreground mb-1">Still have questions?</p>
            <p className="text-xs text-muted-foreground mb-4">
              Our team responds within a few hours on business days.
            </p>
            <Link
              href="/contact"
              className="flex items-center justify-center gap-2 py-2.5 bg-primary text-primary-foreground rounded-full font-bold text-xs uppercase tracking-widest hover:scale-105 transition-transform"
            >
              <Icon name="ChatBubbleLeftRightIcon" size={13} />
              Ask Us
            </Link>
          </div>
        </aside>

        {/* FAQ Accordion */}
        <div className="flex-1 min-w-0">
          {activeData && (
            <div className="space-y-3">
              <h2 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-5 flex items-center gap-2">
                <Icon name={activeData.icon as Parameters<typeof Icon>[0]['name']} size={13} />
                {activeData.label}
              </h2>
              {activeData.items.map((item, idx) => {
                const key = `${activeCategory}-${idx}`;
                const isOpen = openItems.has(key);
                return (
                  <div
                    key={key}
                    className={`rounded-2xl border transition-all duration-200 overflow-hidden ${isOpen ? 'border-primary/30 bg-card' : 'border-border bg-card hover:border-muted-foreground/30'}`}
                  >
                    <button
                      onClick={() => toggleItem(key)}
                      className="w-full flex items-start justify-between gap-4 p-5 text-left min-h-[44px]"
                    >
                      <span
                        className={`font-bold text-sm leading-snug transition-colors ${isOpen ? 'text-primary' : 'text-foreground'}`}
                      >
                        {item.q}
                      </span>
                      <span
                        className={`flex-shrink-0 size-6 rounded-full flex items-center justify-center transition-all duration-200 ${isOpen ? 'bg-primary text-primary-foreground rotate-45' : 'bg-muted text-muted-foreground'}`}
                      >
                        <Icon name="PlusIcon" size={12} />
                      </span>
                    </button>
                    {isOpen && (
                      <div className="px-5 pb-5">
                        <div className="h-px bg-border mb-4" />
                        <p className="text-sm text-muted-foreground leading-relaxed">{item.a}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="mt-16 rounded-3xl bg-secondary border border-border p-8 sm:p-10 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div>
          <h3 className="font-display text-2xl text-foreground mb-1">Ready to find your truck?</h3>
          <p className="text-muted-foreground text-sm">
            Browse our current inventory: trucks start at $5,900.
          </p>
        </div>
        <div className="flex gap-3 flex-shrink-0">
          <Link
            href="/state-guide"
            className="px-5 py-3 border border-border text-foreground rounded-full font-bold text-xs uppercase tracking-widest hover:bg-muted transition-colors"
          >
            State Guide
          </Link>
          <Link
            href="/products"
            className="px-5 py-3 bg-primary text-primary-foreground rounded-full font-bold text-xs uppercase tracking-widest hover:scale-105 transition-transform"
          >
            View Trucks
          </Link>
        </div>
      </div>
    </div>
  );
}
