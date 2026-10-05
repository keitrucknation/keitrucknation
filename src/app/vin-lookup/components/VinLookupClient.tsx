'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Icon from '@/components/ui/AppIcon';
import AppImage from '@/components/ui/AppImage';

interface ChassisResult {
  make: string;
  model: string;
  year: string;
  engine: string;
  driveType: string;
  bodyType: string;
  importEligible: boolean;
  eligibilityNote: string;
  inventoryMatch?: {
    id: string;
    slug: string;
    name: string;
    price: number;
    mileage: string;
    image: string;
    imageAlt: string;
    inStock: boolean;
  } | null;
}

const EXAMPLE_CHASSIS = ['DD51T', 'S211P', 'HA4', 'TT2', 'DA62T', 'U62T'];

export default function VinLookupClient() {
  const [input, setInput] = useState('');
  const [result, setResult] = useState<ChassisResult | null>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLookup = async (chassis: string) => {
    const trimmed = chassis.trim().toUpperCase();
    if (!trimmed) return;
    setLoading(true);
    setError('');
    setResult(null);

    try {
      const res = await fetch(`/api/vin-lookup?chassis=${encodeURIComponent(trimmed)}`);
      if (res.status === 429) {
        setError('Too many lookups. Please wait a moment and try again.');
        return;
      }
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? 'Chassis code not found in our database.');
        return;
      }
      setResult(data as ChassisResult);
    } catch {
      setError('Network error. Please check your connection and try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleLookup(input);
  };

  return (
    <div className="pt-24 sm:pt-28">
      {/* Page Header */}
      <div className="relative overflow-hidden border-b border-border py-14 sm:py-20">
        <div className="absolute inset-0 grid-lines-bg opacity-30" />
        <div className="absolute inset-0 hero-glow opacity-60" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center gap-2 mb-4">
            <div className="size-2 bg-primary rounded-full animate-pulse-glow" />
            <span className="tag-pill bg-primary/10 text-primary border border-primary/20 inline-flex items-center gap-1.5">
              <Icon name="MagnifyingGlassIcon" size={13} /> Chassis Decoder
            </span>
          </div>
          <h1
            className="font-display font-bold text-foreground mb-4"
            style={{ fontSize: 'clamp(2.2rem, 5vw, 4rem)', lineHeight: 1.05 }}
          >
            VIN / <span className="text-primary">Chassis Lookup</span>
          </h1>
          <p className="text-muted-foreground text-base sm:text-lg max-w-2xl leading-relaxed">
            Enter a Japanese chassis code to decode the make, model, engine, drivetrain, and US
            import eligibility - and see if we have a matching truck in stock.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-16 space-y-10">
        {/* Search Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-card border border-border rounded-2xl p-6 sm:p-8"
        >
          <label className="block text-xs font-black uppercase tracking-widest text-muted-foreground mb-3">
            Enter Chassis Code
          </label>
          <div className="flex gap-3">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="e.g. DD51T, S211P, HA4…"
              className="flex-1 bg-input border border-border rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary uppercase"
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="px-6 py-3 bg-primary text-primary-foreground rounded-xl font-bold text-sm uppercase tracking-widest hover:scale-105 transition-transform disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              {loading ? 'Looking up…' : 'Look Up'}
            </button>
          </div>

          {/* Example chips */}
          <div className="flex flex-wrap gap-2 mt-4">
            <span className="text-xs text-muted-foreground mr-1">Try:</span>
            {EXAMPLE_CHASSIS.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => {
                  setInput(c);
                  handleLookup(c);
                }}
                className="px-3 py-1 rounded-full bg-muted text-muted-foreground text-xs font-mono hover:bg-primary/10 hover:text-primary transition-colors"
              >
                {c}
              </button>
            ))}
          </div>
        </form>

        {/* Error */}
        {error && (
          <div className="p-4 rounded-xl bg-accent/10 border border-accent/20 text-accent text-sm flex items-center gap-3">
            <Icon name="ExclamationTriangleIcon" size={18} />
            {error}
          </div>
        )}

        {/* Result */}
        {result && (
          <div className="space-y-6">
            {/* Main result card */}
            <div className="bg-card border border-border rounded-2xl p-6 sm:p-8">
              <div className="flex items-start justify-between gap-4 mb-6">
                <div>
                  <p className="text-xs font-black uppercase tracking-widest text-muted-foreground mb-1">
                    Decoded Result
                  </p>
                  <h2 className="font-display font-bold text-2xl text-foreground">
                    {result.make} {result.model}
                  </h2>
                  <p className="text-muted-foreground text-sm mt-1">{result.year}</p>
                </div>
                <div
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest ${result.importEligible ? 'bg-primary/10 text-primary border border-primary/20' : 'bg-accent/10 text-accent border border-accent/20'}`}
                >
                  <Icon name={result.importEligible ? 'CheckIcon' : 'XMarkIcon'} size={12} />
                  {result.importEligible ? 'Import Eligible' : 'Not Yet Eligible'}
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
                {[
                  { label: 'Engine', value: result.engine },
                  { label: 'Drive Type', value: result.driveType },
                  { label: 'Body Type', value: result.bodyType },
                  { label: 'Year Range', value: result.year },
                  {
                    label: 'Import Status',
                    value: result.importEligible ? 'Eligible' : 'Not Eligible',
                  },
                ].map((spec) => (
                  <div key={spec.label} className="bg-muted/50 rounded-xl p-3">
                    <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-1">
                      {spec.label}
                    </p>
                    <p className="text-sm font-bold text-foreground">{spec.value}</p>
                  </div>
                ))}
              </div>

              <div
                className={`p-4 rounded-xl text-sm ${result.importEligible ? 'bg-primary/5 border border-primary/20 text-primary' : 'bg-accent/5 border border-accent/20 text-accent'}`}
              >
                <Icon name="InformationCircleIcon" size={16} className="inline mr-2" />
                {result.eligibilityNote}
              </div>
            </div>

            {/* Inventory match */}
            {result.inventoryMatch && (
              <div className="bg-card border border-primary/30 rounded-2xl p-6">
                <p className="text-xs font-black uppercase tracking-widest text-primary mb-4 flex items-center gap-2">
                  <Icon name="CheckCircleIcon" size={14} />
                  We Have a Matching Truck in Stock
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-24 h-16 rounded-xl overflow-hidden flex-shrink-0 bg-muted">
                    <AppImage
                      src={result.inventoryMatch.image}
                      alt={result.inventoryMatch.imageAlt}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-foreground">{result.inventoryMatch.name}</p>
                    <p className="text-sm text-muted-foreground">{result.inventoryMatch.mileage}</p>
                    <p className="text-primary font-bold">
                      ${result.inventoryMatch.price.toLocaleString()}
                    </p>
                  </div>
                  <Link
                    href={`/trucks/${result.inventoryMatch.slug}`}
                    className="px-5 py-2.5 bg-primary text-primary-foreground rounded-full font-bold text-xs uppercase tracking-widest hover:scale-105 transition-transform flex-shrink-0"
                  >
                    View Truck
                  </Link>
                </div>
              </div>
            )}

            {!result.inventoryMatch && (
              <div className="bg-card border border-border rounded-2xl p-6 text-center">
                <p className="text-muted-foreground text-sm mb-4">
                  We don&apos;t currently have this exact chassis in stock, but we source trucks
                  weekly from Japanese auctions.
                </p>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-full font-bold text-sm uppercase tracking-widest hover:scale-105 transition-transform"
                >
                  <Icon name="ChatBubbleLeftRightIcon" size={16} />
                  Request This Chassis
                </Link>
              </div>
            )}
          </div>
        )}

        {/* Chassis Guide Table */}
        <div className="bg-card border border-border rounded-2xl overflow-hidden">
          <div className="px-6 py-4 border-b border-border">
            <h2 className="font-display font-bold text-lg text-foreground">Common Chassis Codes</h2>
            <p className="text-muted-foreground text-sm mt-1">
              Reference guide for popular kei truck chassis prefixes
            </p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/30">
                  <th className="text-left px-4 py-3 text-xs font-black uppercase tracking-widest text-muted-foreground">
                    Code
                  </th>
                  <th className="text-left px-4 py-3 text-xs font-black uppercase tracking-widest text-muted-foreground">
                    Make
                  </th>
                  <th className="text-left px-4 py-3 text-xs font-black uppercase tracking-widest text-muted-foreground">
                    Model
                  </th>
                  <th className="text-left px-4 py-3 text-xs font-black uppercase tracking-widest text-muted-foreground">
                    Engine
                  </th>
                  <th className="text-left px-4 py-3 text-xs font-black uppercase tracking-widest text-muted-foreground">
                    Drive
                  </th>
                </tr>
              </thead>
              <tbody>
                {[
                  {
                    code: 'DD51T',
                    make: 'Suzuki',
                    model: 'Carry',
                    engine: 'F6A 660cc',
                    drive: '4WD',
                  },
                  {
                    code: 'DA62T',
                    make: 'Suzuki',
                    model: 'Carry',
                    engine: 'K6A 660cc',
                    drive: '2WD',
                  },
                  {
                    code: 'S211P',
                    make: 'Daihatsu',
                    model: 'Hijet',
                    engine: 'EF-VE 660cc',
                    drive: '4WD',
                  },
                  {
                    code: 'S510P',
                    make: 'Daihatsu',
                    model: 'Hijet',
                    engine: 'KF 660cc',
                    drive: '4WD',
                  },
                  { code: 'HA4', make: 'Honda', model: 'Acty', engine: 'E07A 660cc', drive: '4WD' },
                  { code: 'HA7', make: 'Honda', model: 'Acty', engine: 'E07Z 660cc', drive: '4WD' },
                  {
                    code: 'TT2',
                    make: 'Subaru',
                    model: 'Sambar',
                    engine: 'EN07 660cc',
                    drive: '4WD',
                  },
                  {
                    code: 'U62T',
                    make: 'Mitsubishi',
                    model: 'Minicab',
                    engine: '3G83 660cc',
                    drive: '4WD',
                  },
                ].map((row, i) => (
                  <tr
                    key={row.code}
                    className={`border-b border-border/50 ${i % 2 === 0 ? '' : 'bg-muted/20'}`}
                  >
                    <td className="px-4 py-3 font-mono font-bold text-primary">
                      <button
                        onClick={() => {
                          setInput(row.code);
                          handleLookup(row.code);
                        }}
                        className="hover:underline"
                      >
                        {row.code}
                      </button>
                    </td>
                    <td className="px-4 py-3 text-foreground">{row.make}</td>
                    <td className="px-4 py-3 text-foreground">{row.model}</td>
                    <td className="px-4 py-3 text-muted-foreground">{row.engine}</td>
                    <td className="px-4 py-3 text-muted-foreground">{row.drive}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
