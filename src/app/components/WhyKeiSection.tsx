'use client';

import React, { useRef, useEffect, useState } from 'react';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';

const WhyKeiSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-20 sm:py-28 max-w-7xl mx-auto px-4 sm:px-6">
      {/* Header */}
      <div
        className={`mb-10 sm:mb-14 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="size-2 bg-accent rounded-full" />
          <span className="tag-pill bg-accent/10 text-accent border border-accent/20">
            Why Go Kei?
          </span>
        </div>
        <h2 className="font-display text-section-xl text-foreground max-w-2xl">
          One truck. Every job.
          <br />
          <span className="text-muted-foreground">Built for people who actually work.</span>
        </h2>
      </div>

      {/* BENTO GRID AUDIT:
           Array has 3 cards: [FarmCard, ContractorCard, OffRoadCard]
           Row 1: [col-1: FarmCard cs-1 rs-2] [col-2: ContractorCard cs-1 rs-1]
           Row 2: [col-1: FILLED by FarmCard] [col-2: OffRoadCard cs-1 rs-1]
           Placed 3/3 cards
        */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* FarmCard - col-1, row-span-2 */}
        <div
          className={`relative rounded-3xl overflow-hidden min-h-[400px] md:row-span-2 card-hover transition-all duration-700 delay-100 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
          <AppImage
            src="https://images.unsplash.com/photo-1713887738769-f5bfe8a1335b"
            alt="Golden wheat farmland at sunrise, wide open fields, warm amber light, rural agricultural setting, dark moody shadows in foreground"
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
          />

          {/* Scrim - dark overlay for white text */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/10" />
          <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-8">
            <div className="tag-pill bg-primary/20 text-primary border border-primary/30 w-fit mb-4">
              <Icon name="HomeModernIcon" size={12} />
              Farmers & Ranchers
            </div>
            <h3 className="font-display font-bold text-2xl sm:text-3xl text-white mb-3">
              Fits where your pickup can&apos;t
            </h3>
            <p className="text-sm text-white/75 leading-relaxed max-w-sm">
              Squeeze through orchard rows, navigate tight barn aisles, and haul 1,200 lbs of feed -
              all in a truck that costs less than a used ATV.
            </p>
            <div className="flex flex-wrap gap-2 mt-4">
              {['4WD Available', '1,200 lb Payload', 'Low Clearance'].map((tag) => (
                <span
                  key={tag}
                  className="text-xs px-3 py-1 bg-white/10 backdrop-blur-sm rounded-full text-white/80 border border-white/10"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* ContractorCard - col-2, row-1 */}
        <div
          className={`relative rounded-3xl overflow-hidden min-h-[220px] card-hover transition-all duration-700 delay-200 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
          <AppImage
            src="https://images.unsplash.com/photo-1649071868131-debd655b5976"
            alt="Construction site at dusk, heavy equipment silhouettes, dramatic sky, dark industrial shadows, low-key lighting"
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/10" />
          <div className="absolute inset-0 flex flex-col justify-end p-5 sm:p-6">
            <div className="tag-pill bg-accent/20 text-accent border border-accent/30 w-fit mb-3">
              <Icon name="WrenchScrewdriverIcon" size={12} />
              Contractors
            </div>
            <h3 className="font-display font-bold text-xl sm:text-2xl text-white mb-2">
              Your most profitable tool
            </h3>
            <p className="text-xs sm:text-sm text-white/70 leading-relaxed">
              At $6–10K fully equipped, a kei truck pays for itself in 3 months of daily use.
            </p>
          </div>
        </div>

        {/* OffRoadCard - col-2, row-2 */}
        <div
          className={`relative rounded-3xl overflow-hidden min-h-[220px] card-hover transition-all duration-700 delay-300 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
          <AppImage
            src="https://images.unsplash.com/photo-1578049091940-43bedf34f7d8"
            alt="Rugged off-road trail through dense forest, muddy path, dramatic dark tree canopy, moody adventure lighting"
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/10" />
          <div className="absolute inset-0 flex flex-col justify-end p-5 sm:p-6">
            <div className="tag-pill bg-primary/20 text-primary border border-primary/30 w-fit mb-3">
              <Icon name="MapIcon" size={12} />
              Off-Road & Collectors
            </div>
            <h3 className="font-display font-bold text-xl sm:text-2xl text-white mb-2">
              Nothing like it on the trail
            </h3>
            <p className="text-xs sm:text-sm text-white/70 leading-relaxed">
              Lift kits, snorkels, locking diffs - these rigs are a blank canvas for adventure
              builds.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyKeiSection;
