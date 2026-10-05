'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';
import MappedIcon from '@/components/ui/MappedIcon';
import { cartStore, CartItem } from '@/lib/cartStore';

interface ShippingForm {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  country: string;
  zip: string;
}

type ShippingMethod = 'standard' | 'expedited';
type PaymentMethod =
  | 'bank_transfer'
  | 'visa'
  | 'cashapp'
  | 'zelle'
  | 'chime'
  | 'apple_pay'
  | 'bitcoin';

const SHIPPING_COUNTRIES: { region: string; countries: string[] }[] = [
  { region: 'United States', countries: ['United States'] },
  { region: 'Canada & Australia', countries: ['Canada', 'Australia'] },
  {
    region: 'South America',
    countries: [
      'Brazil',
      'Colombia',
      'Argentina',
      'Chile',
      'Peru',
      'Ecuador',
      'Bolivia',
      'Paraguay',
      'Uruguay',
      'Venezuela',
      'Guyana',
      'Suriname',
    ],
  },
  {
    region: 'Europe',
    countries: [
      'United Kingdom',
      'Germany',
      'France',
      'Italy',
      'Spain',
      'Netherlands',
      'Belgium',
      'Switzerland',
      'Austria',
      'Sweden',
      'Norway',
      'Denmark',
      'Finland',
      'Portugal',
      'Poland',
      'Czech Republic',
      'Hungary',
      'Romania',
      'Bulgaria',
      'Croatia',
      'Slovakia',
      'Slovenia',
      'Estonia',
      'Latvia',
      'Lithuania',
      'Luxembourg',
      'Malta',
      'Cyprus',
      'Ireland',
      'Greece',
    ],
  },
  {
    region: 'Middle East / UAE',
    countries: ['United Arab Emirates', 'Saudi Arabia', 'Qatar', 'Kuwait', 'Bahrain', 'Oman'],
  },
];

const PAYMENT_OPTIONS: { id: PaymentMethod; label: string; icon: string; description: string }[] = [
  {
    id: 'bank_transfer',
    label: 'Bank Transfer',
    icon: 'bank',
    description: 'Wire transfer directly to our account',
  },
  { id: 'visa', label: 'Visa / Mastercard', icon: 'visa', description: 'Secure card payment' },
  { id: 'cashapp', label: 'CashApp', icon: 'cashapp', description: 'Pay via $CashTag' },
  { id: 'zelle', label: 'Zelle', icon: 'zelle', description: 'Instant bank-to-bank transfer' },
  { id: 'chime', label: 'Chime', icon: 'chime', description: 'Pay via Chime account' },
  {
    id: 'apple_pay',
    label: 'Apple Pay',
    icon: 'applepay',
    description: 'One-tap payment with Face ID',
  },
  {
    id: 'bitcoin',
    label: 'Bitcoin (BTC)',
    icon: 'bitcoin',
    description: '10% discount applied automatically',
  },
];

function validatePhone(phone: string): boolean {
  const cleaned = phone.replace(/[\s\-().+]/g, '');
  return /^\d{7,15}$/.test(cleaned);
}

interface AnimatedCountrySelectProps {
  value: string;
  onChange: (val: string) => void;
  required?: boolean;
}

function AnimatedCountrySelect({ value, onChange, required }: AnimatedCountrySelectProps) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
        setSearch('');
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filteredGroups = SHIPPING_COUNTRIES.map((group) => ({
    ...group,
    countries: group.countries.filter((c) => c.toLowerCase().includes(search.toLowerCase())),
  })).filter((g) => g.countries.length > 0);

  const handleSelect = (country: string) => {
    onChange(country);
    setOpen(false);
    setSearch('');
  };

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className={`w-full flex items-center justify-between bg-input border rounded-xl px-4 py-3 text-sm text-left transition-all min-h-[48px] focus:outline-none ${open ? 'border-primary ring-1 ring-primary/30' : 'border-border hover:border-muted-foreground/40'}`}
      >
        <span className={value ? 'text-foreground font-medium' : 'text-muted-foreground'}>
          {value || 'Select country…'}
        </span>
        <Icon
          name="ChevronDownIcon"
          size={16}
          className={`text-muted-foreground flex-shrink-0 transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
        />
      </button>

      <div
        className={`absolute left-0 right-0 z-50 mt-1.5 bg-card border border-border rounded-2xl shadow-2xl overflow-hidden transition-all duration-300 origin-top ${open ? 'opacity-100 scale-y-100 translate-y-0 pointer-events-auto' : 'opacity-0 scale-y-95 -translate-y-2 pointer-events-none'}`}
        style={{ maxHeight: '320px' }}
      >
        <div className="p-2 border-b border-border sticky top-0 bg-card z-10">
          <div className="relative">
            <Icon
              name="MagnifyingGlassIcon"
              size={14}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
            />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search countries…"
              className="w-full bg-muted border border-border rounded-lg pl-8 pr-3 py-2 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>
        </div>
        <div className="overflow-y-auto" style={{ maxHeight: '260px' }}>
          {filteredGroups.length === 0 ? (
            <div className="px-4 py-6 text-center text-xs text-muted-foreground">
              No countries found
            </div>
          ) : (
            filteredGroups.map((group) => (
              <div key={group.region}>
                <div className="px-3 py-2 text-[10px] font-black uppercase tracking-widest text-muted-foreground bg-muted/50 sticky top-0">
                  {group.region}
                </div>
                {group.countries.map((country) => (
                  <button
                    key={country}
                    type="button"
                    onClick={() => handleSelect(country)}
                    className={`w-full text-left px-4 py-2.5 text-sm transition-colors hover:bg-primary/10 hover:text-primary ${value === country ? 'bg-primary/10 text-primary font-bold' : 'text-foreground'}`}
                  >
                    {country}
                    {value === country && (
                      <Icon name="CheckIcon" size={14} className="inline ml-2 text-primary" />
                    )}
                  </button>
                ))}
              </div>
            ))
          )}
        </div>
      </div>

      <input
        type="text"
        value={value}
        onChange={() => {}}
        required={required}
        className="sr-only"
        tabIndex={-1}
        aria-hidden="true"
      />
    </div>
  );
}

const CartClient: React.FC = () => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [promoCode, setPromoCode] = useState('');
  const [promoApplied, setPromoApplied] = useState(false);
  const [checkoutStep, setCheckoutStep] = useState<'cart' | 'shipping' | 'payment' | 'success'>(
    'cart'
  );
  const [shippingMethod, setShippingMethod] = useState<ShippingMethod>('standard');
  const [marineInsurance, setMarineInsurance] = useState(false);
  const [phoneError, setPhoneError] = useState('');
  const [selectedPayment, setSelectedPayment] = useState<PaymentMethod | null>(null);
  const [paymentError, setPaymentError] = useState('');
  const [form, setForm] = useState<ShippingForm>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    country: '',
    zip: '',
  });

  // Load from localStorage on mount and subscribe to changes
  useEffect(() => {
    setItems(cartStore.getItems());
    const unsub = cartStore.subscribe(() => setItems(cartStore.getItems()));
    return unsub;
  }, []);

  const updateQty = (id: string, delta: number) => {
    const item = items.find((i) => i.id === id);
    if (!item) return;
    const newQty = Math.max(1, item.quantity + delta);
    cartStore.updateQuantity(id, newQty);
  };

  const removeItem = (id: string) => {
    cartStore.removeItem(id);
  };

  const truckCount = items
    .filter((i) => i.category === 'truck')
    .reduce((s, i) => s + i.quantity, 0);
  const hasTruck = items.some((i) => i.category === 'truck');
  const freeShipping = truckCount >= 3;

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const baseShipping = freeShipping
    ? 0
    : hasTruck
      ? shippingMethod === 'expedited'
        ? 1350
        : 850
      : shippingMethod === 'expedited'
        ? 95
        : 45;

  const marineInsuranceCost = marineInsurance ? Math.round(subtotal * 0.015) : 0;
  const promoDiscount = promoApplied ? Math.round(subtotal * 0.05) : 0;
  const btcDiscount = selectedPayment === 'bitcoin' ? Math.round(subtotal * 0.1) : 0;
  const totalDiscount = promoDiscount + btcDiscount;
  const tax = Math.round((subtotal + baseShipping + marineInsuranceCost - totalDiscount) * 0.08);
  const total = subtotal + baseShipping + marineInsuranceCost - totalDiscount + tax;

  const handlePromo = () => {
    if (promoCode.trim().toUpperCase() === 'KEITRUCK10') setPromoApplied(true);
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (name === 'phone') {
      if (value && !validatePhone(value)) {
        setPhoneError('Enter a valid phone number (7-15 digits)');
      } else {
        setPhoneError('');
      }
    }
  };

  const handleCountryChange = (val: string) => {
    setForm((prev) => ({ ...prev, country: val }));
  };

  const handleShippingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.country) return;
    if (form.phone && !validatePhone(form.phone)) {
      setPhoneError('Enter a valid phone number (7-15 digits)');
      return;
    }
    setCheckoutStep('payment');
  };

  const handlePaymentSubmit = () => {
    if (!selectedPayment) {
      setPaymentError('Please select a payment method to continue.');
      return;
    }
    setPaymentError('');
    setCheckoutStep('success');
  };

  const steps: ('cart' | 'shipping' | 'payment')[] = ['cart', 'shipping', 'payment'];
  const stepIndex = steps.indexOf(checkoutStep as 'cart' | 'shipping' | 'payment');

  // Order Summary sidebar (shared)
  const OrderSummary = () => (
    <div className="lg:col-span-2 flex flex-col gap-4 lg:sticky lg:top-24">
      <div className="bg-card border border-border rounded-3xl p-6 flex flex-col gap-4">
        <h2 className="font-display font-bold text-lg text-foreground">Order Summary</h2>
        {items.map((item) => (
          <div key={item.id} className="flex items-center gap-3">
            <div className="relative size-12 rounded-xl overflow-hidden flex-shrink-0">
              <AppImage
                src={item.image}
                alt={item.imageAlt}
                fill
                sizes="48px"
                className="object-cover"
              />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-xs font-bold text-foreground truncate">{item.name}</div>
              <div className="text-xs text-muted-foreground">Qty: {item.quantity}</div>
            </div>
            <span className="text-sm font-black text-primary">
              ${(item.price * item.quantity).toLocaleString()}
            </span>
          </div>
        ))}
        <div className="border-t border-border pt-4 flex flex-col gap-3">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Subtotal</span>
            <span className="text-foreground font-bold">${subtotal.toLocaleString()}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">
              Shipping
              {freeShipping && (
                <span className="ml-1 text-xs text-green-400 font-bold">(FREE)</span>
              )}
            </span>
            {freeShipping ? (
              <span className="text-green-400 font-bold">$0</span>
            ) : (
              <span className="text-foreground font-bold">${baseShipping.toLocaleString()}</span>
            )}
          </div>
          {marineInsurance && (
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Marine Insurance (1.5%)</span>
              <span className="text-foreground font-bold">
                ${marineInsuranceCost.toLocaleString()}
              </span>
            </div>
          )}
          {promoApplied && (
            <div className="flex justify-between text-sm">
              <span className="text-green-400">Promo (KEITRUCK10)</span>
              <span className="text-green-400 font-bold">−${promoDiscount.toLocaleString()}</span>
            </div>
          )}
          {selectedPayment === 'bitcoin' && (
            <div className="flex justify-between text-sm">
              <span className="text-yellow-400 font-bold">BTC Discount (10%)</span>
              <span className="text-yellow-400 font-bold">−${btcDiscount.toLocaleString()}</span>
            </div>
          )}
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Est. Tax (8%)</span>
            <span className="text-foreground font-bold">${tax.toLocaleString()}</span>
          </div>
          <div className="border-t border-border pt-3 flex justify-between">
            <span className="font-black text-foreground">Total</span>
            <span className="font-display font-black text-2xl text-primary">
              ${total.toLocaleString()}
            </span>
          </div>
        </div>
      </div>

      {freeShipping && (
        <div className="bg-green-500/10 border border-green-500/30 rounded-2xl p-4 flex items-center gap-3">
          <Icon name="CheckCircleIcon" size={26} variant="solid" className="text-green-400" />
          <div>
            <div className="text-xs font-black text-green-400 uppercase tracking-widest">
              Free Shipping Unlocked!
            </div>
            <div className="text-xs text-muted-foreground mt-0.5">
              You&apos;re buying {truckCount} trucks. Shipping is on us.
            </div>
          </div>
        </div>
      )}

      <div className="bg-card border border-border rounded-3xl p-5 flex flex-col gap-3">
        {[
          { icon: 'ShieldCheckIcon' as const, text: 'Secure checkout, SSL encrypted' },
          { icon: 'DocumentCheckIcon' as const, text: 'All import paperwork handled' },
          { icon: 'GlobeAltIcon' as const, text: 'Ships to 50+ countries worldwide' },
          { icon: 'ArrowUturnLeftIcon' as const, text: '72-hour deposit refund guarantee' },
        ].map((badge) => (
          <div key={badge.text} className="flex items-center gap-3">
            <Icon name={badge.icon} size={16} className="text-primary flex-shrink-0" />
            <span className="text-xs text-muted-foreground">{badge.text}</span>
          </div>
        ))}
      </div>
    </div>
  );

  if (checkoutStep === 'success') {
    const orderNumber = `KTU-${Date.now().toString().slice(-6)}`;
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center px-4">
        <div className="max-w-lg w-full text-center flex flex-col items-center gap-6">
          <div className="size-20 bg-primary/10 border border-primary/30 rounded-full flex items-center justify-center">
            <Icon name="CheckBadgeIcon" size={40} className="text-primary" variant="solid" />
          </div>
          <div>
            <h1 className="font-display font-bold text-3xl sm:text-4xl text-foreground mb-3">
              Order Confirmed!
            </h1>
            <p className="text-muted-foreground text-base leading-relaxed">
              Your order has been received. We&apos;ll send a confirmation to{' '}
              <strong className="text-foreground">{form.email || 'your email'}</strong> within 24
              hours with shipping details and import documentation.
            </p>
          </div>

          {/* Print-friendly order summary */}
          <div
            id="order-confirmation-print"
            className="w-full bg-card border border-border rounded-3xl p-6 text-left flex flex-col gap-3"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="text-xs font-black uppercase tracking-widest text-muted-foreground">
                Order Summary
              </div>
              <div className="text-xs text-muted-foreground font-mono">#{orderNumber}</div>
            </div>

            {/* Customer info */}
            <div className="bg-muted/40 rounded-xl p-3 flex flex-col gap-1 text-xs mb-1">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Name</span>
                <span className="font-semibold text-foreground">
                  {form.firstName} {form.lastName}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Email</span>
                <span className="font-semibold text-foreground">{form.email}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Ship to</span>
                <span className="font-semibold text-foreground text-right">
                  {form.city}, {form.country}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Shipping</span>
                <span className="font-semibold text-foreground capitalize">
                  {shippingMethod === 'standard' ? 'Standard (6-8 wks)' : 'Expedited (2-3 wks)'}
                </span>
              </div>
            </div>

            {items.map((item) => (
              <div key={item.id} className="flex justify-between text-sm">
                <span className="text-foreground font-medium">{item.name}</span>
                <span className="text-primary font-bold">${item.price.toLocaleString()}</span>
              </div>
            ))}
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Shipping</span>
              <span
                className={freeShipping ? 'text-green-400 font-bold' : 'text-foreground font-bold'}
              >
                {freeShipping ? 'FREE' : `$${baseShipping.toLocaleString()}`}
              </span>
            </div>
            {marineInsurance && (
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Marine Insurance</span>
                <span className="text-foreground font-bold">
                  ${marineInsuranceCost.toLocaleString()}
                </span>
              </div>
            )}
            {selectedPayment === 'bitcoin' && (
              <div className="flex justify-between text-sm">
                <span className="text-yellow-400">BTC Discount (10%)</span>
                <span className="text-yellow-400 font-bold">−${btcDiscount.toLocaleString()}</span>
              </div>
            )}
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Payment Method</span>
              <span className="text-foreground font-bold capitalize">
                {PAYMENT_OPTIONS.find((p) => p.id === selectedPayment)?.label || 'N/A'}
              </span>
            </div>
            <div className="border-t border-border pt-3 flex justify-between font-black text-base">
              <span className="text-foreground">Total</span>
              <span className="text-primary">${total.toLocaleString()}</span>
            </div>
          </div>

          <div className="flex gap-3 w-full flex-wrap">
            <button
              onClick={() => window.print()}
              className="flex items-center justify-center gap-2 flex-1 px-5 py-3 border border-border rounded-2xl font-bold text-sm text-muted-foreground hover:text-foreground hover:bg-muted transition-all min-h-[44px]"
              aria-label="Print order confirmation"
            >
              <Icon name="PrinterIcon" size={16} />
              Print Receipt
            </button>
            <Link
              href="/"
              className="flex items-center justify-center gap-2 flex-1 px-5 py-4 bg-primary text-primary-foreground rounded-2xl font-black text-sm uppercase tracking-widest hover:scale-105 transition-transform min-h-[52px]"
            >
              Back to Home
              <Icon name="HomeIcon" size={16} />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center px-4">
        <div className="text-center flex flex-col items-center gap-6 max-w-md">
          <div className="size-24 bg-muted rounded-full flex items-center justify-center">
            <Icon name="ShoppingCartIcon" size={48} className="text-muted-foreground/40" />
          </div>
          <div>
            <h1 className="font-display font-bold text-3xl text-foreground mb-3">
              Your cart is empty
            </h1>
            <p className="text-muted-foreground">
              Looks like you haven&apos;t added any trucks or parts yet.
            </p>
          </div>
          <Link
            href="/inventory"
            className="flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground rounded-2xl font-black text-sm uppercase tracking-widest hover:scale-105 transition-transform min-h-[52px]"
          >
            Browse Inventory
            <Icon name="ArrowRightIcon" size={16} />
          </Link>
        </div>
      </div>
    );
  }

  const stepLabels = ['Cart', 'Shipping', 'Payment'];

  return (
    <div className="min-h-screen pt-24 sm:pt-28">
      {/* Page Header */}
      <div className="relative border-b border-border py-10 sm:py-14 overflow-hidden">
        <div className="absolute inset-0 grid-lines-bg opacity-20" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center gap-2 mb-3">
            <div className="size-2 bg-primary rounded-full" />
            <span className="tag-pill bg-primary/10 text-primary border border-primary/20">
              {items.reduce((s, i) => s + i.quantity, 0)} item
              {items.reduce((s, i) => s + i.quantity, 0) !== 1 ? 's' : ''}
            </span>
          </div>
          <h1
            className="font-display font-bold text-foreground"
            style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', lineHeight: 1.05 }}
          >
            {checkoutStep === 'cart'
              ? 'Your Cart'
              : checkoutStep === 'shipping'
                ? 'Shipping Details'
                : 'Payment Method'}
          </h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        {/* Step Indicator */}
        <div className="flex items-center gap-3 mb-8 sm:mb-12">
          {steps.map((step, i) => (
            <React.Fragment key={step}>
              <div
                className={`flex items-center gap-2 ${checkoutStep === step ? 'text-primary' : i < stepIndex ? 'text-muted-foreground' : 'text-muted-foreground/40'}`}
              >
                <div
                  className={`size-7 rounded-full border-2 flex items-center justify-center text-xs font-black ${checkoutStep === step ? 'border-primary bg-primary text-primary-foreground' : i < stepIndex ? 'border-muted-foreground bg-muted-foreground text-background' : 'border-current'}`}
                >
                  {i < stepIndex ? <Icon name="CheckIcon" size={12} /> : i + 1}
                </div>
                <span className="text-xs font-bold uppercase tracking-widest hidden sm:inline">
                  {stepLabels[i]}
                </span>
              </div>
              {i < 2 && <div className="flex-1 h-px bg-border max-w-12" />}
            </React.Fragment>
          ))}
        </div>

        <div className="grid lg:grid-cols-5 gap-6 sm:gap-8 items-start">
          {/* Left: Cart / Shipping / Payment */}
          <div className="lg:col-span-3 flex flex-col gap-4">
            {/* ── CART STEP ── */}
            {checkoutStep === 'cart' && (
              <>
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="bg-card border border-border rounded-3xl p-4 sm:p-6 flex gap-4 sm:gap-5"
                  >
                    <div className="relative w-20 h-16 sm:w-28 sm:h-20 rounded-2xl overflow-hidden flex-shrink-0">
                      <AppImage
                        src={item.image}
                        alt={item.imageAlt}
                        fill
                        sizes="112px"
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0 flex flex-col gap-2">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <div className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-0.5 inline-flex items-center gap-1.5">
                            <MappedIcon
                              icon={item.category === 'truck' ? 'truck' : 'wrench'}
                              size={13}
                            />
                            {item.category === 'truck' ? 'Truck' : 'Part'}
                          </div>
                          <h3 className="font-display font-bold text-base sm:text-lg text-foreground leading-tight">
                            {item.name}
                          </h3>
                          <p className="text-xs text-muted-foreground mt-0.5">{item.subtitle}</p>
                        </div>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="flex-shrink-0 size-8 rounded-full bg-muted hover:bg-red-500/20 hover:text-red-400 text-muted-foreground flex items-center justify-center transition-colors min-h-[44px] min-w-[44px]"
                          aria-label="Remove item"
                        >
                          <Icon name="TrashIcon" size={14} />
                        </button>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {item.specs.map((spec) => (
                          <span
                            key={spec}
                            className="text-xs px-2 py-0.5 bg-muted rounded-full text-muted-foreground border border-border"
                          >
                            {spec}
                          </span>
                        ))}
                      </div>
                      <div className="flex items-center justify-between pt-2 border-t border-border">
                        <div className="flex items-center gap-2 bg-muted rounded-xl border border-border">
                          <button
                            onClick={() => updateQty(item.id, -1)}
                            className="size-9 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors min-h-[44px] min-w-[44px]"
                            aria-label="Decrease quantity"
                          >
                            <Icon name="MinusIcon" size={14} />
                          </button>
                          <span className="text-sm font-black text-foreground w-6 text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQty(item.id, 1)}
                            className="size-9 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors min-h-[44px] min-w-[44px]"
                            aria-label="Increase quantity"
                          >
                            <Icon name="PlusIcon" size={14} />
                          </button>
                        </div>
                        <span className="font-display font-black text-xl text-primary">
                          ${(item.price * item.quantity).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Free shipping nudge */}
                {hasTruck && !freeShipping && (
                  <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-2xl p-4 flex items-center gap-3">
                    <Icon name="TruckIcon" size={20} className="text-yellow-400" />
                    <div className="text-xs text-muted-foreground">
                      <span className="font-bold text-yellow-400">
                        Buy {3 - truckCount} more truck{3 - truckCount !== 1 ? 's' : ''}
                      </span>{' '}
                      to unlock <span className="font-bold text-yellow-400">FREE shipping</span> on
                      your entire order!
                    </div>
                  </div>
                )}

                {/* Promo Code */}
                <div className="bg-card border border-border rounded-3xl p-5 flex gap-3">
                  <input
                    type="text"
                    placeholder="Promo code (try KEITRUCK10)"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    className="flex-1 bg-input border border-border rounded-xl px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary min-h-[44px]"
                  />
                  <button
                    onClick={handlePromo}
                    disabled={promoApplied}
                    className={`px-5 py-2.5 rounded-xl font-bold text-xs uppercase tracking-widest min-h-[44px] transition-all ${promoApplied ? 'bg-green-500/20 text-green-400 border border-green-500/30' : 'bg-primary text-primary-foreground hover:scale-105'}`}
                  >
                    {promoApplied ? (
                      <>
                        <Icon name="CheckIcon" size={14} className="inline mr-1" />
                        Applied!
                      </>
                    ) : (
                      'Apply'
                    )}
                  </button>
                </div>

                <div className="flex gap-3 pt-2">
                  <Link
                    href="/inventory"
                    className="flex items-center gap-2 px-5 py-3 border border-border rounded-xl text-xs font-bold text-muted-foreground hover:text-foreground hover:bg-muted transition-all min-h-[44px]"
                  >
                    <Icon name="ArrowLeftIcon" size={14} />
                    Continue Shopping
                  </Link>
                  <button
                    onClick={() => setCheckoutStep('shipping')}
                    className="flex-1 flex items-center justify-center gap-2 py-3 bg-primary text-primary-foreground rounded-xl font-black text-sm uppercase tracking-widest hover:scale-105 transition-transform glow-lime min-h-[44px]"
                  >
                    Proceed to Shipping
                    <Icon name="ArrowRightIcon" size={16} />
                  </button>
                </div>
              </>
            )}

            {/* ── SHIPPING STEP ── */}
            {checkoutStep === 'shipping' && (
              <form onSubmit={handleShippingSubmit} className="flex flex-col gap-4">
                <div className="bg-card border border-border rounded-3xl p-6 flex flex-col gap-5">
                  <h2 className="font-display font-bold text-xl text-foreground">
                    Shipping Details
                  </h2>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[
                      { name: 'firstName', label: 'First Name', placeholder: 'Dale' },
                      { name: 'lastName', label: 'Last Name', placeholder: 'Hutchinson' },
                    ].map((field) => (
                      <div key={field.name} className="flex flex-col gap-1.5">
                        <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                          {field.label}
                        </label>
                        <input
                          name={field.name}
                          value={form[field.name as keyof ShippingForm]}
                          onChange={handleFormChange}
                          placeholder={field.placeholder}
                          required
                          className="bg-input border border-border rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary min-h-[48px]"
                        />
                      </div>
                    ))}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                        Email Address
                      </label>
                      <input
                        name="email"
                        type="email"
                        value={form.email}
                        onChange={handleFormChange}
                        placeholder="dale@example.com"
                        required
                        className="bg-input border border-border rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary min-h-[48px]"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                        Phone Number
                      </label>
                      <input
                        name="phone"
                        type="tel"
                        value={form.phone}
                        onChange={handleFormChange}
                        placeholder="+1 (559) 555-0142"
                        required
                        className={`bg-input border rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 min-h-[48px] ${phoneError ? 'border-red-500 focus:ring-red-500/30' : 'border-border focus:ring-primary'}`}
                      />
                      {phoneError && (
                        <p className="text-xs text-red-400 flex items-center gap-1 mt-0.5">
                          <Icon name="ExclamationCircleIcon" size={12} />
                          {phoneError}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                      Street Address
                    </label>
                    <input
                      name="address"
                      value={form.address}
                      onChange={handleFormChange}
                      placeholder="1842 County Road 14"
                      required
                      className="bg-input border border-border rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary min-h-[48px]"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                        City
                      </label>
                      <input
                        name="city"
                        value={form.city}
                        onChange={handleFormChange}
                        placeholder="Fresno"
                        required
                        className="bg-input border border-border rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary min-h-[48px]"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                        ZIP / Postal Code
                      </label>
                      <input
                        name="zip"
                        value={form.zip}
                        onChange={handleFormChange}
                        placeholder="93701"
                        required
                        maxLength={10}
                        className="bg-input border border-border rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary min-h-[48px]"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                      Country <span className="text-accent">*</span>
                    </label>
                    <AnimatedCountrySelect
                      value={form.country}
                      onChange={handleCountryChange}
                      required
                    />
                    {!form.country && (
                      <p className="text-xs text-muted-foreground mt-1">
                        We ship to USA, Canada, Australia, South America, Europe, and UAE.
                      </p>
                    )}
                  </div>
                </div>

                {/* Shipping Method Selector */}
                <div className="bg-card border border-border rounded-3xl p-6 flex flex-col gap-4">
                  <h2 className="font-display font-bold text-xl text-foreground">
                    Shipping Method
                  </h2>
                  {freeShipping ? (
                    <div className="bg-green-500/10 border border-green-500/30 rounded-2xl p-4 flex items-center gap-3">
                      <Icon
                        name="CheckCircleIcon"
                        size={26}
                        variant="solid"
                        className="text-green-400"
                      />
                      <div>
                        <div className="text-sm font-black text-green-400">
                          Free Shipping Applied!
                        </div>
                        <div className="text-xs text-muted-foreground mt-0.5">
                          You&apos;re ordering {truckCount} trucks. Shipping is complimentary.
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col gap-3">
                      {[
                        {
                          id: 'standard' as ShippingMethod,
                          label: 'Standard Shipping',
                          duration: '6-8 weeks',
                          cost: hasTruck ? 850 : 45,
                          description:
                            'Ocean freight via standard container. Includes port handling and customs clearance.',
                          icon: 'ship',
                        },
                        {
                          id: 'expedited' as ShippingMethod,
                          label: 'Expedited Shipping',
                          duration: '2-3 weeks',
                          cost: hasTruck ? 1350 : 95,
                          description:
                            'Priority container booking with faster port processing. Ideal for time-sensitive orders.',
                          icon: 'lightning',
                        },
                      ].map((option) => (
                        <button
                          key={option.id}
                          type="button"
                          onClick={() => setShippingMethod(option.id)}
                          className={`w-full text-left p-4 rounded-2xl border-2 transition-all ${shippingMethod === option.id ? 'border-primary bg-primary/5' : 'border-border hover:border-muted-foreground/40'}`}
                        >
                          <div className="flex items-start justify-between gap-3">
                            <div className="flex items-start gap-3">
                              <MappedIcon icon={option.icon} size={26} className="mt-0.5" />
                              <div>
                                <div className="flex items-center gap-2">
                                  <span className="font-bold text-sm text-foreground">
                                    {option.label}
                                  </span>
                                  <span className="text-xs px-2 py-0.5 bg-muted rounded-full text-muted-foreground border border-border">
                                    {option.duration}
                                  </span>
                                </div>
                                <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                                  {option.description}
                                </p>
                              </div>
                            </div>
                            <div className="flex flex-col items-end gap-1 flex-shrink-0">
                              <span className="font-black text-primary text-base">
                                ${option.cost.toLocaleString()}
                              </span>
                              {shippingMethod === option.id && (
                                <div className="size-5 rounded-full bg-primary flex items-center justify-center">
                                  <Icon
                                    name="CheckIcon"
                                    size={12}
                                    className="text-primary-foreground"
                                  />
                                </div>
                              )}
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Marine Insurance */}
                <div className="bg-card border border-border rounded-3xl p-6">
                  <button
                    type="button"
                    onClick={() => setMarineInsurance(!marineInsurance)}
                    className="w-full flex items-start gap-4 text-left"
                  >
                    <div
                      className={`mt-0.5 size-5 rounded border-2 flex items-center justify-center flex-shrink-0 transition-all ${marineInsurance ? 'bg-primary border-primary' : 'border-border'}`}
                    >
                      {marineInsurance && (
                        <Icon name="CheckIcon" size={12} className="text-primary-foreground" />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-bold text-sm text-foreground">
                          Add Marine Insurance
                        </span>
                        <span className="text-xs px-2 py-0.5 bg-blue-500/10 text-blue-400 border border-blue-500/20 rounded-full">
                          Optional
                        </span>
                        <span className="text-xs font-bold text-primary">
                          +$
                          {marineInsuranceCost > 0
                            ? marineInsuranceCost.toLocaleString()
                            : Math.round(subtotal * 0.015).toLocaleString()}{' '}
                          (1.5%)
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                        Covers loss, theft, or damage during ocean transit. Recommended for all
                        truck shipments. Claim processing within 30 days.
                      </p>
                    </div>
                  </button>
                </div>

                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setCheckoutStep('cart')}
                    className="flex items-center gap-2 px-5 py-3 border border-border rounded-xl text-xs font-bold text-muted-foreground hover:text-foreground hover:bg-muted transition-all min-h-[44px]"
                  >
                    <Icon name="ArrowLeftIcon" size={14} />
                    Back to Cart
                  </button>
                  <button
                    type="submit"
                    className="flex-1 flex items-center justify-center gap-2 py-3 bg-primary text-primary-foreground rounded-xl font-black text-sm uppercase tracking-widest hover:scale-105 transition-transform glow-lime min-h-[44px]"
                  >
                    Continue to Payment
                    <Icon name="ArrowRightIcon" size={16} />
                  </button>
                </div>
              </form>
            )}

            {/* ── PAYMENT STEP ── */}
            {checkoutStep === 'payment' && (
              <div className="flex flex-col gap-4">
                <div className="bg-card border border-border rounded-3xl p-6 flex flex-col gap-5">
                  <h2 className="font-display font-bold text-xl text-foreground">
                    Select Payment Method
                  </h2>
                  <p className="text-sm text-muted-foreground -mt-2">
                    Choose how you&apos;d like to pay. Bitcoin payments receive an automatic 10%
                    discount.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {PAYMENT_OPTIONS.map((option) => (
                      <button
                        key={option.id}
                        type="button"
                        onClick={() => {
                          setSelectedPayment(option.id);
                          setPaymentError('');
                        }}
                        className={`relative text-left p-4 rounded-2xl border-2 transition-all ${selectedPayment === option.id ? 'border-primary bg-primary/5' : 'border-border hover:border-muted-foreground/40'}`}
                      >
                        {option.id === 'bitcoin' && (
                          <div className="absolute -top-2 -right-2 bg-yellow-400 text-black text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-widest">
                            10% OFF
                          </div>
                        )}
                        <div className="flex items-start gap-3">
                          {option.id === 'visa' ? (
                            <div className="flex items-center gap-1 flex-shrink-0">
                              <MappedIcon icon="visa" size={26} color="none" />
                              <MappedIcon icon="mastercard" size={26} color="none" />
                            </div>
                          ) : (
                            <MappedIcon icon={option.icon} size={26} color="none" />
                          )}
                          <div className="flex-1 min-w-0">
                            <div className="font-bold text-sm text-foreground">{option.label}</div>
                            <div className="text-xs text-muted-foreground mt-0.5">
                              {option.description}
                            </div>
                          </div>
                          {selectedPayment === option.id && (
                            <div className="size-5 rounded-full bg-primary flex items-center justify-center flex-shrink-0 mt-0.5">
                              <Icon
                                name="CheckIcon"
                                size={12}
                                className="text-primary-foreground"
                              />
                            </div>
                          )}
                        </div>
                      </button>
                    ))}
                  </div>

                  {selectedPayment === 'bitcoin' && (
                    <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-2xl p-4 flex items-center gap-3">
                      <span className="text-2xl">₿</span>
                      <div>
                        <div className="text-sm font-black text-yellow-400">
                          10% BTC Discount Applied!
                        </div>
                        <div className="text-xs text-muted-foreground mt-0.5">
                          You save{' '}
                          <span className="font-bold text-yellow-400">
                            ${btcDiscount.toLocaleString()}
                          </span>{' '}
                          by paying with Bitcoin.
                        </div>
                      </div>
                    </div>
                  )}

                  {paymentError && (
                    <div className="flex items-center gap-2 text-red-400 text-sm bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3">
                      <Icon name="ExclamationCircleIcon" size={16} />
                      {paymentError}
                    </div>
                  )}
                </div>

                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setCheckoutStep('shipping')}
                    className="flex items-center gap-2 px-5 py-3 border border-border rounded-xl text-xs font-bold text-muted-foreground hover:text-foreground hover:bg-muted transition-all min-h-[44px]"
                  >
                    <Icon name="ArrowLeftIcon" size={14} />
                    Back
                  </button>
                  <button
                    type="button"
                    onClick={handlePaymentSubmit}
                    className="flex-1 flex items-center justify-center gap-2 py-3 bg-primary text-primary-foreground rounded-xl font-black text-sm uppercase tracking-widest hover:scale-105 transition-transform glow-lime min-h-[44px]"
                  >
                    Place Order: ${total.toLocaleString()}
                    <Icon name="LockClosedIcon" size={16} />
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Right: Order Summary */}
          <OrderSummary />
        </div>
      </div>
    </div>
  );
};

export default CartClient;
