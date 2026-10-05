'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';
import { INVENTORY } from '@/lib/inventory';
import { cartStore } from '@/lib/cartStore';

// Pulls identity fields (name/year/make/price/image) from the single source of
// truth in src/lib/inventory.ts, keyed by slug, so a price or photo change there
// automatically reflects here too. Falls back to the value passed in if the slug
// isn't found (e.g. this truck only exists in the comparison tool).
function syncIdentity<
  T extends {
    slug?: string;
    name: string;
    year: string;
    make: string;
    price: number;
    image: string;
    imageAlt: string;
    badge?: string;
  },
>(t: T): T {
  const match = t.slug ? INVENTORY.find((inv) => inv.slug === t.slug) : undefined;
  if (!match) return t;
  return {
    ...t,
    name: match.name,
    year: match.year,
    make: match.make,
    price: match.price,
    image: match.image,
    imageAlt: match.imageAlt,
    badge: match.badge,
  };
}

interface Truck {
  id: string;
  slug?: string;
  name: string;
  year: string;
  make: string;
  price: number;
  image: string;
  imageAlt: string;
  badge?: string;
  specs: {
    engine: string;
    displacement: string;
    drivetrain: string;
    transmission: string;
    mileage: string;
    condition: string;
    bedLength: string;
    payload: string;
    fuelType: string;
    ac: string;
    powerSteering: string;
    dumpBed: string;
    extendedCab: string;
    topSpeed: string;
    fuelEconomy: string;
  };
  highlights: string[];
  bestFor: string;
}

const trucks: Truck[] = [
  {
    id: 'p1',
    slug: 'carry-dump-4wd',
    name: 'Carry Dump 4WD',
    year: '1998',
    make: 'Suzuki',
    price: 7495,
    image: 'https://img.rocket.new/generatedImages/rocket_gen_img_11e03fff8-1772115583467.png',
    imageAlt: 'Compact Japanese kei pickup truck on rural road, side view',
    badge: 'Best Seller',
    specs: {
      engine: 'F6A 3-Cylinder',
      displacement: '660cc',
      drivetrain: '4WD Hi-Lo',
      transmission: '5-Speed Manual',
      mileage: '42,000 km',
      condition: 'Excellent (Grade 4)',
      bedLength: '6.2 ft',
      payload: '1,100 lbs',
      fuelType: 'Gasoline',
      ac: 'No',
      powerSteering: 'No',
      dumpBed: 'Yes',
      extendedCab: 'No',
      topSpeed: '55 mph',
      fuelEconomy: '35–40 mpg',
    },
    highlights: ['Hydraulic dump bed', 'True 4WD with low range', 'Proven F6A engine'],
    bestFor: 'Farm & Ranch',
  },
  {
    id: 'p2',
    slug: 'hijet-jumbo-4wd',
    name: 'Hijet Jumbo',
    year: '2002',
    make: 'Daihatsu',
    price: 8950,
    image: 'https://img.rocket.new/generatedImages/rocket_gen_img_1e0d5bf8c-1787267393908.png',
    imageAlt: 'Japanese mini truck with extended cab in open field, front quarter view',
    badge: 'Just Arrived',
    specs: {
      engine: 'EF-SE 3-Cylinder EFI',
      displacement: '660cc',
      drivetrain: '4WD Hi-Lo',
      transmission: '5-Speed Manual',
      mileage: '36,500 km',
      condition: 'Very Good (Grade 4)',
      bedLength: '5.8 ft',
      payload: '1,000 lbs',
      fuelType: 'Gasoline',
      ac: 'Yes',
      powerSteering: 'Yes',
      dumpBed: 'No',
      extendedCab: 'Yes',
      topSpeed: '60 mph',
      fuelEconomy: '38–44 mpg',
    },
    highlights: [
      'Extended cab for extra passengers',
      'Power steering & A/C',
      'EFI engine for reliability',
    ],
    bestFor: 'Daily Driver & Work',
  },
  {
    id: 'p3',
    slug: 'sambar-tc-awd',
    name: 'Sambar TC AWD',
    year: '2005',
    make: 'Subaru',
    price: 9200,
    image: 'https://img.rocket.new/generatedImages/rocket_gen_img_1368ac357-1768369012782.png',
    imageAlt: 'Clean Japanese utility vehicle on mountain road with dramatic scenery',
    specs: {
      engine: 'EN07 4-Cylinder',
      displacement: '660cc',
      drivetrain: 'AWD (Automatic)',
      transmission: '5-Speed Manual',
      mileage: '28,000 km',
      condition: 'Excellent (Grade 4.5)',
      bedLength: '6.0 ft',
      payload: '1,050 lbs',
      fuelType: 'Gasoline',
      ac: 'Yes',
      powerSteering: 'Yes',
      dumpBed: 'No',
      extendedCab: 'No',
      topSpeed: '62 mph',
      fuelEconomy: '36–42 mpg',
    },
    highlights: [
      'Lowest mileage in inventory',
      'Automatic AWD engagement',
      'Subaru 4-cyl reliability',
    ],
    bestFor: 'Off-Road & Mountain',
  },
  {
    id: 'p4',
    name: 'Acty Truck HA6',
    year: '2000',
    make: 'Honda',
    price: 6800,
    image: 'https://images.unsplash.com/photo-1618172358700-d8d8d814acee',
    imageAlt: 'Small Japanese utility truck parked on gravel, country setting',
    specs: {
      engine: 'E07A 3-Cylinder SOHC',
      displacement: '660cc',
      drivetrain: '4WD',
      transmission: '5-Speed Manual',
      mileage: '58,000 km',
      condition: 'Good (Grade 3.5)',
      bedLength: '6.4 ft',
      payload: '1,100 lbs',
      fuelType: 'Gasoline',
      ac: 'No',
      powerSteering: 'No',
      dumpBed: 'No',
      extendedCab: 'No',
      topSpeed: '55 mph',
      fuelEconomy: '33–38 mpg',
    },
    highlights: ['Longest bed in class', 'Mid-engine layout for traction', 'Honda reliability'],
    bestFor: 'Budget & Utility',
  },
  {
    id: 'p6',
    name: 'Minicab MiEV',
    year: '2013',
    make: 'Mitsubishi',
    price: 11500,
    image: 'https://img.rocket.new/generatedImages/rocket_gen_img_1ed0b96fe-1773613696974.png',
    imageAlt: 'Modern electric Japanese mini truck, clean white exterior',
    badge: 'Electric',
    specs: {
      engine: 'Electric Motor',
      displacement: 'N/A',
      drivetrain: '4WD',
      transmission: 'Single-Speed Auto',
      mileage: '22,000 km',
      condition: 'Excellent (Grade 4.5)',
      bedLength: '5.9 ft',
      payload: '900 lbs',
      fuelType: 'Electric',
      ac: 'Yes',
      powerSteering: 'Yes',
      dumpBed: 'No',
      extendedCab: 'No',
      topSpeed: '50 mph',
      fuelEconomy: '~100 km range',
    },
    highlights: ['Zero emissions', 'Instant torque', 'Lowest operating cost'],
    bestFor: 'Eco & Low-Cost Operation',
  },
].map(syncIdentity);

const specLabels: { key: keyof Truck['specs']; label: string }[] = [
  { key: 'engine', label: 'Engine' },
  { key: 'displacement', label: 'Displacement' },
  { key: 'drivetrain', label: 'Drivetrain' },
  { key: 'transmission', label: 'Transmission' },
  { key: 'mileage', label: 'Mileage' },
  { key: 'condition', label: 'Condition' },
  { key: 'bedLength', label: 'Bed Length' },
  { key: 'payload', label: 'Payload Capacity' },
  { key: 'fuelType', label: 'Fuel Type' },
  { key: 'ac', label: 'Air Conditioning' },
  { key: 'powerSteering', label: 'Power Steering' },
  { key: 'dumpBed', label: 'Dump Bed' },
  { key: 'extendedCab', label: 'Extended Cab' },
  { key: 'topSpeed', label: 'Top Speed' },
  { key: 'fuelEconomy', label: 'Fuel Economy' },
];

export default function CompareClient() {
  const [selected, setSelected] = useState<string[]>(['p1', 'p2']);
  const [highlightDiff, setHighlightDiff] = useState(true);
  const [addedToCart, setAddedToCart] = useState<string | null>(null);

  const selectedTrucks = trucks.filter((t) => selected.includes(t.id));

  const handleAddToCart = (truck: (typeof trucks)[number]) => {
    cartStore.addItem({
      id: truck.id,
      name: truck.name,
      subtitle: `${truck.year} ${truck.make}`,
      price: truck.price,
      image: truck.image,
      imageAlt: truck.imageAlt,
      specs: [truck.specs.engine, truck.specs.drivetrain],
      category: 'truck',
    });
    setAddedToCart(truck.id);
    setTimeout(() => setAddedToCart(null), 2000);
  };

  const toggleTruck = (id: string) => {
    setSelected((prev) => {
      if (prev.includes(id)) {
        if (prev.length <= 2) return prev;
        return prev.filter((i) => i !== id);
      }
      if (prev.length >= 3) return [...prev.slice(1), id];
      return [...prev, id];
    });
  };

  const isDifferent = (key: keyof Truck['specs']) => {
    const vals = selectedTrucks.map((t) => t.specs[key]);
    return new Set(vals).size > 1;
  };

  const isYesNo = (val: string) => val === 'Yes' || val === 'No';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
      {/* Header */}
      <div className="mb-10">
        <span className="tag-pill bg-primary/10 text-primary border border-primary/20 mb-3 inline-flex">
          <Icon name="ArrowsRightLeftIcon" size={10} />
          Comparison Tool
        </span>
        <h1 className="font-display text-section-xl text-foreground mb-3">Compare Trucks</h1>
        <p className="text-muted-foreground text-sm max-w-xl">
          Select up to 3 trucks to compare side-by-side. Differences are highlighted automatically.
        </p>
      </div>

      {/* Truck Selector */}
      <div className="mb-8">
        <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3">
          Select trucks to compare:
        </p>
        <div className="flex flex-wrap gap-3">
          {trucks.map((truck) => {
            const isActive = selected.includes(truck.id);
            return (
              <button
                key={truck.id}
                onClick={() => toggleTruck(truck.id)}
                className={`flex items-center gap-2.5 px-4 py-2.5 rounded-xl border text-sm font-bold transition-all min-h-[44px] ${
                  isActive
                    ? 'bg-primary text-primary-foreground border-primary'
                    : 'bg-secondary border-border text-muted-foreground hover:text-foreground hover:border-muted-foreground'
                }`}
              >
                {isActive && <Icon name="CheckIcon" size={13} />}
                {truck.year} {truck.make} {truck.name}
              </button>
            );
          })}
        </div>
      </div>

      {/* Highlight toggle */}
      <div className="flex items-center gap-3 mb-8">
        <button
          onClick={() => setHighlightDiff(!highlightDiff)}
          className={`relative w-10 h-5 rounded-full transition-colors ${highlightDiff ? 'bg-primary' : 'bg-muted'}`}
        >
          <span
            className={`absolute top-0.5 size-4 rounded-full bg-white transition-transform ${highlightDiff ? 'translate-x-5' : 'translate-x-0.5'}`}
          />
        </button>
        <span className="text-sm text-muted-foreground">Highlight differences</span>
      </div>

      {/* Comparison Table */}
      {selectedTrucks.length >= 2 ? (
        <div className="overflow-x-auto rounded-2xl border border-border">
          <table className="w-full min-w-[600px]">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left p-4 w-40 bg-secondary">
                  <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                    Spec
                  </span>
                </th>
                {selectedTrucks.map((truck) => (
                  <th key={truck.id} className="p-4 bg-secondary text-center">
                    <div className="flex flex-col items-center gap-2">
                      <div className="w-full h-28 rounded-xl overflow-hidden bg-muted">
                        <AppImage
                          src={truck.image}
                          alt={truck.imageAlt}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      {truck.badge && (
                        <span className="tag-pill bg-primary text-primary-foreground">
                          {truck.badge}
                        </span>
                      )}
                      <div className="text-center">
                        <p className="text-xs text-muted-foreground">
                          {truck.year} {truck.make}
                        </p>
                        <p className="font-bold text-foreground text-sm">{truck.name}</p>
                        <p className="font-display font-bold text-xl text-primary mt-1">
                          ${truck.price.toLocaleString()}
                        </p>
                      </div>
                      <p className="text-[10px] text-muted-foreground italic">{truck.bestFor}</p>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {specLabels.map((spec, idx) => {
                const diff = highlightDiff && isDifferent(spec.key);
                return (
                  <tr
                    key={spec.key}
                    className={`border-b border-border transition-colors ${diff ? 'bg-primary/5' : idx % 2 === 0 ? 'bg-card' : 'bg-background'}`}
                  >
                    <td className="p-4">
                      <span
                        className={`text-xs font-bold ${diff ? 'text-primary' : 'text-muted-foreground'}`}
                      >
                        {spec.label}
                        {diff && (
                          <span className="ml-1.5 text-[9px] bg-primary/20 text-primary px-1.5 py-0.5 rounded-full">
                            differs
                          </span>
                        )}
                      </span>
                    </td>
                    {selectedTrucks.map((truck) => {
                      const val = truck.specs[spec.key];
                      return (
                        <td key={truck.id} className="p-4 text-center">
                          {isYesNo(val) ? (
                            <span
                              className={`inline-flex items-center justify-center size-6 rounded-full ${val === 'Yes' ? 'bg-primary/20 text-primary' : 'bg-muted text-muted-foreground'}`}
                            >
                              <Icon name={val === 'Yes' ? 'CheckIcon' : 'XMarkIcon'} size={12} />
                            </span>
                          ) : (
                            <span className="text-sm text-foreground font-medium">{val}</span>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}

              {/* Highlights row */}
              <tr className="border-b border-border bg-secondary">
                <td className="p-4">
                  <span className="text-xs font-bold text-muted-foreground">Highlights</span>
                </td>
                {selectedTrucks.map((truck) => (
                  <td key={truck.id} className="p-4">
                    <ul className="space-y-1.5">
                      {truck.highlights.map((h) => (
                        <li
                          key={h}
                          className="flex items-start gap-1.5 text-xs text-muted-foreground"
                        >
                          <Icon
                            name="StarIcon"
                            size={10}
                            className="text-primary mt-0.5 flex-shrink-0"
                            variant="solid"
                          />
                          {h}
                        </li>
                      ))}
                    </ul>
                  </td>
                ))}
              </tr>

              {/* CTA row */}
              <tr className="bg-card">
                <td className="p-4" />
                {selectedTrucks.map((truck) => (
                  <td key={truck.id} className="p-4 text-center">
                    <div className="flex flex-col gap-2">
                      {truck.slug ? (
                        <Link
                          href={`/trucks/${truck.slug}`}
                          className="px-4 py-2.5 bg-primary text-primary-foreground rounded-full font-bold text-xs uppercase tracking-widest hover:scale-105 transition-transform inline-block"
                        >
                          View Details
                        </Link>
                      ) : (
                        <button
                          onClick={() => handleAddToCart(truck)}
                          className={`px-4 py-2.5 rounded-full font-bold text-xs uppercase tracking-widest transition-all inline-block ${
                            addedToCart === truck.id
                              ? 'bg-green-500 text-white'
                              : 'bg-primary text-primary-foreground hover:scale-105'
                          }`}
                        >
                          {addedToCart === truck.id ? 'Added!' : 'Add to Cart'}
                        </button>
                      )}
                      <Link
                        href="/contact"
                        className="px-4 py-2.5 border border-border text-muted-foreground rounded-full font-bold text-xs uppercase tracking-widest hover:text-foreground hover:bg-muted transition-colors inline-block"
                      >
                        Get Quote
                      </Link>
                    </div>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-24 text-center border border-dashed border-border rounded-2xl">
          <Icon name="ArrowsRightLeftIcon" size={36} className="text-muted-foreground mb-4" />
          <p className="font-bold text-foreground mb-1">Select at least 2 trucks to compare</p>
          <p className="text-muted-foreground text-sm">Use the buttons above to pick trucks.</p>
        </div>
      )}

      {/* Bottom CTA */}
      <div className="mt-12 p-8 rounded-3xl bg-secondary border border-border flex flex-col sm:flex-row items-center justify-between gap-6">
        <div>
          <h3 className="font-display text-2xl text-foreground mb-1">Still deciding?</h3>
          <p className="text-muted-foreground text-sm">
            Our team can help you pick the right truck for your specific use case - farm,
            construction, off-road, or daily driver.
          </p>
        </div>
        <Link
          href="/contact"
          className="px-6 py-3 bg-primary text-primary-foreground rounded-full font-bold text-xs uppercase tracking-widest hover:scale-105 transition-transform flex-shrink-0"
        >
          Talk to an Expert
        </Link>
      </div>
    </div>
  );
}
