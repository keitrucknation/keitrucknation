import { NextResponse } from 'next/server';
import { INVENTORY } from '@/lib/inventory';
import { rateLimit, getClientIp, RATE_LIMITS } from '@/lib/rateLimit';

// Chassis prefix lookup database (same as VinLookupClient but server-side)
const CHASSIS_DB: Record<
  string,
  { make: string; model: string; engine: string; driveType: string; bodyType: string }
> = {
  ST90: {
    make: 'Suzuki',
    model: 'Carry',
    engine: 'ST90 550cc',
    driveType: '2WD',
    bodyType: 'Flatbed/Van',
  },
  ST20: {
    make: 'Suzuki',
    model: 'Carry',
    engine: 'LJ20 550cc',
    driveType: '4WD',
    bodyType: 'Flatbed',
  },
  DB52T: {
    make: 'Suzuki',
    model: 'Carry',
    engine: 'F6A 660cc SOHC',
    driveType: '2WD',
    bodyType: 'Flatbed/Dump',
  },
  DC52T: {
    make: 'Suzuki',
    model: 'Carry',
    engine: 'F6A 660cc SOHC',
    driveType: '4WD',
    bodyType: 'Flatbed/Dump',
  },
  DD51T: {
    make: 'Suzuki',
    model: 'Carry',
    engine: 'F6A 660cc SOHC',
    driveType: '4WD',
    bodyType: 'Flatbed/Dump',
  },
  DE51V: {
    make: 'Suzuki',
    model: 'Carry Van',
    engine: 'F6A 660cc',
    driveType: '2WD',
    bodyType: 'Van',
  },
  DF51V: {
    make: 'Suzuki',
    model: 'Carry Van',
    engine: 'F6A 660cc',
    driveType: '4WD',
    bodyType: 'Van',
  },
  DA62T: {
    make: 'Suzuki',
    model: 'Carry',
    engine: 'K6A 660cc DOHC',
    driveType: '2WD',
    bodyType: 'Flatbed/Dump',
  },
  DA62W: {
    make: 'Suzuki',
    model: 'Every',
    engine: 'K6A 660cc DOHC',
    driveType: '4WD',
    bodyType: 'Van/Wagon',
  },
  S65: {
    make: 'Daihatsu',
    model: 'Hijet',
    engine: 'EB 550cc',
    driveType: '2WD',
    bodyType: 'Flatbed',
  },
  S82P: {
    make: 'Daihatsu',
    model: 'Hijet',
    engine: 'EF 660cc',
    driveType: '2WD',
    bodyType: 'Flatbed',
  },
  S83P: {
    make: 'Daihatsu',
    model: 'Hijet',
    engine: 'EF 660cc',
    driveType: '4WD',
    bodyType: 'Flatbed',
  },
  S110P: {
    make: 'Daihatsu',
    model: 'Hijet',
    engine: 'EF-CS 660cc',
    driveType: '2WD',
    bodyType: 'Flatbed/Dump',
  },
  S210P: {
    make: 'Daihatsu',
    model: 'Hijet',
    engine: 'EF-VE 660cc DOHC',
    driveType: '2WD',
    bodyType: 'Flatbed/Dump',
  },
  S211P: {
    make: 'Daihatsu',
    model: 'Hijet',
    engine: 'EF-VE 660cc DOHC',
    driveType: '4WD',
    bodyType: 'Flatbed/Dump',
  },
  S500P: {
    make: 'Daihatsu',
    model: 'Hijet',
    engine: 'KF 660cc DOHC',
    driveType: '2WD',
    bodyType: 'Flatbed/Dump',
  },
  S510P: {
    make: 'Daihatsu',
    model: 'Hijet',
    engine: 'KF 660cc DOHC',
    driveType: '4WD',
    bodyType: 'Flatbed/Dump',
  },
  HA3: {
    make: 'Honda',
    model: 'Acty',
    engine: 'E07A 660cc',
    driveType: '2WD',
    bodyType: 'Flatbed',
  },
  HA4: {
    make: 'Honda',
    model: 'Acty',
    engine: 'E07A 660cc',
    driveType: '4WD',
    bodyType: 'Flatbed',
  },
  HA6: {
    make: 'Honda',
    model: 'Acty',
    engine: 'E07Z 660cc',
    driveType: '2WD',
    bodyType: 'Flatbed',
  },
  HA7: {
    make: 'Honda',
    model: 'Acty',
    engine: 'E07Z 660cc',
    driveType: '4WD',
    bodyType: 'Flatbed',
  },
  HH3: {
    make: 'Honda',
    model: 'Acty Van',
    engine: 'E07A 660cc',
    driveType: '2WD',
    bodyType: 'Van',
  },
  HH4: {
    make: 'Honda',
    model: 'Acty Van',
    engine: 'E07A 660cc',
    driveType: '4WD',
    bodyType: 'Van',
  },
  TT1: {
    make: 'Subaru',
    model: 'Sambar',
    engine: 'EN07 660cc',
    driveType: '2WD',
    bodyType: 'Flatbed',
  },
  TT2: {
    make: 'Subaru',
    model: 'Sambar',
    engine: 'EN07 660cc',
    driveType: '4WD',
    bodyType: 'Flatbed',
  },
  TV1: {
    make: 'Subaru',
    model: 'Sambar Van',
    engine: 'EN07 660cc',
    driveType: '2WD',
    bodyType: 'Van',
  },
  TV2: {
    make: 'Subaru',
    model: 'Sambar Van',
    engine: 'EN07 660cc',
    driveType: '4WD',
    bodyType: 'Van',
  },
  U41T: {
    make: 'Mitsubishi',
    model: 'Minicab',
    engine: '3G83 660cc',
    driveType: '2WD',
    bodyType: 'Flatbed',
  },
  U42T: {
    make: 'Mitsubishi',
    model: 'Minicab',
    engine: '3G83 660cc',
    driveType: '4WD',
    bodyType: 'Flatbed',
  },
  U61T: {
    make: 'Mitsubishi',
    model: 'Minicab',
    engine: '3G83 660cc DOHC',
    driveType: '2WD',
    bodyType: 'Flatbed',
  },
  U62T: {
    make: 'Mitsubishi',
    model: 'Minicab',
    engine: '3G83 660cc DOHC',
    driveType: '4WD',
    bodyType: 'Flatbed',
  },
};

function getYearFromChassis(chassis: string): {
  year: string;
  importEligible: boolean;
  eligibilityNote: string;
} {
  const upper = chassis.toUpperCase();
  if (upper.startsWith('DD51') || upper.startsWith('DE51') || upper.startsWith('DF51')) {
    return {
      year: '1991–1998',
      importEligible: true,
      eligibilityNote: 'Eligible - over 25 years old (25-year rule)',
    };
  }
  if (upper.startsWith('DB52') || upper.startsWith('DC52')) {
    return {
      year: '1991–1998',
      importEligible: true,
      eligibilityNote: 'Eligible - over 25 years old',
    };
  }
  if (upper.startsWith('DA62')) {
    return {
      year: '1999–2013',
      importEligible: true,
      eligibilityNote: 'Most units now eligible under 25-year rule',
    };
  }
  if (upper.startsWith('S82') || upper.startsWith('S83')) {
    return {
      year: '1986–1992',
      importEligible: true,
      eligibilityNote: 'Fully eligible - over 25 years old',
    };
  }
  if (upper.startsWith('S110')) {
    return {
      year: '1992–1998',
      importEligible: true,
      eligibilityNote: 'Eligible - over 25 years old',
    };
  }
  if (upper.startsWith('S210') || upper.startsWith('S211')) {
    return {
      year: '1998–2004',
      importEligible: true,
      eligibilityNote: 'Eligible - over 25 years old',
    };
  }
  if (upper.startsWith('S500') || upper.startsWith('S510')) {
    return {
      year: '2014–present',
      importEligible: false,
      eligibilityNote: 'Not yet eligible - under 25 years old',
    };
  }
  if (upper.startsWith('HA3') || upper.startsWith('HA4')) {
    return {
      year: '1990–1999',
      importEligible: true,
      eligibilityNote: 'Eligible - over 25 years old',
    };
  }
  if (upper.startsWith('HA6') || upper.startsWith('HA7')) {
    return {
      year: '1999–2009',
      importEligible: true,
      eligibilityNote: 'Most units now eligible under 25-year rule',
    };
  }
  if (upper.startsWith('TT1') || upper.startsWith('TT2')) {
    return {
      year: '1990–2012',
      importEligible: true,
      eligibilityNote: 'Eligible - over 25 years old',
    };
  }
  if (upper.startsWith('U41') || upper.startsWith('U42')) {
    return {
      year: '1991–1999',
      importEligible: true,
      eligibilityNote: 'Eligible - over 25 years old',
    };
  }
  if (upper.startsWith('U61') || upper.startsWith('U62')) {
    return {
      year: '1999–2014',
      importEligible: true,
      eligibilityNote: 'Most units now eligible under 25-year rule',
    };
  }
  return {
    year: 'Unknown',
    importEligible: false,
    eligibilityNote: 'Unable to determine eligibility from chassis code',
  };
}

export async function GET(request: Request) {
  const ip = getClientIp(request);
  const rl = rateLimit(`vin:${ip}`, RATE_LIMITS.vinLookup);

  if (!rl.success) {
    return NextResponse.json(
      { error: 'Too many requests', retryAfter: rl.retryAfter },
      { status: 429, headers: { 'Retry-After': String(rl.retryAfter ?? 60) } }
    );
  }

  const { searchParams } = new URL(request.url);
  const chassis = searchParams.get('chassis')?.trim().toUpperCase();

  if (!chassis) {
    return NextResponse.json({ error: 'chassis parameter is required' }, { status: 400 });
  }

  // Try exact match first
  let dbEntry = CHASSIS_DB[chassis];
  let matchedPrefix = chassis;

  // Try prefix match (e.g. "DD51T-123456" → "DD51T")
  if (!dbEntry) {
    for (const prefix of Object.keys(CHASSIS_DB)) {
      if (chassis.startsWith(prefix)) {
        dbEntry = CHASSIS_DB[prefix];
        matchedPrefix = prefix;
        break;
      }
    }
  }

  if (!dbEntry) {
    return NextResponse.json(
      { error: 'Chassis code not found in database', chassis },
      { status: 404 }
    );
  }

  const yearInfo = getYearFromChassis(matchedPrefix);

  // Check if we have a matching truck in inventory
  const inventoryMatch = INVENTORY.find((t) => t.chassisCode?.toUpperCase() === matchedPrefix);

  return NextResponse.json({
    chassis,
    matchedPrefix,
    ...dbEntry,
    ...yearInfo,
    inventoryMatch: inventoryMatch
      ? {
          id: inventoryMatch.id,
          slug: inventoryMatch.slug,
          name: inventoryMatch.name,
          price: inventoryMatch.price,
          mileage: inventoryMatch.mileage,
          image: inventoryMatch.image,
          imageAlt: inventoryMatch.imageAlt,
          inStock: inventoryMatch.inStock,
        }
      : null,
  });
}
