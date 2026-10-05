'use client';

import React, { useEffect, useRef, useState } from 'react';
import Icon from '@/components/ui/AppIcon';

interface StatItem {
  value: string;
  label: string;
  icon: string;
  suffix?: string;
}

const STATS: StatItem[] = [
  { value: '500', label: 'Trucks Sold', icon: 'TruckIcon', suffix: '+' },
  { value: '38', label: 'Countries Shipped', icon: 'GlobeAltIcon', suffix: '+' },
  { value: '12', label: 'Years in Business', icon: 'CalendarDaysIcon', suffix: '' },
  { value: '4.9', label: 'Average Rating', icon: 'StarIcon', suffix: '' },
  { value: '48', label: 'US States Served', icon: 'MapPinIcon', suffix: '' },
  { value: '98', label: 'Satisfaction Rate', icon: 'CheckBadgeIcon', suffix: '%' },
];

interface TickerItem {
  text: string;
  /** filename in /public/assets/flags/, or null if that country's flag hasn't been sourced yet */
  flag: string | null;
}

const TICKER_ITEMS: TickerItem[] = [
  { text: 'Just shipped to Texas', flag: 'us.png' },
  { text: 'New order from Ontario, Canada', flag: null },
  { text: 'Delivered to Queensland, Australia', flag: null },
  { text: 'Shipped to Bavaria, Germany', flag: 'de.png' },
  { text: 'Order confirmed - Paris, France', flag: 'fr.jpg' },
  { text: 'Delivered to Auckland, New Zealand', flag: null },
  { text: 'Shipped to London, UK', flag: null },
  { text: 'Sourced directly from Japan auction', flag: 'ja.png' },
  { text: '5-star review from a farmer in Iowa', flag: 'us.png' },
  { text: 'Parts order shipped to Florida', flag: 'us.png' },
];

function useCountUp(target: number, duration: number, active: boolean) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!active) return;
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [target, duration, active]);
  return count;
}

function StatCounter({ stat, active }: { stat: StatItem; active: boolean }) {
  const numericValue = parseFloat(stat.value);
  const isDecimal = stat.value.includes('.');
  const count = useCountUp(numericValue * (isDecimal ? 10 : 1), 1500, active);
  const displayValue = isDecimal ? (count / 10).toFixed(1) : count.toString();

  return (
    <div className="flex flex-col items-center gap-1 px-4 sm:px-6 py-3 sm:py-4 text-center flex-shrink-0">
      <div className="flex items-center gap-1.5 mb-1">
        <Icon
          name={stat.icon as Parameters<typeof Icon>[0]['name']}
          size={14}
          className="text-primary"
        />
      </div>
      <div className="font-display font-black text-xl sm:text-2xl text-primary leading-none">
        {displayValue}
        {stat.suffix}
      </div>
      <div className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-muted-foreground whitespace-nowrap">
        {stat.label}
      </div>
    </div>
  );
}

export default function SocialProofBar() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [tickerIndex, setTickerIndex] = useState(0);
  const [tickerVisible, setTickerVisible] = useState(true);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setTickerVisible(false);
      setTimeout(() => {
        setTickerIndex((i) => (i + 1) % TICKER_ITEMS.length);
        setTickerVisible(true);
      }, 400);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div ref={ref} className="w-full bg-secondary/60 border-y border-border overflow-hidden">
      {/* Live ticker */}
      <div className="bg-primary/5 border-b border-border px-4 py-2 flex items-center gap-3">
        <span className="flex-shrink-0 flex items-center gap-1.5 text-xs font-black uppercase tracking-widest text-primary">
          <span className="size-2 bg-green-500 rounded-full animate-pulse" />
          Live
        </span>
        <div className="flex-1 overflow-hidden">
          <p
            className={`flex items-center gap-2 text-xs sm:text-sm text-muted-foreground font-medium transition-all duration-400 ${
              tickerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
            }`}
          >
            {TICKER_ITEMS[tickerIndex].flag && (
              // eslint-disable-next-line @next/next/no-img-element -- small static UI icon
              <img
                src={`/assets/flags/${TICKER_ITEMS[tickerIndex].flag}`}
                alt=""
                className="inline-block w-4 h-3 object-cover rounded-[2px] flex-shrink-0"
              />
            )}
            {TICKER_ITEMS[tickerIndex].text}
          </p>
        </div>
        <div className="hidden sm:flex items-center gap-1.5 flex-shrink-0">
          <Icon name="ShieldCheckIcon" size={14} className="text-primary" />
          <span className="text-xs font-bold text-primary">Verified Dealer</span>
        </div>
      </div>

      {/* Stats row */}
      <div className="max-w-7xl mx-auto px-2 sm:px-6">
        <div className="flex items-center justify-between sm:justify-center overflow-x-auto scrollbar-hide divide-x divide-border">
          {STATS.map((stat) => (
            <StatCounter key={stat.label} stat={stat} active={visible} />
          ))}
        </div>
      </div>

      {/* Trust badges */}
      <div className="border-t border-border px-4 py-2.5 flex items-center justify-center gap-4 sm:gap-8 flex-wrap">
        {[
          { icon: 'ShieldCheckIcon', text: 'Verified Importer' },
          { icon: 'TruckIcon', text: 'Direct from Japan' },
          { icon: 'CurrencyDollarIcon', text: 'Best Price Guarantee' },
          { icon: 'PhoneIcon', text: '24/7 Support' },
        ].map((badge) => (
          <div
            key={badge.text}
            className="flex items-center gap-1.5 text-xs font-bold text-muted-foreground"
          >
            <Icon
              name={badge.icon as Parameters<typeof Icon>[0]['name']}
              size={13}
              className="text-primary"
            />
            <span>{badge.text}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
