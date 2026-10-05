'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Icon from '@/components/ui/AppIcon';
import AppImage from '@/components/ui/AppImage';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

interface ServiceItem {
  task: string;
  interval: string;
  difficulty: 'Easy' | 'Moderate' | 'Advanced';
  cost: string;
  notes: string;
}

interface ServiceCategory {
  id: string;
  title: string;
  icon: string;
  color: string;
  items: ServiceItem[];
}

const serviceCategories: ServiceCategory[] = [
  {
    id: 'engine',
    title: 'Engine & Fluids',
    icon: 'WrenchScrewdriverIcon',
    color: 'text-primary',
    items: [
      {
        task: 'Engine Oil Change',
        interval: 'Every 3,000 km (conventional) / 5,000 km (synthetic)',
        difficulty: 'Easy',
        cost: '$15–$25',
        notes:
          'Use 10W-30 or 5W-30. The 660cc engines run at higher RPM than full-size trucks, so frequent oil changes are critical. Check the dipstick monthly.',
      },
      {
        task: 'Oil Filter Replacement',
        interval: 'Every oil change',
        difficulty: 'Easy',
        cost: '$5–$12',
        notes:
          'Replace at every oil change. OEM filters are available from Japan suppliers. Most kei trucks use a standard spin-on filter.',
      },
      {
        task: 'Air Filter Inspection',
        interval: 'Every 10,000 km, replace at 20,000 km',
        difficulty: 'Easy',
        cost: '$10–$20',
        notes:
          'Inspect more frequently if operating in dusty conditions (farms, construction sites). A clogged air filter noticeably reduces power on the small 660cc engine.',
      },
      {
        task: 'Coolant Flush',
        interval: 'Every 2 years or 40,000 km',
        difficulty: 'Moderate',
        cost: '$20–$40',
        notes:
          'Use a 50/50 mix of antifreeze and distilled water. Check coolant level monthly. Low coolant is a common cause of overheating on older kei trucks.',
      },
      {
        task: 'Timing Belt Replacement',
        interval: 'Every 60,000–80,000 km',
        difficulty: 'Advanced',
        cost: '$150–$300 (parts + labor)',
        notes:
          'Critical service. A broken timing belt will destroy the engine. Most F6A and EF engines are interference engines. Replace the water pump and tensioner at the same time.',
      },
      {
        task: 'Spark Plugs',
        interval: 'Every 20,000 km (standard) / 40,000 km (iridium)',
        difficulty: 'Easy',
        cost: '$10–$30',
        notes:
          'Three plugs per engine on most kei trucks. NGK is the OEM supplier for most makes. Worn plugs cause rough idle and poor fuel economy.',
      },
      {
        task: 'Fuel Filter',
        interval: 'Every 30,000 km',
        difficulty: 'Moderate',
        cost: '$15–$30',
        notes:
          'Especially important on older trucks with carbureted engines. Dirty fuel filters cause hard starting and rough running.',
      },
    ],
  },
  {
    id: 'drivetrain',
    title: '4WD & Drivetrain',
    icon: 'CogIcon',
    color: 'text-accent',
    items: [
      {
        task: 'Transmission Fluid Change',
        interval: 'Every 30,000 km',
        difficulty: 'Moderate',
        cost: '$20–$50',
        notes:
          'Use GL-4 gear oil for manual transmissions. Do not use GL-5 in older gearboxes as it can damage yellow metal components.',
      },
      {
        task: '4WD Transfer Case Fluid',
        interval: 'Every 30,000 km',
        difficulty: 'Moderate',
        cost: '$15–$35',
        notes:
          'Check the transfer case fluid level every 10,000 km. Low fluid causes grinding when engaging 4WD. Use the manufacturer-specified gear oil.',
      },
      {
        task: 'Front Differential Fluid',
        interval: 'Every 30,000 km',
        difficulty: 'Moderate',
        cost: '$15–$35',
        notes:
          'On 4WD trucks, inspect the front differential for leaks at every oil change. Leaking axle seals are common on high-mileage trucks.',
      },
      {
        task: 'CV Joint Inspection',
        interval: 'Every 20,000 km',
        difficulty: 'Moderate',
        cost: 'Inspection free, replacement $80–$200',
        notes:
          'Check CV boots for cracks or tears. A torn boot leads to grease loss and rapid CV joint wear. Replace boots early to avoid expensive joint replacement.',
      },
      {
        task: '4WD Engagement Test',
        interval: 'Monthly',
        difficulty: 'Easy',
        cost: 'Free',
        notes:
          "Engage 4WD Hi and Lo at least once a month, even if you don't need it. This keeps the transfer case seals lubricated and prevents the 4WD from seizing up from disuse.",
      },
      {
        task: 'Clutch Adjustment',
        interval: 'Every 20,000 km or as needed',
        difficulty: 'Moderate',
        cost: '$0 (adjustment) / $150–$300 (replacement)',
        notes:
          'Manual clutch pedal free play should be 10–15mm. Adjust the cable or hydraulic system as needed. A slipping clutch is a sign the disc is worn.',
      },
    ],
  },
  {
    id: 'brakes',
    title: 'Brakes & Suspension',
    icon: 'ShieldCheckIcon',
    color: 'text-primary',
    items: [
      {
        task: 'Brake Pad Inspection',
        interval: 'Every 10,000 km',
        difficulty: 'Easy',
        cost: 'Inspection free, pads $20–$50',
        notes:
          'Kei trucks are light, so brake pads last a long time. However, if you use the truck for heavy hauling or hilly terrain, inspect more frequently.',
      },
      {
        task: 'Brake Fluid Flush',
        interval: 'Every 2 years',
        difficulty: 'Moderate',
        cost: '$20–$40',
        notes:
          'Brake fluid absorbs moisture over time, lowering its boiling point. Use DOT 3 or DOT 4 as specified. Flush if the fluid appears dark or cloudy.',
      },
      {
        task: 'Drum Brake Adjustment',
        interval: 'Every 20,000 km',
        difficulty: 'Moderate',
        cost: 'Free (self-adjusting) / $30–$60 (shop)',
        notes:
          'Many kei trucks use drum brakes on the rear. Self-adjusters can seize on older trucks. Manual adjustment ensures even braking and prevents pulling.',
      },
      {
        task: 'Shock Absorber Inspection',
        interval: 'Every 40,000 km',
        difficulty: 'Easy',
        cost: 'Inspection free, replacement $100–$250/pair',
        notes:
          'Check for oil leaks and excessive bounce. Worn shocks affect handling and tire wear. Aftermarket options are available for lifted trucks.',
      },
      {
        task: 'Wheel Bearing Check',
        interval: 'Every 20,000 km',
        difficulty: 'Easy',
        cost: 'Inspection free, replacement $50–$150',
        notes:
          'Lift each wheel and check for play or grinding. Worn wheel bearings are a safety issue. Front bearings on 4WD trucks wear faster due to CV joint stress.',
      },
      {
        task: 'Tire Rotation',
        interval: 'Every 10,000 km',
        difficulty: 'Easy',
        cost: '$0–$20',
        notes:
          'Rotate front to rear and vice versa. Kei trucks often have different wear patterns front vs. rear depending on drive configuration and load.',
      },
    ],
  },
  {
    id: 'body',
    title: 'Body & Electrical',
    icon: 'BoltIcon',
    color: 'text-accent',
    items: [
      {
        task: 'Battery Inspection',
        interval: 'Every 6 months',
        difficulty: 'Easy',
        cost: 'Inspection free, replacement $50–$100',
        notes:
          'Kei truck batteries are smaller than full-size truck batteries. Cold weather significantly reduces capacity. Keep terminals clean and tight.',
      },
      {
        task: 'Hydraulic Dump System Check',
        interval: 'Every 10,000 km (dump trucks)',
        difficulty: 'Moderate',
        cost: 'Inspection free, fluid $10–$20',
        notes:
          'Check hydraulic fluid level and inspect hoses for cracks. Operate the dump bed through its full range monthly to keep the system lubricated.',
      },
      {
        task: 'Rust Inspection',
        interval: 'Annually',
        difficulty: 'Easy',
        cost: 'Inspection free, treatment $20–$100',
        notes:
          'Focus on frame rails, wheel wells, and bed floor. Japanese trucks are generally well-protected, but salt exposure in winter states accelerates rust. Treat early with rust converter.',
      },
      {
        task: 'Wiper Blades',
        interval: 'Every 12 months',
        difficulty: 'Easy',
        cost: '$10–$25',
        notes:
          'Standard wiper blades. Measure before ordering as kei truck wiper arms are shorter than US vehicles. Most use a standard J-hook attachment.',
      },
      {
        task: 'Lights & Indicators',
        interval: 'Monthly visual check',
        difficulty: 'Easy',
        cost: '$5–$20 per bulb',
        notes:
          'Check all lights monthly. Kei trucks use standard automotive bulbs. LED upgrades are popular and improve visibility significantly.',
      },
    ],
  },
];

const makeGuides = [
  {
    make: 'Suzuki Carry',
    engine: 'F6A / K6A (660cc)',
    years: '1991–2013',
    image: 'https://images.unsplash.com/photo-1720236178658-ef1edfa8ac68',
    imageAlt: 'Suzuki Carry kei truck on rural road',
    tips: [
      'The F6A is a SOHC carbureted engine. The K6A (post-1998) is DOHC with EFI and is more reliable.',
      'Timing belt interval is 60,000 km on F6A. Do not skip this service.',
      'The K6A is known for head gasket issues if overheated. Monitor coolant closely.',
      'Parts availability is excellent. Most US kei truck suppliers stock Carry-specific items.',
    ],
  },
  {
    make: 'Daihatsu Hijet',
    engine: 'EF-CS / EF-SE (660cc)',
    years: '1990–2021',
    image: 'https://img.rocket.new/generatedImages/rocket_gen_img_1ab086ffe-1787347348461.png',
    imageAlt: 'Daihatsu Hijet dump truck with raised bed',
    tips: [
      'The EF engine family is extremely reliable. Timing belt at 80,000 km.',
      'Hijet trucks have a mid-engine layout (engine under the cab). Access requires removing the cab floor panel.',
      'The 4WD system is robust. Check the front axle seals regularly as they are a known wear item.',
      'Hijet parts are widely available from Japanese suppliers and increasingly from US distributors.',
    ],
  },
  {
    make: 'Honda Acty',
    engine: 'E07A (660cc)',
    years: '1988–2021',
    image: 'https://img.rocket.new/generatedImages/rocket_gen_img_1c9c46e50-1787347350388.png',
    imageAlt: 'Honda Acty kei truck flatbed on farm road',
    tips: [
      'The E07A is a rear-engine design. The engine sits behind the cab under the bed.',
      'Timing belt at 60,000 km. Access is straightforward once the bed is tilted.',
      'Honda quality means fewer issues overall, but parts can be harder to source than Suzuki or Daihatsu.',
      'The Acty has a unique 4WD system with a viscous coupling. Avoid mixing tire sizes on 4WD models.',
    ],
  },
  {
    make: 'Subaru Sambar',
    engine: 'EN07 (660cc 4-cyl)',
    years: '1990–2012',
    image: 'https://img.rocket.new/generatedImages/rocket_gen_img_175d0b0ab-1787347348737.png',
    imageAlt: 'Subaru Sambar kei truck on mountain road',
    tips: [
      'The EN07 is a 4-cylinder, unusual for kei trucks. More torque and smoother power than 3-cylinder competitors.',
      'Timing belt at 80,000 km. The EN07 is an interference engine, so do not skip this service.',
      "Subaru's AWD system is excellent but requires proper fluid maintenance in both front and rear differentials.",
      "Parts are slightly harder to find than Suzuki/Daihatsu but Subaru's reputation for reliability means fewer repairs overall.",
    ],
  },
];

const difficultyColor = {
  Easy: 'bg-green-500/10 text-green-400 border-green-500/20',
  Moderate: 'bg-primary/10 text-primary border-primary/20',
  Advanced: 'bg-red-500/10 text-red-400 border-red-500/20',
};

export default function MaintenanceClient() {
  const [activeCategory, setActiveCategory] = useState('engine');
  const [expandedItem, setExpandedItem] = useState<string | null>(null);
  const [visible, setVisible] = useState(false);
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 80);
    return () => clearTimeout(t);
  }, []);

  const currentCategory = serviceCategories.find((c) => c.id === activeCategory)!;

  return (
    <>
      <Header />
      <main className="min-h-screen bg-background pt-20">
        {/* Hero */}
        <section
          ref={heroRef}
          className={`relative overflow-hidden border-b border-border transition-opacity duration-700 ${visible ? 'opacity-100' : 'opacity-0'}`}
        >
          <div className="absolute inset-0">
            <AppImage
              src="https://img.rocket.new/generatedImages/rocket_gen_img_11e6d8c90-1767782190697.png"
              alt="Mechanic working on a small engine in a clean workshop, tools laid out on workbench"
              fill
              className="object-cover"
              priority
            />

            <div className="absolute inset-0 bg-gradient-to-b from-background/85 via-background/75 to-background" />
          </div>
          <div className="relative py-20 sm:py-28 max-w-4xl mx-auto px-4 sm:px-6 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-widest mb-6">
              <Icon name="WrenchScrewdriverIcon" size={14} />
              Owner Resource
            </div>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-black text-foreground leading-tight mb-6">
              Kei Truck
              <br />
              <span className="text-primary">Maintenance Guide</span>
            </h1>
            <p className="text-muted-foreground text-lg sm:text-xl max-w-2xl mx-auto mb-8">
              Keep your kei truck running for decades. Complete service schedules, make-specific
              tips, and honest cost estimates for every maintenance task.
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              {[
                { icon: 'ClockIcon', label: 'Full service schedule' },
                { icon: 'CurrencyDollarIcon', label: 'Cost estimates included' },
                { icon: 'TruckIcon', label: 'All 4 major makes covered' },
                { icon: 'BookOpenIcon', label: 'DIY-friendly guidance' },
              ].map((item) => (
                <div
                  key={item.label}
                  className="flex items-center gap-2 px-4 py-2 bg-card/80 backdrop-blur-sm border border-border rounded-full text-sm text-muted-foreground"
                >
                  <Icon name={item.icon} size={14} className="text-primary" />
                  {item.label}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Quick Stats */}
        <section className="border-b border-border bg-secondary/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                { value: '660cc', label: 'Engine Size', sub: 'all major makes' },
                { value: '3,000 km', label: 'Oil Change', sub: 'conventional oil' },
                { value: '60–80k km', label: 'Timing Belt', sub: 'critical service' },
                { value: '$15–$25', label: 'Oil Change Cost', sub: 'parts only' },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="bg-card border border-border rounded-2xl p-4 text-center"
                >
                  <p className="font-display font-black text-xl sm:text-2xl text-primary mb-0.5">
                    {stat.value}
                  </p>
                  <p className="text-xs font-bold text-foreground">{stat.label}</p>
                  <p className="text-xs text-muted-foreground">{stat.sub}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Service Schedule */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 py-14 sm:py-20">
          <div className="mb-10">
            <div className="flex items-center gap-3 mb-4">
              <div className="size-2 bg-primary rounded-full" />
              <span className="tag-pill bg-primary/10 text-primary border border-primary/20">
                Service Schedule
              </span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-black text-foreground mb-2">
              What to service and when
            </h2>
            <p className="text-muted-foreground max-w-xl">
              Intervals are based on km driven. If your truck sits for extended periods, use
              time-based intervals instead.
            </p>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2 mb-8">
            {serviceCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest transition-all min-h-[40px] ${
                  activeCategory === cat.id
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-card border border-border text-muted-foreground hover:text-foreground hover:border-primary/30'
                }`}
              >
                <Icon name={cat.icon} size={14} />
                {cat.title}
              </button>
            ))}
          </div>

          {/* Service Items */}
          <div className="space-y-3">
            {currentCategory.items.map((item, i) => {
              const key = `${activeCategory}-${i}`;
              const isOpen = expandedItem === key;
              return (
                <div
                  key={key}
                  className="bg-card border border-border rounded-2xl overflow-hidden hover:border-primary/20 transition-colors"
                >
                  <button
                    onClick={() => setExpandedItem(isOpen ? null : key)}
                    className="w-full flex items-center gap-4 p-5 text-left"
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <span className="font-bold text-foreground text-sm">{item.task}</span>
                        <span
                          className={`text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full border ${difficultyColor[item.difficulty]}`}
                        >
                          {item.difficulty}
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-3 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Icon name="ClockIcon" size={11} />
                          {item.interval}
                        </span>
                        <span className="flex items-center gap-1">
                          <Icon name="CurrencyDollarIcon" size={11} />
                          {item.cost}
                        </span>
                      </div>
                    </div>
                    <Icon
                      name={isOpen ? 'ChevronUpIcon' : 'ChevronDownIcon'}
                      size={16}
                      className="text-muted-foreground flex-shrink-0"
                    />
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 border-t border-border">
                      <p className="text-sm text-muted-foreground leading-relaxed pt-4">
                        {item.notes}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* Make-Specific Guides */}
        <section className="bg-secondary/30 border-y border-border py-14 sm:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="mb-10">
              <div className="flex items-center gap-3 mb-4">
                <div className="size-2 bg-accent rounded-full" />
                <span className="tag-pill bg-accent/10 text-accent border border-accent/20">
                  Make-Specific Tips
                </span>
              </div>
              <h2 className="font-display text-3xl sm:text-4xl font-black text-foreground mb-2">
                Know your engine
              </h2>
              <p className="text-muted-foreground max-w-xl">
                Each make has quirks. Here is what every owner should know about their specific
                truck.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {makeGuides.map((guide) => (
                <div
                  key={guide.make}
                  className="bg-card border border-border rounded-2xl overflow-hidden flex flex-col"
                >
                  <div className="relative h-40 overflow-hidden">
                    <AppImage
                      src={guide.image}
                      alt={guide.imageAlt}
                      fill
                      className="object-cover"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                    <div className="absolute bottom-3 left-3">
                      <h3 className="font-display font-black text-lg text-white">{guide.make}</h3>
                      <p className="text-xs text-white/70">
                        {guide.engine} · {guide.years}
                      </p>
                    </div>
                  </div>
                  <div className="p-4 flex flex-col gap-2 flex-1">
                    {guide.tips.map((tip, i) => (
                      <div
                        key={i}
                        className="flex items-start gap-2.5 text-xs text-muted-foreground"
                      >
                        <span className="flex-shrink-0 size-4 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-[9px] font-black text-primary mt-0.5">
                          {i + 1}
                        </span>
                        {tip}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Service Manual CTA */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 py-14 sm:py-20">
          <div className="bg-card border border-border rounded-3xl p-8 sm:p-12 text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
            <div className="relative">
              <div className="size-14 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto mb-6">
                <Icon name="BookOpenIcon" size={24} className="text-primary" />
              </div>
              <h2 className="font-display text-2xl sm:text-3xl font-black text-foreground mb-3">
                Get your service manual
              </h2>
              <p className="text-muted-foreground max-w-md mx-auto mb-8">
                Every truck purchase includes a digital service manual in English. Physical printed
                manuals are available for $35. We also carry OEM and aftermarket parts for all major
                makes.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link
                  href="/parts"
                  className="flex items-center justify-center gap-2 px-8 py-3.5 bg-primary text-primary-foreground rounded-full font-bold text-sm uppercase tracking-widest hover:scale-105 transition-transform min-h-[48px]"
                >
                  Shop Parts
                  <Icon name="ArrowRightIcon" size={16} />
                </Link>
                <Link
                  href="/contact"
                  className="flex items-center justify-center gap-2 px-8 py-3.5 bg-transparent border border-border text-foreground rounded-full font-bold text-sm uppercase tracking-widest hover:bg-muted transition-all min-h-[48px]"
                >
                  Ask a Question
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
