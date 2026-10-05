'use client';

import React, { useRef, useEffect, useState } from 'react';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';

interface Testimonial {
  id: string;
  name: string;
  role: string;
  location: string;
  quote: string;
  truck: string;
  avatar: string;
  avatarAlt: string;
  rating: number;
}

const testimonials: Testimonial[] = [
  {
    id: 't1',
    name: 'Dale Hutchinson',
    role: 'Peach Orchard Owner',
    location: 'Fresno, CA',
    quote:
      "Fits perfectly between my orchard rows. I was hauling bins of fruit in week one. Bought a second one six months later - best equipment decision I've made in 20 years.",
    truck: '1999 Suzuki Carry 4WD',
    avatar: 'https://img.rocket.new/generatedImages/rocket_gen_img_1ce68f92b-1772299646659.png',
    avatarAlt: 'Middle-aged male farmer with sun-weathered skin, outdoor setting, natural light',
    rating: 5,
  },
  {
    id: 't2',
    name: 'Maria Sandoval',
    role: 'Landscaping Contractor',
    location: 'Austin, TX',
    quote:
      "My crew uses it every single day. Fits through gates my full-size truck can't touch. Paid itself off in 4 months of saved rental costs. KeiTruckNation handled all the paperwork - zero hassle.",
    truck: '2003 Daihatsu Hijet Dump',
    avatar: 'https://img.rocket.new/generatedImages/rocket_gen_img_18107e6ba-1763294286127.png',
    avatarAlt:
      'Hispanic businesswoman in work attire, professional outdoor portrait, warm natural light',
    rating: 5,
  },
  {
    id: 't3',
    name: 'Brent Kowalski',
    role: 'Off-Road Enthusiast',
    location: 'Bozeman, MT',
    quote:
      "I lifted mine 4 inches, threw on some AT tires and a snorkel. This thing goes places my Jeep won't. Gets more attention at trail meets than any truck I've owned. Absolute blast.",
    truck: '2001 Subaru Sambar 4WD',
    avatar: 'https://images.unsplash.com/photo-1727573571714-7fc220aeb751',
    avatarAlt: 'Young outdoorsy man with beard, casual mountain setting, natural light portrait',
    rating: 5,
  },
];

const TestimonialsSection: React.FC = () => {
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
    <section ref={sectionRef} className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6" id="about">
      {/* Header */}
      <div
        className={`mb-10 sm:mb-14 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="size-2 bg-accent rounded-full" />
          <span className="tag-pill bg-accent/10 text-accent border border-accent/20">
            Real Customers
          </span>
        </div>
        <h2 className="font-display text-section-xl text-foreground">
          Don&apos;t take our word for it.
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
        {testimonials.map((t, index) => (
          <div
            key={t.id}
            className={`bg-card border border-border rounded-3xl p-6 sm:p-8 flex flex-col gap-5 card-hover transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
            style={{ transitionDelay: `${index * 130}ms` }}
          >
            {/* Stars */}
            <div className="flex gap-1">
              {Array.from({ length: t.rating }).map((_, i) => (
                <Icon key={i} name="StarIcon" size={14} className="text-primary" variant="solid" />
              ))}
            </div>

            {/* Quote */}
            <blockquote className="text-sm sm:text-base text-foreground/85 leading-relaxed flex-1">
              &ldquo;{t.quote}&rdquo;
            </blockquote>

            {/* Truck tag */}
            <div className="tag-pill bg-muted text-muted-foreground border border-border w-fit">
              <Icon name="TruckIcon" size={10} />
              {t.truck}
            </div>

            {/* Author */}
            <div className="flex items-center gap-3 pt-3 border-t border-border">
              <div className="size-10 rounded-full overflow-hidden flex-shrink-0">
                <AppImage
                  src={t.avatar}
                  alt={t.avatarAlt}
                  width={40}
                  height={40}
                  className="object-cover"
                />
              </div>
              <div>
                <div className="font-bold text-sm text-foreground">{t.name}</div>
                <div className="text-xs text-muted-foreground">
                  {t.role} · {t.location}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TestimonialsSection;
