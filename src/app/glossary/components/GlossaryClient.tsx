'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import Icon from '@/components/ui/AppIcon';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

interface GlossaryTerm {
  term: string;
  category: string;
  definition: string;
  related?: string[];
}

const glossaryTerms: GlossaryTerm[] = [
  // Kei Class & Regulations
  {
    term: 'Kei Class',
    category: 'Regulations',
    definition:
      'Japan\'s "light vehicle" classification. Vehicles must have an engine under 660cc, body width under 1.48m, length under 3.4m, and height under 2.0m. Kei vehicles receive tax and insurance benefits in Japan.',
    related: ['660cc', 'Kei Truck'],
  },
  {
    term: 'Kei Truck',
    category: 'Regulations',
    definition:
      'A kei-class utility pickup truck (軽トラック, "kei tora"). Built for farm, construction, and delivery use. Characterized by a flat front cab-over design, open flatbed, and 4WD availability.',
    related: ['Kei Class', 'Cab-Over'],
  },
  {
    term: '25-Year Rule',
    category: 'Import Law',
    definition:
      'US federal law (Imported Vehicle Safety Compliance Act) that exempts vehicles 25 years or older from FMVSS safety standards, making them legal to import. Most kei trucks from 1998–2002 now qualify.',
    related: ['FMVSS', 'EPA Exemption'],
  },
  {
    term: 'FMVSS',
    category: 'Import Law',
    definition:
      'Federal Motor Vehicle Safety Standards. US safety regulations that new vehicles must meet. Vehicles 25+ years old are exempt, which is why kei trucks can be legally imported.',
    related: ['25-Year Rule'],
  },
  {
    term: 'EPA Exemption',
    category: 'Import Law',
    definition:
      'Vehicles 21+ years old are exempt from EPA emissions standards. Combined with the 25-year FMVSS exemption, kei trucks can be imported without modifications.',
    related: ['25-Year Rule'],
  },
  {
    term: 'HS-7 Form',
    category: 'Import Law',
    definition:
      'DOT form required for importing vehicles. For vehicles over 25 years old, the form is filed to declare the vehicle is exempt from FMVSS standards.',
    related: ['EPA Form 3520-1'],
  },
  {
    term: 'EPA Form 3520-1',
    category: 'Import Law',
    definition:
      'EPA form filed when importing a vehicle. For kei trucks qualifying under the 21-year exemption, this form declares the vehicle is exempt from emissions standards.',
    related: ['HS-7 Form'],
  },
  {
    term: 'ISF',
    category: 'Import Law',
    definition:
      "Importer Security Filing. A US Customs requirement that must be filed at least 24 hours before a vessel departs a foreign port. KeiTruckNation's customs broker handles this automatically.",
    related: ['CBP Form 7501'],
  },
  {
    term: 'CBP Form 7501',
    category: 'Import Law',
    definition:
      'US Customs Entry Summary. The primary customs clearance document. Lists the vehicle, its value, and applicable duties. Filed by our licensed customs broker.',
    related: ['ISF'],
  },
  // Auction Grades
  {
    term: 'Auction Grade',
    category: 'Auction System',
    definition:
      'A standardized condition rating assigned by Japanese Auto Appraisal Institute (JAAI) inspectors at vehicle auctions. Grades run from 1 (poor) to 5 (near perfect). KeiTruckNation targets Grade 3 and above.',
    related: ['JAAI', 'Grade 4', 'Grade 3'],
  },
  {
    term: 'JAAI',
    category: 'Auction System',
    definition:
      'Japan Auto Appraisal Institute. The organization that trains and certifies vehicle inspectors at Japanese auctions. Their grade sheets are the industry standard for used vehicle condition.',
    related: ['Auction Grade'],
  },
  {
    term: 'Grade 5',
    category: 'Auction System',
    definition:
      'Near-perfect condition. No scratches, dents, or interior wear. Extremely rare on working trucks. Usually reserved for low-mileage, garage-kept vehicles.',
    related: ['Auction Grade'],
  },
  {
    term: 'Grade 4',
    category: 'Auction System',
    definition:
      'Excellent condition. Minor cosmetic imperfections only. No rust, no major dents. This is the grade KeiTruckNation targets for premium listings.',
    related: ['Auction Grade', 'Grade 3.5'],
  },
  {
    term: 'Grade 3.5',
    category: 'Auction System',
    definition:
      'Very good condition. Small scratches or minor dents noted on the grade sheet. Mechanically sound. Most of our inventory falls in the 3.5–4 range.',
    related: ['Auction Grade', 'Grade 3'],
  },
  {
    term: 'Grade 3',
    category: 'Auction System',
    definition:
      'Good used condition. Visible wear consistent with age and use. May have minor rust spots or small dents. Mechanically sound. The minimum grade KeiTruckNation will purchase.',
    related: ['Auction Grade'],
  },
  {
    term: 'USS',
    category: 'Auction System',
    definition:
      "Used Car System of Japan. One of the largest vehicle auction networks in Japan, with locations in Osaka, Tokyo, Nagoya, and other cities. KeiTruckNation's Japan partner attends USS auctions weekly.",
    related: ['JAA', 'Auction Grade'],
  },
  {
    term: 'JAA',
    category: 'Auction System',
    definition:
      "Japan Auto Auction. Another major Japanese vehicle auction network. Alongside USS, JAA auctions are a primary source for KeiTruckNation's inventory.",
    related: ['USS'],
  },
  // Engine & Mechanical
  {
    term: '660cc',
    category: 'Engine',
    definition:
      "The maximum engine displacement allowed under Japan's kei class regulations. All kei trucks use engines at or under 660cc. Despite the small size, these engines are highly engineered and extremely reliable.",
    related: ['F6A', 'K6A', 'EF Engine', 'EN07'],
  },
  {
    term: 'F6A',
    category: 'Engine',
    definition:
      "Suzuki's SOHC 660cc 3-cylinder engine used in Carry trucks from 1991–1998. Carbureted, simple, and extremely durable. Timing belt interval: 60,000 km.",
    related: ['K6A', 'Suzuki Carry'],
  },
  {
    term: 'K6A',
    category: 'Engine',
    definition:
      "Suzuki's DOHC 660cc 3-cylinder EFI engine used in Carry trucks from 1998 onward. More powerful and fuel-efficient than the F6A. Known for head gasket sensitivity if overheated.",
    related: ['F6A', 'Suzuki Carry'],
  },
  {
    term: 'EF Engine',
    category: 'Engine',
    definition:
      "Daihatsu's 660cc 3-cylinder engine family used in Hijet trucks. The EF-CS (carbureted) and EF-SE (EFI) variants are known for exceptional reliability. Timing belt at 80,000 km.",
    related: ['Daihatsu Hijet'],
  },
  {
    term: 'EN07',
    category: 'Engine',
    definition:
      "Subaru's 660cc 4-cylinder engine used in the Sambar. Unusual for a kei truck, the 4-cylinder provides more torque and smoother power delivery. Timing belt at 80,000 km.",
    related: ['Subaru Sambar'],
  },
  {
    term: 'E07A',
    category: 'Engine',
    definition:
      "Honda's 660cc 3-cylinder engine used in the Acty. Rear-mounted (engine sits behind the cab under the bed). Known for reliability and smooth operation.",
    related: ['Honda Acty'],
  },
  {
    term: 'Interference Engine',
    category: 'Engine',
    definition:
      'An engine design where the pistons and valves occupy the same space at different times. If the timing belt breaks, the pistons will hit the valves, causing catastrophic engine damage. Most kei truck engines are interference engines.',
    related: ['Timing Belt'],
  },
  {
    term: 'Timing Belt',
    category: 'Engine',
    definition:
      'A rubber belt that synchronizes the crankshaft and camshaft. Must be replaced on schedule (60,000–80,000 km depending on make). Failure on an interference engine destroys the engine.',
    related: ['Interference Engine'],
  },
  // Drivetrain
  {
    term: '4WD Hi-Lo',
    category: 'Drivetrain',
    definition:
      'A 4-wheel drive system with two ranges: High (for normal 4WD driving on loose surfaces) and Low (for maximum torque in extreme off-road or heavy hauling situations). Most kei trucks with 4WD have Hi-Lo.',
    related: ['4WD', 'Transfer Case'],
  },
  {
    term: 'Transfer Case',
    category: 'Drivetrain',
    definition:
      'The gearbox that distributes power between the front and rear axles on 4WD vehicles. On kei trucks, it also provides the Hi and Lo range selection.',
    related: ['4WD Hi-Lo'],
  },
  {
    term: 'CV Joint',
    category: 'Drivetrain',
    definition:
      'Constant Velocity joint. Allows the front axle to transmit power while steering and moving up and down. CV boots protect the joints from dirt and moisture. Torn boots lead to rapid joint wear.',
    related: ['CV Boot'],
  },
  {
    term: 'CV Boot',
    category: 'Drivetrain',
    definition:
      'A rubber accordion-style cover that protects the CV joint. Inspect regularly for cracks or tears. A torn boot allows grease to escape and dirt to enter, destroying the CV joint within weeks.',
    related: ['CV Joint'],
  },
  {
    term: 'Differential',
    category: 'Drivetrain',
    definition:
      'A gearbox that allows wheels on the same axle to rotate at different speeds (necessary for turning). 4WD kei trucks have front and rear differentials. Check fluid levels regularly.',
    related: ['4WD Hi-Lo'],
  },
  // Shipping
  {
    term: 'RoRo',
    category: 'Shipping',
    definition:
      'Roll-on/Roll-off. A type of cargo ship where vehicles drive on and off under their own power. The standard method for shipping kei trucks from Japan to the US. More economical and safer than container shipping for vehicles.',
    related: ['Ocean Freight'],
  },
  {
    term: 'Ocean Freight',
    category: 'Shipping',
    definition:
      'Shipping by sea. Kei trucks travel from Japanese ports (Osaka, Nagoya) to US ports (Long Beach, Baltimore) on RoRo vessels. Transit time is typically 18–28 days.',
    related: ['RoRo', 'Port of Entry'],
  },
  {
    term: 'Port of Entry',
    category: 'Shipping',
    definition:
      'The US port where imported vehicles arrive and clear customs. KeiTruckNation primarily uses Long Beach, CA and Baltimore, MD as ports of entry.',
    related: ['Ocean Freight', 'US Customs'],
  },
  {
    term: 'Marine Insurance',
    category: 'Shipping',
    definition:
      'Insurance covering vehicles during ocean transit. KeiTruckNation includes marine insurance on all shipments. If a truck is damaged at sea, the insurance covers repair or replacement.',
    related: ['Ocean Freight'],
  },
  {
    term: 'Bill of Lading',
    category: 'Shipping',
    definition:
      'A legal document issued by the carrier that details the cargo, its origin, and destination. The Bill of Lading is required for customs clearance and serves as proof of ownership during transit.',
    related: ['Ocean Freight'],
  },
  // Body Types
  {
    term: 'Cab-Over',
    category: 'Body Types',
    definition:
      'A truck design where the cab sits directly over the front axle, with no hood in front. All kei trucks use this design to maximize bed length within the kei class length limit.',
    related: ['Kei Truck'],
  },
  {
    term: 'Flatbed',
    category: 'Body Types',
    definition:
      'An open, flat cargo bed with no sides. The most common kei truck configuration. Ideal for hauling large or irregularly shaped loads.',
    related: ['Stake-Side', 'Dump Bed'],
  },
  {
    term: 'Dump Bed',
    category: 'Body Types',
    definition:
      'A hydraulically operated tilting bed that allows loose material (dirt, gravel, mulch) to be unloaded by raising the bed. Operated by a PTO (power take-off) from the engine.',
    related: ['Flatbed', 'PTO'],
  },
  {
    term: 'Stake-Side',
    category: 'Body Types',
    definition:
      'A flatbed with removable side rails (stakes). The rails contain loads while still allowing easy loading from the sides. Popular for farm produce, lumber, and similar cargo.',
    related: ['Flatbed'],
  },
  {
    term: 'PTO',
    category: 'Body Types',
    definition:
      'Power Take-Off. A mechanism that transfers engine power to auxiliary equipment like a hydraulic pump (for dump beds) or a sprayer. Common on farm-spec kei trucks.',
    related: ['Dump Bed'],
  },
  {
    term: 'Kei Van',
    category: 'Body Types',
    definition:
      'An enclosed cargo box version of the kei truck. Used for delivery, mobile storage, or weather-protected cargo. Also called a panel van or box truck.',
    related: ['Kei Truck'],
  },
];

const categories = ['All', ...Array.from(new Set(glossaryTerms.map((t) => t.category))).sort()];

export default function GlossaryClient() {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [expandedTerm, setExpandedTerm] = useState<string | null>(null);

  const filtered = useMemo(() => {
    return glossaryTerms.filter((t) => {
      const matchesSearch =
        search === '' ||
        t.term.toLowerCase().includes(search.toLowerCase()) ||
        t.definition.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = activeCategory === 'All' || t.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [search, activeCategory]);

  const grouped = useMemo(() => {
    const groups: Record<string, GlossaryTerm[]> = {};
    filtered.forEach((t) => {
      const letter = t.term[0].toUpperCase();
      if (!groups[letter]) groups[letter] = [];
      groups[letter].push(t);
    });
    return Object.entries(groups).sort(([a], [b]) => a.localeCompare(b));
  }, [filtered]);

  const categoryColors: Record<string, string> = {
    Regulations: 'bg-primary/10 text-primary border-primary/20',
    'Import Law': 'bg-accent/10 text-accent border-accent/20',
    'Auction System': 'bg-purple-500/10 text-purple-400 border-purple-500/20',
    Engine: 'bg-orange-500/10 text-orange-400 border-orange-500/20',
    Drivetrain: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
    Shipping: 'bg-green-500/10 text-green-400 border-green-500/20',
    'Body Types': 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
  };

  return (
    <>
      <Header />
      <main className="min-h-screen bg-background pt-20">
        {/* Hero */}
        <section className="relative overflow-hidden bg-secondary border-b border-border py-16 sm:py-24">
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-0 left-0 w-96 h-96 bg-accent rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 right-0 w-64 h-64 bg-primary rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
          </div>
          <div className="relative max-w-4xl mx-auto px-4 sm:px-6 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-widest mb-6">
              <Icon name="BookOpenIcon" size={14} />
              Buyer Resource
            </div>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-black text-foreground leading-tight mb-6">
              Kei Truck
              <br />
              <span className="text-primary">Glossary</span>
            </h1>
            <p className="text-muted-foreground text-lg sm:text-xl max-w-2xl mx-auto mb-8">
              Plain-English definitions for every term you will encounter when buying, importing,
              and owning a kei truck. No jargon left unexplained.
            </p>
            <div className="flex items-center gap-3 max-w-md mx-auto">
              <div className="relative flex-1">
                <Icon
                  name="MagnifyingGlassIcon"
                  size={16}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground"
                />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search terms..."
                  className="w-full pl-10 pr-4 py-3 rounded-full bg-card border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 text-sm"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Content */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
          {/* Category Filter */}
          <div className="flex flex-wrap gap-2 mb-10">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-all min-h-[36px] ${
                  activeCategory === cat
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-card border border-border text-muted-foreground hover:text-foreground hover:border-primary/30'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Results count */}
          <p className="text-xs text-muted-foreground mb-6 font-bold uppercase tracking-widest">
            {filtered.length} term{filtered.length !== 1 ? 's' : ''} found
          </p>

          {/* Grouped Terms */}
          {grouped.length === 0 ? (
            <div className="text-center py-16 bg-card border border-border rounded-2xl">
              <Icon
                name="MagnifyingGlassIcon"
                size={32}
                className="text-muted-foreground mx-auto mb-3"
              />
              <p className="text-muted-foreground">
                No terms match your search. Try a different keyword.
              </p>
            </div>
          ) : (
            <div className="space-y-10">
              {grouped.map(([letter, terms]) => (
                <div key={letter}>
                  <div className="flex items-center gap-4 mb-4">
                    <span className="font-display font-black text-4xl text-primary/20">
                      {letter}
                    </span>
                    <div className="flex-1 h-px bg-border" />
                  </div>
                  <div className="space-y-2">
                    {terms.map((term) => {
                      const isOpen = expandedTerm === term.term;
                      return (
                        <div
                          key={term.term}
                          className="bg-card border border-border rounded-2xl overflow-hidden hover:border-primary/20 transition-colors"
                        >
                          <button
                            onClick={() => setExpandedTerm(isOpen ? null : term.term)}
                            className="w-full flex items-center gap-4 p-4 sm:p-5 text-left"
                          >
                            <div className="flex-1 min-w-0 flex flex-wrap items-center gap-2">
                              <span className="font-bold text-foreground">{term.term}</span>
                              <span
                                className={`text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full border ${categoryColors[term.category] || 'bg-muted text-muted-foreground border-border'}`}
                              >
                                {term.category}
                              </span>
                            </div>
                            <Icon
                              name={isOpen ? 'ChevronUpIcon' : 'ChevronDownIcon'}
                              size={16}
                              className="text-muted-foreground flex-shrink-0"
                            />
                          </button>
                          {isOpen && (
                            <div className="px-4 sm:px-5 pb-5 border-t border-border">
                              <p className="text-sm text-muted-foreground leading-relaxed pt-4 mb-3">
                                {term.definition}
                              </p>
                              {term.related && term.related.length > 0 && (
                                <div className="flex flex-wrap items-center gap-2">
                                  <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest">
                                    Related:
                                  </span>
                                  {term.related.map((r) => (
                                    <button
                                      key={r}
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        setSearch(r);
                                        setExpandedTerm(r);
                                        setActiveCategory('All');
                                      }}
                                      className="text-xs px-2.5 py-1 rounded-full bg-primary/10 text-primary border border-primary/20 hover:bg-primary/20 transition-colors"
                                    >
                                      {r}
                                    </button>
                                  ))}
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* CTA */}
        <section className="bg-secondary border-t border-border py-14">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
            <h2 className="font-display text-2xl sm:text-3xl font-black text-foreground mb-3">
              Still have questions?
            </h2>
            <p className="text-muted-foreground mb-8 max-w-md mx-auto">
              Our team knows kei trucks inside and out. Ask us anything about buying, importing, or
              owning one.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/faq"
                className="flex items-center justify-center gap-2 px-8 py-3.5 bg-primary text-primary-foreground rounded-full font-bold text-sm uppercase tracking-widest hover:scale-105 transition-transform min-h-[48px]"
              >
                Read the FAQ
                <Icon name="ArrowRightIcon" size={16} />
              </Link>
              <Link
                href="/contact"
                className="flex items-center justify-center gap-2 px-8 py-3.5 bg-transparent border border-border text-foreground rounded-full font-bold text-sm uppercase tracking-widest hover:bg-muted transition-all min-h-[48px]"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
