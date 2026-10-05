export interface FAQItem {
  q: string;
  a: string;
}

export interface FAQCategory {
  id: string;
  label: string;
  icon: string;
  items: FAQItem[];
}

// Single source of truth for FAQ content - used both to render the /faq page
// and to generate its FAQPage JSON-LD schema, so the two can never drift apart.
export const FAQ_CATEGORIES: FAQCategory[] = [
  {
    id: 'buying',
    label: 'Buying a Truck',
    icon: 'TruckIcon',
    items: [
      {
        q: 'What is a kei truck?',
        a: 'Kei trucks (軽トラック, "kei tora") are Japanese-spec mini utility vehicles built to Japan\'s "kei" class regulations: engine displacement under 660cc, body width under 1.48m. They\'re used across Japan for farming, construction, and delivery. In the US they\'re prized for their compact size, 4WD capability, and low cost of ownership.',
      },
      {
        q: 'How old do the trucks need to be to import legally?',
        a: 'Under the US Imported Vehicle Safety Compliance Act, vehicles 25 years or older are exempt from FMVSS (Federal Motor Vehicle Safety Standards) and can be imported freely. Most of our inventory is 1998–2002, which comfortably clears the 25-year threshold.',
      },
      {
        q: 'Can I test drive before buying?',
        a: "We're an online-first dealership, but we do have trucks available for in-person viewing at our staging facility in [City, State]. Contact us to schedule a visit. For remote buyers, we provide a full walk-around video with engine start, 4WD engagement test, and bed operation.",
      },
      {
        q: 'What condition grades do you use?',
        a: "We use the Japanese Auto Appraisal Institute (JAAI) grading system: Grade 5 (near perfect), Grade 4.5, Grade 4 (excellent), Grade 3.5, Grade 3 (good, minor wear). We include the original auction grade sheet with every truck. We don't sell anything below Grade 3.",
      },
      {
        q: 'Do you offer a warranty?',
        a: 'All trucks come with a 30-day mechanical warranty covering engine, transmission, and 4WD system. Extended warranty options (90-day, 1-year) are available through our partner network. Parts warranties are covered by the manufacturer.',
      },
    ],
  },
  {
    id: 'shipping',
    label: 'Shipping & Delivery',
    icon: 'MapPinIcon',
    items: [
      {
        q: 'How long does delivery take?',
        a: 'For trucks already in our US inventory: 5–14 business days for enclosed transport, 7–21 days for open transport. For trucks sourced directly from Japan: 8–12 weeks total (auction → inspection → ocean freight → US customs → domestic delivery).',
      },
      {
        q: 'Do you ship to all 50 states?',
        a: "Yes, we've delivered to 48 states. Alaska and Hawaii require additional ocean freight coordination and take 3–5 weeks longer. Contact us for a custom quote for AK/HI delivery.",
      },
      {
        q: 'How is the truck transported?',
        a: "We use enclosed car carriers for premium transport (recommended for Grade 4.5+ trucks) and open carriers for standard delivery. Both are fully insured. You'll receive a tracking link once your truck is picked up.",
      },
      {
        q: 'What if the truck is damaged in transit?',
        a: 'Every shipment is covered by cargo insurance. If damage occurs in transit, we file the claim on your behalf and coordinate repair or replacement. Document any damage with photos at delivery before signing the Bill of Lading.',
      },
    ],
  },
  {
    id: 'registration',
    label: 'Registration & Legality',
    icon: 'DocumentTextIcon',
    items: [
      {
        q: 'Can I register a kei truck for road use?',
        a: 'It depends on your state. Some states (like Montana, Vermont, and others) allow full street registration. Others allow "off-highway" or farm-use registration. A few states have restrictions. Check our State Guide for a full breakdown of all 50 states.',
      },
      {
        q: 'What title documents do I receive?',
        a: "You'll receive the Japanese Export Certificate (deregistration proof), a US Customs Entry Summary (CBP Form 7501), and a Manufacturer's Statement of Origin or equivalent. Most states accept these to issue a US title. We'll guide you through the process for your specific state.",
      },
      {
        q: 'Do kei trucks need to pass emissions testing?',
        a: "Vehicles 25+ years old are typically exempt from emissions testing in most states. However, some states (California, New York) have stricter rules. Check your state's DMV requirements. Our trucks are generally exempt under the classic/antique vehicle provisions.",
      },
      {
        q: 'Can I drive a kei truck on the highway?',
        a: "Most kei trucks top out at 55–65 mph, which makes them unsuitable for sustained highway driving. They're designed for farm roads, job sites, and low-speed rural use. In states where they're street-legal, they're typically restricted to roads with speed limits under 55 mph.",
      },
    ],
  },
  {
    id: 'parts',
    label: 'Parts & Maintenance',
    icon: 'WrenchScrewdriverIcon',
    items: [
      {
        q: 'Are parts easy to find?',
        a: 'Yes, kei trucks use simple, proven engines (660cc 3-cylinder) with a long production run. OEM parts are available from Japan, and many US suppliers now stock common wear items. We carry the most common parts in our catalog and can source anything else within 2–3 weeks.',
      },
      {
        q: 'Can a regular mechanic work on a kei truck?',
        a: 'Absolutely. The engines are simpler than most modern cars - carbureted or basic EFI, no complex electronics. Any mechanic comfortable with small engines (motorcycles, ATVs, older cars) will find kei trucks straightforward. We provide service manuals in English for all makes.',
      },
      {
        q: 'How often do they need oil changes?',
        a: 'Every 3,000–5,000 km (roughly 2,000–3,000 miles) with conventional oil, or 5,000–7,500 km with synthetic. The 660cc engines run at higher RPM than full-size trucks, so more frequent oil changes extend engine life significantly.',
      },
      {
        q: 'Do you offer service manuals?',
        a: 'Yes, we include a digital service manual (English translation) with every truck purchase. Manuals cover engine, transmission, 4WD system, electrical, and body. Physical printed manuals are available for $35.',
      },
    ],
  },
  {
    id: 'financing',
    label: 'Financing & Payment',
    icon: 'CreditCardIcon',
    items: [
      {
        q: 'What payment methods do you accept?',
        a: "We accept wire transfer, ACH bank transfer, cashier's check, and major credit cards (3% processing fee for cards). For trucks over $10,000, wire transfer or ACH is preferred. We do not accept personal checks.",
      },
      {
        q: 'Do you offer financing?',
        a: 'Yes, through our lending partners, we offer financing for qualified buyers. Terms range from 24–60 months with rates starting at 6.9% APR depending on credit. Use our Financing Calculator to estimate payments, then submit a pre-qualification application.',
      },
      {
        q: 'Is a deposit required to hold a truck?',
        a: 'A $500 refundable deposit holds any truck for up to 7 days while you arrange financing or transport. The deposit is applied to the purchase price. If you decide not to proceed, the deposit is fully refunded within 3 business days.',
      },
    ],
  },
];
