'use client';

import React, { useRef, useEffect, useState } from 'react';
import Link from 'next/link';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';

interface PartCategory {
  id: string;
  name: string;
  description: string;
  count: string;
  image: string;
  imageAlt: string;
  colSpan?: string;
}

const categories: PartCategory[] = [
  {
    id: 'engine',
    name: 'Engine & Drivetrain',
    description: 'OEM and aftermarket parts for 660cc engines, transmissions, and 4WD systems',
    count: '240+ parts',
    image: 'https://img.rocket.new/generatedImages/rocket_gen_img_1dafdc22d-1784757802650.png',
    imageAlt:
      'Automotive engine parts on dark workshop surface, dramatic industrial lighting, deep shadows',
    colSpan: 'md:col-span-2',
  },
  {
    id: 'body',
    name: 'Body & Exterior',
    description: 'Bumpers, fenders, bed liners, roll bars, and lift kits',
    count: '180+ parts',
    image: 'https://img.rocket.new/generatedImages/rocket_gen_img_19f3d511a-1774448059078.png',
    imageAlt: 'Auto body parts in dark workshop, tools on workbench, moody industrial atmosphere',
    colSpan: '',
  },
  {
    id: 'electrical',
    name: 'Electrical & Lighting',
    description: 'LED kits, wiring harnesses, switches, and instrument clusters',
    count: '95+ parts',
    image: 'https://images.unsplash.com/photo-1621675756687-d9c98aafd021',
    imageAlt: 'Electronic circuit board and automotive wiring, dark background, technical close-up',
    colSpan: '',
  },
  {
    id: 'tires',
    name: 'Tires, Wheels & Suspension',
    description: 'All-terrain tires, steel wheels, lift kits, and shock absorbers',
    count: '120+ items',
    image: 'https://images.unsplash.com/photo-1664800522478-9f94e0936b8f',
    imageAlt:
      'Off-road tires and wheels in dim garage, dark concrete floor, rugged industrial setting',
    colSpan: 'md:col-span-4',
  },
];

const PartsSection: React.FC = () => {
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
    <section ref={sectionRef} className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6">
      {/* Header */}
      <div
        className={`flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 sm:mb-14 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
      >
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="size-2 bg-accent rounded-full" />
            <span className="tag-pill bg-accent/10 text-accent border border-accent/20">
              Parts & Accessories
            </span>
          </div>
          <h2 className="font-display text-section-xl text-foreground">
            Keep it running.
            <br />
            <span className="text-muted-foreground">Make it yours.</span>
          </h2>
        </div>
        <Link
          href="/products"
          className="flex items-center gap-2 text-sm font-bold text-muted-foreground hover:text-accent transition-colors group"
        >
          Browse all parts
          <Icon
            name="ArrowRightIcon"
            size={16}
            className="group-hover:translate-x-1 transition-transform"
          />
        </Link>
      </div>

      {/* BENTO GRID AUDIT:
           Array has 4 cards: [Engine cs-2, Body cs-1, Electrical cs-1, Tires cs-4]
           Row 1: [col-1+2: Engine cs-2] [col-3: Body cs-1] [col-4: Electrical cs-1]
           Row 2: [col-1+2+3+4: Tires cs-4]
           Placed 4/4 cards
        */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {categories.map((cat, index) => (
          <Link
            key={cat.id}
            href="/products"
            className={`group relative rounded-3xl overflow-hidden card-hover transition-all duration-700 ${cat.colSpan || ''} ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
            style={{
              transitionDelay: `${index * 100}ms`,
              minHeight: cat.id === 'tires' ? '180px' : '260px',
            }}
          >
            <AppImage
              src={cat.image}
              alt={cat.imageAlt}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />

            {/* Scrim */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/10 group-hover:from-black/90 transition-all duration-300" />

            <div className="absolute inset-0 flex flex-col justify-end p-5 sm:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="tag-pill bg-white/10 text-white border border-white/10 w-fit mb-2">
                    {cat.count}
                  </div>
                  <h3 className="font-display font-bold text-lg sm:text-xl text-white mb-1">
                    {cat.name}
                  </h3>
                  {cat.id !== 'tires' && (
                    <p className="text-xs text-white/60 leading-relaxed max-w-xs">
                      {cat.description}
                    </p>
                  )}
                </div>
                <div className="size-10 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center group-hover:bg-primary group-hover:border-primary transition-all duration-300 flex-shrink-0 ml-4">
                  <Icon
                    name="ArrowRightIcon"
                    size={16}
                    className="text-primary group-hover:text-primary-foreground transition-colors"
                  />
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default PartsSection;
