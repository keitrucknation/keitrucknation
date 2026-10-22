/**
 * Single source of truth for blog articles.
 * Used by the blog index (BlogClient), the article pages (/blog/[slug]) and sitemap.ts.
 * To publish a new article, add an entry here - the listing, page, metadata and
 * sitemap entry are all generated from it.
 */

export interface ArticleSection {
  heading?: string;
  paragraphs?: string[];
  list?: string[];
  /** Highlighted tip / warning box */
  callout?: { title: string; text: string };
}

export interface Article {
  slug: string;
  category: string;
  title: string;
  excerpt: string;
  author: string;
  authorRole?: string;
  date: string;
  /** ISO date (for structured data / sitemap) */
  isoDate?: string;
  readTime: string;
  image: string;
  imageAlt: string;
  featured?: boolean;
  tags: string[];
  body?: ArticleSection[];
  /** Internal links suggested at the end of the article */
  related?: { label: string; href: string }[];
}

export const AUTHORS: Record<string, string> = {
  'Marcus Webb': 'Head of Inventory & Import',
  'Derek Okafor': 'Customer Stories Editor',
  'Yuki Tanaka': 'Japan Sourcing Lead',
};

export const articles: Article[] = [
  {
    slug: 'kei-trucks-street-legal-by-state',
    category: 'Regulations',
    title: 'Are Kei Trucks Street Legal? A State-by-State Breakdown',
    excerpt:
      "The most common question we get. The short answer: it depends on your state. Here's what we know about all 50 states, updated for 2026.",
    author: 'Marcus Webb',
    date: 'Aug 14, 2026',
    isoDate: '2026-08-14',
    readTime: '8 min read',
    image: 'https://images.unsplash.com/photo-1675779528088-0185d2a89313',
    imageAlt: 'Open rural highway with farmland on both sides, representing kei truck road use',
    featured: true,
    tags: ['Regulations', 'Street Legal', 'State Laws'],
    body: [
      {
        paragraphs: [
          "If you've spent five minutes looking at kei trucks, you've asked this question. And if you've spent ten minutes on forums, you've probably seen five different answers. That's because there isn't one answer - there are fifty. Federal law decides whether a kei truck can come into the country. Your state decides whether you can drive it on the road.",
          "This guide explains how the rules fit together, the categories states tend to fall into, and exactly what to check before you buy. For the state-by-state details, use our interactive State Guide - we keep it updated as laws change.",
        ],
      },
      {
        heading: 'Step one: federal import (the 25-year rule)',
        paragraphs: [
          "Kei trucks were never built to US safety standards. Under federal law, a vehicle that doesn't meet those standards can still be imported once it is at least 25 years old (counted to the month of manufacture). That's why the trucks you'll see from any legitimate importer - including us - are 25+ year-old models.",
          'Once a truck clears customs as a 25-year-old vehicle, it is a legally imported motor vehicle. It comes with the paperwork your DMV will want: the export certificate (with English translation), the customs entry form and the bill of lading.',
        ],
        callout: {
          title: 'Watch out',
          text: "Be very careful with anyone selling 'newer' kei trucks for road use. Trucks under 25 years old usually come in only as off-road or farm equipment, and in many states they can never be titled for the road.",
        },
      },
      {
        heading: 'Step two: your state decides road use',
        paragraphs: [
          "Once the truck is legally in the country, titling and registration are state matters. In our experience, states roughly fall into four groups:",
        ],
        list: [
          'Fully road legal: titled and registered like any other imported 25-year-old vehicle, usually with a standard safety inspection.',
          'Road legal with limits: registered as a low-speed, mini-truck or similar class, with limits such as no roads posted above 35-55 mph.',
          'Off-road / farm use only: you can own and title it, but road use is restricted to farm use, crossing roads, or not allowed at all.',
          'Unclear or changing: the law is ambiguous or under review, and the result depends on your local DMV office.',
        ],
      },
      {
        heading: 'Why answers differ even within a state',
        paragraphs: [
          "A surprising number of problems come from the DMV counter, not the law. Kei trucks are uncommon, and clerks don't see the import paperwork every day. Two offices in the same state may treat the same truck differently.",
          'Bring a complete paperwork packet, be polite, and ask for a supervisor if the first answer seems wrong. If you buy from us, our title team can tell you which documents your state usually asks for and help if you get stuck.',
        ],
      },
      {
        heading: 'Before you buy: a quick checklist',
        list: [
          'Look up your state in our State Guide and read the notes for your classification.',
          'Call your local DMV and ask how they title a "25-year-old imported mini truck".',
          'Check local rules too - some cities and HOAs restrict low-speed vehicles.',
          'Ask your insurance agent; many carriers will insure kei trucks as collector or utility vehicles.',
          'Decide how you will actually use the truck. If it never leaves your property, road registration may not matter.',
        ],
      },
      {
        callout: {
          title: 'Not legal advice',
          text: 'Laws and DMV practice change. This guide is general information based on our customers’ experience, not legal advice. Always confirm with your state DMV before relying on road use.',
        },
      },
    ],
    related: [
      { label: 'Open the interactive State Guide', href: '/state-guide' },
      { label: 'See how the import process works', href: '/import-process' },
      { label: 'Browse road-ready trucks', href: '/inventory' },
    ],
  },
  {
    slug: 'suzuki-carry-vs-daihatsu-hijet',
    category: 'Buying Guide',
    title: 'Suzuki Carry vs. Daihatsu Hijet: Which Kei Truck Should You Buy?',
    excerpt:
      "Two of the most popular kei trucks in the US. Both are reliable, affordable, and capable - but they're not the same. Here's how to choose.",
    author: 'Marcus Webb',
    date: 'Aug 7, 2026',
    isoDate: '2026-08-07',
    readTime: '6 min read',
    image: 'https://img.rocket.new/generatedImages/rocket_gen_img_1529eecc9-1787334265162.png',
    imageAlt: 'Two compact Japanese mini trucks parked side by side for comparison',
    featured: true,
    tags: ['Buying Guide', 'Suzuki', 'Daihatsu'],
    body: [
      {
        paragraphs: [
          "Ask ten kei truck owners which is better and you'll get a lively argument. The honest answer: both are excellent, and the right one depends on how you'll use it and how you like a truck to drive. Here's how we explain the difference to customers.",
        ],
      },
      {
        heading: 'Suzuki Carry: the simple workhorse',
        paragraphs: [
          'The Carry is the truck most people picture when they think "kei truck". It has a 660cc three-cylinder engine mounted under the seats, a long production history and a huge owner community.',
        ],
        list: [
          'Very common, so parts and how-to videos are easy to find.',
          'Simple mechanicals that most home mechanics can handle.',
          'Part-time 4WD with high/low range and, on many trucks, a differential lock.',
          'Cab-over design gives a long, usable bed for its size.',
        ],
      },
      {
        heading: 'Daihatsu Hijet: comfort and options',
        paragraphs: [
          "The Hijet is Daihatsu's long-running kei truck. Owners often describe it as a little more refined - smoother on the road, with more trim and body options.",
        ],
        list: [
          'Wide range of versions, including dump beds, Jumbo extended cabs and box vans.',
          'Jumbo models add space behind the seats - a big deal for taller drivers.',
          'Often available with an automatic, which suits farm and property use.',
          'Strong parts availability, especially for later generations.',
        ],
      },
      {
        heading: 'Side by side',
        list: [
          'Engine: both 660cc three-cylinders; power is similar in real use.',
          'Payload: both are rated around 350 kg (about 770 lb) in Japan.',
          'Cab room: Hijet Jumbo wins; standard cabs are close.',
          'Off-road: very close - check the specific truck for 4WD type and diff lock.',
          'Parts: both easy; Carry has a slight edge for older models.',
        ],
      },
      {
        heading: 'Our recommendation',
        paragraphs: [
          'If you are tall, plan to drive long distances, or want an automatic, start with a Hijet Jumbo. If you want the simplest possible truck to keep running for years, a 4WD Carry with a diff lock is hard to beat.',
          'Condition matters far more than brand. A well-kept truck of either make will out-work a neglected one every time - which is why every truck in our inventory comes with an auction grade and inspection notes.',
        ],
      },
    ],
    related: [
      { label: 'Compare trucks side by side', href: '/compare' },
      { label: 'Browse all trucks', href: '/products' },
      { label: 'Build your truck in the configurator', href: '/configurator' },
    ],
  },
  {
    slug: 'kei-truck-farm-use-guide',
    category: 'Use Cases',
    title: "The Kei Truck as a Farm Vehicle: A Working Farmer's Honest Review",
    excerpt:
      "We asked five KeiTruckNation customers who use their trucks daily on farms to tell us what works, what doesn't, and what they wish they'd known.",
    author: 'Derek Okafor',
    date: 'Jul 28, 2026',
    isoDate: '2026-07-28',
    readTime: '10 min read',
    image: 'https://img.rocket.new/generatedImages/rocket_gen_img_15231ff4f-1768925895666.png',
    imageAlt: 'Green farmland with tractor tracks, representing agricultural use of kei trucks',
    tags: ['Farm', 'Use Cases', 'Real World'],
    body: [
      {
        paragraphs: [
          'Kei trucks were designed for small Japanese farms, so it makes sense that farms are where they shine in the US too. We asked five customers - a cattle operation, two orchards, a market garden and a hobby farm - what daily life with a kei truck is really like.',
        ],
      },
      {
        heading: 'What works',
        list: [
          'Size: it fits through gates, between orchard rows and into barns where a full-size pickup cannot.',
          'Fuel: owners reported using a fraction of the fuel of their full-size truck for daily chores.',
          'Bed height: the low, flat bed with drop sides makes loading feed bags and tools much easier on the back.',
          '4WD with low range: handles mud and wet pasture far better than its size suggests.',
          'Ground pressure: light weight means fewer ruts in wet fields than a pickup or tractor.',
        ],
      },
      {
        heading: "What doesn't",
        list: [
          "Highway speed: these trucks are happiest under 50 mph. They're not for long road trips.",
          'Towing: fine for a small utility trailer, not for livestock trailers or heavy equipment.',
          'Cab space: drivers over about 6 ft found standard cabs tight. Several recommended a Jumbo cab.',
          'Heat and AC: older trucks often have weak AC. Check it before summer.',
        ],
      },
      {
        heading: 'What they wish they had known',
        paragraphs: [
          '"Buy the dump bed," said the orchard owner. "I thought I didn’t need it. Now I use it every single day for mulch and prunings."',
          'Others mentioned buying a few spare filters and belts up front, putting on all-terrain tires straight away, and checking with their state about whether farm-use registration would cover crossing public roads between fields.',
        ],
        callout: {
          title: 'Tip',
          text: 'If the truck will mostly live on the farm, ask your state about farm or agricultural registration. It is often cheaper and simpler than full road registration.',
        },
      },
      {
        heading: 'The verdict',
        paragraphs: [
          'All five said they would buy again, and two have already bought a second truck. For moving people, tools and materials around a property, a kei truck is one of the best-value tools you can own.',
        ],
      },
    ],
    related: [
      { label: 'Shop dump-bed kei trucks', href: '/inventory/dump' },
      { label: 'Farm & specialty trucks', href: '/inventory/specialty' },
      { label: 'Financing options', href: '/financing' },
    ],
  },
  {
    slug: 'importing-kei-truck-process',
    category: 'Import Process',
    title: 'How We Import Kei Trucks: From Japanese Auction to Your Driveway',
    excerpt:
      'A step-by-step look at the full import process - Japanese auction, export paperwork, ocean freight, US customs, and domestic delivery. No mystery.',
    author: 'Yuki Tanaka',
    date: 'Jul 15, 2026',
    isoDate: '2026-07-15',
    readTime: '7 min read',
    image: 'https://img.rocket.new/generatedImages/rocket_gen_img_19e8e5aa6-1772797423447.png',
    imageAlt:
      'Container ship at port with cargo containers being loaded, representing vehicle import',
    tags: ['Import', 'Process', 'Customs'],
    body: [
      {
        paragraphs: [
          "People are often surprised by how many steps sit between a truck in Japan and a truck in their driveway. Here is the whole journey, in order, the way we run it.",
        ],
      },
      {
        heading: '1. Sourcing at auction',
        paragraphs: [
          "Most kei trucks are bought through Japan's large dealer auctions. Every auction car has an inspection sheet with an overall grade and a diagram of dents, scratches and rust. Our team in Japan reads these sheets, checks photos and, where possible, inspects the truck in person before we bid.",
        ],
      },
      {
        heading: '2. De-registration and export paperwork',
        paragraphs: [
          'After purchase, the truck is de-registered in Japan and an export certificate is issued. This document - with a certified English translation - is what your DMV will later use to confirm the truck’s age and identity.',
        ],
      },
      {
        heading: '3. Preparation and inspection',
        list: [
          'Pre-shipment cleaning, including underbody washing to meet US agricultural rules.',
          'Mechanical check of fluids, brakes, belts, tires and battery.',
          'Photos of every truck so you can see exactly what is coming.',
        ],
      },
      {
        heading: '4. Ocean freight',
        paragraphs: [
          'Trucks travel by roll-on/roll-off ship or in containers. Crossing the Pacific usually takes around 2-6 weeks depending on the route and the US port.',
        ],
      },
      {
        heading: '5. US customs clearance',
        paragraphs: [
          "At the port, the truck is cleared through US Customs with the entry paperwork that confirms it qualifies as a 25-year-old vehicle. Duty is paid and the truck is released. You'll receive copies of these documents for titling.",
        ],
      },
      {
        heading: '6. Delivery to you',
        paragraphs: [
          'From the port, trucks go to our yard for a final check or straight onto a carrier to your door. You can follow each stage on our Order Tracking page.',
        ],
        callout: {
          title: 'Typical timeline',
          text: 'From auction win to your driveway usually takes 6-10 weeks. Trucks already in our US inventory can ship within days.',
        },
      },
    ],
    related: [
      { label: 'Full import process explained', href: '/import-process' },
      { label: 'Shipping & delivery', href: '/shipping' },
      { label: 'Track an order', href: '/order-tracking' },
    ],
  },
  {
    slug: 'kei-truck-maintenance-basics',
    category: 'Maintenance',
    title: 'Kei Truck Maintenance: What You Need to Know in Year One',
    excerpt:
      "These trucks are simple and reliable, but they're not zero-maintenance. Here's what to check, what to change, and where to find parts in the US.",
    author: 'Marcus Webb',
    date: 'Jul 3, 2026',
    isoDate: '2026-07-03',
    readTime: '9 min read',
    image: 'https://img.rocket.new/generatedImages/rocket_gen_img_10c9547a6-1767767682618.png',
    imageAlt: 'Mechanic working under the hood of a small truck, performing maintenance',
    tags: ['Maintenance', 'Parts', 'DIY'],
    body: [
      {
        paragraphs: [
          "A 25-year-old truck with an unknown service history deserves a fresh start. Here's what we recommend doing in your first year, plus a simple routine to keep it going.",
        ],
      },
      {
        heading: 'In the first month: the baseline service',
        list: [
          'Engine oil and filter.',
          'Air filter and fuel filter.',
          'Coolant flush - old coolant is a common cause of overheating.',
          'Spark plugs and, if fitted, plug wires.',
          'Gear oil in the transmission, transfer case and differentials (4WD).',
          'Brake fluid flush and a look at pads, shoes and hoses.',
        ],
      },
      {
        heading: 'The timing belt question',
        paragraphs: [
          "Several common kei engines use a timing belt instead of a chain. If there is no record of a recent change, replace it. A broken belt can mean a ruined engine; a new belt is cheap insurance. It's also a good time to replace the water pump.",
        ],
        callout: {
          title: 'Important',
          text: "Not sure if your truck has a belt or a chain? Ask us with your truck's model or VIN/chassis number - our VIN Lookup tool can identify most trucks.",
        },
      },
      {
        heading: 'Simple routine after that',
        list: [
          'Every 3,000 miles or 6 months: oil and filter, check fluids and tire pressure.',
          'Every 12 months: air filter, inspect brakes, grease suspension and steering points.',
          'Every 2 years: coolant and brake fluid.',
          'Every 30,000 miles: spark plugs, gear oils, valve clearance check.',
        ],
      },
      {
        heading: 'Rust: the real enemy',
        paragraphs: [
          'Check the frame, bed supports and cab corners at least once a year, and wash the underside after driving on salted roads. A good undercoating is worth it if you live where winters are wet or salty.',
        ],
      },
      {
        heading: 'Where to get parts',
        paragraphs: [
          "Filters, belts, plugs and brake parts are easy to get. Many filters cross-reference to common US parts, and we stock the most-needed items in our Parts shop so you don't have to wait for shipping from Japan.",
        ],
      },
    ],
    related: [
      { label: 'Full maintenance schedules', href: '/maintenance' },
      { label: 'Shop parts & accessories', href: '/parts' },
      { label: 'Look up your truck by VIN', href: '/vin-lookup' },
    ],
  },
  {
    slug: 'subaru-sambar-en07-engine-guide',
    category: 'Technical',
    title: "The Subaru Sambar EN07 Engine: Why It's the Best Kei Truck Powerplant",
    excerpt:
      "The EN07 is a 4-cylinder in a class of 3-cylinders. Here's why that matters, what makes it special, and how to keep it running for 200,000+ km.",
    author: 'Marcus Webb',
    date: 'Jun 20, 2026',
    isoDate: '2026-06-20',
    readTime: '11 min read',
    image: 'https://img.rocket.new/generatedImages/rocket_gen_img_179d53c3a-1772710670276.png',
    imageAlt: 'Close-up of a small engine compartment showing clean engine components',
    tags: ['Subaru', 'Technical', 'Engine'],
    body: [
      {
        paragraphs: [
          'Most kei trucks use three-cylinder engines. The Subaru Sambar is different: its EN07 is a 658cc four-cylinder. Combined with an engine position behind the cab and four-wheel independent suspension, it gives the Sambar a character all its own - and a cult following.',
        ],
      },
      {
        heading: 'Why four cylinders matter',
        list: [
          'Smoother: noticeably less vibration at idle and cruising speed.',
          'Quieter: with the engine behind the cab, the cabin is calmer than in cab-over trucks.',
          'Revs happily: the small four likes to rev, which makes it feel lively.',
        ],
      },
      {
        heading: 'The rest of the package',
        paragraphs: [
          "The rear-mounted engine puts more weight over the driven wheels, which helps traction when the bed is empty. Four-wheel independent suspension gives a smoother ride than most rivals. Many 4WD Sambars also have a simple, easy-to-use 4WD system that drivers love in snow and on muddy tracks.",
        ],
      },
      {
        heading: 'Known weak points',
        list: [
          'Timing belt: the EN07 uses a belt. Replace it on schedule or if the history is unknown.',
          'Cooling system: long coolant hoses run to the front radiator. Check them for age and leaks.',
          'Valve clearance: check at service intervals; noisy valves are common on neglected engines.',
          'Supercharged versions: great fun, but check for oil leaks and boost problems.',
        ],
      },
      {
        heading: 'Keeping one going past 200,000 km',
        paragraphs: [
          'Owners who reach big mileage do the same things: frequent oil changes with a good-quality oil, timing belts on time, a healthy cooling system and gentle warm-ups. Treat it well and the EN07 will keep going for a very long time.',
        ],
        callout: {
          title: 'Parts note',
          text: 'Sambar parts are a little less common in the US than Carry or Hijet parts. Buy spare filters and a timing belt kit early, or ask us to source them.',
        },
      },
    ],
    related: [
      { label: 'Shop Subaru Sambar trucks', href: '/inventory?make=subaru' },
      { label: 'Maintenance schedules', href: '/maintenance' },
      { label: 'Kei truck glossary', href: '/glossary' },
    ],
  },
];

export function getArticleBySlug(slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug);
}

export function getRelatedArticles(article: Article, count = 3): Article[] {
  const others = articles.filter((a) => a.slug !== article.slug);
  const scored = others
    .map((a) => ({
      a,
      score:
        (a.category === article.category ? 3 : 0) +
        a.tags.filter((t) => article.tags.includes(t)).length,
    }))
    .sort((x, y) => y.score - x.score);
  return scored.slice(0, count).map((s) => s.a);
}
