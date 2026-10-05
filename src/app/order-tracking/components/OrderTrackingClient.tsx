'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Icon from '@/components/ui/AppIcon';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

interface OrderStage {
  id: string;
  label: string;
  description: string;
  icon: string;
  detail: string;
}

const stages: OrderStage[] = [
  {
    id: 'sourced',
    label: 'Sourced in Japan',
    description: 'Vehicle located & purchased at Japanese auction',
    icon: 'MagnifyingGlassIcon',
    detail:
      'Your truck has been identified, bid on, and won at a Japanese vehicle auction. Auction grade report and photos are being compiled for your records.',
  },
  {
    id: 'inspection',
    label: 'Pre-Export Inspection',
    description: 'Mechanical inspection & documentation',
    icon: 'WrenchScrewdriverIcon',
    detail:
      'Our Japan-based team is performing a full mechanical check - fluids, brakes, 4WD engagement, hydraulics, and body condition. Export paperwork is being prepared.',
  },
  {
    id: 'export',
    label: 'Export Cleared',
    description: 'Japanese customs & port loading',
    icon: 'DocumentCheckIcon',
    detail:
      'The vehicle has cleared Japanese customs and is staged at the port of departure (typically Osaka or Nagoya). It will be loaded onto the next available RoRo vessel.',
  },
  {
    id: 'ocean',
    label: 'Ocean Transit',
    description: 'En route across the Pacific',
    icon: 'GlobeAltIcon',
    detail:
      'Your truck is aboard a Roll-on/Roll-off (RoRo) cargo vessel crossing the Pacific. Transit time is typically 18–28 days depending on destination port.',
  },
  {
    id: 'customs',
    label: 'US Customs Clearance',
    description: 'Arriving at US port, customs processing',
    icon: 'BuildingOfficeIcon',
    detail:
      'The vessel has arrived at the US port of entry (typically Long Beach, CA or Baltimore, MD). Our customs broker is processing your import documentation and EPA/DOT compliance.',
  },
  {
    id: 'domestic',
    label: 'Domestic Delivery',
    description: 'Trucked from port to your location',
    icon: 'TruckIcon',
    detail:
      'Customs cleared! Your kei truck is now on a domestic flatbed or enclosed carrier heading to your delivery address. You will receive a tracking number for this leg.',
  },
  {
    id: 'delivered',
    label: 'Delivered',
    description: 'Your truck has arrived',
    icon: 'CheckBadgeIcon',
    detail:
      'Your kei truck has been delivered. Welcome to the family! Please inspect the vehicle upon delivery and contact us within 48 hours if you notice any discrepancies.',
  },
];

const sampleOrders = [
  {
    id: 'KTU-2024-0847',
    truck: '2001 Daihatsu Hijet Dump 4WD',
    purchaseDate: 'Jul 14, 2026',
    estimatedDelivery: 'Sep 2–12, 2026',
    currentStage: 'ocean',
    stageIndex: 3,
    vessel: 'Pacific Ace (IMO 9337628)',
    eta: 'Aug 28, 2026',
    port: 'Long Beach, CA',
    updates: [
      { date: 'Jul 14', note: 'Order placed & payment confirmed' },
      { date: 'Jul 18', note: 'Truck won at Osaka USS Auction - Grade 3.5' },
      { date: 'Jul 24', note: 'Pre-export inspection passed - all systems go' },
      { date: 'Aug 1', note: 'Export customs cleared, Osaka port' },
      { date: 'Aug 3', note: 'Loaded aboard Pacific Ace, departed Osaka' },
    ],
  },
  {
    id: 'KTU-2024-0791',
    truck: '1999 Suzuki Carry Flatbed 4WD',
    purchaseDate: 'Jun 2, 2026',
    estimatedDelivery: 'Delivered Jul 29, 2026',
    currentStage: 'delivered',
    stageIndex: 6,
    vessel: 'N/A',
    eta: 'Delivered',
    port: 'Long Beach, CA',
    updates: [
      { date: 'Jun 2', note: 'Order placed' },
      { date: 'Jun 7', note: 'Sourced at Nagoya auction - Grade 4' },
      { date: 'Jun 14', note: 'Inspection complete' },
      { date: 'Jun 20', note: 'Export cleared' },
      { date: 'Jul 10', note: 'Arrived Long Beach, customs processing' },
      { date: 'Jul 22', note: 'Customs cleared, domestic carrier dispatched' },
      { date: 'Jul 29', note: 'Delivered to customer in Austin, TX' },
    ],
  },
];

export default function OrderTrackingClient() {
  const [orderInput, setOrderInput] = useState('');
  const [emailInput, setEmailInput] = useState('');
  const [activeOrder, setActiveOrder] = useState<(typeof sampleOrders)[0] | null>(null);
  const [searched, setSearched] = useState(false);
  const [expandedUpdate, setExpandedUpdate] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearched(true);
    const found = sampleOrders.find((o) => o.id.toLowerCase() === orderInput.trim().toLowerCase());
    setActiveOrder(found ?? null);
  };

  const demoLoad = (order: (typeof sampleOrders)[0]) => {
    setOrderInput(order.id);
    setActiveOrder(order);
    setSearched(true);
  };

  return (
    <>
      <Header />
      <main className="min-h-screen bg-background pt-20">
        {/* Hero Strip */}
        <section className="relative overflow-hidden bg-secondary border-b border-border py-16 sm:py-20">
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-0 right-0 w-96 h-96 bg-primary rounded-full blur-3xl translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent rounded-full blur-3xl -translate-x-1/2 translate-y-1/2" />
          </div>
          <div className="relative max-w-4xl mx-auto px-4 sm:px-6 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-widest mb-6">
              <Icon name="TruckIcon" size={14} />
              Live Order Tracking
            </div>
            <h1 className="font-display text-4xl sm:text-5xl font-black text-foreground mb-4 leading-tight">
              Where Is My Truck?
            </h1>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">
              Enter your order number to see real-time status from Japan auction to your driveway.
            </p>
          </div>
        </section>

        {/* Search Form */}
        <section className="max-w-2xl mx-auto px-4 sm:px-6 -mt-8 relative z-10">
          <form
            onSubmit={handleSearch}
            className="bg-card border border-border rounded-2xl p-6 sm:p-8 shadow-xl"
          >
            <div className="grid sm:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-muted-foreground mb-2">
                  Order Number
                </label>
                <input
                  type="text"
                  value={orderInput}
                  onChange={(e) => setOrderInput(e.target.value)}
                  placeholder="KTU-2024-XXXX"
                  className="w-full px-4 py-3 rounded-xl bg-secondary border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 font-mono text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-muted-foreground mb-2">
                  Email (optional)
                </label>
                <input
                  type="email"
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  placeholder="you@email.com"
                  className="w-full px-4 py-3 rounded-xl bg-secondary border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 text-sm"
                />
              </div>
            </div>
            <button
              type="submit"
              className="w-full py-3.5 bg-primary text-primary-foreground rounded-xl font-bold text-sm uppercase tracking-widest hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
            >
              <Icon name="MagnifyingGlassIcon" size={16} />
              Track My Order
            </button>
            {/* Demo shortcuts */}
            <div className="mt-4 flex flex-wrap gap-2 justify-center">
              <span className="text-xs text-muted-foreground">Try a demo:</span>
              {sampleOrders.map((o) => (
                <button
                  key={o.id}
                  type="button"
                  onClick={() => demoLoad(o)}
                  className="text-xs font-mono text-primary hover:underline"
                >
                  {o.id}
                </button>
              ))}
            </div>
          </form>
        </section>

        {/* Results */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
          {searched && !activeOrder && (
            <div className="text-center py-16 bg-card border border-border rounded-2xl">
              <Icon
                name="ExclamationTriangleIcon"
                size={40}
                className="text-muted-foreground mx-auto mb-4"
              />
              <h3 className="font-display text-xl font-bold text-foreground mb-2">
                Order Not Found
              </h3>
              <p className="text-muted-foreground mb-6">
                We couldn&apos;t find an order matching{' '}
                <span className="font-mono text-foreground">{orderInput}</span>. Double-check your
                order confirmation email or contact us.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-full font-bold text-sm uppercase tracking-widest hover:opacity-90 transition-opacity"
              >
                Contact Support
              </Link>
            </div>
          )}

          {activeOrder && (
            <div className="space-y-8">
              {/* Order Header */}
              <div className="bg-card border border-border rounded-2xl p-6 sm:p-8">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-1">
                      Order
                    </p>
                    <h2 className="font-display text-2xl font-black text-foreground font-mono">
                      {activeOrder.id}
                    </h2>
                    <p className="text-muted-foreground mt-1">{activeOrder.truck}</p>
                  </div>
                  <div className="flex flex-col sm:items-end gap-1">
                    <span
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest ${
                        activeOrder.currentStage === 'delivered'
                          ? 'bg-green-500/10 text-green-400 border border-green-500/20'
                          : 'bg-primary/10 text-primary border border-primary/20'
                      }`}
                    >
                      <span
                        className={`size-1.5 rounded-full ${activeOrder.currentStage === 'delivered' ? 'bg-green-400' : 'bg-primary animate-pulse'}`}
                      />
                      {activeOrder.currentStage === 'delivered' ? 'Delivered' : 'In Transit'}
                    </span>
                    <p className="text-xs text-muted-foreground mt-1">
                      Est. delivery: {activeOrder.estimatedDelivery}
                    </p>
                  </div>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {[
                    { label: 'Purchased', value: activeOrder.purchaseDate },
                    { label: 'Vessel', value: activeOrder.vessel },
                    { label: 'Port of Entry', value: activeOrder.port },
                    { label: 'ETA Port', value: activeOrder.eta },
                  ].map((stat) => (
                    <div key={stat.label} className="bg-secondary rounded-xl p-3">
                      <p className="text-xs text-muted-foreground mb-1">{stat.label}</p>
                      <p className="text-sm font-bold text-foreground">{stat.value}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Progress Tracker */}
              <div className="bg-card border border-border rounded-2xl p-6 sm:p-8">
                <h3 className="font-display text-lg font-bold text-foreground mb-8">
                  Shipment Progress
                </h3>
                <div className="relative">
                  {/* Progress line */}
                  <div className="absolute left-5 top-5 bottom-5 w-0.5 bg-border" />
                  <div
                    className="absolute left-5 top-5 w-0.5 bg-primary transition-all duration-700"
                    style={{ height: `${(activeOrder.stageIndex / (stages.length - 1)) * 100}%` }}
                  />
                  <div className="space-y-6">
                    {stages.map((stage, idx) => {
                      const isComplete = idx < activeOrder.stageIndex;
                      const isCurrent = idx === activeOrder.stageIndex;
                      const isPending = idx > activeOrder.stageIndex;
                      return (
                        <div key={stage.id} className="relative flex gap-5 items-start">
                          {/* Node */}
                          <div
                            className={`relative z-10 flex-shrink-0 size-10 rounded-full flex items-center justify-center border-2 transition-all ${
                              isComplete
                                ? 'bg-primary border-primary text-primary-foreground'
                                : isCurrent
                                  ? 'bg-primary/10 border-primary text-primary ring-4 ring-primary/20'
                                  : 'bg-secondary border-border text-muted-foreground'
                            }`}
                          >
                            {isComplete ? (
                              <Icon name="CheckIcon" size={16} />
                            ) : (
                              <Icon name={stage.icon} size={16} />
                            )}
                          </div>
                          {/* Content */}
                          <div className={`flex-1 pb-2 ${isPending ? 'opacity-40' : ''}`}>
                            <div className="flex items-center gap-2 mb-0.5">
                              <p
                                className={`font-bold text-sm ${isCurrent ? 'text-primary' : 'text-foreground'}`}
                              >
                                {stage.label}
                              </p>
                              {isCurrent && (
                                <span className="text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20">
                                  Current
                                </span>
                              )}
                            </div>
                            <p className="text-xs text-muted-foreground">{stage.description}</p>
                            {isCurrent && (
                              <p className="text-xs text-foreground/80 mt-2 bg-secondary rounded-lg px-3 py-2 border border-border">
                                {stage.detail}
                              </p>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Activity Log */}
              <div className="bg-card border border-border rounded-2xl p-6 sm:p-8">
                <button
                  onClick={() => setExpandedUpdate(!expandedUpdate)}
                  className="w-full flex items-center justify-between"
                >
                  <h3 className="font-display text-lg font-bold text-foreground">Activity Log</h3>
                  <Icon
                    name={expandedUpdate ? 'ChevronUpIcon' : 'ChevronDownIcon'}
                    size={18}
                    className="text-muted-foreground"
                  />
                </button>
                {expandedUpdate && (
                  <div className="mt-6 space-y-3">
                    {[...activeOrder.updates].reverse().map((u, i) => (
                      <div key={i} className="flex gap-4 items-start">
                        <span className="text-xs font-mono text-muted-foreground w-12 flex-shrink-0 pt-0.5">
                          {u.date}
                        </span>
                        <p className="text-sm text-foreground">{u.note}</p>
                      </div>
                    ))}
                  </div>
                )}
                {!expandedUpdate && (
                  <p className="text-xs text-muted-foreground mt-2">
                    {activeOrder.updates.length} updates - click to expand
                  </p>
                )}
              </div>

              {/* Help CTA */}
              <div className="bg-secondary border border-border rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <p className="font-bold text-foreground">Questions about your order?</p>
                  <p className="text-sm text-muted-foreground">
                    Our team responds within 4 business hours.
                  </p>
                </div>
                <Link
                  href="/contact"
                  className="flex-shrink-0 inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-full font-bold text-sm uppercase tracking-widest hover:opacity-90 transition-opacity"
                >
                  <Icon name="ChatBubbleLeftRightIcon" size={16} />
                  Contact Us
                </Link>
              </div>
            </div>
          )}

          {!searched && (
            <div className="mt-4">
              {/* How it works strip */}
              <div className="grid sm:grid-cols-3 gap-4">
                {[
                  {
                    icon: 'DocumentTextIcon',
                    title: 'Find Your Order #',
                    desc: 'Check your purchase confirmation email for your KTU order number.',
                  },
                  {
                    icon: 'MagnifyingGlassIcon',
                    title: 'Enter & Search',
                    desc: 'Paste your order number above and hit Track My Order.',
                  },
                  {
                    icon: 'BellAlertIcon',
                    title: 'Get Updates',
                    desc: 'See exactly where your truck is and what happens next.',
                  },
                ].map((item) => (
                  <div key={item.title} className="bg-card border border-border rounded-2xl p-6">
                    <div className="size-10 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                      <Icon name={item.icon} size={20} className="text-primary" />
                    </div>
                    <h4 className="font-bold text-foreground mb-1">{item.title}</h4>
                    <p className="text-sm text-muted-foreground">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>
      </main>
      <Footer />
    </>
  );
}
