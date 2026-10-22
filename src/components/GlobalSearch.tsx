'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { createPortal } from 'react-dom';
import Icon from '@/components/ui/AppIcon';
import MappedIcon from '@/components/ui/MappedIcon';

interface SearchResult {
  title: string;
  subtitle: string;
  href: string;
  category: 'Trucks' | 'Parts' | 'Blog' | 'Glossary' | 'Pages';
  icon: string;
}

const ALL_RESULTS: SearchResult[] = [
  // Trucks
  {
    title: 'Suzuki Carry 4WD',
    subtitle: '660cc · 4WD · Dump Bed',
    href: '/inventory',
    category: 'Trucks',
    icon: 'truck',
  },
  {
    title: 'Daihatsu Hijet Jumbo',
    subtitle: '660cc · Extended Cab · 4WD',
    href: '/inventory',
    category: 'Trucks',
    icon: 'truck',
  },
  {
    title: 'Honda Acty SDX',
    subtitle: '360cc · 2WD · Flatbed',
    href: '/inventory',
    category: 'Trucks',
    icon: 'truck',
  },
  {
    title: 'Subaru Sambar',
    subtitle: '660cc · 4WD · Dump',
    href: '/inventory',
    category: 'Trucks',
    icon: 'truck',
  },
  {
    title: 'Mitsubishi Minicab',
    subtitle: '660cc · 4WD · Refrigerated',
    href: '/inventory',
    category: 'Trucks',
    icon: 'truck',
  },
  // Parts
  {
    title: '3" Lift Kit Universal',
    subtitle: 'Suspension · Fits Most Models',
    href: '/parts',
    category: 'Parts',
    icon: 'wrench',
  },
  {
    title: 'OEM Timing Belt Kit',
    subtitle: 'Engine · Suzuki Carry',
    href: '/parts',
    category: 'Parts',
    icon: 'wrench',
  },
  {
    title: 'LED Headlight Upgrade',
    subtitle: 'Lighting · Universal Fit',
    href: '/parts',
    category: 'Parts',
    icon: 'wrench',
  },
  {
    title: 'Winch Mount Plate',
    subtitle: 'Accessories · Front Bumper',
    href: '/parts',
    category: 'Parts',
    icon: 'wrench',
  },
  // Blog
  {
    title: 'Are Kei Trucks Street Legal?',
    subtitle: 'Regulations · 8 min read',
    href: '/blog/kei-trucks-street-legal-by-state',
    category: 'Blog',
    icon: 'notes',
  },
  {
    title: 'Suzuki Carry vs Daihatsu Hijet',
    subtitle: 'Buying Guide · 6 min read',
    href: '/blog/suzuki-carry-vs-daihatsu-hijet',
    category: 'Blog',
    icon: 'notes',
  },
  {
    title: 'Kei Truck Farm Use Guide',
    subtitle: 'Use Cases · 10 min read',
    href: '/blog/kei-truck-farm-use-guide',
    category: 'Blog',
    icon: 'notes',
  },
  {
    title: 'How We Import Kei Trucks',
    subtitle: 'Import Process · 7 min read',
    href: '/blog/importing-kei-truck-process',
    category: 'Blog',
    icon: 'notes',
  },
  {
    title: 'Kei Truck Maintenance: Year One',
    subtitle: 'Maintenance · 9 min read',
    href: '/blog/kei-truck-maintenance-basics',
    category: 'Blog',
    icon: 'notes',
  },
  {
    title: 'Subaru Sambar EN07 Engine Guide',
    subtitle: 'Technical · 11 min read',
    href: '/blog/subaru-sambar-en07-engine-guide',
    category: 'Blog',
    icon: 'notes',
  },
  // Glossary
  {
    title: 'JDM (Japanese Domestic Market)',
    subtitle: 'Glossary term',
    href: '/glossary',
    category: 'Glossary',
    icon: 'book',
  },
  {
    title: '25-Year Import Rule',
    subtitle: 'Glossary term',
    href: '/glossary',
    category: 'Glossary',
    icon: 'book',
  },
  {
    title: 'Kei (軽) Class',
    subtitle: 'Glossary term',
    href: '/glossary',
    category: 'Glossary',
    icon: 'book',
  },
  // Pages
  {
    title: 'Import Process',
    subtitle: 'How we import from Japan',
    href: '/import-process',
    category: 'Pages',
    icon: 'ocean',
  },
  {
    title: 'Financing',
    subtitle: 'Flexible payment options',
    href: '/financing',
    category: 'Pages',
    icon: 'money',
  },
  {
    title: 'State Guide',
    subtitle: 'Street legal by state',
    href: '/state-guide',
    category: 'Pages',
    icon: 'map',
  },
  {
    title: 'Trade-In',
    subtitle: 'Trade your current vehicle',
    href: '/trade-in',
    category: 'Pages',
    icon: 'refresh',
  },
  {
    title: 'Truck Configurator',
    subtitle: 'Build your ideal kei truck',
    href: '/configurator',
    category: 'Pages',
    icon: 'gear',
  },
  {
    title: 'Contact Us',
    subtitle: 'Get in touch',
    href: '/contact',
    category: 'Pages',
    icon: 'phone',
  },
];

const CATEGORY_COLORS: Record<string, string> = {
  Trucks: 'bg-primary/10 text-primary border-primary/20',
  Parts: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  Blog: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
  Glossary: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
  Pages: 'bg-muted text-muted-foreground border-border',
};

interface GlobalSearchProps {
  scrolled: boolean;
}

export default function GlobalSearch({ scrolled }: GlobalSearchProps) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const results =
    query.trim().length > 0
      ? ALL_RESULTS.filter(
          (r) =>
            r.title.toLowerCase().includes(query.toLowerCase()) ||
            r.subtitle.toLowerCase().includes(query.toLowerCase()) ||
            r.category.toLowerCase().includes(query.toLowerCase())
        ).slice(0, 8)
      : ALL_RESULTS.slice(0, 6);

  const handleOpen = useCallback(() => {
    setOpen(true);
    setTimeout(() => inputRef.current?.focus(), 50);
  }, []);

  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const handleClose = useCallback(() => {
    setOpen(false);
    setQuery('');
  }, []);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (open) {
          handleClose();
        } else {
          handleOpen();
        }
      }
      if (e.key === 'Escape') handleClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [open, handleOpen, handleClose]);

  return (
    <div ref={containerRef} className="relative">
      {/* Search Trigger Button */}
      <button
        onClick={handleOpen}
        aria-label="Open search"
        className={`hidden md:flex items-center gap-1.5 px-2.5 xl:px-3 py-2 rounded-full border text-xs font-medium transition-all flex-shrink-0 ${
          scrolled
            ? 'border-white/30 text-white/70 hover:text-white hover:border-white/50 bg-white/5'
            : 'border-gray-400/30 text-gray-400 hover:text-gray-200 hover:border-gray-300/40'
        }`}
      >
        <Icon name="MagnifyingGlassIcon" size={14} />
        <span className="hidden xl:inline">Search</span>
        <kbd className="hidden xl:inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded text-[10px] bg-white/10 border border-white/10 font-mono">
          ⌘K
        </kbd>
      </button>

      {/* Mobile / tablet search icon (shown below xl where the label is hidden) */}
      <button
        onClick={handleOpen}
        aria-label="Open search"
        className={`md:hidden flex items-center justify-center size-10 rounded-full border transition-all flex-shrink-0 ${
          scrolled
            ? 'border-white/30 text-white hover:border-white'
            : 'border-gray-400/30 text-gray-400 hover:border-gray-200'
        }`}
      >
        <Icon name="MagnifyingGlassIcon" size={16} />
      </button>

      {/* Search Modal - rendered in document.body via a portal. Inside the header, the
          header's backdrop-blur traps `position: fixed` to the 80px header box, which is
          what made the results get cut off behind the page. */}
      {open && mounted && createPortal(
        <div className="fixed inset-0 z-[200] flex items-start justify-center pt-[10vh] px-4">
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={handleClose} />

          {/* Search Panel */}
          <div className="relative w-full max-w-xl bg-card border border-border rounded-2xl shadow-2xl overflow-hidden">
            {/* Input */}
            <div className="flex items-center gap-3 px-4 py-3 border-b border-border">
              <Icon
                name="MagnifyingGlassIcon"
                size={18}
                className="text-muted-foreground flex-shrink-0"
              />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search trucks, parts, blog, glossary…"
                className="flex-1 bg-transparent text-foreground placeholder:text-muted-foreground text-sm outline-none"
                aria-label="Search KeiTruckNation"
              />
              {query && (
                <button
                  onClick={() => setQuery('')}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Icon name="XMarkIcon" size={16} />
                </button>
              )}
              <kbd className="hidden sm:flex items-center px-1.5 py-0.5 rounded text-[10px] bg-muted border border-border font-mono text-muted-foreground">
                ESC
              </kbd>
            </div>

            {/* Results */}
            <div className="max-h-80 overflow-y-auto">
              {results.length === 0 ? (
                <div className="py-10 text-center text-muted-foreground text-sm">
                  No results for &ldquo;{query}&rdquo;
                </div>
              ) : (
                <ul role="listbox" aria-label="Search results">
                  {!query && (
                    <li className="px-4 pt-3 pb-1">
                      <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">
                        Popular
                      </span>
                    </li>
                  )}
                  {results.map((result, i) => (
                    <li key={i} role="option" aria-selected={false}>
                      <Link
                        href={result.href}
                        onClick={handleClose}
                        className="flex items-center gap-3 px-4 py-3 hover:bg-muted transition-colors group"
                      >
                        <MappedIcon icon={result.icon} size={22} className="flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                          <div className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors truncate">
                            {result.title}
                          </div>
                          <div className="text-xs text-muted-foreground truncate">
                            {result.subtitle}
                          </div>
                        </div>
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-full border flex-shrink-0 ${CATEGORY_COLORS[result.category]}`}
                        >
                          {result.category}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Footer hint */}
            <div className="px-4 py-2 border-t border-border flex items-center gap-4 text-[10px] text-muted-foreground">
              <span className="inline-flex items-center gap-1">
                <Icon name="ArrowUpIcon" size={10} />
                <Icon name="ArrowDownIcon" size={10} /> navigate
              </span>
              <span>Enter to select</span>
              <span>ESC close</span>
            </div>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
} 
