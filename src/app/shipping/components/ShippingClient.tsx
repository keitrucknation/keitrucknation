'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Icon from '@/components/ui/AppIcon';

const shippingSteps = [
  {
    step: '01',
    title: 'Purchase & Deposit',
    desc: 'Once you confirm your truck, a $500 deposit holds it. Full payment (or financing approval) is required before transport is scheduled.',
    icon: 'CreditCardIcon',
    time: 'Day 1',
  },
  {
    step: '02',
    title: 'Transport Scheduling',
    desc: "We coordinate with our carrier network to find the best route to your location. You'll receive a pickup window within 24–48 hours of payment.",
    icon: 'CalendarDaysIcon',
    time: 'Days 1–3',
  },
  {
    step: '03',
    title: 'Pickup & Loading',
    desc: 'Your truck is loaded onto an enclosed or open carrier (your choice). We photograph the truck at loading and send you confirmation.',
    icon: 'ArrowUpTrayIcon',
    time: 'Days 3–7',
  },
  {
    step: '04',
    title: 'In Transit',
    desc: "Track your truck in real time via the carrier's portal. Average transit time is 5–14 business days depending on distance.",
    icon: 'MapPinIcon',
    time: 'Days 5–14',
  },
  {
    step: '05',
    title: 'Delivery & Inspection',
    desc: 'The carrier delivers to your driveway or nearest accessible location. Inspect the truck before signing the Bill of Lading. Document any issues with photos.',
    icon: 'CheckBadgeIcon',
    time: 'Final Day',
  },
];

const rates = [
  {
    region: 'Northeast (NY, MA, CT, NJ, PA)',
    open: '$650–$850',
    enclosed: '$950–$1,200',
    days: '5–8',
  },
  {
    region: 'Southeast (FL, GA, NC, SC, VA)',
    open: '$700–$900',
    enclosed: '$1,000–$1,300',
    days: '6–10',
  },
  {
    region: 'Midwest (IL, OH, MI, MN, WI)',
    open: '$600–$800',
    enclosed: '$900–$1,100',
    days: '5–9',
  },
  {
    region: 'South Central (TX, OK, AR, LA)',
    open: '$750–$950',
    enclosed: '$1,050–$1,350',
    days: '7–12',
  },
  {
    region: 'Mountain West (CO, UT, AZ, NM)',
    open: '$800–$1,050',
    enclosed: '$1,100–$1,450',
    days: '8–13',
  },
  {
    region: 'Pacific Northwest (WA, OR, ID)',
    open: '$850–$1,100',
    enclosed: '$1,150–$1,500',
    days: '9–14',
  },
  { region: 'California', open: '$900–$1,150', enclosed: '$1,200–$1,600', days: '9–14' },
  { region: 'Alaska / Hawaii', open: 'Custom quote', enclosed: 'Custom quote', days: '21–35' },
];

const returnPolicySections = [
  {
    icon: 'CheckCircleIcon',
    title: '30-Day Mechanical Warranty',
    color: 'text-primary',
    bg: 'bg-primary/10',
    points: [
      'Covers engine, transmission, and 4WD system failures',
      'Does not cover wear items (brakes, tires, belts, fluids)',
      'Claim must be filed within 30 days of delivery',
      'Repair or replacement at our discretion',
    ],
  },
  {
    icon: 'ExclamationTriangleIcon',
    title: "What's Not Covered",
    color: 'text-accent',
    bg: 'bg-accent/10',
    points: [
      'Normal wear and tear (brakes, tires, clutch, belts)',
      'Damage caused by misuse, accidents, or modifications',
      'Cosmetic issues disclosed in the listing',
      'Issues arising from improper maintenance after delivery',
    ],
  },
  {
    icon: 'ArrowPathIcon',
    title: 'Return Policy',
    color: 'text-muted-foreground',
    bg: 'bg-muted/30',
    points: [
      'Returns accepted within 7 days of delivery for undisclosed mechanical defects only',
      'Truck must be returned in the same condition as delivered',
      'Buyer is responsible for return shipping costs',
      'Refund issued within 5 business days of truck inspection',
    ],
  },
];

export default function ShippingClient() {
  const [activeTab, setActiveTab] = useState<'process' | 'rates' | 'returns'>('process');

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
      {/* Header */}
      <div className="mb-12">
        <span className="tag-pill bg-primary/10 text-primary border border-primary/20 mb-4 inline-flex">
          <Icon name="TruckIcon" size={10} />
          Shipping & Returns
        </span>
        <h1 className="font-display text-section-xl text-foreground mb-4">
          From Japan to your driveway
        </h1>
        <p className="text-muted-foreground max-w-2xl text-sm leading-relaxed">
          We handle every step of the logistics chain - ocean freight, US customs, domestic
          transport. Here&apos;s exactly how it works and what to expect.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-10 border-b border-border pb-0">
        {[
          { id: 'process', label: 'Delivery Process', icon: 'MapPinIcon' },
          { id: 'rates', label: 'Shipping Rates', icon: 'CurrencyDollarIcon' },
          { id: 'returns', label: 'Warranty & Returns', icon: 'ArrowPathIcon' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as typeof activeTab)}
            className={`flex items-center gap-2 px-5 py-3 font-bold text-sm transition-all border-b-2 -mb-px min-h-[44px] ${
              activeTab === tab.id
                ? 'text-primary border-primary'
                : 'text-muted-foreground border-transparent hover:text-foreground'
            }`}
          >
            <Icon name={tab.icon as Parameters<typeof Icon>[0]['name']} size={14} />
            <span className="hidden sm:inline">{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Process Tab */}
      {activeTab === 'process' && (
        <div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
            {shippingSteps.map((step, idx) => (
              <div
                key={step.step}
                className={`relative p-6 rounded-2xl bg-card border border-border ${idx === 0 ? 'sm:col-span-2 lg:col-span-1' : ''}`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="size-10 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Icon
                      name={step.icon as Parameters<typeof Icon>[0]['name']}
                      size={18}
                      className="text-primary"
                    />
                  </div>
                  <span className="font-display text-4xl font-bold text-muted/60 leading-none">
                    {step.step}
                  </span>
                </div>
                <span className="tag-pill bg-muted text-muted-foreground mb-2 inline-flex">
                  {step.time}
                </span>
                <h3 className="font-bold text-foreground text-sm mb-2">{step.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>

          {/* Insurance Note */}
          <div className="p-6 rounded-2xl bg-secondary border border-border flex gap-4">
            <div className="size-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
              <Icon name="ShieldCheckIcon" size={18} className="text-primary" />
            </div>
            <div>
              <h4 className="font-bold text-foreground text-sm mb-1">
                Every shipment is fully insured
              </h4>
              <p className="text-xs text-muted-foreground leading-relaxed">
                All domestic transport is covered by cargo insurance up to the vehicle&apos;s
                purchase price. In the rare event of transit damage, we file the claim and manage
                the resolution: you don&apos;t deal with the carrier directly.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Rates Tab */}
      {activeTab === 'rates' && (
        <div>
          <p className="text-sm text-muted-foreground mb-6">
            Rates below are estimates based on our carrier network. Actual quotes depend on exact
            pickup/delivery addresses, truck dimensions, and current carrier availability. Contact
            us for a precise quote.
          </p>
          <div className="rounded-2xl border border-border overflow-hidden">
            <div className="grid grid-cols-4 bg-secondary px-5 py-3 text-xs font-bold uppercase tracking-widest text-muted-foreground">
              <span className="col-span-2">Region</span>
              <span>Open Carrier</span>
              <span>Enclosed</span>
            </div>
            {rates.map((row, idx) => (
              <div
                key={row.region}
                className={`grid grid-cols-4 px-5 py-4 text-sm border-t border-border items-center ${idx % 2 === 0 ? 'bg-card' : 'bg-background'}`}
              >
                <span className="col-span-2 text-foreground font-medium text-xs leading-snug pr-4">
                  {row.region}
                </span>
                <span className="text-muted-foreground text-xs">{row.open}</span>
                <span className="text-muted-foreground text-xs">{row.enclosed}</span>
              </div>
            ))}
          </div>

          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-5 rounded-2xl bg-card border border-border">
              <h4 className="font-bold text-foreground text-sm mb-2 flex items-center gap-2">
                <Icon name="TruckIcon" size={14} className="text-muted-foreground" />
                Open Carrier
              </h4>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Standard transport on an open multi-car trailer. Safe for most trucks. Exposed to
                weather but trucks arrive clean. Recommended for Grade 3–4 trucks.
              </p>
            </div>
            <div className="p-5 rounded-2xl bg-card border border-border">
              <h4 className="font-bold text-foreground text-sm mb-2 flex items-center gap-2">
                <Icon name="LockClosedIcon" size={14} className="text-primary" />
                Enclosed Carrier
              </h4>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Fully enclosed trailer - protected from weather, road debris, and prying eyes.
                Recommended for Grade 4.5–5 trucks and any truck over $9,000.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Returns Tab */}
      {activeTab === 'returns' && (
        <div className="space-y-5">
          {returnPolicySections.map((section) => (
            <div key={section.title} className="p-6 rounded-2xl bg-card border border-border">
              <div className="flex items-center gap-3 mb-4">
                <div className={`size-9 rounded-xl ${section.bg} flex items-center justify-center`}>
                  <Icon
                    name={section.icon as Parameters<typeof Icon>[0]['name']}
                    size={16}
                    className={section.color}
                  />
                </div>
                <h3 className="font-bold text-foreground text-sm">{section.title}</h3>
              </div>
              <ul className="space-y-2">
                {section.points.map((point) => (
                  <li
                    key={point}
                    className="flex items-start gap-2.5 text-xs text-muted-foreground"
                  >
                    <span className="size-1.5 rounded-full bg-muted-foreground mt-1.5 flex-shrink-0" />
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="p-6 rounded-2xl bg-primary/5 border border-primary/20">
            <p className="text-xs text-muted-foreground leading-relaxed">
              <span className="font-bold text-foreground">Important:</span> All trucks are sold
              as-is with respect to cosmetic condition as described in the listing. We go to great
              lengths to accurately describe and photograph every vehicle. If you have questions
              about a specific truck&apos;s condition before purchasing, contact us and we&apos;ll
              provide additional photos or video.
            </p>
          </div>
        </div>
      )}

      {/* Bottom CTA */}
      <div className="mt-14 flex flex-col sm:flex-row gap-4 items-center justify-between p-6 rounded-2xl bg-secondary border border-border">
        <div>
          <p className="font-bold text-foreground text-sm">Need a shipping quote?</p>
          <p className="text-muted-foreground text-xs mt-0.5">
            Tell us your zip code and we&apos;ll get you an exact number within a few hours.
          </p>
        </div>
        <Link
          href="/contact"
          className="px-6 py-3 bg-primary text-primary-foreground rounded-full font-bold text-xs uppercase tracking-widest hover:scale-105 transition-transform flex-shrink-0"
        >
          Get a Quote
        </Link>
      </div>
    </div>
  );
}
