'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';
import { INVENTORY, InventoryTruck } from '@/lib/inventory';
import { cartStore } from '@/lib/cartStore';
import { wishlistStore } from '@/lib/wishlistStore';
import { useLanguage } from '@/components/LanguageSelector';

function conditionLabel(truck: InventoryTruck): string {
  return (
    truck.detailSpecs.find((s) => s.label === 'Condition')?.value ??
    (truck.inStock ? 'In Stock' : 'Sold')
  );
}

export default function TruckDetailPage() {
  const params = useParams();
  const id = typeof params?.id === 'string' ? params.id : '';
  // Links across the site use either the truck's slug (e.g. "carry-flatbed-4wd")
  // or its id (e.g. "fb-1"), so accept both.
  const found = INVENTORY.find((t) => t.slug === id) ?? INVENTORY.find((t) => t.id === id);
  // Hooks below need a truck object; the not-found screen is rendered after them.
  const truck = found ?? INVENTORY[0];
  const { t: strings } = useLanguage();

  const [activeImg, setActiveImg] = useState(0);
  const [addedToCart, setAddedToCart] = useState(false);
  const [inWishlist, setInWishlist] = useState(false);
  const [downPayment, setDownPayment] = useState(2000);
  const [termMonths, setTermMonths] = useState(48);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 80);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    setInWishlist(wishlistStore.isInWishlist(truck.id));
    const unsub = wishlistStore.subscribe(() =>
      setInWishlist(wishlistStore.isInWishlist(truck.id))
    );
    return unsub;
  }, [truck.id]);

  const handleAddToCart = () => {
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
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2500);
  };

  const handleToggleWishlist = () => {
    const nowIn = wishlistStore.toggle({
      id: truck.id,
      name: truck.name,
      year: truck.year,
      make: truck.make,
      price: truck.price,
      image: truck.image,
      imageAlt: truck.imageAlt,
      badge: truck.badge,
      specs: truck.specs,
      category: 'truck',
    });
    setInWishlist(nowIn);
  };

  // Simple financing estimate
  const loanAmount = truck.price - downPayment;
  const monthlyRate = 0.0699 / 12;
  const monthlyPayment =
    loanAmount > 0 ? (loanAmount * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -termMonths)) : 0;

  // Prefer trucks from the same category, then fill with others.
  const relatedTrucks = [
    ...INVENTORY.filter((t) => t.id !== truck.id && t.category === truck.category),
    ...INVENTORY.filter((t) => t.id !== truck.id && t.category !== truck.category),
  ].slice(0, 2);

  if (!found) {
    return (
      <main className="min-h-screen bg-background">
        <Header />
        <div className="pt-28 sm:pt-32 pb-20 max-w-2xl mx-auto px-4 sm:px-6 text-center">
          <div className="mx-auto mb-6 size-20 rounded-2xl bg-primary/10 border-2 border-primary/20 flex items-center justify-center">
            <Icon name="TruckIcon" size={40} className="text-primary" />
          </div>
          <h1 className="font-display font-bold text-3xl sm:text-4xl text-foreground mb-3">
            We couldn&apos;t find that truck
          </h1>
          <p className="text-muted-foreground mb-8">
            It may have been sold or the link is out of date. Browse what&apos;s available now, or
            tell us what you&apos;re looking for and we&apos;ll source it.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/products"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-black text-xs uppercase tracking-widest hover:scale-105 transition-transform min-h-[48px]"
            >
              <Icon name="TruckIcon" size={16} />
              Browse all trucks
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl border border-border text-foreground font-black text-xs uppercase tracking-widest hover:border-primary hover:text-primary transition-colors min-h-[48px]"
            >
              Request a truck
            </Link>
          </div>
        </div>
        <Footer />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background">
      <Header />

      <div
        className={`pt-20 sm:pt-24 transition-all duration-700 ${visible ? 'opacity-100' : 'opacity-0'}`}
      >
        {/* Breadcrumb */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <nav className="flex items-center gap-2 text-xs text-muted-foreground font-bold uppercase tracking-widest">
            <Link href="/" className="hover:text-primary transition-colors">
              Home
            </Link>
            <Icon name="ChevronRightIcon" size={12} />
            <Link href="/products" className="hover:text-primary transition-colors">
              Trucks
            </Link>
            <Icon name="ChevronRightIcon" size={12} />
            <span className="text-foreground">
              {truck.year} {truck.make} {truck.name}
            </span>
          </nav>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-16 sm:pb-24">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-8 lg:gap-12">
            {/* LEFT - Gallery + Details */}
            <div className="flex flex-col gap-8">
              {/* Gallery */}
              <div className="flex flex-col gap-3">
                <div className="relative aspect-[16/10] rounded-3xl overflow-hidden border border-border bg-card">
                  <AppImage
                    src={truck.gallery[activeImg].src}
                    alt={truck.gallery[activeImg].alt}
                    fill
                    sizes="(max-width: 1024px) 100vw, 60vw"
                    className="object-cover"
                  />

                  {truck.badge && (
                    <div
                      className={`absolute top-4 left-4 tag-pill ${truck.badgeColor === 'accent' ? 'bg-accent text-white' : 'bg-primary text-primary-foreground'}`}
                    >
                      {truck.badge}
                    </div>
                  )}
                  <div className="absolute top-4 right-4 tag-pill bg-black/60 backdrop-blur-sm text-white border border-white/10">
                    {conditionLabel(truck)}
                  </div>
                </div>
                {/* Thumbnails */}
                <div className="flex gap-3">
                  {truck.gallery.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveImg(i)}
                      className={`relative flex-1 aspect-[16/10] rounded-xl overflow-hidden border-2 transition-all ${activeImg === i ? 'border-primary' : 'border-border hover:border-muted-foreground'}`}
                    >
                      <AppImage
                        src={img.src}
                        alt={img.alt}
                        fill
                        sizes="20vw"
                        className="object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* Description */}
              <div className="bg-card border border-border rounded-3xl p-6 sm:p-8">
                <h2 className="font-display font-bold text-xl text-foreground mb-4">
                  About This Truck
                </h2>
                <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">
                  {truck.description}
                </p>
                <ul className="mt-5 flex flex-col gap-2.5">
                  {truck.highlights.map((h) => (
                    <li key={h} className="flex items-start gap-3 text-sm text-foreground">
                      <span className="mt-0.5 size-5 rounded-full bg-primary/15 flex items-center justify-center flex-shrink-0">
                        <Icon name="CheckIcon" size={11} className="text-primary" />
                      </span>
                      {h}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Full Specs Table */}
              <div className="bg-card border border-border rounded-3xl p-6 sm:p-8">
                <h2 className="font-display font-bold text-xl text-foreground mb-5">
                  Full Specifications
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-0">
                  {truck.detailSpecs.map((spec, i) => (
                    <div
                      key={spec.label}
                      className={`flex justify-between items-center py-3 ${i < truck.detailSpecs.length - 1 ? 'border-b border-border' : ''}`}
                    >
                      <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                        {spec.label}
                      </span>
                      <span className="text-sm font-bold text-foreground text-right">
                        {spec.value}
                      </span>
                    </div>
                  ))}
                </div>
                {truck.vin && (
                  <div className="mt-4 pt-4 border-t border-border flex justify-between items-center">
                    <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                      Stock / VIN
                    </span>
                    <span className="text-xs font-mono text-muted-foreground">{truck.vin}</span>
                  </div>
                )}
              </div>

              {/* Shipping Info */}
              <div className="bg-secondary/40 border border-border rounded-3xl p-6 sm:p-8">
                <h2 className="font-display font-bold text-xl text-foreground mb-5">
                  Shipping & Delivery
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {[
                    { icon: 'MapPinIcon', title: 'Port Location', desc: truck.location },
                    {
                      icon: 'TruckIcon',
                      title: 'Domestic Freight',
                      desc: 'Flat-bed delivery to your door, quotes available',
                    },
                    {
                      icon: 'DocumentCheckIcon',
                      title: 'Title & Docs',
                      desc: 'Clean Japanese export title + US customs clearance included',
                    },
                  ].map((item) => (
                    <div key={item.title} className="flex flex-col gap-2">
                      <div className="size-9 rounded-xl bg-primary/10 flex items-center justify-center">
                        <Icon name={item.icon as 'MapPinIcon'} size={18} className="text-primary" />
                      </div>
                      <span className="text-xs font-black uppercase tracking-widest text-foreground">
                        {item.title}
                      </span>
                      <span className="text-xs text-muted-foreground leading-relaxed">
                        {item.desc}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* RIGHT - Sticky Purchase Panel */}
            <div className="flex flex-col gap-5">
              <div className="lg:sticky lg:top-24 flex flex-col gap-5">
                {/* Price Card */}
                <div className="bg-card border border-border rounded-3xl p-6 sm:p-7">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="size-2 bg-primary rounded-full animate-pulse-glow" />
                    <span className="tag-pill bg-primary/10 text-primary border border-primary/20">
                      In Stock
                    </span>
                  </div>
                  <div className="mb-1">
                    <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                      {truck.year} {truck.make}
                    </span>
                  </div>
                  <h1
                    className="font-display font-bold text-foreground mb-4"
                    style={{ fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', lineHeight: 1.1 }}
                  >
                    {truck.name}
                  </h1>

                  <div className="flex items-baseline gap-2 mb-1">
                    <span className="font-display font-black text-4xl text-primary">
                      ${truck.price.toLocaleString()}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground mb-6">
                    Price excludes domestic freight & applicable taxes
                  </p>

                  <div className="flex flex-col gap-3">
                    <button
                      onClick={handleAddToCart}
                      className={`w-full flex items-center justify-center gap-2 py-4 rounded-2xl font-bold text-sm uppercase tracking-widest transition-all min-h-[52px] ${
                        addedToCart
                          ? 'bg-green-500 text-white'
                          : 'bg-primary text-primary-foreground hover:scale-[1.02] hover:glow-lime'
                      }`}
                    >
                      {addedToCart ? (
                        <>
                          <Icon name="CheckIcon" size={18} /> Added to Cart!
                        </>
                      ) : (
                        <>
                          <Icon name="ShoppingCartIcon" size={18} /> {strings.actions.addToCart}
                        </>
                      )}
                    </button>
                    <div className="flex gap-3">
                      <button
                        onClick={handleToggleWishlist}
                        aria-pressed={inWishlist}
                        className={`flex-1 flex items-center justify-center gap-2 py-3.5 rounded-2xl font-bold text-xs uppercase tracking-widest border transition-all min-h-[48px] ${
                          inWishlist
                            ? 'border-accent bg-accent/10 text-accent'
                            : 'border-border text-foreground hover:bg-muted'
                        }`}
                      >
                        <Icon
                          name="HeartIcon"
                          size={16}
                          variant={inWishlist ? 'solid' : 'outline'}
                        />
                        {inWishlist
                          ? strings.actions.removeFromWishlist
                          : strings.actions.addToWishlist}
                      </button>
                      <Link
                        href="/contact"
                        className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-2xl font-bold text-xs uppercase tracking-widest border border-border text-foreground hover:bg-muted transition-all min-h-[48px]"
                      >
                        <Icon name="ChatBubbleLeftRightIcon" size={16} />
                        Ask
                      </Link>
                    </div>
                  </div>

                  <div className="mt-5 pt-5 border-t border-border flex flex-col gap-2">
                    {[
                      { icon: 'ShieldCheckIcon', text: 'Inspected & graded in Japan' },
                      { icon: 'DocumentTextIcon', text: 'Clean title, customs cleared' },
                      { icon: 'PhoneIcon', text: 'Expert support 7 days a week' },
                    ].map((item) => (
                      <div
                        key={item.text}
                        className="flex items-center gap-3 text-xs text-muted-foreground"
                      >
                        <Icon
                          name={item.icon as 'ShieldCheckIcon'}
                          size={14}
                          className="text-primary flex-shrink-0"
                        />
                        {item.text}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Financing Calculator */}
                <div className="bg-card border border-border rounded-3xl p-6 sm:p-7">
                  <h3 className="font-display font-bold text-lg text-foreground mb-1">
                    Estimate Financing
                  </h3>
                  <p className="text-xs text-muted-foreground mb-5">
                    Illustrative only: rates from partner lenders vary
                  </p>

                  <div className="flex flex-col gap-4">
                    <div>
                      <div className="flex justify-between mb-2">
                        <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                          Down Payment
                        </label>
                        <span className="text-xs font-black text-primary">
                          ${downPayment.toLocaleString()}
                        </span>
                      </div>
                      <input
                        type="range"
                        min={500}
                        max={Math.floor(truck.price * 0.5)}
                        step={250}
                        value={downPayment}
                        onChange={(e) => setDownPayment(parseInt(e.target.value))}
                        className="w-full accent-primary"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between mb-2">
                        <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                          Term
                        </label>
                        <span className="text-xs font-black text-primary">{termMonths} months</span>
                      </div>
                      <div className="flex gap-2">
                        {[24, 36, 48, 60].map((m) => (
                          <button
                            key={m}
                            onClick={() => setTermMonths(m)}
                            className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all min-h-[36px] ${termMonths === m ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground hover:text-foreground'}`}
                          >
                            {m}mo
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="bg-secondary/60 rounded-2xl p-4 flex items-center justify-between">
                      <div>
                        <div className="text-xs text-muted-foreground font-bold uppercase tracking-widest mb-1">
                          Est. Monthly
                        </div>
                        <div className="font-display font-black text-2xl text-primary">
                          ${monthlyPayment > 0 ? Math.ceil(monthlyPayment).toLocaleString() : ' - '}
                          <span className="text-sm text-muted-foreground font-normal">/mo</span>
                        </div>
                      </div>
                      <div className="text-right text-xs text-muted-foreground">
                        <div>Loan: ${loanAmount.toLocaleString()}</div>
                        <div>Rate: ~6.99% APR</div>
                      </div>
                    </div>

                    <Link
                      href="/contact"
                      className="w-full flex items-center justify-center gap-2 py-3 rounded-2xl font-bold text-xs uppercase tracking-widest bg-accent/10 text-accent border border-accent/20 hover:bg-accent/20 transition-all min-h-[44px]"
                    >
                      <Icon name="CurrencyDollarIcon" size={16} />
                      Apply for Financing
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Related Trucks */}
          <div className="mt-16 sm:mt-20">
            <div className="flex items-center justify-between mb-8">
              <h2
                className="font-display font-bold text-foreground"
                style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)' }}
              >
                More Trucks
              </h2>
              <Link
                href="/products"
                className="flex items-center gap-2 text-sm font-bold text-muted-foreground hover:text-primary transition-colors group"
              >
                View all
                <Icon
                  name="ArrowRightIcon"
                  size={16}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
              {relatedTrucks.map((rt) => (
                <Link
                  key={rt.id}
                  href={`/trucks/${rt.slug}`}
                  className="group bg-card border border-border rounded-3xl overflow-hidden card-hover flex flex-col"
                >
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <AppImage
                      src={rt.image}
                      alt={rt.imageAlt}
                      fill
                      sizes="(max-width: 640px) 100vw, 50vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-card/60 to-transparent" />
                  </div>
                  <div className="p-5 flex flex-col gap-2">
                    <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                      {rt.year} {rt.make}
                    </span>
                    <h3 className="font-display font-bold text-lg text-foreground">{rt.name}</h3>
                    <div className="flex items-center justify-between mt-1">
                      <span className="font-display font-black text-xl text-primary">
                        ${rt.price.toLocaleString()}
                      </span>
                      <span className="text-xs text-muted-foreground">{rt.mileage}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
