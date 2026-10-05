'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Icon from '@/components/ui/AppIcon';
import LocationPin from '@/components/ui/LocationPin';
import AppImage from '@/components/ui/AppImage';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

interface Partner {
  name: string;
  type: string;
  location: string;
  since: string;
  specialties: string[];
  image: string;
  imageAlt: string;
}

const partners: Partner[] = [
  {
    name: 'Blue Ridge Farm Supply',
    type: 'Authorized Dealer',
    location: 'Asheville, NC',
    since: '2021',
    specialties: ['Flatbed', 'Dump', '4WD'],
    image: 'https://img.rocket.new/generatedImages/rocket_gen_img_1b75cd334-1787343437984.png',
    imageAlt: 'Blue Ridge Farm Supply storefront with kei trucks on display lot in North Carolina',
  },
  {
    name: 'Pacific Rim Imports',
    type: 'Regional Distributor',
    location: 'Portland, OR',
    since: '2020',
    specialties: ['All Categories', 'Parts', 'Service'],
    image: 'https://img.rocket.new/generatedImages/rocket_gen_img_10b6983c8-1787343438002.png',
    imageAlt:
      'Pacific Rim Imports dealership lot with Japanese kei trucks lined up in Portland Oregon',
  },
  {
    name: 'Lone Star Kei',
    type: 'Authorized Dealer',
    location: 'Austin, TX',
    since: '2022',
    specialties: ['Specialty', 'Crew Cab', 'Financing'],
    image: 'https://img.rocket.new/generatedImages/rocket_gen_img_11e537e06-1787343437988.png',
    imageAlt: 'Lone Star Kei truck dealership in Austin Texas with kei trucks on display',
  },
  {
    name: 'Great Lakes Mini Trucks',
    type: 'Authorized Dealer',
    location: 'Columbus, OH',
    since: '2023',
    specialties: ['Dump', 'Box Van', 'Parts'],
    image: 'https://img.rocket.new/generatedImages/rocket_gen_img_114688efe-1787343437974.png',
    imageAlt: 'Great Lakes Mini Trucks dealer in Ohio with kei trucks parked outside',
  },
];

const dealerTiers = [
  {
    tier: 'Authorized Dealer',
    price: 'Free',
    color: 'border-border',
    badge: '',
    perks: [
      'Access to wholesale inventory pricing',
      'Co-branded listing on KeiTruckNation.com',
      'Marketing materials & photography',
      'Dedicated dealer support line',
      'Quarterly inventory allocation',
    ],
  },
  {
    tier: 'Regional Distributor',
    price: 'By Application',
    color: 'border-primary',
    badge: 'Most Benefits',
    perks: [
      'Everything in Authorized Dealer',
      'Exclusive territory rights (50-mile radius)',
      'Priority inventory access & first pick',
      'Drop-ship fulfillment for online orders',
      'Co-op advertising budget',
      'Annual Japan sourcing trip invitation',
    ],
  },
  {
    tier: 'Affiliate Partner',
    price: 'Commission-Based',
    color: 'border-border',
    badge: '',
    perks: [
      'Referral commission on every sale',
      'Custom affiliate tracking link',
      'Marketing assets & product photos',
      'Monthly performance reports',
    ],
  },
];

interface DealerForm {
  businessName: string;
  contactName: string;
  email: string;
  phone: string;
  state: string;
  tierInterest: string;
  currentInventory: string;
  message: string;
}

export default function DealersClient() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState<DealerForm>({
    businessName: '',
    contactName: '',
    email: '',
    phone: '',
    state: '',
    tierInterest: '',
    currentInventory: '',
    message: '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <>
      <Header />
      <main className="min-h-screen bg-background pt-20">
        {/* Hero */}
        <section className="relative overflow-hidden bg-secondary border-b border-border py-16 sm:py-24">
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-0 right-0 w-96 h-96 bg-primary rounded-full blur-3xl translate-x-1/2 -translate-y-1/2" />
          </div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-widest mb-6">
                <Icon name="BuildingStorefrontIcon" size={14} />
                Dealer & Partner Program
              </div>
              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-black text-foreground leading-tight mb-6">
                Sell Kei Trucks
                <br />
                <span className="text-primary">In Your Market</span>
              </h1>
              <p className="text-muted-foreground text-lg mb-8 max-w-md">
                Join the KeiTruckNation dealer network. Wholesale pricing, co-branded listings,
                territory rights, and a product that sells itself.
              </p>
              <a
                href="#apply"
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-primary text-primary-foreground rounded-full font-bold text-sm uppercase tracking-widest hover:opacity-90 transition-opacity"
              >
                Apply to Become a Dealer
                <Icon name="ArrowRightIcon" size={16} />
              </a>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {[
                { value: '40+', label: 'Active Dealers' },
                { value: '28', label: 'States Covered' },
                { value: '$4.2M', label: 'Dealer Revenue 2025' },
                { value: '96%', label: 'Dealer Retention' },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="bg-card border border-border rounded-2xl p-6 text-center"
                >
                  <p className="font-display text-3xl font-black text-primary mb-1">{stat.value}</p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Current Partners */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
          <div className="flex items-end justify-between mb-8">
            <div>
              <h2 className="font-display text-3xl font-black text-foreground">
                Our Dealer Network
              </h2>
              <p className="text-muted-foreground mt-1">Authorized dealers across the US</p>
            </div>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {partners.map((p) => (
              <div
                key={p.name}
                className="bg-card border border-border rounded-2xl overflow-hidden hover:border-primary/30 transition-colors group"
              >
                <div className="relative h-40 overflow-hidden">
                  <AppImage
                    src={p.image}
                    alt={p.imageAlt}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                  <span className="absolute top-3 left-3 text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded-full bg-primary/90 text-primary-foreground">
                    {p.type}
                  </span>
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-foreground mb-0.5">{p.name}</h3>
                  <p className="text-xs text-muted-foreground mb-3 flex items-center gap-1">
                    <LocationPin size={12} />
                    {p.location} · Since {p.since}
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {p.specialties.map((s) => (
                      <span
                        key={s}
                        className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-secondary border border-border text-muted-foreground"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Tiers */}
        <section className="bg-secondary border-y border-border py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-12">
              <h2 className="font-display text-3xl sm:text-4xl font-black text-foreground mb-3">
                Partnership Tiers
              </h2>
              <p className="text-muted-foreground max-w-xl mx-auto">
                Choose the level that fits your business. All tiers include access to our wholesale
                inventory and dealer support.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {dealerTiers.map((tier) => (
                <div
                  key={tier.tier}
                  className={`relative bg-card border-2 ${tier.color} rounded-2xl p-6 sm:p-8`}
                >
                  {tier.badge && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full bg-primary text-primary-foreground">
                      {tier.badge}
                    </span>
                  )}
                  <h3 className="font-display text-xl font-black text-foreground mb-1">
                    {tier.tier}
                  </h3>
                  <p className="text-primary font-bold text-sm mb-6">{tier.price}</p>
                  <ul className="space-y-3">
                    {tier.perks.map((perk) => (
                      <li
                        key={perk}
                        className="flex items-start gap-2.5 text-sm text-muted-foreground"
                      >
                        <Icon
                          name="CheckIcon"
                          size={14}
                          className="text-primary flex-shrink-0 mt-0.5"
                        />
                        {perk}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Application Form */}
        <section id="apply" className="max-w-2xl mx-auto px-4 sm:px-6 py-16">
          <div className="text-center mb-10">
            <h2 className="font-display text-3xl font-black text-foreground mb-3">Apply to Join</h2>
            <p className="text-muted-foreground">
              We review all applications within 3 business days.
            </p>
          </div>

          {submitted ? (
            <div className="bg-card border border-border rounded-2xl p-10 text-center">
              <div className="size-16 rounded-full bg-green-500/10 flex items-center justify-center mx-auto mb-6">
                <Icon name="CheckBadgeIcon" size={32} className="text-green-400" />
              </div>
              <h3 className="font-display text-2xl font-black text-foreground mb-3">
                Application Submitted!
              </h3>
              <p className="text-muted-foreground mb-6">
                Thanks, <strong className="text-foreground">{form.contactName}</strong>! Our dealer
                team will review your application and reach out to{' '}
                <strong className="text-foreground">{form.email}</strong> within 3 business days.
              </p>
              <Link
                href="/"
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-full font-bold text-sm uppercase tracking-widest hover:opacity-90 transition-opacity"
              >
                Back to Home
              </Link>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="bg-card border border-border rounded-2xl p-6 sm:p-8 space-y-4"
            >
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  { name: 'businessName', label: 'Business Name', placeholder: 'Acme Farm Supply' },
                  { name: 'contactName', label: 'Contact Name', placeholder: 'Jane Smith' },
                  { name: 'email', label: 'Email', placeholder: 'jane@business.com' },
                  { name: 'phone', label: 'Phone', placeholder: '(555) 000-0000' },
                  { name: 'state', label: 'State', placeholder: 'Texas' },
                ].map((f) => (
                  <div key={f.name}>
                    <label className="block text-xs font-bold uppercase tracking-widest text-muted-foreground mb-2">
                      {f.label}
                    </label>
                    <input
                      type="text"
                      name={f.name}
                      value={form[f.name as keyof DealerForm]}
                      onChange={handleChange}
                      placeholder={f.placeholder}
                      required
                      className="w-full px-4 py-3 rounded-xl bg-secondary border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 text-sm"
                    />
                  </div>
                ))}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-muted-foreground mb-2">
                    Partnership Tier
                  </label>
                  <select
                    name="tierInterest"
                    value={form.tierInterest}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl bg-secondary border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 text-sm"
                  >
                    <option value="">Select tier</option>
                    <option value="authorized">Authorized Dealer</option>
                    <option value="distributor">Regional Distributor</option>
                    <option value="affiliate">Affiliate Partner</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-muted-foreground mb-2">
                  Current Inventory / Business Type
                </label>
                <input
                  type="text"
                  name="currentInventory"
                  value={form.currentInventory}
                  onChange={handleChange}
                  placeholder="e.g. Farm equipment dealer, 20 units/yr"
                  className="w-full px-4 py-3 rounded-xl bg-secondary border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-muted-foreground mb-2">
                  Tell Us About Your Business
                </label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  rows={4}
                  placeholder="What do you sell, who are your customers, why kei trucks?"
                  className="w-full px-4 py-3 rounded-xl bg-secondary border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 text-sm resize-none"
                />
              </div>
              <button
                type="submit"
                className="w-full py-3.5 bg-primary text-primary-foreground rounded-xl font-bold text-sm uppercase tracking-widest hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
              >
                <Icon name="PaperAirplaneIcon" size={16} />
                Submit Application
              </button>
            </form>
          )}
        </section>
      </main>
      <Footer />
    </>
  );
}
