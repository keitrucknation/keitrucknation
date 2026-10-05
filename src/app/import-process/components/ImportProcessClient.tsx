'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Icon from '@/components/ui/AppIcon';
import LocationPin from '@/components/ui/LocationPin';
import AppImage from '@/components/ui/AppImage';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

interface ProcessPhase {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  duration: string;
  location: string;
  image: string;
  imageAlt: string;
  steps: string[];
  note?: string;
}

const phases: ProcessPhase[] = [
  {
    id: 'sourcing',
    number: '01',
    title: 'Sourcing in Japan',
    subtitle: 'Finding the right truck at the right price',
    duration: '1–2 weeks',
    location: 'Japan (Osaka, Nagoya, Tokyo)',
    image: 'https://img.rocket.new/generatedImages/rocket_gen_img_1a48e6877-1787343437991.png',
    imageAlt: 'Japanese vehicle auction hall with rows of kei trucks lined up for bidding',
    steps: [
      'Our Japan-based partner Yuki monitors USS, JAA, and regional auction houses weekly',
      'We filter by make, body style, drivetrain, mileage, and auction grade (we target Grade 3.5+)',
      "Winning bid, buyer's fee, and export prep costs are calculated before we bid: no surprises",
      'You receive the official auction grade sheet and inspection photos within 48 hours of purchase',
    ],

    note: 'Japanese auction grades run 1–5. Grade 3 = good used condition. Grade 4 = excellent. We rarely buy below Grade 3.',
  },
  {
    id: 'inspection',
    number: '02',
    title: 'Pre-Export Inspection',
    subtitle: 'Every truck checked before it leaves Japan',
    duration: '3–5 days',
    location: 'Inspection facility, Japan',
    image: 'https://img.rocket.new/generatedImages/rocket_gen_img_1241841ac-1787343437966.png',
    imageAlt: 'Mechanic performing pre-export inspection on a Japanese kei truck in a workshop',
    steps: [
      'Engine start, idle quality, and smoke check',
      '4WD engagement test (Hi and Lo range where applicable)',
      'Hydraulic system test for dump and specialty trucks',
      'Brake inspection and fluid levels',
      'Body condition documented with photos: every dent and scratch noted',
      'Export certificate of title prepared',
    ],

    note: "If a truck fails inspection, we either negotiate a price reduction or pass on it entirely. We don't ship problem trucks.",
  },
  {
    id: 'export',
    number: '03',
    title: 'Export & Ocean Freight',
    subtitle: 'From Japanese port to US waters',
    duration: '18–28 days transit',
    location: 'Osaka / Nagoya to Long Beach / Baltimore',
    image: 'https://img.rocket.new/generatedImages/rocket_gen_img_1fdea84fd-1787343438287.png',
    imageAlt: 'RoRo cargo ship at Japanese port loading vehicles for export to the United States',
    steps: [
      'Japanese export customs clearance and deregistration',
      'Vehicle loaded onto Roll-on/Roll-off (RoRo) vessel: no containers, trucks drive on and off',
      'Ocean transit across the Pacific (typically 18–28 days)',
      'You receive vessel name, IMO number, and estimated arrival date',
      'Marine insurance included on all shipments',
    ],

    note: 'RoRo shipping is the industry standard for vehicle imports. Your truck is secured on the vessel deck, not stacked in a container.',
  },
  {
    id: 'customs',
    number: '04',
    title: 'US Customs & Compliance',
    subtitle: "Clearing the legal hurdles so you don't have to",
    duration: '3–7 days',
    location: 'Port of Long Beach, CA or Baltimore, MD',
    image: 'https://img.rocket.new/generatedImages/rocket_gen_img_110a31073-1765535985042.png',
    imageAlt: 'US customs port facility with imported vehicles being processed for clearance',
    steps: [
      'Our licensed customs broker files ISF (Importer Security Filing) before vessel departure',
      'EPA Form 3520-1 filed: kei trucks qualify under the 25-year exemption rule',
      'DOT HS-7 form filed for vehicles over 25 years old (no safety standard compliance required)',
      'Customs bond posted and duties paid (2.5% for most kei trucks)',
      'Port release and domestic transport arranged',
    ],

    note: 'The 25-year rule: vehicles manufactured 25+ years ago are exempt from EPA and DOT safety standards, making them legal to import. Most of our inventory qualifies.',
  },
  {
    id: 'delivery',
    number: '05',
    title: 'Domestic Delivery',
    subtitle: 'From the port to your driveway',
    duration: '3–10 days',
    location: 'Port to Your Location (48 states)',
    image: 'https://img.rocket.new/generatedImages/rocket_gen_img_14ae5e4e0-1787343439605.png',
    imageAlt:
      'Flatbed truck transporting a kei truck on a highway for domestic delivery across the United States',
    steps: [
      'Vehicle transported from port on a flatbed or enclosed carrier',
      'You receive a tracking number for the domestic leg',
      'Delivery to your address: residential, farm, or business',
      'Inspect the truck on delivery and note any discrepancies on the Bill of Lading',
      'Title and paperwork mailed to you within 5 business days of delivery',
    ],

    note: 'We deliver to all 48 contiguous states. Hawaii and Alaska available by quote. International delivery available to select countries.',
  },
];

const faqs = [
  {
    q: 'How long does the whole process take?',
    a: 'From purchase to delivery: typically 8–12 weeks. Sourcing takes 1–2 weeks, inspection 3–5 days, ocean transit 18–28 days, customs 3–7 days, and domestic delivery 3–10 days.',
  },
  {
    q: 'Do I need to do anything for customs?',
    a: 'No. We handle all customs paperwork, EPA/DOT filings, and customs bond. You just need to provide your name, address, and a copy of your ID for the import documentation.',
  },
  {
    q: 'What is the 25-year rule?',
    a: 'Vehicles manufactured 25+ years ago are exempt from EPA emissions standards and DOT safety standards, making them legal to import for road use in most states. Most of our inventory qualifies.',
  },
  {
    q: 'Can I choose a specific truck?',
    a: "Yes. You can browse our available inventory and purchase a specific truck, or tell us what you're looking for and we'll source it at the next auction.",
  },
  {
    q: 'What if the truck is damaged in shipping?',
    a: 'All shipments include marine insurance. If damage occurs in transit, we file the claim and either repair the truck or provide a full refund.',
  },
];

export default function ImportProcessClient() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <>
      <Header />
      <main className="min-h-screen bg-background pt-20">
        {/* Hero */}
        <section className="relative overflow-hidden border-b border-border">
          {/* Real hero image */}
          <div className="absolute inset-0">
            <AppImage
              src="https://img.rocket.new/generatedImages/rocket_gen_img_11a81fcd5-1770502618254.png"
              alt="Large cargo ship loaded with vehicles at a busy international shipping port, aerial view"
              fill
              className="object-cover"
              priority
            />

            <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/70 to-background/90" />
          </div>
          <div className="relative py-20 sm:py-32">
            <div className="relative max-w-4xl mx-auto px-4 sm:px-6 text-center">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-widest mb-6">
                <Icon name="GlobeAltIcon" size={14} />
                Japan to Your Door
              </div>
              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-black text-foreground leading-tight mb-6">
                How We Import
                <br />
                <span className="text-primary">Every Truck</span>
              </h1>
              <p className="text-white text-xl max-w-2xl mx-auto mb-8">
                A transparent, step-by-step look at how a kei truck goes from a Japanese auction
                house to your driveway and why we do it this way.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                {[
                  { icon: 'ClockIcon', label: '8–12 weeks total' },
                  { icon: 'DocumentCheckIcon', label: 'All paperwork handled' },
                  { icon: 'ShieldCheckIcon', label: 'Marine insurance included' },
                  { icon: 'TruckIcon', label: '48-state delivery' },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-sm text-white"
                  >
                    <Icon name={item.icon} size={14} className="text-primary" />
                    {item.label}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Process Phases */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
          <div className="space-y-16 sm:space-y-24">
            {phases.map((phase, idx) => (
              <div
                key={phase.id}
                className={`grid lg:grid-cols-2 gap-10 lg:gap-16 items-center ${idx % 2 === 1 ? 'lg:grid-flow-dense' : ''}`}
              >
                {/* Image */}
                <div className={`relative ${idx % 2 === 1 ? 'lg:col-start-2' : ''}`}>
                  <div className="relative rounded-2xl overflow-hidden aspect-[4/3]">
                    <AppImage
                      src={phase.image}
                      alt={phase.imageAlt}
                      fill
                      className="object-cover"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-background/50 to-transparent" />
                  </div>
                  {/* Phase number badge */}
                  <div className="absolute -top-4 -left-4 size-14 rounded-2xl bg-primary flex items-center justify-center shadow-lg">
                    <span className="font-display text-xl font-black text-primary-foreground">
                      {phase.number}
                    </span>
                  </div>
                  {/* Duration badge */}
                  <div className="absolute bottom-4 left-4 right-4 bg-card/90 backdrop-blur-sm rounded-xl p-3 border border-border">
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-1.5 text-muted-foreground">
                        <Icon name="ClockIcon" size={14} />
                        {phase.duration}
                      </div>
                      <div className="flex items-center gap-1.5 text-muted-foreground">
                        <LocationPin size={14} />
                        <span className="text-xs">{phase.location}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className={idx % 2 === 1 ? 'lg:col-start-1 lg:row-start-1' : ''}>
                  <p className="text-xs font-bold uppercase tracking-widest text-primary mb-2">
                    Phase {phase.number}
                  </p>
                  <h2 className="font-display text-3xl sm:text-4xl font-black text-foreground mb-2">
                    {phase.title}
                  </h2>
                  <p className="text-muted-foreground text-lg mb-6">{phase.subtitle}</p>
                  <ul className="space-y-3 mb-6">
                    {phase.steps.map((step, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm text-foreground/80">
                        <span className="flex-shrink-0 size-5 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-[10px] font-black text-primary mt-0.5">
                          {i + 1}
                        </span>
                        {step}
                      </li>
                    ))}
                  </ul>
                  {phase.note && (
                    <div className="bg-secondary border border-border rounded-xl p-4 flex gap-3">
                      <Icon
                        name="InformationCircleIcon"
                        size={16}
                        className="text-primary flex-shrink-0 mt-0.5"
                      />
                      <p className="text-xs text-muted-foreground">{phase.note}</p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section className="bg-secondary border-y border-border py-16">
          <div className="max-w-3xl mx-auto px-4 sm:px-6">
            <h2 className="font-display text-3xl font-black text-foreground mb-8 text-center">
              Common Questions
            </h2>
            <div className="space-y-3">
              {faqs.map((faq, i) => (
                <div key={i} className="bg-card border border-border rounded-2xl overflow-hidden">
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full flex items-center justify-between p-5 text-left"
                  >
                    <span className="font-bold text-foreground text-sm pr-4">{faq.q}</span>
                    <Icon
                      name={openFaq === i ? 'ChevronUpIcon' : 'ChevronDownIcon'}
                      size={16}
                      className="text-muted-foreground flex-shrink-0"
                    />
                  </button>
                  {openFaq === i && (
                    <div className="px-5 pb-5">
                      <p className="text-sm text-muted-foreground leading-relaxed">{faq.a}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 py-16 text-center">
          <h2 className="font-display text-3xl sm:text-4xl font-black text-foreground mb-4">
            Ready to Order?
          </h2>
          <p className="text-muted-foreground text-lg mb-8 max-w-xl mx-auto">
            Browse our current inventory or contact us to source a specific truck. We handle
            everything from Japan to your door.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/inventory"
              className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground rounded-full font-bold text-sm uppercase tracking-widest hover:opacity-90 transition-opacity"
            >
              Browse Inventory
              <Icon name="ArrowRightIcon" size={16} />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 border border-border text-foreground rounded-full font-bold text-sm uppercase tracking-widest hover:bg-muted transition-colors"
            >
              Ask a Question
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
