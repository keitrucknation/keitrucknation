/**
 * AEO/GEO Structured Data helpers for AI search engine optimization.
 * Generates JSON-LD schemas for FAQ, HowTo, Product, and Vehicle entities.
 */

export function faqSchema(faqs: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(({ question, answer }) => ({
      '@type': 'Question',
      name: question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: answer,
      },
    })),
  };
}

export function howToSchema(
  steps: { name: string; text: string }[],
  name: string,
  description: string
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name,
    description,
    step: steps.map((step, i) => ({
      '@type': 'HowToStep',
      position: i + 1,
      name: step.name,
      text: step.text,
    })),
  };
}

export function vehicleSchema(vehicle: {
  name: string;
  description: string;
  brand: string;
  modelDate: string;
  mileageValue: number;
  price: number;
  currency?: string;
  image?: string;
  url?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Vehicle',
    name: vehicle.name,
    description: vehicle.description,
    brand: { '@type': 'Brand', name: vehicle.brand },
    modelDate: vehicle.modelDate,
    mileageFromOdometer: {
      '@type': 'QuantitativeValue',
      value: vehicle.mileageValue,
      unitCode: 'KMT',
    },
    offers: {
      '@type': 'Offer',
      price: vehicle.price,
      priceCurrency: vehicle.currency || 'USD',
      availability: 'https://schema.org/InStock',
      url: vehicle.url,
    },
    image: vehicle.image,
  };
}

export function localBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'AutoDealer',
    name: 'KeiTruckNation',
    description:
      'Authentic imported Japanese kei trucks and genuine parts. Serving farmers, contractors, and off-road enthusiasts across the USA.',
    url: process.env.NEXT_PUBLIC_SITE_URL || 'https://keitrucknation.com',
    logo: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://keitrucknation.com'}/assets/images/app_logo.png`,
    priceRange: '$$$',
    areaServed: {
      '@type': 'Country',
      name: 'United States',
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Japanese Kei Trucks',
      itemListElement: [
        { '@type': 'Offer', itemOffered: { '@type': 'Vehicle', name: 'Suzuki Carry 4WD' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Vehicle', name: 'Daihatsu Hijet Jumbo' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Vehicle', name: 'Honda Acty SDX' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Vehicle', name: 'Subaru Sambar' } },
      ],
    },
    knowsAbout: [
      'Japanese kei trucks',
      'JDM vehicle imports',
      '25-year import rule',
      'Kei truck street legality by state',
      'Japanese mini truck parts',
      'Farm utility vehicles',
    ],
  };
}
