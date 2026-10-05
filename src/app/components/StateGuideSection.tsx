'use client';

import React, { useRef, useEffect, useState } from 'react';
import Link from 'next/link';
import Icon from '@/components/ui/AppIcon';

type LegalStatus = 'yes' | 'limited' | 'no';

interface StateHighlight {
  abbr: string;
  state: string;
  status: LegalStatus;
}

const highlights: StateHighlight[] = [
  { abbr: 'MT', state: 'Montana', status: 'yes' },
  { abbr: 'OR', state: 'Oregon', status: 'yes' },
  { abbr: 'CO', state: 'Colorado', status: 'yes' },
  { abbr: 'ID', state: 'Idaho', status: 'yes' },
  { abbr: 'WA', state: 'Washington', status: 'yes' },
  { abbr: 'TX', state: 'Texas', status: 'limited' },
  { abbr: 'CA', state: 'California', status: 'limited' },
  { abbr: 'FL', state: 'Florida', status: 'limited' },
  { abbr: 'NY', state: 'New York', status: 'limited' },
  { abbr: 'MA', state: 'Massachusetts', status: 'no' },
  { abbr: 'NJ', state: 'New Jersey', status: 'no' },
  { abbr: 'AK', state: 'Alaska', status: 'yes' },
];

const statusConfig: Record<
  LegalStatus,
  { label: string; color: string; bg: string; border: string; dot: string }
> = {
  yes: {
    label: 'Street Legal',
    color: 'text-primary',
    bg: 'bg-primary/10',
    border: 'border-primary/30',
    dot: 'bg-primary',
  },
  limited: {
    label: 'Limited Use',
    color: 'text-yellow-400',
    bg: 'bg-yellow-400/10',
    border: 'border-yellow-400/30',
    dot: 'bg-yellow-400',
  },
  no: {
    label: 'Restricted',
    color: 'text-red-400',
    bg: 'bg-red-400/10',
    border: 'border-red-400/30',
    dot: 'bg-red-400',
  },
};

const StateGuideSection: React.FC = () => {
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
    <section ref={sectionRef} className="py-16 sm:py-24 bg-background relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-accent/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative">
        {/* Header */}
        <div
          className={`text-center mb-12 sm:mb-16 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="size-2 bg-primary rounded-full" />
            <span className="tag-pill bg-primary/10 text-primary border border-primary/20">
              Know Before You Buy
            </span>
          </div>
          <h2 className="font-display text-section-xl text-foreground mb-4">
            Is a kei truck legal in your state?
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Regulations vary across all 50 states. Check your state&apos;s street legality, speed
            limits, and registration requirements before purchasing.
          </p>
        </div>

        {/* Stats row */}
        <div
          className={`grid grid-cols-3 gap-4 sm:gap-6 mb-12 transition-all duration-700 delay-100 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          {[
            { count: '18', label: 'Fully Street Legal', status: 'yes' as LegalStatus },
            { count: '28', label: 'Limited / Farm Use', status: 'limited' as LegalStatus },
            { count: '4', label: 'Restricted States', status: 'no' as LegalStatus },
          ].map((stat) => (
            <div
              key={stat.label}
              className={`rounded-2xl border p-4 sm:p-6 text-center ${statusConfig[stat.status].bg} ${statusConfig[stat.status].border}`}
            >
              <div
                className={`font-display font-black text-3xl sm:text-4xl mb-1 ${statusConfig[stat.status].color}`}
              >
                {stat.count}
              </div>
              <div className="text-xs sm:text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* State highlights grid */}
        <div
          className={`grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 mb-12 transition-all duration-700 delay-200 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          {highlights.map((s, i) => {
            const cfg = statusConfig[s.status];
            return (
              <div
                key={s.abbr}
                className={`flex flex-col items-center gap-2 p-3 sm:p-4 rounded-2xl border transition-all duration-500 ${cfg.bg} ${cfg.border}`}
                style={{ transitionDelay: `${i * 50 + 300}ms` }}
              >
                <div className={`font-display font-black text-xl sm:text-2xl ${cfg.color}`}>
                  {s.abbr}
                </div>
                <div className="text-xs text-muted-foreground font-medium text-center leading-tight">
                  {s.state}
                </div>
                <div
                  className={`flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider ${cfg.color}`}
                >
                  <span className={`size-1.5 rounded-full ${cfg.dot}`} />
                  {cfg.label}
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div
          className={`flex flex-col sm:flex-row items-center justify-center gap-4 transition-all duration-700 delay-300 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          <Link
            href="/state-guide"
            className="flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground rounded-full font-bold text-sm uppercase tracking-widest hover:scale-105 hover:glow-lime transition-all"
          >
            <Icon name="MapIcon" size={18} />
            View Full State Guide - All 50 States
          </Link>
          <p className="text-xs text-muted-foreground text-center sm:text-left">
            Updated regularly · Includes registration tips &amp; farm exemptions
          </p>
        </div>
      </div>
    </section>
  );
};

export default StateGuideSection;
