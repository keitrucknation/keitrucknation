'use client';

import React, { useRef, useEffect, useState } from 'react';
import Link from 'next/link';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';

interface TeamMember {
  name: string;
  role: string;
  bio: string;
  image: string;
  imageAlt: string;
}

const team: TeamMember[] = [
  {
    name: 'Marcus Webb',
    role: 'Founder & Head Importer',
    bio: 'Former ranch hand turned import specialist. Marcus spent 3 years in Japan sourcing vehicles before founding KeiTruckNation in 2018. He personally inspects every truck before it ships.',
    image: 'https://img.rocket.new/generatedImages/rocket_gen_img_1490324af-1779545312863.png',
    imageAlt: 'Marcus Webb, founder of KeiTruckNation, standing in front of a kei truck',
  },
  {
    name: 'Yuki Tanaka',
    role: 'Japan Sourcing Partner',
    bio: 'Based in Osaka, Yuki works with auction houses and dealers across Japan to find the cleanest, lowest-mileage trucks. Her relationships mean we get first pick before trucks hit public auctions.',
    image: 'https://img.rocket.new/generatedImages/rocket_gen_img_14be553e3-1787333490017.png',
    imageAlt: 'Yuki Tanaka, Japan sourcing partner, at a vehicle auction in Japan',
  },
  {
    name: 'Derek Okafor',
    role: 'Logistics & Customs',
    bio: 'Derek handles every step from Japanese port to your driveway - export paperwork, ocean freight, US customs clearance, and domestic delivery coordination. 8 years in vehicle import logistics.',
    image: 'https://img.rocket.new/generatedImages/rocket_gen_img_121937308-1772736244042.png',
    imageAlt: 'Derek Okafor, logistics manager, reviewing shipping documents at a port',
  },
];

const stats = [
  { value: '400+', label: 'Trucks Imported', sub: 'since 2018' },
  { value: '48', label: 'States Delivered', sub: 'coast to coast' },
  { value: '4.9/5', label: 'Customer Rating', sub: 'across 200+ reviews' },
  { value: '6 yrs', label: 'In Business', sub: 'family-owned' },
];

const values = [
  {
    icon: 'MagnifyingGlassIcon',
    title: 'Honest Grading',
    desc: "Every truck is graded by Japanese auction standards - we show you the actual grade report, not a marketing photo. Grade 3 is Grade 3, not 'good condition'.",
  },
  {
    icon: 'WrenchScrewdriverIcon',
    title: 'Pre-Ship Inspection',
    desc: 'Before any truck leaves Japan, it goes through a mechanical inspection. Fluids, brakes, 4WD engagement, hydraulics - all checked and documented.',
  },
  {
    icon: 'DocumentTextIcon',
    title: 'Clean Paperwork',
    desc: 'We handle the full import chain - Japanese export certificate, ocean bill of lading, US customs entry, and state title application. You get a clean title.',
  },
  {
    icon: 'PhoneIcon',
    title: 'Real Support',
    desc: "You can call us. We answer. Our team knows these trucks inside and out - we'll help you pick the right one for your use case and answer questions after delivery.",
  },
];

const timeline = [
  {
    year: '2018',
    event:
      'Marcus imports his first kei truck for his own farm in Oregon. Neighbors start asking where to get one.',
  },
  {
    year: '2019',
    event:
      'KeiTruckNation officially launches. First 12 trucks sold in 6 months, all to farmers and ranchers in the Pacific Northwest.',
  },
  {
    year: '2021',
    event:
      'Partnership with Yuki Tanaka in Osaka gives us direct auction access. Inventory triples. First electric kei truck imported.',
  },
  {
    year: '2023',
    event:
      'Expanded to parts & accessories. Now shipping to all 48 contiguous states with a network of trusted freight carriers.',
  },
  {
    year: '2026',
    event:
      '400+ trucks delivered. Still family-owned, still answering the phone, still obsessed with finding the cleanest trucks in Japan.',
  },
];

function useVisible() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setVisible(true);
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return { ref, visible };
}

export default function AboutClient() {
  const heroVis = useVisible();
  const statsVis = useVisible();
  const storyVis = useVisible();
  const teamVis = useVisible();
  const valuesVis = useVisible();
  const timelineVis = useVisible();

  return (
    <div className="pt-24 sm:pt-28">
      {/* Hero */}
      <div
        ref={heroVis.ref}
        className="relative overflow-hidden border-b border-border py-16 sm:py-24"
      >
        <div className="absolute inset-0 grid-lines-bg opacity-30" />
        <div className="absolute inset-0 hero-glow opacity-60" />
        <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[500px] h-[500px] blob-accent opacity-40 pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
          <div
            className={`max-w-3xl transition-all duration-700 ${heroVis.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="size-2 bg-primary rounded-full animate-pulse-glow" />
              <span className="tag-pill bg-primary/10 text-primary border border-primary/20">
                Our Story
              </span>
            </div>
            <h1
              className="font-display font-bold text-foreground mb-6"
              style={{
                fontSize: 'clamp(2.5rem, 6vw, 5rem)',
                lineHeight: 0.95,
                letterSpacing: '-0.03em',
              }}
            >
              We find the
              <br />
              <span className="text-primary">best kei trucks</span>
              <br />
              in Japan.
            </h1>
            <p className="text-muted-foreground text-base sm:text-lg leading-relaxed max-w-xl">
              KeiTruckNation is a family-owned import business based in Portland, Oregon. We source,
              inspect, and ship Japanese mini trucks directly to farmers, ranchers, contractors, and
              off-road enthusiasts across the US.
            </p>
            <div className="flex flex-wrap gap-3 mt-8">
              <Link
                href="/products"
                className="flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-full font-bold text-xs uppercase tracking-widest hover:scale-105 transition-transform min-h-[44px]"
              >
                Browse Inventory
                <Icon name="ArrowRightIcon" size={14} />
              </Link>
              <Link
                href="/contact"
                className="flex items-center gap-2 px-6 py-3 border border-border text-foreground rounded-full font-bold text-xs uppercase tracking-widest hover:bg-muted transition-colors min-h-[44px]"
              >
                Get in Touch
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Bar */}
      <div ref={statsVis.ref} className="border-b border-border bg-secondary/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-12">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {stats.map((stat, i) => (
              <div
                key={stat.label}
                className={`flex flex-col gap-1 transition-all duration-700 ${statsVis.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <span className="font-display font-black text-3xl sm:text-4xl text-primary">
                  {stat.value}
                </span>
                <span className="text-xs font-black uppercase tracking-widest text-foreground">
                  {stat.label}
                </span>
                <span className="text-xs text-muted-foreground">{stat.sub}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Story Section */}
      <div ref={storyVis.ref} className="py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div
              className={`transition-all duration-700 ${storyVis.visible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}
            >
              <div className="flex items-center gap-3 mb-5">
                <div className="size-2 bg-accent rounded-full" />
                <span className="tag-pill bg-accent/10 text-accent border border-accent/20">
                  How It Started
                </span>
              </div>
              <h2
                className="font-display font-bold text-foreground mb-6"
                style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', lineHeight: 1.05 }}
              >
                A farm problem that became a business
              </h2>
              <div className="flex flex-col gap-4 text-muted-foreground text-sm sm:text-base leading-relaxed">
                <p>
                  In 2017, Marcus Webb was running a small farm outside Portland and needed a
                  utility vehicle that could handle rough terrain, fit through narrow barn doors,
                  and not cost $40,000. A friend mentioned kei trucks - the compact Japanese mini
                  trucks that had been used on farms in Japan for decades.
                </p>
                <p>
                  After importing one for himself and watching every neighbor ask &ldquo;where did
                  you get that?&rdquo;, Marcus spent a year in Japan learning the auction system,
                  building relationships with dealers, and understanding what makes a good import.
                  KeiTruckNation launched in 2018.
                </p>
                <p>
                  Today we&apos;ve delivered over 400 trucks to all 48 contiguous states. We&apos;re
                  still small enough that Marcus knows most of our customers by name - and we intend
                  to keep it that way.
                </p>
              </div>
            </div>

            <div
              className={`relative transition-all duration-700 delay-200 ${storyVis.visible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}
            >
              <div className="relative aspect-[4/3] rounded-3xl overflow-hidden border border-border">
                <AppImage
                  src="https://img.rocket.new/generatedImages/rocket_gen_img_1b5236d81-1773613695936.png"
                  alt="Kei truck on a mountain road in Japan, dramatic scenery in background"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent" />
              </div>
              {/* Floating stat card */}
              <div className="absolute -bottom-4 -left-4 bg-card border border-border rounded-2xl p-4 shadow-2xl">
                <div className="font-display font-black text-2xl text-primary">6 yrs</div>
                <div className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                  Family Owned
                </div>
              </div>
              <div className="absolute -top-4 -right-4 bg-primary rounded-2xl p-4 shadow-2xl">
                <div className="font-display font-black text-2xl text-primary-foreground">400+</div>
                <div className="text-xs font-bold uppercase tracking-widest text-primary-foreground/70">
                  Trucks Sold
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Values */}
      <div ref={valuesVis.ref} className="py-16 sm:py-24 bg-secondary/20 border-y border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div
            className={`mb-12 transition-all duration-700 ${valuesVis.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="size-2 bg-primary rounded-full" />
              <span className="tag-pill bg-primary/10 text-primary border border-primary/20">
                How We Work
              </span>
            </div>
            <h2
              className="font-display font-bold text-foreground"
              style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', lineHeight: 1.05 }}
            >
              What we stand for
            </h2>
          </div>

          {/* Bento-style values grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            {values.map((v, i) => (
              <div
                key={v.title}
                className={`bg-card border border-border rounded-3xl p-6 flex flex-col gap-4 transition-all duration-700 ${valuesVis.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <div className="size-10 rounded-2xl bg-primary/10 flex items-center justify-center">
                  <Icon name={v.icon as 'MagnifyingGlassIcon'} size={20} className="text-primary" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-base text-foreground mb-2">
                    {v.title}
                  </h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">{v.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Team */}
      <div ref={teamVis.ref} className="py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div
            className={`mb-12 transition-all duration-700 ${teamVis.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="size-2 bg-accent rounded-full" />
              <span className="tag-pill bg-accent/10 text-accent border border-accent/20">
                The Team
              </span>
            </div>
            <h2
              className="font-display font-bold text-foreground"
              style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', lineHeight: 1.05 }}
            >
              Small team, deep expertise
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 sm:gap-6">
            {team.map((member, i) => (
              <div
                key={member.name}
                className={`bg-card border border-border rounded-3xl overflow-hidden transition-all duration-700 ${teamVis.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                style={{ transitionDelay: `${i * 120}ms` }}
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <AppImage
                    src={member.image}
                    alt={member.imageAlt}
                    fill
                    sizes="(max-width: 640px) 100vw, 33vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-card/80 to-transparent" />
                  <div className="absolute bottom-4 left-4">
                    <div className="font-display font-bold text-lg text-foreground">
                      {member.name}
                    </div>
                    <div className="text-xs font-bold uppercase tracking-widest text-primary">
                      {member.role}
                    </div>
                  </div>
                </div>
                <div className="p-5">
                  <p className="text-xs text-muted-foreground leading-relaxed">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Timeline */}
      <div ref={timelineVis.ref} className="py-16 sm:py-24 bg-secondary/20 border-t border-border">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div
            className={`mb-12 transition-all duration-700 ${timelineVis.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="size-2 bg-primary rounded-full" />
              <span className="tag-pill bg-primary/10 text-primary border border-primary/20">
                Our History
              </span>
            </div>
            <h2
              className="font-display font-bold text-foreground"
              style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', lineHeight: 1.05 }}
            >
              Six years of kei trucks
            </h2>
          </div>

          <div className="flex flex-col gap-0">
            {timeline.map((item, i) => (
              <div
                key={item.year}
                className={`flex gap-6 sm:gap-8 transition-all duration-700 ${timelineVis.visible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-6'}`}
                style={{ transitionDelay: `${i * 120}ms` }}
              >
                {/* Year column */}
                <div className="flex flex-col items-center">
                  <div className="size-10 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center flex-shrink-0">
                    <span className="text-[10px] font-black text-primary">{item.year}</span>
                  </div>
                  {i < timeline.length - 1 && <div className="w-px flex-1 bg-border my-1" />}
                </div>
                {/* Content */}
                <div className={`pb-8 ${i === timeline.length - 1 ? 'pb-0' : ''}`}>
                  <div className="font-display font-bold text-base text-foreground mb-1">
                    {item.year}
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.event}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="py-16 sm:py-20 border-t border-border">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h2
            className="font-display font-bold text-foreground mb-4"
            style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', lineHeight: 1.05 }}
          >
            Ready to find your truck?
          </h2>
          <p className="text-muted-foreground mb-8 text-sm sm:text-base">
            Browse our current inventory or reach out - we&apos;ll help you find the right kei truck
            for your property, budget, and use case.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link
              href="/products"
              className="flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground rounded-full font-bold text-xs uppercase tracking-widest hover:scale-105 transition-transform min-h-[52px]"
            >
              Browse Inventory
              <Icon name="ArrowRightIcon" size={14} />
            </Link>
            <Link
              href="/contact"
              className="flex items-center gap-2 px-8 py-4 border border-border text-foreground rounded-full font-bold text-xs uppercase tracking-widest hover:bg-muted transition-colors min-h-[52px]"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
