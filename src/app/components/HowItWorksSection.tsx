'use client';

import React, { useRef, useEffect, useState } from 'react';
import Link from 'next/link';
import Icon from '@/components/ui/AppIcon';

const steps = [
  {
    number: '01',
    icon: 'MagnifyingGlassIcon' as const,
    title: 'Browse & Choose',
    description:
      'Filter by make, year, 4WD, dump bed, or price. Every truck has full specs, real photos, and an honest condition report.',
    detail: 'No haggling. No dealer markup. What you see is what you pay.',
  },
  {
    number: '02',
    icon: 'ShoppingCartIcon' as const,
    title: 'Order Online',
    description:
      'Add to cart and complete your purchase securely online. We accept credit cards, bank transfer, and financing options.',
    detail: 'Fully refundable deposit holds your truck for 72 hours.',
  },
  {
    number: '03',
    icon: 'TruckIcon' as const,
    title: 'We Deliver It',
    description:
      'Your truck ships from our Portland, OR warehouse. We handle all import paperwork, title, and state registration docs.',
    detail: 'Typical delivery: 7–14 business days anywhere in the continental USA.',
  },
];

const sideStats = [
  { value: '4.9/5', label: 'Average Rating', sub: 'from 180+ verified buyers' },
  { value: '72hr', label: 'Hold Guarantee', sub: 'with refundable deposit' },
  { value: '100%', label: 'Title Clear', sub: 'all trucks title-ready' },
];

const HowItWorksSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} id="how-it-works" className="py-16 sm:py-24 bg-secondary/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div
          className={`mb-10 sm:mb-16 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="size-2 bg-primary rounded-full" />
            <span className="tag-pill bg-primary/10 text-primary border border-primary/20">
              Simple Process
            </span>
          </div>
          <h2 className="font-display text-section-xl text-foreground">
            From Japan to your driveway
            <br />
            <span className="text-muted-foreground">in 3 steps.</span>
          </h2>
        </div>

        {/* Asymmetric 60/40 layout */}
        <div className="grid lg:grid-cols-5 gap-6 sm:gap-8 items-start">
          {/* Steps - 60% (3 cols) */}
          <div className="lg:col-span-3 flex flex-col gap-4 sm:gap-5">
            {steps.map((step, index) => (
              <div
                key={step.number}
                className={`group bg-card border border-border rounded-3xl p-6 sm:p-8 transition-all duration-700 hover:border-primary/30 ${visible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <div className="flex items-start gap-4 sm:gap-6">
                  {/* Step number */}
                  <div className="flex-shrink-0 font-display font-black text-4xl sm:text-5xl text-primary/20 group-hover:text-primary/40 transition-colors leading-none">
                    {step.number}
                  </div>
                  {/* Content */}
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2">
                      <Icon name={step.icon} size={18} className="text-primary" />
                      <h3 className="font-display font-bold text-lg sm:text-xl text-foreground">
                        {step.title}
                      </h3>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {step.description}
                    </p>
                    <p className="text-xs font-bold text-primary/70 mt-1">{step.detail}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Stats panel - 40% (2 cols), sticky companion */}
          <div
            className={`lg:col-span-2 flex flex-col gap-4 transition-all duration-700 delay-300 ${visible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}
          >
            {/* Stat cards */}
            {sideStats.map((stat, i) => (
              <div
                key={i}
                className="bg-card border border-border rounded-3xl p-6 flex flex-col gap-1"
              >
                <span className="font-display font-black text-3xl sm:text-4xl text-primary">
                  {stat.value}
                </span>
                <span className="text-sm font-bold text-foreground">{stat.label}</span>
                <span className="text-xs text-muted-foreground">{stat.sub}</span>
              </div>
            ))}

            {/* CTA card */}
            <div className="relative bg-primary rounded-3xl p-6 sm:p-8 overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 blob-accent opacity-30 pointer-events-none" />
              <h3 className="font-display font-bold text-xl text-primary-foreground mb-2 relative z-10">
                Ready to find your truck?
              </h3>
              <p className="text-sm text-primary-foreground/70 mb-5 relative z-10">
                Browse 35+ models in stock right now.
              </p>
              <Link
                href="/products"
                className="flex items-center justify-center gap-2 w-full py-3 bg-primary-foreground text-primary font-black text-xs uppercase tracking-widest rounded-xl hover:scale-105 transition-transform min-h-[44px] relative z-10"
              >
                View All Trucks
                <Icon name="ArrowRightIcon" size={16} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
