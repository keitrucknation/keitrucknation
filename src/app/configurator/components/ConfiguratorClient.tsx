'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Icon from '@/components/ui/AppIcon';
import MappedIcon from '@/components/ui/MappedIcon';

import { useCurrency } from '@/components/CurrencyToggle';

interface ConfigOption {
  id: string;
  label: string;
  price: number;
  description?: string;
}

interface ConfigSection {
  key: string;
  title: string;
  icon: string;
  options: ConfigOption[];
}

const CONFIG_SECTIONS: ConfigSection[] = [
  {
    key: 'make',
    title: 'Manufacturer',
    icon: 'factory',
    options: [
      {
        id: 'suzuki',
        label: 'Suzuki Carry',
        price: 7500,
        description: 'Most popular. Reliable EFI engine, great parts availability.',
      },
      {
        id: 'daihatsu',
        label: 'Daihatsu Hijet',
        price: 7800,
        description: 'Slightly larger cab. Excellent for farm and utility use.',
      },
      {
        id: 'honda',
        label: 'Honda Acty',
        price: 7200,
        description: 'Mid-engine layout. Smooth ride, great for flatbed work.',
      },
      {
        id: 'subaru',
        label: 'Subaru Sambar',
        price: 7600,
        description: 'Rear-engine. Unique handling, popular with collectors.',
      },
      {
        id: 'mitsubishi',
        label: 'Mitsubishi Minicab',
        price: 7400,
        description: 'Workhorse. Tough and dependable for heavy loads.',
      },
    ],
  },
  {
    key: 'body',
    title: 'Body Style',
    icon: 'truck',
    options: [
      {
        id: 'flatbed',
        label: 'Flatbed',
        price: 0,
        description: 'Most versatile. Open bed for any cargo.',
      },
      {
        id: 'dump',
        label: 'Dump Bed',
        price: 800,
        description: 'Hydraulic dump. Perfect for landscaping and construction.',
      },
      {
        id: 'enclosed',
        label: 'Enclosed Cab',
        price: 600,
        description: 'Weather protection. Great for year-round use.',
      },
      {
        id: 'refrigerated',
        label: 'Refrigerated',
        price: 1800,
        description: 'Cold chain capable. Ideal for food vendors.',
      },
      {
        id: 'scissor',
        label: 'Scissor Lift',
        price: 2200,
        description: 'Elevated platform. Orchard and warehouse use.',
      },
    ],
  },
  {
    key: 'drivetrain',
    title: 'Drivetrain',
    icon: 'gear',
    options: [
      {
        id: '2wd',
        label: '2WD',
        price: 0,
        description: 'Standard. Best for paved roads and light off-road.',
      },
      {
        id: '4wd',
        label: '4WD Hi-Lo',
        price: 1200,
        description: 'Full 4WD with high and low range. Serious off-road.',
      },
    ],
  },
  {
    key: 'transmission',
    title: 'Transmission',
    icon: 'refresh',
    options: [
      {
        id: 'manual',
        label: 'Manual 5-Speed',
        price: 0,
        description: 'More control, lower maintenance.',
      },
      {
        id: 'automatic',
        label: 'Automatic',
        price: 400,
        description: 'Easier to drive, especially in tight spaces.',
      },
    ],
  },
  {
    key: 'condition',
    title: 'Condition Grade',
    icon: 'star',
    options: [
      {
        id: 'good',
        label: 'Good (Grade 3)',
        price: 0,
        description: 'Minor cosmetic wear. Mechanically sound.',
      },
      {
        id: 'very_good',
        label: 'Very Good (Grade 4)',
        price: 600,
        description: 'Light use. Minimal wear inside and out.',
      },
      {
        id: 'excellent',
        label: 'Excellent (Grade 4.5)',
        price: 1200,
        description: 'Near showroom. Carefully maintained.',
      },
    ],
  },
  {
    key: 'extras',
    title: 'Add-Ons',
    icon: 'wrench',
    options: [
      {
        id: 'lift_kit',
        label: '3" Lift Kit',
        price: 195,
        description: 'Increased ground clearance for off-road.',
      },
      {
        id: 'winch',
        label: 'Front Winch',
        price: 380,
        description: '3,000 lb electric winch with remote.',
      },
      {
        id: 'led_lights',
        label: 'LED Light Bar',
        price: 145,
        description: 'Full-width roof-mount LED bar.',
      },
      {
        id: 'marine_insurance',
        label: 'Marine Insurance',
        price: 180,
        description: 'Covers ocean transit loss or damage.',
      },
      {
        id: 'expedited',
        label: 'Expedited Shipping',
        price: 500,
        description: 'Reduce delivery to 2-3 weeks.',
      },
    ],
  },
];

type Selections = Record<string, string | string[]>;

export default function ConfiguratorClient() {
  const { convert } = useCurrency();
  const [selections, setSelections] = useState<Selections>({
    make: 'suzuki',
    body: 'flatbed',
    drivetrain: '2wd',
    transmission: 'manual',
    condition: 'good',
    extras: [],
  });
  const [submitted, setSubmitted] = useState(false);

  const selectSingle = (key: string, id: string) => {
    setSelections((prev) => ({ ...prev, [key]: id }));
  };

  const toggleExtra = (id: string) => {
    setSelections((prev) => {
      const extras = (prev.extras as string[]) || [];
      return {
        ...prev,
        extras: extras.includes(id) ? extras.filter((e) => e !== id) : [...extras, id],
      };
    });
  };

  const calculateTotal = () => {
    let total = 0;
    CONFIG_SECTIONS.forEach((section) => {
      if (section.key === 'extras') {
        const selected = (selections.extras as string[]) || [];
        section.options.forEach((opt) => {
          if (selected.includes(opt.id)) total += opt.price;
        });
      } else {
        const sel = selections[section.key] as string;
        const opt = section.options.find((o) => o.id === sel);
        if (opt) total += opt.price;
      }
    });
    return total;
  };

  const getLabel = (key: string) => {
    const section = CONFIG_SECTIONS.find((s) => s.key === key);
    if (!section) return '';
    if (key === 'extras') {
      const selected = (selections.extras as string[]) || [];
      return (
        selected
          .map((id) => section.options.find((o) => o.id === id)?.label)
          .filter(Boolean)
          .join(', ') || 'None'
      );
    }
    return section.options.find((o) => o.id === selections[key])?.label || '';
  };

  const total = calculateTotal();

  if (submitted) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-4 text-center gap-6">
        <div className="size-20 rounded-full bg-primary/10 flex items-center justify-center">
          <Icon name="CheckCircleIcon" size={40} className="text-primary" />
        </div>
        <h2 className="font-display font-bold text-3xl text-foreground">Configuration Saved!</h2>
        <p className="text-muted-foreground max-w-md">
          Your ideal kei truck spec has been noted. Our team will reach out with matching inventory
          and a personalized quote.
        </p>
        <div className="flex gap-3 flex-wrap justify-center">
          <Link
            href="/inventory"
            className="px-6 py-3 bg-primary text-primary-foreground rounded-xl font-bold text-sm uppercase tracking-widest hover:scale-105 transition-transform"
          >
            Browse Inventory
          </Link>
          <button
            onClick={() => setSubmitted(false)}
            className="px-6 py-3 border border-border rounded-xl font-bold text-sm text-muted-foreground hover:text-foreground hover:bg-muted transition-all"
          >
            Reconfigure
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-24 sm:pt-28">
      {/* Hero */}
      <div className="relative overflow-hidden border-b border-border py-14 sm:py-20">
        <div className="absolute inset-0 grid-lines-bg opacity-30" />
        <div className="absolute inset-0 hero-glow opacity-60" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center gap-2 mb-4">
            <div className="size-2 bg-primary rounded-full animate-pulse-glow" />
            <span className="tag-pill bg-primary/10 text-primary border border-primary/20 inline-flex items-center gap-1.5">
              <MappedIcon icon="gear" size={13} /> Build Your Truck
            </span>
          </div>
          <h1
            className="font-display font-bold text-foreground mb-4"
            style={{ fontSize: 'clamp(2.2rem, 5vw, 4rem)', lineHeight: 1.05 }}
          >
            Truck <span className="text-primary">Configurator</span>
          </h1>
          <p className="text-muted-foreground text-base sm:text-lg max-w-2xl leading-relaxed">
            Spec your ideal kei truck. Choose your make, body style, drivetrain, and add-ons -
            we&apos;ll match you with available inventory or source it from Japan.
          </p>
        </div>
      </div>

      {/* Main */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Config Sections */}
        <div className="lg:col-span-2 flex flex-col gap-8">
          {CONFIG_SECTIONS.map((section) => (
            <div key={section.key} className="bg-card border border-border rounded-3xl p-6">
              <h2 className="font-display font-bold text-lg text-foreground mb-4 flex items-center gap-2">
                <MappedIcon icon={section.icon} size={18} className="mr-1" /> {section.title}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {section.options.map((opt) => {
                  const isExtras = section.key === 'extras';
                  const selected = isExtras
                    ? ((selections.extras as string[]) || []).includes(opt.id)
                    : selections[section.key] === opt.id;

                  return (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() =>
                        isExtras ? toggleExtra(opt.id) : selectSingle(section.key, opt.id)
                      }
                      aria-pressed={selected}
                      className={`text-left p-4 rounded-2xl border-2 transition-all ${
                        selected
                          ? 'border-primary bg-primary/5'
                          : 'border-border hover:border-muted-foreground/40'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <span className="font-bold text-sm text-foreground">{opt.label}</span>
                        <span
                          className={`text-xs font-black flex-shrink-0 ${opt.price > 0 ? 'text-primary' : 'text-muted-foreground'}`}
                        >
                          {opt.price > 0 ? `+${convert(opt.price)}` : 'Included'}
                        </span>
                      </div>
                      {opt.description && (
                        <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                          {opt.description}
                        </p>
                      )}
                      {selected && (
                        <div className="mt-2 flex items-center gap-1 text-primary text-xs font-bold">
                          <Icon name="CheckCircleIcon" size={14} />
                          Selected
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Summary Sidebar */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 bg-card border border-border rounded-3xl p-6 flex flex-col gap-5">
            <h2 className="font-display font-bold text-lg text-foreground">Your Configuration</h2>

            <div className="flex flex-col gap-3">
              {CONFIG_SECTIONS.map((section) => (
                <div key={section.key} className="flex items-start justify-between gap-2 text-sm">
                  <span className="text-muted-foreground flex-shrink-0">{section.title}</span>
                  <span className="font-semibold text-foreground text-right">
                    {getLabel(section.key) || ' - '}
                  </span>
                </div>
              ))}
            </div>

            <div className="border-t border-border pt-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Estimated Price</span>
                <span className="font-display font-black text-2xl text-primary">
                  {convert(total)}
                </span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Includes shipping estimate. Final price confirmed at checkout.
              </p>
            </div>

            <button
              onClick={() => setSubmitted(true)}
              className="w-full py-3 bg-primary text-primary-foreground rounded-xl font-black text-sm uppercase tracking-widest hover:scale-105 transition-transform glow-lime"
            >
              Get a Quote
            </button>

            <Link
              href="/inventory"
              className="w-full py-3 border border-border rounded-xl font-bold text-sm text-muted-foreground hover:text-foreground hover:bg-muted transition-all text-center"
            >
              Browse Matching Inventory
            </Link>

            <p className="text-xs text-muted-foreground text-center leading-relaxed">
              No commitment required. We&apos;ll match your spec to available stock or source from
              Japan.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
