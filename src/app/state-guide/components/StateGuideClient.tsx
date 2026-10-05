'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import Icon from '@/components/ui/AppIcon';

type LegalStatus = 'yes' | 'limited' | 'no' | 'unknown';

interface StateInfo {
  state: string;
  abbr: string;
  status: LegalStatus;
  speedLimit: string;
  notes: string;
  registration: string;
}

const stateData: StateInfo[] = [
  {
    state: 'Alabama',
    abbr: 'AL',
    status: 'limited',
    speedLimit: '35 mph',
    notes:
      'Allowed on roads posted 35 mph or less. Must be registered as a farm vehicle or low-speed vehicle in most counties.',
    registration: 'Farm vehicle or LSV',
  },
  {
    state: 'Alaska',
    abbr: 'AK',
    status: 'yes',
    speedLimit: '45 mph',
    notes:
      'Permissive regulations. Can be titled and registered as a regular vehicle. Popular in rural areas.',
    registration: 'Standard vehicle title',
  },
  {
    state: 'Arizona',
    abbr: 'AZ',
    status: 'limited',
    speedLimit: '35 mph',
    notes:
      'Allowed on roads 35 mph and under. Must meet LSV equipment requirements including lights and mirrors.',
    registration: 'Low-speed vehicle',
  },
  {
    state: 'Arkansas',
    abbr: 'AR',
    status: 'limited',
    speedLimit: '35 mph',
    notes: 'Permitted on roads with speed limits of 35 mph or less. Farm use exemptions available.',
    registration: 'Farm vehicle or LSV',
  },
  {
    state: 'California',
    abbr: 'CA',
    status: 'limited',
    speedLimit: '35 mph',
    notes:
      'Allowed on roads posted 35 mph or less as an LSV. Must meet FMVSS LSV standards. Smog exempt if pre-1976 or over 25 years old.',
    registration: 'Low-speed vehicle (LSV)',
  },
  {
    state: 'Colorado',
    abbr: 'CO',
    status: 'yes',
    speedLimit: '45 mph',
    notes:
      'One of the most permissive states. Can be registered and titled. Popular with ranchers and off-road enthusiasts.',
    registration: 'Standard vehicle title',
  },
  {
    state: 'Connecticut',
    abbr: 'CT',
    status: 'limited',
    speedLimit: '25 mph',
    notes:
      'Restricted to roads 25 mph or less. Strict equipment requirements. Not practical for most buyers.',
    registration: 'LSV with restrictions',
  },
  {
    state: 'Delaware',
    abbr: 'DE',
    status: 'limited',
    speedLimit: '35 mph',
    notes: 'Allowed on roads 35 mph or less. Farm use exemptions available in rural counties.',
    registration: 'Farm vehicle or LSV',
  },
  {
    state: 'Florida',
    abbr: 'FL',
    status: 'limited',
    speedLimit: '35 mph',
    notes:
      'Allowed on roads posted 35 mph or less. Must be registered as an LSV. Popular in rural north Florida.',
    registration: 'Low-speed vehicle',
  },
  {
    state: 'Georgia',
    abbr: 'GA',
    status: 'limited',
    speedLimit: '35 mph',
    notes: 'Permitted on roads 35 mph or less. Farm use exemptions widely available.',
    registration: 'Farm vehicle or LSV',
  },
  {
    state: 'Hawaii',
    abbr: 'HI',
    status: 'unknown',
    speedLimit: 'Varies',
    notes:
      'Regulations vary by county. Contact your county DMV for current rules. Limited import history.',
    registration: 'Contact county DMV',
  },
  {
    state: 'Idaho',
    abbr: 'ID',
    status: 'yes',
    speedLimit: '45 mph',
    notes:
      'Very permissive. Can be titled and registered as a regular vehicle. Popular with farmers and ranchers statewide.',
    registration: 'Standard vehicle title',
  },
  {
    state: 'Illinois',
    abbr: 'IL',
    status: 'limited',
    speedLimit: '35 mph',
    notes:
      'Allowed on roads 35 mph or less as an LSV. Farm use exemptions available in agricultural counties.',
    registration: 'Farm vehicle or LSV',
  },
  {
    state: 'Indiana',
    abbr: 'IN',
    status: 'limited',
    speedLimit: '35 mph',
    notes: 'Permitted on roads 35 mph or less. Farm vehicle registration available.',
    registration: 'Farm vehicle or LSV',
  },
  {
    state: 'Iowa',
    abbr: 'IA',
    status: 'yes',
    speedLimit: '45 mph',
    notes:
      'Permissive regulations. Can be registered as a regular vehicle. Strong agricultural use base.',
    registration: 'Standard vehicle title',
  },
  {
    state: 'Kansas',
    abbr: 'KS',
    status: 'yes',
    speedLimit: '45 mph',
    notes:
      'Allowed on most roads. Farm vehicle registration widely available. Popular in rural communities.',
    registration: 'Standard or farm vehicle',
  },
  {
    state: 'Kentucky',
    abbr: 'KY',
    status: 'limited',
    speedLimit: '35 mph',
    notes: 'Allowed on roads 35 mph or less. Farm use exemptions available.',
    registration: 'Farm vehicle or LSV',
  },
  {
    state: 'Louisiana',
    abbr: 'LA',
    status: 'limited',
    speedLimit: '35 mph',
    notes: 'Permitted on roads 35 mph or less. Parish-level regulations may vary.',
    registration: 'LSV registration',
  },
  {
    state: 'Maine',
    abbr: 'ME',
    status: 'yes',
    speedLimit: '45 mph',
    notes: 'Permissive state. Can be titled and registered. Popular in rural and coastal areas.',
    registration: 'Standard vehicle title',
  },
  {
    state: 'Maryland',
    abbr: 'MD',
    status: 'limited',
    speedLimit: '35 mph',
    notes:
      'Allowed on roads 35 mph or less as an LSV. Farm exemptions available in rural counties.',
    registration: 'Low-speed vehicle',
  },
  {
    state: 'Massachusetts',
    abbr: 'MA',
    status: 'no',
    speedLimit: 'N/A',
    notes:
      'Currently does not have a clear pathway for kei truck registration. Consult an attorney before purchasing.',
    registration: 'Not currently available',
  },
  {
    state: 'Michigan',
    abbr: 'MI',
    status: 'limited',
    speedLimit: '35 mph',
    notes:
      'Allowed on roads 35 mph or less. Farm vehicle registration available in agricultural areas.',
    registration: 'Farm vehicle or LSV',
  },
  {
    state: 'Minnesota',
    abbr: 'MN',
    status: 'limited',
    speedLimit: '35 mph',
    notes: 'Permitted on roads 35 mph or less. Farm use exemptions widely available.',
    registration: 'Farm vehicle or LSV',
  },
  {
    state: 'Mississippi',
    abbr: 'MS',
    status: 'yes',
    speedLimit: '45 mph',
    notes: 'Permissive regulations. Can be registered as a regular vehicle. Popular with farmers.',
    registration: 'Standard vehicle title',
  },
  {
    state: 'Missouri',
    abbr: 'MO',
    status: 'limited',
    speedLimit: '35 mph',
    notes: 'Allowed on roads 35 mph or less. Farm vehicle registration available.',
    registration: 'Farm vehicle or LSV',
  },
  {
    state: 'Montana',
    abbr: 'MT',
    status: 'yes',
    speedLimit: 'No restriction',
    notes:
      'One of the most permissive states in the country. Can be titled and driven on any road. No speed restriction for kei trucks.',
    registration: 'Standard vehicle title',
  },
  {
    state: 'Nebraska',
    abbr: 'NE',
    status: 'yes',
    speedLimit: '45 mph',
    notes: 'Permissive. Can be registered as a regular vehicle. Strong agricultural use.',
    registration: 'Standard vehicle title',
  },
  {
    state: 'Nevada',
    abbr: 'NV',
    status: 'limited',
    speedLimit: '35 mph',
    notes: 'Allowed on roads 35 mph or less as an LSV. Popular in rural Nevada.',
    registration: 'Low-speed vehicle',
  },
  {
    state: 'New Hampshire',
    abbr: 'NH',
    status: 'yes',
    speedLimit: '45 mph',
    notes: 'Permissive regulations. Can be titled and registered. Popular in rural areas.',
    registration: 'Standard vehicle title',
  },
  {
    state: 'New Jersey',
    abbr: 'NJ',
    status: 'no',
    speedLimit: 'N/A',
    notes:
      'No clear registration pathway currently. Consult an attorney. Not recommended for street use.',
    registration: 'Not currently available',
  },
  {
    state: 'New Mexico',
    abbr: 'NM',
    status: 'yes',
    speedLimit: '45 mph',
    notes: 'Permissive state. Can be titled and registered. Popular with ranchers.',
    registration: 'Standard vehicle title',
  },
  {
    state: 'New York',
    abbr: 'NY',
    status: 'limited',
    speedLimit: '35 mph',
    notes: 'Allowed on roads 35 mph or less as an LSV. Farm use exemptions available upstate.',
    registration: 'Low-speed vehicle',
  },
  {
    state: 'North Carolina',
    abbr: 'NC',
    status: 'limited',
    speedLimit: '35 mph',
    notes: 'Permitted on roads 35 mph or less. Farm vehicle registration available.',
    registration: 'Farm vehicle or LSV',
  },
  {
    state: 'North Dakota',
    abbr: 'ND',
    status: 'yes',
    speedLimit: '45 mph',
    notes: 'Permissive. Can be registered as a regular vehicle. Very popular with farmers.',
    registration: 'Standard vehicle title',
  },
  {
    state: 'Ohio',
    abbr: 'OH',
    status: 'limited',
    speedLimit: '35 mph',
    notes: 'Allowed on roads 35 mph or less. Farm use exemptions available.',
    registration: 'Farm vehicle or LSV',
  },
  {
    state: 'Oklahoma',
    abbr: 'OK',
    status: 'yes',
    speedLimit: '45 mph',
    notes: 'Permissive regulations. Can be titled and registered. Popular with ranchers.',
    registration: 'Standard vehicle title',
  },
  {
    state: 'Oregon',
    abbr: 'OR',
    status: 'yes',
    speedLimit: '45 mph',
    notes:
      'Our home state - very permissive. Can be titled and registered as a regular vehicle. Strong kei truck community.',
    registration: 'Standard vehicle title',
  },
  {
    state: 'Pennsylvania',
    abbr: 'PA',
    status: 'limited',
    speedLimit: '35 mph',
    notes:
      'Allowed on roads 35 mph or less as an LSV. Farm use exemptions available in rural counties.',
    registration: 'Low-speed vehicle',
  },
  {
    state: 'Rhode Island',
    abbr: 'RI',
    status: 'limited',
    speedLimit: '25 mph',
    notes: 'Restricted to roads 25 mph or less. Very limited practical use.',
    registration: 'LSV with restrictions',
  },
  {
    state: 'South Carolina',
    abbr: 'SC',
    status: 'limited',
    speedLimit: '35 mph',
    notes: 'Permitted on roads 35 mph or less. Farm vehicle registration available.',
    registration: 'Farm vehicle or LSV',
  },
  {
    state: 'South Dakota',
    abbr: 'SD',
    status: 'yes',
    speedLimit: '45 mph',
    notes: 'Permissive. Can be registered as a regular vehicle. Popular with farmers and ranchers.',
    registration: 'Standard vehicle title',
  },
  {
    state: 'Tennessee',
    abbr: 'TN',
    status: 'limited',
    speedLimit: '35 mph',
    notes: 'Allowed on roads 35 mph or less. Farm use exemptions available.',
    registration: 'Farm vehicle or LSV',
  },
  {
    state: 'Texas',
    abbr: 'TX',
    status: 'limited',
    speedLimit: '35 mph',
    notes:
      'Allowed on roads 35 mph or less as an LSV. Farm use exemptions widely available. Large kei truck community in rural Texas.',
    registration: 'Farm vehicle or LSV',
  },
  {
    state: 'Utah',
    abbr: 'UT',
    status: 'limited',
    speedLimit: '35 mph',
    notes: 'Permitted on roads 35 mph or less. Farm vehicle registration available.',
    registration: 'Farm vehicle or LSV',
  },
  {
    state: 'Vermont',
    abbr: 'VT',
    status: 'yes',
    speedLimit: '45 mph',
    notes:
      'Very permissive. Can be titled and registered as a regular vehicle. Popular in rural Vermont.',
    registration: 'Standard vehicle title',
  },
  {
    state: 'Virginia',
    abbr: 'VA',
    status: 'limited',
    speedLimit: '35 mph',
    notes: 'Allowed on roads 35 mph or less as an LSV. Farm use exemptions available.',
    registration: 'Low-speed vehicle',
  },
  {
    state: 'Washington',
    abbr: 'WA',
    status: 'yes',
    speedLimit: '45 mph',
    notes:
      'Permissive state. Can be titled and registered. Strong kei truck community in the Pacific Northwest.',
    registration: 'Standard vehicle title',
  },
  {
    state: 'West Virginia',
    abbr: 'WV',
    status: 'limited',
    speedLimit: '35 mph',
    notes: 'Allowed on roads 35 mph or less. Farm use exemptions available.',
    registration: 'Farm vehicle or LSV',
  },
  {
    state: 'Wisconsin',
    abbr: 'WI',
    status: 'limited',
    speedLimit: '35 mph',
    notes: 'Permitted on roads 35 mph or less. Farm vehicle registration available.',
    registration: 'Farm vehicle or LSV',
  },
  {
    state: 'Wyoming',
    abbr: 'WY',
    status: 'yes',
    speedLimit: '45 mph',
    notes: 'Permissive. Can be registered as a regular vehicle. Popular with ranchers.',
    registration: 'Standard vehicle title',
  },
];

const statusConfig: Record<
  LegalStatus,
  { label: string; color: string; bg: string; border: string; icon: string }
> = {
  yes: {
    label: 'Street Legal',
    color: 'text-primary',
    bg: 'bg-primary/10',
    border: 'border-primary/30',
    icon: 'CheckCircleIcon',
  },
  limited: {
    label: 'Limited Use',
    color: 'text-yellow-400',
    bg: 'bg-yellow-400/10',
    border: 'border-yellow-400/30',
    icon: 'ExclamationTriangleIcon',
  },
  no: {
    label: 'Not Available',
    color: 'text-accent',
    bg: 'bg-accent/10',
    border: 'border-accent/30',
    icon: 'XCircleIcon',
  },
  unknown: {
    label: 'Check Locally',
    color: 'text-muted-foreground',
    bg: 'bg-muted/30',
    border: 'border-border',
    icon: 'QuestionMarkCircleIcon',
  },
};

export default function StateGuideClient() {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<LegalStatus | 'all'>('all');
  const [expanded, setExpanded] = useState<string | null>(null);

  const filtered = useMemo(() => {
    return stateData.filter((s) => {
      const matchSearch =
        s.state.toLowerCase().includes(search.toLowerCase()) ||
        s.abbr.toLowerCase().includes(search.toLowerCase());
      const matchFilter = filter === 'all' || s.status === filter;
      return matchSearch && matchFilter;
    });
  }, [search, filter]);

  const counts = useMemo(
    () => ({
      yes: stateData.filter((s) => s.status === 'yes').length,
      limited: stateData.filter((s) => s.status === 'limited').length,
      no: stateData.filter((s) => s.status === 'no').length,
      unknown: stateData.filter((s) => s.status === 'unknown').length,
    }),
    []
  );

  return (
    <div className="pt-24 sm:pt-28">
      {/* Page Header */}
      <div className="relative overflow-hidden border-b border-border py-12 sm:py-16">
        <div className="absolute inset-0 grid-lines-bg opacity-30" />
        <div className="absolute inset-0 hero-glow opacity-40" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center gap-2 mb-4">
            <div className="size-2 bg-primary rounded-full animate-pulse-glow" />
            <span className="tag-pill bg-primary/10 text-primary border border-primary/20">
              Updated August 2026
            </span>
          </div>
          <h1
            className="font-display font-bold text-foreground mb-3"
            style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', lineHeight: 1.05 }}
          >
            Kei Truck Legality by State
          </h1>
          <p className="text-muted-foreground text-base sm:text-lg max-w-xl">
            The most complete guide to kei truck street legality in the US. Find your state,
            understand the rules, and buy with confidence.
          </p>

          {/* Summary Stats */}
          <div className="flex flex-wrap gap-3 mt-8">
            {(Object.entries(counts) as [LegalStatus, number][]).map(([status, count]) => {
              const cfg = statusConfig[status];
              return (
                <button
                  key={status}
                  onClick={() => setFilter(filter === status ? 'all' : status)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs uppercase tracking-widest transition-all min-h-[44px] border ${
                    filter === status
                      ? `${cfg.bg} ${cfg.color} ${cfg.border}`
                      : 'bg-card border-border text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <Icon name={cfg.icon as 'CheckCircleIcon'} size={14} />
                  {count} {cfg.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        {/* Disclaimer */}
        <div className="bg-accent/5 border border-accent/20 rounded-2xl p-4 mb-8 flex items-start gap-3">
          <Icon
            name="ExclamationTriangleIcon"
            size={18}
            className="text-accent flex-shrink-0 mt-0.5"
          />
          <p className="text-sm text-muted-foreground leading-relaxed">
            <strong className="text-foreground">Important:</strong> Laws change. This guide is for
            informational purposes only and is not legal advice. Always verify current regulations
            with your state DMV before purchasing. We update this guide regularly but cannot
            guarantee accuracy for every county or municipality.
          </p>
        </div>

        {/* Search */}
        <div className="relative mb-6">
          <Icon
            name="MagnifyingGlassIcon"
            size={16}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground"
          />
          <input
            type="text"
            placeholder="Search your state…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full max-w-sm bg-card border border-border rounded-xl pl-10 pr-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors min-h-[48px]"
          />
        </div>

        {/* State List */}
        <div className="flex flex-col gap-2">
          {filtered.map((s) => {
            const cfg = statusConfig[s.status];
            const isOpen = expanded === s.abbr;
            return (
              <div
                key={s.abbr}
                className={`border rounded-2xl overflow-hidden transition-all duration-200 ${isOpen ? `${cfg.border} ${cfg.bg}` : 'border-border bg-card hover:border-muted-foreground'}`}
              >
                <button
                  onClick={() => setExpanded(isOpen ? null : s.abbr)}
                  className="w-full flex items-center justify-between px-5 py-4 text-left min-h-[64px]"
                >
                  <div className="flex items-center gap-4">
                    <span className="font-display font-bold text-lg text-foreground w-8 flex-shrink-0">
                      {s.abbr}
                    </span>
                    <div>
                      <p className="font-bold text-sm text-foreground">{s.state}</p>
                      <p className="text-xs text-muted-foreground">{s.registration}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-black uppercase tracking-widest ${cfg.bg} ${cfg.color} border ${cfg.border}`}
                    >
                      <Icon name={cfg.icon as 'CheckCircleIcon'} size={12} />
                      {cfg.label}
                    </div>
                    <span className="text-xs text-muted-foreground hidden sm:block">
                      {s.speedLimit}
                    </span>
                    <Icon
                      name={isOpen ? 'ChevronUpIcon' : 'ChevronDownIcon'}
                      size={16}
                      className="text-muted-foreground flex-shrink-0"
                    />
                  </div>
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 border-t border-border/50">
                    <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto] gap-4 pt-4">
                      <div>
                        <p className="text-xs font-black uppercase tracking-widest text-muted-foreground mb-2">
                          Details
                        </p>
                        <p className="text-sm text-foreground leading-relaxed">{s.notes}</p>
                      </div>
                      <div className="flex flex-col gap-2 sm:text-right">
                        <div>
                          <p className="text-xs font-black uppercase tracking-widest text-muted-foreground mb-1">
                            Speed Limit
                          </p>
                          <p className="text-sm font-bold text-foreground">{s.speedLimit}</p>
                        </div>
                        <div>
                          <p className="text-xs font-black uppercase tracking-widest text-muted-foreground mb-1">
                            Registration Type
                          </p>
                          <p className="text-sm font-bold text-foreground">{s.registration}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
          {filtered.length === 0 && (
            <div className="text-center py-12 text-muted-foreground">
              <Icon name="MagnifyingGlassIcon" size={32} className="mx-auto mb-3 opacity-40" />
              <p className="font-bold">No states match your search</p>
            </div>
          )}
        </div>

        {/* CTA */}
        <div className="mt-12 bg-card border border-border rounded-3xl p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <h3 className="font-display font-bold text-xl text-foreground mb-1">
              Not sure about your state?
            </h3>
            <p className="text-muted-foreground text-sm">
              We&apos;ve helped buyers in all 48 contiguous states navigate registration. Ask us
              directly.
            </p>
          </div>
          <Link
            href="/contact"
            className="flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-full font-black text-xs uppercase tracking-widest hover:scale-105 transition-transform min-h-[44px] flex-shrink-0"
          >
            Ask a Question
            <Icon name="ArrowRightIcon" size={14} />
          </Link>
        </div>
      </div>
    </div>
  );
}
