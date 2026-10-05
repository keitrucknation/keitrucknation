'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Icon from '@/components/ui/AppIcon';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import GlobalSearch from '@/components/GlobalSearch';
import { LanguageToggle, useLanguage } from '@/components/LanguageSelector';
import CurrencyToggle from '@/components/CurrencyToggle';
import { cartStore } from '@/lib/cartStore';
import { wishlistStore } from '@/lib/wishlistStore';

interface HeaderProps {
  /** @deprecated cart count is now read live from cartStore; prop kept for backward-compat but ignored */
  cartCount?: number;
}

const Header: React.FC<HeaderProps> = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [wishlistCount, setWishlistCount] = useState(0);
  const pathname = usePathname();
  const { t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      const handleScroll = () => setMobileOpen(false);
      window.addEventListener('scroll', handleScroll, { passive: true });
      return () => window.removeEventListener('scroll', handleScroll);
    }
  }, [mobileOpen]);

  // Keep cart/wishlist counts live - read on mount and subscribe to changes.
  useEffect(() => {
    setCartCount(cartStore.getCount());
    setWishlistCount(wishlistStore.getCount());
    const unsubCart = cartStore.subscribe(() => setCartCount(cartStore.getCount()));
    const unsubWishlist = wishlistStore.subscribe(() => setWishlistCount(wishlistStore.getCount()));
    return () => {
      unsubCart();
      unsubWishlist();
    };
  }, []);

  const navLinks = [
    { label: t.nav.inventory, href: '/inventory' },
    { label: t.nav.financing, href: '/financing' },
    { label: t.nav.importProcess, href: '/import-process' },
    { label: t.nav.maintenance, href: '/maintenance' },
    { label: t.nav.blog, href: '/blog' },
    { label: t.nav.configurator, href: '/configurator' },
    { label: t.nav.about, href: '/about' },
    { label: t.nav.contact, href: '/contact' },
  ];

  const navTextColor = scrolled ? 'text-white' : 'text-gray-400';
  const navHoverColor = scrolled ? 'hover:text-white/80' : 'hover:text-gray-200';

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-[70] transition-all duration-300 ${
          scrolled
            ? 'bg-background/90 backdrop-blur-md border-b border-border'
            : 'bg-gradient-to-b from-black/60 via-black/25 to-transparent backdrop-blur-[2px]'
        }`}
        role="banner"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 sm:h-20 flex items-center justify-between gap-4">
          {/* Logo - image only, no brand text, so the badge's own lettering reads clearly and nav links keep their room */}
          <Link href="/" className="flex items-center flex-shrink-0" aria-label="KeiTruckNation Home">
            <Image
              src="/assets/images/app_logo.png"
              alt="KeiTruckNation"
              width={64}
              height={64}
              className="flex-shrink-0 object-contain w-11 h-11 sm:w-14 sm:h-14"
              priority
            />
          </Link>

          {/* Desktop Nav */}
          <nav
            aria-label="Main navigation"
            className={`hidden lg:flex items-center gap-0.5 px-2.5 py-1.5 backdrop-blur-sm rounded-full border transition-all duration-300 min-w-0 overflow-x-auto scrollbar-none ${
              scrolled ? 'bg-secondary/80 border-border' : 'bg-white/10 border-white/20'
            }`}
          >
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                aria-current={pathname === link.href ? 'page' : undefined}
                className={`nav-link-animated whitespace-nowrap text-[11px] xl:text-xs font-bold uppercase tracking-wide xl:tracking-widest px-2.5 xl:px-3 py-1.5 rounded-full ${
                  pathname === link.href
                    ? 'text-primary-foreground bg-primary'
                    : `${navTextColor} ${navHoverColor} hover:bg-white/10`
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-1.5 sm:gap-2 flex-shrink-0">
            {/* Global Search */}
            <GlobalSearch scrolled={scrolled} />

            {/* Currency Toggle */}
            <CurrencyToggle scrolled={scrolled} />

            {/* Language Toggle */}
            <LanguageToggle scrolled={scrolled} />

            <Link
              href="/wishlist"
              className={`relative hidden sm:flex items-center justify-center size-10 rounded-full border transition-all flex-shrink-0 ${
                scrolled
                  ? 'border-white/30 text-white hover:border-white hover:text-white'
                  : 'border-gray-400/30 text-gray-400 hover:border-gray-200 hover:text-gray-200'
              }`}
              aria-label={`${t.nav.wishlist}${wishlistCount > 0 ? `, ${wishlistCount} items` : ''}`}
            >
              <Icon name="HeartIcon" size={16} />
              {wishlistCount > 0 && (
                <span
                  className="absolute -top-1.5 -right-1.5 size-5 bg-accent text-accent-foreground text-[10px] font-black rounded-full flex items-center justify-center"
                  aria-hidden="true"
                >
                  {wishlistCount}
                </span>
              )}
            </Link>
            <Link
              href="/cart"
              className="relative flex items-center gap-2 px-3 sm:px-5 py-2 bg-primary text-primary-foreground rounded-full font-bold text-xs uppercase tracking-widest hover:scale-105 transition-transform flex-shrink-0"
              aria-label={`${t.nav.cart}${cartCount > 0 ? `, ${cartCount} items` : ''}`}
            >
              <Icon name="ShoppingCartIcon" size={16} variant="solid" />
              <span className="hidden sm:inline">{t.nav.cart}</span>
              {cartCount > 0 && (
                <span
                  className="absolute -top-1.5 -right-1.5 size-5 bg-accent text-accent-foreground text-[10px] font-black rounded-full flex items-center justify-center"
                  aria-hidden="true"
                >
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className={`lg:hidden flex items-center justify-center size-10 rounded-full border transition-colors ${
                scrolled
                  ? 'border-white/30 text-white hover:bg-white/10'
                  : 'border-gray-400/30 text-gray-400 hover:bg-white/10'
              }`}
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
            >
              <Icon name={mobileOpen ? 'XMarkIcon' : 'Bars3Icon'} size={20} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {mobileOpen && (
        <div
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation"
          className="fixed inset-0 z-40 bg-background/95 backdrop-blur-md flex flex-col pt-20 px-6 lg:hidden"
          onClick={() => setMobileOpen(false)}
        >
          <nav className="flex flex-col gap-2 mt-4" onClick={(e) => e.stopPropagation()}>
            {navLinks.map((link, i) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                aria-current={pathname === link.href ? 'page' : undefined}
                style={{ animationDelay: `${i * 55}ms` }}
                className="mobile-nav-key flex items-center justify-between py-4 px-4 rounded-xl border border-border text-foreground font-bold text-base hover:bg-muted hover:text-primary transition-colors min-h-[44px]"
              >
                {link.label}
                <Icon name="ArrowRightIcon" size={16} className="text-muted-foreground" />
              </Link>
            ))}
            <Link
              href="/cart"
              onClick={() => setMobileOpen(false)}
              style={{ animationDelay: `${navLinks.length * 55}ms` }}
              className="mobile-nav-key flex items-center justify-center gap-2 py-4 mt-4 bg-primary text-primary-foreground rounded-xl font-bold text-sm uppercase tracking-widest min-h-[44px]"
            >
              <Icon name="ShoppingCartIcon" size={18} variant="solid" />
              View Cart {cartCount > 0 && `(${cartCount})`}
            </Link>
            <Link
              href="/wishlist"
              onClick={() => setMobileOpen(false)}
              style={{ animationDelay: `${(navLinks.length + 1) * 55}ms` }}
              className="mobile-nav-key sm:hidden flex items-center justify-center gap-2 py-4 border border-border rounded-xl font-bold text-sm uppercase tracking-widest text-foreground min-h-[44px]"
            >
              <Icon name="HeartIcon" size={18} />
              {t.nav.wishlist} {wishlistCount > 0 && `(${wishlistCount})`}
            </Link>
          </nav>
        </div>
      )}
    </>
  );
};

export default Header;
