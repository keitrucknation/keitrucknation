import React from 'react';
import Link from 'next/link';
import AppLogo from '@/components/ui/AppLogo';
// import Icon from '@/components/ui/AppIcon'; // not used at the moment
import MappedIcon from '@/components/ui/MappedIcon';

const Footer: React.FC = () => {
  return (
    <footer className="border-t border-border py-10 sm:py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Single Row Layout */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          {/* Logo + Brand */}
          <Link href="/" className="flex items-center gap-2 flex-shrink-0">
            <AppLogo size={32} />
            <span className="font-display font-bold text-base text-foreground tracking-tight">
              KeiTruckNation
            </span>
          </Link>

          {/* Nav Links */}
          <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            {[
              { label: 'Trucks', href: '/products' },
              { label: 'Parts', href: '/parts' },
              { label: 'Compare', href: '/compare' },
              { label: 'Configurator', href: '/configurator' },
              { label: 'Financing', href: '/financing' },
              { label: 'Import Process', href: '/import-process' },
              { label: 'Maintenance', href: '/maintenance' },
              { label: 'Glossary', href: '/glossary' },
              { label: 'Blog', href: '/blog' },
              { label: 'State Guide', href: '/state-guide' },
              { label: 'FAQ', href: '/faq' },
              { label: 'Shipping', href: '/shipping' },
              { label: 'Order Tracking', href: '/order-tracking' },
              { label: 'Trade-In', href: '/trade-in' },
              { label: 'Dealers', href: '/dealers' },
              { label: 'Reviews', href: '/reviews' },
              { label: 'Wishlist', href: '/wishlist' },
              { label: 'About', href: '/about' },
              { label: 'Contact', href: '/contact' },
              { label: 'Privacy', href: '/privacy-policy' },
              { label: 'Terms', href: '/terms' },
              { label: 'Sitemap', href: '/sitemap-page' },
            ].map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors min-h-[44px] flex items-center"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Social + Copyright */}
          <div className="flex items-center gap-4">
            <a
              href="https://www.facebook.com/keitrucknation"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="KeiTruckNation on Facebook"
              className="size-9 flex items-center justify-center rounded-full border border-border text-muted-foreground hover:text-primary hover:border-primary transition-all min-h-[44px] min-w-[44px]"
            >
              <MappedIcon icon="facebook" size={18} color="none" />
            </a>
            <a
              href="https://www.instagram.com/keitrucknation"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="KeiTruckNation on Instagram"
              className="size-9 flex items-center justify-center rounded-full border border-border text-muted-foreground hover:text-primary hover:border-primary transition-all min-h-[44px] min-w-[44px]"
            >
              <MappedIcon icon="instagram" size={18} color="none" />
            </a>
            <span className="text-xs text-muted-foreground ml-2">© 2026 KeiTruckNation</span>
          </div>
        </div>
        <p className="text-[10px] text-muted-foreground/70 text-center mt-6">
          Some icons and flags courtesy of{' '}
          <a
            href="https://www.flaticon.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-muted-foreground"
          >
            Flaticon
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
