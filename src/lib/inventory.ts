/**
 * Centralized inventory data - single source of truth for all truck data.
 * Used by API routes, pages, cart, wishlist, VIN lookup, and compare.
 */

export type Drivetrain = '2WD' | '4WD' | 'AWD';
export type TruckCategory =
  | 'flatbed'
  | 'dump'
  | 'box-van'
  | 'stake-side'
  | 'crew-cab'
  | 'refrigerated'
  | 'specialty';

export interface InventoryTruck {
  id: string;
  slug: string;
  name: string;
  year: string;
  make: string;
  price: number;
  mileage: string;
  drivetrain: Drivetrain;
  category: TruckCategory;
  specs: string[];
  image: string;
  imageAlt: string;
  badge?: string;
  badgeColor?: 'primary' | 'accent';
  description: string;
  highlights: string[];
  detailSpecs: { label: string; value: string }[];
  gallery: { src: string; alt: string }[];
  vin?: string;
  chassisCode?: string;
  location: string;
  inStock: boolean;
}

export const INVENTORY: InventoryTruck[] = [
  // ── FLATBED ──────────────────────────────────────────────────────────────
  {
    id: 'fb-1',
    slug: 'carry-flatbed-4wd',
    name: 'Carry Flatbed',
    year: '1999',
    make: 'Suzuki',
    price: 5995,
    mileage: '48,000 km',
    drivetrain: '4WD',
    category: 'flatbed',
    specs: ['660cc 3-cyl', '4WD', 'Open Flatbed', '5-Speed Manual'],
    image: 'https://img.rocket.new/generatedImages/rocket_gen_img_1cb7c54f0-1787425234353.png',
    imageAlt: 'Suzuki Carry flatbed kei truck parked on gravel road',
    badge: 'Great Value',
    description:
      'A clean 1999 Suzuki Carry flatbed with 4WD and only 48,000 km. The classic workhorse of Japanese farms - reliable F6A engine, true 4WD with Hi/Lo, and an open flatbed ready for any job.',
    highlights: [
      'True 4WD with Hi/Lo transfer case',
      'Only 48,000 km on the clock',
      'Open flatbed - maximum versatility',
      'F6A engine with wide US parts availability',
    ],

    detailSpecs: [
      { label: 'Engine', value: '660cc F6A 3-cylinder SOHC' },
      { label: 'Transmission', value: '5-Speed Manual' },
      { label: 'Drive', value: '4WD with Hi/Lo' },
      { label: 'Bed Type', value: 'Open Flatbed' },
      { label: 'Mileage', value: '48,000 km (~30,000 mi)' },
      { label: 'Fuel', value: 'Gasoline' },
      { label: 'Year', value: '1999' },
      { label: 'Condition', value: 'Good, Grade 3.5' },
    ],

    gallery: [
      {
        src: 'https://img.rocket.new/generatedImages/rocket_gen_img_118ae7493-1787425234361.png',
        alt: 'Suzuki Carry flatbed side view',
      },
      {
        src: 'https://img.rocket.new/generatedImages/rocket_gen_img_1ceebb1e2-1768383264043.png',
        alt: 'Kei truck flatbed bed detail',
      },
    ],

    chassisCode: 'DD51T',
    location: 'Port of Los Angeles, CA',
    inStock: true,
  },
  {
    id: 'fb-2',
    slug: 'hijet-flatbed-4wd',
    name: 'Hijet Flatbed',
    year: '2001',
    make: 'Daihatsu',
    price: 6495,
    mileage: '39,000 km',
    drivetrain: '4WD',
    category: 'flatbed',
    specs: ['660cc EFI', '4WD Hi-Lo', 'Flatbed', 'Power Steering'],
    image: 'https://img.rocket.new/generatedImages/rocket_gen_img_1ceebb1e2-1768383264043.png',
    imageAlt: 'Daihatsu Hijet flatbed truck in open field',
    description:
      'A 2001 Daihatsu Hijet flatbed with power steering and 4WD Hi-Lo. EFI engine runs clean, power steering makes it easy to maneuver on tight farm roads.',
    highlights: [
      'Power steering - rare on kei trucks',
      '4WD Hi-Lo for serious off-road use',
      'EFI engine for reliable cold starts',
      'Only 39,000 km',
    ],

    detailSpecs: [
      { label: 'Engine', value: '660cc EF-VE DOHC EFI' },
      { label: 'Transmission', value: '5-Speed Manual' },
      { label: 'Drive', value: '4WD Hi-Lo' },
      { label: 'Bed Type', value: 'Open Flatbed' },
      { label: 'Mileage', value: '39,000 km (~24,000 mi)' },
      { label: 'Power Steering', value: 'Yes' },
      { label: 'Year', value: '2001' },
      { label: 'Condition', value: 'Excellent, Grade 4' },
    ],

    gallery: [
      {
        src: 'https://img.rocket.new/generatedImages/rocket_gen_img_184717db2-1772981110420.png',
        alt: 'Daihatsu Hijet flatbed in field',
      },
    ],

    chassisCode: 'S211P',
    location: 'Port of Seattle, WA',
    inStock: true,
  },
  {
    id: 'fb-3',
    slug: 'acty-flatbed-2wd',
    name: 'Acty Flatbed',
    year: '2003',
    make: 'Honda',
    price: 7200,
    mileage: '31,000 km',
    drivetrain: '2WD',
    category: 'flatbed',
    specs: ['660cc SOHC', '2WD', 'Flatbed', 'A/C'],
    image: 'https://images.unsplash.com/photo-1714107891205-6bfdf001e5e8',
    imageAlt: 'Honda Acty flatbed kei truck on paved road',
    badge: 'Low Mileage',
    description:
      'A 2003 Honda Acty flatbed with A/C and only 31,000 km. Honda reliability in a compact package - great for light farm work, landscaping, or property maintenance.',
    highlights: [
      'Air conditioning - comfort on the job',
      'Only 31,000 km - exceptionally low',
      'Honda E07Z engine - known for longevity',
      'Smooth 2WD for flat terrain and paved roads',
    ],

    detailSpecs: [
      { label: 'Engine', value: '660cc E07Z SOHC' },
      { label: 'Transmission', value: '5-Speed Manual' },
      { label: 'Drive', value: '2WD' },
      { label: 'Bed Type', value: 'Open Flatbed' },
      { label: 'Mileage', value: '31,000 km (~19,000 mi)' },
      { label: 'A/C', value: 'Yes' },
      { label: 'Year', value: '2003' },
      { label: 'Condition', value: 'Excellent, Grade 4.5' },
    ],

    gallery: [
      {
        src: 'https://images.unsplash.com/photo-1714107891205-6bfdf001e5e8',
        alt: 'Honda Acty flatbed on paved road',
      },
    ],

    chassisCode: 'HA6',
    location: 'Port of Long Beach, CA',
    inStock: true,
  },

  // ── DUMP ─────────────────────────────────────────────────────────────────
  {
    id: 'dp-1',
    slug: 'carry-dump-4wd',
    name: 'Carry Dump 4WD',
    year: '1998',
    make: 'Suzuki',
    price: 7495,
    mileage: '42,000 km',
    drivetrain: '4WD',
    category: 'dump',
    specs: ['660cc 3-cyl', '4WD', 'Hydraulic Dump', '5-Speed Manual'],
    image: 'https://images.unsplash.com/photo-1697396248143-e6fa96564d35',
    imageAlt: 'Suzuki Carry dump truck with raised hydraulic bed',
    badge: 'Best Seller',
    badgeColor: 'primary',
    description:
      "This 1998 Suzuki Carry Dump 4WD is one of the most capable kei trucks we've imported. With a hydraulic dump bed, true 4WD, and only 42,000 km on the clock, it's ready to work a farm, haul materials, or tackle rough terrain right off the trailer.",
    highlights: [
      'Hydraulic dump bed: no manual lifting',
      'True 4WD with Hi/Lo transfer case',
      'Only 42,000 km, well under average',
      'Rust-free undercarriage, inspected in Japan',
      'Eligible for road use in most US states',
    ],

    detailSpecs: [
      { label: 'Engine', value: '660cc F6A 3-cylinder SOHC' },
      { label: 'Transmission', value: '5-Speed Manual' },
      { label: 'Drive', value: '4WD with Hi/Lo' },
      { label: 'Bed Type', value: 'Hydraulic Dump' },
      { label: 'Mileage', value: '42,000 km (~26,000 mi)' },
      { label: 'Fuel', value: 'Gasoline' },
      { label: 'Payload', value: '350 kg (770 lbs)' },
      { label: 'Dimensions', value: '134" L x 55" W x 67" H' },
      { label: 'Tires', value: '145R12LT (Original)' },
      { label: 'Color', value: 'White' },
      { label: 'Year', value: '1998' },
      { label: 'Condition', value: 'Excellent, Grade 4' },
    ],

    gallery: [
      {
        src: 'https://images.unsplash.com/photo-1720236178658-ef1edfa8ac68',
        alt: 'Suzuki Carry Dump 4WD side profile on rural road',
      },
      {
        src: 'https://img.rocket.new/generatedImages/rocket_gen_img_197db2f25-1787425233186.png',
        alt: 'Dump bed raised showing hydraulic mechanism',
      },
    ],

    chassisCode: 'DD51T',
    vin: 'DD51T-123456',
    location: 'Port of Los Angeles, CA',
    inStock: true,
  },
  {
    id: 'dp-2',
    slug: 'hijet-dump-4wd',
    name: 'Hijet Dump',
    year: '2000',
    make: 'Daihatsu',
    price: 8200,
    mileage: '35,000 km',
    drivetrain: '4WD',
    category: 'dump',
    specs: ['660cc EFI', '4WD Hi-Lo', 'Dump Bed', 'Power Steering'],
    image: 'https://images.unsplash.com/photo-1725529639760-0707dd7b0a75',
    imageAlt: 'Daihatsu Hijet dump truck with hydraulic lift',
    description:
      'A 2000 Daihatsu Hijet dump with power steering and 4WD Hi-Lo. EFI engine, hydraulic dump bed, and only 35,000 km make this one of the best-value dump trucks in our inventory.',
    highlights: [
      'Hydraulic dump bed',
      'Power steering for easy maneuvering',
      '4WD Hi-Lo transfer case',
      'EFI engine - reliable cold starts',
    ],

    detailSpecs: [
      { label: 'Engine', value: '660cc EF-VE DOHC EFI' },
      { label: 'Transmission', value: '5-Speed Manual' },
      { label: 'Drive', value: '4WD Hi-Lo' },
      { label: 'Bed Type', value: 'Hydraulic Dump' },
      { label: 'Mileage', value: '35,000 km (~22,000 mi)' },
      { label: 'Power Steering', value: 'Yes' },
      { label: 'Year', value: '2000' },
      { label: 'Condition', value: 'Excellent, Grade 4' },
    ],

    gallery: [
      {
        src: 'https://img.rocket.new/generatedImages/rocket_gen_img_1055f8843-1787425184016.png',
        alt: 'Daihatsu Hijet dump truck',
      },
    ],

    chassisCode: 'S211P',
    location: 'Port of Seattle, WA',
    inStock: true,
  },
  {
    id: 'dp-3',
    slug: 'minicab-dump-4wd',
    name: 'Minicab Dump',
    year: '2002',
    make: 'Mitsubishi',
    price: 7900,
    mileage: '44,000 km',
    drivetrain: '4WD',
    category: 'dump',
    specs: ['660cc Turbo', '4WD', 'Dump Bed', 'Low Range'],
    image: 'https://images.unsplash.com/photo-1725686245412-c2d068aa9864',
    imageAlt: 'Mitsubishi Minicab dump truck on construction site',
    description:
      'A 2002 Mitsubishi Minicab Dump with a turbocharged 660cc engine and 4WD. The turbo gives it extra pulling power for heavy loads - ideal for construction sites and gravel hauling.',
    highlights: [
      'Turbocharged engine for extra power',
      '4WD with low range',
      'Hydraulic dump bed',
      'Mitsubishi 3G83 engine - proven reliability',
    ],

    detailSpecs: [
      { label: 'Engine', value: '660cc 3G83 Turbo' },
      { label: 'Transmission', value: '5-Speed Manual' },
      { label: 'Drive', value: '4WD with Low Range' },
      { label: 'Bed Type', value: 'Hydraulic Dump' },
      { label: 'Mileage', value: '44,000 km (~27,000 mi)' },
      { label: 'Year', value: '2002' },
      { label: 'Condition', value: 'Good, Grade 3.5' },
    ],

    gallery: [
      {
        src: 'https://images.unsplash.com/photo-1725686245412-c2d068aa9864',
        alt: 'Mitsubishi Minicab dump on construction site',
      },
    ],

    chassisCode: 'U62T',
    location: 'Port of Houston, TX',
    inStock: true,
  },

  // ── BOX VAN ───────────────────────────────────────────────────────────────
  {
    id: 'bv-1',
    slug: 'acty-van-2wd',
    name: 'Acty Van',
    year: '2004',
    make: 'Honda',
    price: 6800,
    mileage: '29,000 km',
    drivetrain: '2WD',
    category: 'box-van',
    specs: ['660cc SOHC', '2WD', 'Panel Van', 'Sliding Door'],
    image: 'https://img.rocket.new/generatedImages/rocket_gen_img_19b730fec-1787425183833.png',
    imageAlt: 'Honda Acty panel van with sliding side door',
    badge: 'Low Mileage',
    description:
      'A 2004 Honda Acty Van with only 29,000 km. Sliding side door, enclosed cargo area, and Honda reliability make this perfect for delivery, mobile business, or protected cargo hauling.',
    highlights: [
      'Only 29,000 km - exceptionally low',
      'Sliding side door for easy loading',
      'Fully enclosed cargo area',
      'Honda E07Z engine',
    ],

    detailSpecs: [
      { label: 'Engine', value: '660cc E07Z SOHC' },
      { label: 'Transmission', value: '5-Speed Manual' },
      { label: 'Drive', value: '2WD' },
      { label: 'Body', value: 'Panel Van' },
      { label: 'Mileage', value: '29,000 km (~18,000 mi)' },
      { label: 'Sliding Door', value: 'Yes' },
      { label: 'Year', value: '2004' },
      { label: 'Condition', value: 'Excellent, Grade 4.5' },
    ],

    gallery: [
      {
        src: 'https://img.rocket.new/generatedImages/rocket_gen_img_1c80fb92d-1787425184274.png',
        alt: 'Honda Acty panel van sliding door',
      },
    ],

    chassisCode: 'HH4',
    location: 'Port of Long Beach, CA',
    inStock: true,
  },
  {
    id: 'bv-2',
    slug: 'hijet-cargo-4wd',
    name: 'Hijet Cargo',
    year: '2005',
    make: 'Daihatsu',
    price: 7400,
    mileage: '24,000 km',
    drivetrain: '4WD',
    category: 'box-van',
    specs: ['660cc EFI', '4WD', 'Cargo Van', 'A/C'],
    image: 'https://img.rocket.new/generatedImages/rocket_gen_img_1621895b3-1787425234754.png',
    imageAlt: 'Daihatsu Hijet cargo van in white',
    badge: 'Just Arrived',
    description:
      'A 2005 Daihatsu Hijet Cargo with 4WD and A/C. Only 24,000 km - one of the lowest mileage vans in our inventory. Perfect for year-round delivery in any weather.',
    highlights: [
      'Only 24,000 km - near-new condition',
      'Air conditioning',
      '4WD for all-weather delivery',
      'EFI engine for fuel efficiency',
    ],

    detailSpecs: [
      { label: 'Engine', value: '660cc EF-VE DOHC EFI' },
      { label: 'Transmission', value: '5-Speed Manual' },
      { label: 'Drive', value: '4WD' },
      { label: 'Body', value: 'Cargo Van' },
      { label: 'Mileage', value: '24,000 km (~15,000 mi)' },
      { label: 'A/C', value: 'Yes' },
      { label: 'Year', value: '2005' },
      { label: 'Condition', value: 'Excellent, Grade 4.5' },
    ],

    gallery: [
      {
        src: 'https://img.rocket.new/generatedImages/rocket_gen_img_1a9057304-1772629787068.png',
        alt: 'Daihatsu Hijet cargo van',
      },
    ],

    chassisCode: 'S510P',
    location: 'Port of Seattle, WA',
    inStock: true,
  },
  {
    id: 'bv-3',
    slug: 'sambar-van-awd',
    name: 'Sambar Van',
    year: '2006',
    make: 'Subaru',
    price: 8100,
    mileage: '21,000 km',
    drivetrain: 'AWD',
    category: 'box-van',
    specs: ['EN07 4-cyl', 'AWD', 'Box Van', 'Power Windows'],
    image: 'https://img.rocket.new/generatedImages/rocket_gen_img_1f0d50d4f-1787425235451.png',
    imageAlt: 'Subaru Sambar box van on suburban street',
    description:
      'A 2006 Subaru Sambar Van with AWD and power windows. The EN07 4-cylinder engine and Subaru AWD system make this one of the most capable enclosed vans we carry.',
    highlights: [
      'Subaru AWD - superior traction',
      'Power windows',
      'Only 21,000 km',
      'EN07 4-cylinder - smooth and reliable',
    ],

    detailSpecs: [
      { label: 'Engine', value: 'EN07 660cc 4-cylinder' },
      { label: 'Transmission', value: '5-Speed Manual' },
      { label: 'Drive', value: 'AWD' },
      { label: 'Body', value: 'Box Van' },
      { label: 'Mileage', value: '21,000 km (~13,000 mi)' },
      { label: 'Power Windows', value: 'Yes' },
      { label: 'Year', value: '2006' },
      { label: 'Condition', value: 'Excellent, Grade 4.5' },
    ],

    gallery: [
      {
        src: 'https://images.unsplash.com/photo-1676185980245-28af6b659e64',
        alt: 'Subaru Sambar box van',
      },
    ],

    chassisCode: 'TV2',
    location: 'Port of Los Angeles, CA',
    inStock: true,
  },

  // ── STAKE-SIDE ────────────────────────────────────────────────────────────
  {
    id: 'ss-1',
    slug: 'carry-stake-4wd',
    name: 'Carry Stake',
    year: '2000',
    make: 'Suzuki',
    price: 6200,
    mileage: '51,000 km',
    drivetrain: '4WD',
    category: 'stake-side',
    specs: ['660cc 3-cyl', '4WD', 'Stake Sides', 'Removable Rails'],
    image: 'https://images.unsplash.com/photo-1697396248143-e6fa96564d35',
    imageAlt: 'Suzuki Carry with stake side rails on flatbed',
    description:
      'A 2000 Suzuki Carry with stake sides and 4WD. Removable rails give you the flexibility of an open flatbed or a contained stake bed - perfect for farm produce, lumber, or mixed loads.',
    highlights: [
      'Removable stake rails - versatile configuration',
      '4WD for farm and off-road use',
      'F6A engine with proven reliability',
    ],

    detailSpecs: [
      { label: 'Engine', value: '660cc F6A 3-cylinder SOHC' },
      { label: 'Transmission', value: '5-Speed Manual' },
      { label: 'Drive', value: '4WD' },
      { label: 'Bed Type', value: 'Stake-Side Flatbed' },
      { label: 'Mileage', value: '51,000 km (~32,000 mi)' },
      { label: 'Year', value: '2000' },
      { label: 'Condition', value: 'Good, Grade 3.5' },
    ],

    gallery: [
      {
        src: 'https://images.unsplash.com/photo-1720236178658-ef1edfa8ac68',
        alt: 'Suzuki Carry stake side flatbed',
      },
    ],

    chassisCode: 'DD51T',
    location: 'Port of Los Angeles, CA',
    inStock: true,
  },
  {
    id: 'ss-2',
    slug: 'hijet-stake-4wd',
    name: 'Hijet Stake',
    year: '2001',
    make: 'Daihatsu',
    price: 6700,
    mileage: '43,000 km',
    drivetrain: '4WD',
    category: 'stake-side',
    specs: ['660cc EFI', '4WD', 'Stake Sides', 'Low Range'],
    image: 'https://img.rocket.new/generatedImages/rocket_gen_img_165084c58-1787425182766.png',
    imageAlt: 'Daihatsu Hijet stake-side truck on farm',
    description:
      'A 2001 Daihatsu Hijet with stake sides, 4WD, and low range. EFI engine and removable rails make this a versatile farm truck.',
    highlights: [
      'Stake sides with low range 4WD',
      'EFI engine for reliable starts',
      'Removable rails for open flatbed use',
    ],

    detailSpecs: [
      { label: 'Engine', value: '660cc EF-VE DOHC EFI' },
      { label: 'Transmission', value: '5-Speed Manual' },
      { label: 'Drive', value: '4WD with Low Range' },
      { label: 'Bed Type', value: 'Stake-Side Flatbed' },
      { label: 'Mileage', value: '43,000 km (~27,000 mi)' },
      { label: 'Year', value: '2001' },
      { label: 'Condition', value: 'Good, Grade 3.5' },
    ],

    gallery: [
      {
        src: 'https://images.unsplash.com/photo-1635553151546-b27a922ae62e',
        alt: 'Daihatsu Hijet stake side on farm',
      },
    ],

    chassisCode: 'S211P',
    location: 'Port of Seattle, WA',
    inStock: true,
  },

  // ── CREW CAB ──────────────────────────────────────────────────────────────
  {
    id: 'cc-1',
    slug: 'hijet-jumbo-4wd',
    name: 'Hijet Jumbo',
    year: '2002',
    make: 'Daihatsu',
    price: 8950,
    mileage: '36,500 km',
    drivetrain: '4WD',
    category: 'crew-cab',
    specs: ['660cc EFI', '4WD Hi-Lo', 'Extended Cab', 'Power Steering'],
    image: 'https://img.rocket.new/generatedImages/rocket_gen_img_1d6fd3738-1787425183365.png',
    imageAlt: 'Daihatsu Hijet Jumbo extended cab kei truck',
    badge: 'Just Arrived',
    description:
      'The 2002 Daihatsu Hijet Jumbo is the extended-cab version of the iconic Hijet. Extra rear seating, 4WD Hi-Lo, and power steering make this the go-to truck for small teams.',
    highlights: [
      'Extended cab with rear seating',
      '4WD Hi-Lo for serious terrain',
      'Power steering',
      'EFI engine for fuel efficiency',
    ],

    detailSpecs: [
      { label: 'Engine', value: '660cc EF-VE DOHC EFI' },
      { label: 'Transmission', value: '5-Speed Manual' },
      { label: 'Drive', value: '4WD Hi-Lo' },
      { label: 'Cab', value: 'Extended Cab' },
      { label: 'Mileage', value: '36,500 km (~23,000 mi)' },
      { label: 'Power Steering', value: 'Yes' },
      { label: 'Year', value: '2002' },
      { label: 'Condition', value: 'Excellent, Grade 4' },
    ],

    gallery: [
      {
        src: 'https://img.rocket.new/generatedImages/rocket_gen_img_107c504e2-1787425182743.png',
        alt: 'Daihatsu Hijet Jumbo extended cab',
      },
    ],

    chassisCode: 'S211P',
    location: 'Port of Los Angeles, CA',
    inStock: true,
  },
  {
    id: 'cc-2',
    slug: 'carry-double-cab-4wd',
    name: 'Carry Double Cab',
    year: '2003',
    make: 'Suzuki',
    price: 9400,
    mileage: '28,000 km',
    drivetrain: '4WD',
    category: 'crew-cab',
    specs: ['660cc Turbo', '4WD', 'Double Cab', 'A/C'],
    image: 'https://images.unsplash.com/photo-1720236178658-ef1edfa8ac68',
    imageAlt: 'Suzuki Carry double cab crew truck',
    badge: 'Premium',
    description:
      'A 2003 Suzuki Carry Double Cab with a turbocharged engine, 4WD, and A/C. The turbo adds power for hauling while the double cab seats your whole crew.',
    highlights: [
      'Turbocharged engine for extra power',
      'Double cab - seats 4',
      'Air conditioning',
      '4WD for all terrain',
    ],

    detailSpecs: [
      { label: 'Engine', value: '660cc K6A Turbo DOHC' },
      { label: 'Transmission', value: '5-Speed Manual' },
      { label: 'Drive', value: '4WD' },
      { label: 'Cab', value: 'Double Cab' },
      { label: 'Mileage', value: '28,000 km (~17,000 mi)' },
      { label: 'A/C', value: 'Yes' },
      { label: 'Year', value: '2003' },
      { label: 'Condition', value: 'Excellent, Grade 4.5' },
    ],

    gallery: [
      {
        src: 'https://images.unsplash.com/photo-1720236178658-ef1edfa8ac68',
        alt: 'Suzuki Carry double cab crew truck',
      },
    ],

    chassisCode: 'DA62T',
    location: 'Port of Long Beach, CA',
    inStock: true,
  },
  {
    id: 'cc-3',
    slug: 'sambar-tc-awd',
    name: 'Sambar TC',
    year: '2005',
    make: 'Subaru',
    price: 9200,
    mileage: '28,000 km',
    drivetrain: 'AWD',
    category: 'crew-cab',
    specs: ['EN07 4-cyl', 'AWD', 'High-Low 4WD', 'A/C'],
    image: 'https://images.unsplash.com/photo-1720236178658-ef1edfa8ac68',
    imageAlt: 'Subaru Sambar TC crew cab on mountain road',
    description:
      'A 2005 Subaru Sambar TC crew cab with AWD and A/C. Subaru AWD and the EN07 4-cylinder make this the most capable crew cab in our lineup.',
    highlights: [
      'Subaru AWD - best-in-class traction',
      'A/C for year-round comfort',
      'EN07 4-cylinder engine',
      'Crew cab seating',
    ],

    detailSpecs: [
      { label: 'Engine', value: 'EN07 660cc 4-cylinder' },
      { label: 'Transmission', value: '5-Speed Manual' },
      { label: 'Drive', value: 'AWD with Hi-Lo' },
      { label: 'Cab', value: 'Crew Cab' },
      { label: 'Mileage', value: '28,000 km (~17,000 mi)' },
      { label: 'A/C', value: 'Yes' },
      { label: 'Year', value: '2005' },
      { label: 'Condition', value: 'Excellent, Grade 4' },
    ],

    gallery: [
      {
        src: 'https://images.unsplash.com/photo-1720236178658-ef1edfa8ac68',
        alt: 'Subaru Sambar TC crew cab',
      },
    ],

    chassisCode: 'TT2',
    location: 'Port of Seattle, WA',
    inStock: true,
  },

  // ── REFRIGERATED ──────────────────────────────────────────────────────────
  {
    id: 'rf-1',
    slug: 'hijet-reefer-2wd',
    name: 'Hijet Reefer',
    year: '2003',
    make: 'Daihatsu',
    price: 9800,
    mileage: '33,000 km',
    drivetrain: '2WD',
    category: 'refrigerated',
    specs: ['660cc EFI', '2WD', 'Insulated Box', 'Reefer Unit'],
    image: 'https://img.rocket.new/generatedImages/rocket_gen_img_12844fbe7-1787425184517.png',
    imageAlt: 'Daihatsu Hijet refrigerated delivery truck',
    description:
      'A 2003 Daihatsu Hijet Reefer with an insulated box body and refrigeration unit. Perfect for food vendors, caterers, and anyone needing temperature-controlled transport.',
    highlights: [
      'Active refrigeration unit',
      'Insulated box body',
      'EFI engine for fuel efficiency',
      'Only 33,000 km',
    ],

    detailSpecs: [
      { label: 'Engine', value: '660cc EF-VE DOHC EFI' },
      { label: 'Transmission', value: '5-Speed Manual' },
      { label: 'Drive', value: '2WD' },
      { label: 'Body', value: 'Insulated Reefer Box' },
      { label: 'Mileage', value: '33,000 km (~21,000 mi)' },
      { label: 'Reefer Unit', value: 'Yes - operational' },
      { label: 'Year', value: '2003' },
      { label: 'Condition', value: 'Good, Grade 3.5' },
    ],

    gallery: [
      {
        src: 'https://img.rocket.new/generatedImages/rocket_gen_img_14c58d04c-1787425183499.png',
        alt: 'Daihatsu Hijet refrigerated truck',
      },
    ],

    chassisCode: 'S211P',
    location: 'Port of Los Angeles, CA',
    inStock: true,
  },
  {
    id: 'rf-2',
    slug: 'acty-insulated-2wd',
    name: 'Acty Insulated',
    year: '2004',
    make: 'Honda',
    price: 8600,
    mileage: '27,000 km',
    drivetrain: '2WD',
    category: 'refrigerated',
    specs: ['660cc SOHC', '2WD', 'Insulated Van', 'Temp Control'],
    image: 'https://img.rocket.new/generatedImages/rocket_gen_img_1e29805e3-1787425184053.png',
    imageAlt: 'Honda Acty insulated box van for food delivery',
    description:
      'A 2004 Honda Acty insulated van with temperature control. Honda reliability and a well-insulated cargo area make this ideal for food delivery and catering.',
    highlights: [
      'Temperature-controlled cargo area',
      'Honda E07Z engine',
      'Only 27,000 km',
      'Insulated walls and floor',
    ],

    detailSpecs: [
      { label: 'Engine', value: '660cc E07Z SOHC' },
      { label: 'Transmission', value: '5-Speed Manual' },
      { label: 'Drive', value: '2WD' },
      { label: 'Body', value: 'Insulated Van' },
      { label: 'Mileage', value: '27,000 km (~17,000 mi)' },
      { label: 'Temp Control', value: 'Yes' },
      { label: 'Year', value: '2004' },
      { label: 'Condition', value: 'Good, Grade 3.5' },
    ],

    gallery: [
      {
        src: 'https://img.rocket.new/generatedImages/rocket_gen_img_17bb2a5c8-1772091989816.png',
        alt: 'Honda Acty insulated van',
      },
    ],

    chassisCode: 'HH4',
    location: 'Port of Long Beach, CA',
    inStock: true,
  },

  // ── SPECIALTY ─────────────────────────────────────────────────────────────
  {
    id: 'sp-1',
    slug: 'mini-fire-engine',
    name: 'Mini Fire Engine',
    year: '1997',
    make: 'Suzuki',
    price: 11500,
    mileage: '18,000 km',
    drivetrain: '4WD',
    category: 'specialty',
    specs: ['660cc', '4WD', 'Decommissioned Fire Truck', 'Pump Intact'],
    image: 'https://images.unsplash.com/photo-1705264897435-57b9236eae43',
    imageAlt: 'Miniature red Japanese kei fire truck with ladder',
    badge: 'Fan Favorite',
    description:
      'A decommissioned 1997 Japanese kei fire truck with only 18,000 km. The pump is intact and the red paint is original. A true conversation piece that also works as a farm utility vehicle.',
    highlights: [
      'Original red paint - stunning condition',
      'Only 18,000 km - exceptionally low',
      'Pump mechanism intact',
      '4WD for off-road access',
    ],

    detailSpecs: [
      { label: 'Engine', value: '660cc F6A 3-cylinder' },
      { label: 'Transmission', value: '5-Speed Manual' },
      { label: 'Drive', value: '4WD' },
      { label: 'Body', value: 'Decommissioned Fire Truck' },
      { label: 'Mileage', value: '18,000 km (~11,000 mi)' },
      { label: 'Pump', value: 'Intact (decommissioned)' },
      { label: 'Year', value: '1997' },
      { label: 'Condition', value: 'Excellent, Grade 4' },
    ],

    gallery: [
      {
        src: 'https://img.rocket.new/generatedImages/rocket_gen_img_111e61420-1787425183406.png',
        alt: 'Miniature red kei fire truck',
      },
    ],

    chassisCode: 'DD51T',
    location: 'Port of Los Angeles, CA',
    inStock: true,
  },
  {
    id: 'sp-2',
    slug: 'food-truck-conversion',
    name: 'Food Truck Conversion',
    year: '2001',
    make: 'Daihatsu',
    price: 13200,
    mileage: '41,000 km',
    drivetrain: '2WD',
    category: 'specialty',
    specs: ['660cc EFI', '2WD', 'Food Truck Build', 'Serving Window'],
    image: 'https://images.unsplash.com/photo-1682956539357-dcd686bb2901',
    imageAlt: 'Japanese kei truck converted into a food truck with serving window',
    description:
      'A 2001 Daihatsu Hijet converted into a fully equipped food truck. Serving window, interior prep space, and a clean EFI engine make this ready for your mobile food business.',
    highlights: [
      'Serving window installed',
      'Interior prep space',
      'EFI engine for fuel efficiency',
      'Turn-key food truck setup',
    ],

    detailSpecs: [
      { label: 'Engine', value: '660cc EF-VE DOHC EFI' },
      { label: 'Transmission', value: '5-Speed Manual' },
      { label: 'Drive', value: '2WD' },
      { label: 'Body', value: 'Food Truck Conversion' },
      { label: 'Mileage', value: '41,000 km (~25,000 mi)' },
      { label: 'Serving Window', value: 'Yes' },
      { label: 'Year', value: '2001' },
      { label: 'Condition', value: 'Good, Grade 3.5' },
    ],

    gallery: [
      {
        src: 'https://img.rocket.new/generatedImages/rocket_gen_img_1dc0b5ce2-1787425184059.png',
        alt: 'Kei food truck with serving window',
      },
    ],

    chassisCode: 'S211P',
    location: 'Port of Houston, TX',
    inStock: true,
  },
  {
    id: 'sp-3',
    slug: 'camper-conversion-4wd',
    name: 'Camper Conversion',
    year: '2000',
    make: 'Honda',
    price: 14800,
    mileage: '52,000 km',
    drivetrain: '4WD',
    category: 'specialty',
    specs: ['660cc SOHC', '4WD', 'Camper Build', 'Sleeping Quarters'],
    image: 'https://img.rocket.new/generatedImages/rocket_gen_img_1c4907581-1787425184037.png',
    imageAlt: 'Honda Acty kei truck with custom camper conversion body',
    description:
      'A 2000 Honda Acty converted into a micro camper with sleeping quarters. 4WD lets you take it anywhere - a truly unique adventure vehicle.',
    highlights: [
      'Custom sleeping quarters',
      '4WD for off-grid adventures',
      'Honda E07Z engine',
      'Unique conversation piece',
    ],

    detailSpecs: [
      { label: 'Engine', value: '660cc E07Z SOHC' },
      { label: 'Transmission', value: '5-Speed Manual' },
      { label: 'Drive', value: '4WD' },
      { label: 'Body', value: 'Camper Conversion' },
      { label: 'Mileage', value: '52,000 km (~32,000 mi)' },
      { label: 'Sleeping Quarters', value: 'Yes' },
      { label: 'Year', value: '2000' },
      { label: 'Condition', value: 'Good, Grade 3.5' },
    ],

    gallery: [
      {
        src: 'https://img.rocket.new/generatedImages/rocket_gen_img_155c35a4d-1787425183653.png',
        alt: 'Honda Acty camper conversion',
      },
    ],

    chassisCode: 'HA4',
    location: 'Port of Los Angeles, CA',
    inStock: true,
  },
  {
    id: 'sp-4',
    slug: 'mini-tow-wrecker-4wd',
    name: 'Mini Tow Wrecker',
    year: '1999',
    make: 'Mitsubishi',
    price: 10900,
    mileage: '38,000 km',
    drivetrain: '4WD',
    category: 'specialty',
    specs: ['660cc Turbo', '4WD', 'Tow Boom', 'Winch'],
    image: 'https://img.rocket.new/generatedImages/rocket_gen_img_16893ebcb-1787425184042.png',
    imageAlt: 'Mitsubishi Minicab mini tow truck with small wrecker boom',
    description:
      'A 1999 Mitsubishi Minicab mini wrecker with a tow boom and winch. Turbocharged engine and 4WD make this a capable recovery vehicle for tight spaces.',
    highlights: [
      'Tow boom and winch installed',
      'Turbocharged engine for towing power',
      '4WD for recovery in any terrain',
      'Compact size - fits where full-size wreckers cannot',
    ],

    detailSpecs: [
      { label: 'Engine', value: '660cc 3G83 Turbo' },
      { label: 'Transmission', value: '5-Speed Manual' },
      { label: 'Drive', value: '4WD' },
      { label: 'Body', value: 'Mini Wrecker' },
      { label: 'Mileage', value: '38,000 km (~24,000 mi)' },
      { label: 'Tow Boom', value: 'Yes' },
      { label: 'Winch', value: 'Yes' },
      { label: 'Year', value: '1999' },
      { label: 'Condition', value: 'Good, Grade 3.5' },
    ],

    gallery: [
      {
        src: 'https://images.unsplash.com/photo-1678335976915-ff186ef7d0df',
        alt: 'Mitsubishi Minicab mini wrecker',
      },
    ],

    chassisCode: 'U62T',
    location: 'Port of Houston, TX',
    inStock: true,
  },
  {
    id: 'sp-5',
    slug: 'farm-ag-specialty-4wd',
    name: 'Farm AG Specialty',
    year: '2002',
    make: 'Subaru',
    price: 9600,
    mileage: '44,000 km',
    drivetrain: '4WD',
    category: 'specialty',
    specs: ['EN07 4-cyl', '4WD', 'PTO Attachment', 'Sprayer Ready'],
    image: 'https://img.rocket.new/generatedImages/rocket_gen_img_139fe8086-1787425184079.png',
    imageAlt: 'Subaru Sambar farm specialty truck with PTO attachment for agriculture',
    description:
      'A 2002 Subaru Sambar AG specialty truck with PTO attachment and sprayer-ready setup. Built for serious farm work - AWD traction and PTO power for implements.',
    highlights: [
      'PTO attachment for farm implements',
      'Sprayer-ready configuration',
      'Subaru AWD traction',
      'EN07 4-cylinder engine',
    ],

    detailSpecs: [
      { label: 'Engine', value: 'EN07 660cc 4-cylinder' },
      { label: 'Transmission', value: '5-Speed Manual' },
      { label: 'Drive', value: '4WD' },
      { label: 'Body', value: 'AG Specialty Flatbed' },
      { label: 'Mileage', value: '44,000 km (~27,000 mi)' },
      { label: 'PTO', value: 'Yes' },
      { label: 'Sprayer Ready', value: 'Yes' },
      { label: 'Year', value: '2002' },
      { label: 'Condition', value: 'Good, Grade 3.5' },
    ],

    gallery: [
      {
        src: 'https://images.unsplash.com/photo-1722542517938-aa6a98d25235',
        alt: 'Subaru Sambar farm AG specialty truck',
      },
    ],

    chassisCode: 'TT2',
    location: 'Port of Seattle, WA',
    inStock: true,
  },
];

// ── Helper functions ──────────────────────────────────────────────────────────

export function getTruckById(id: string): InventoryTruck | undefined {
  return INVENTORY.find((t) => t.id === id);
}

export function getTruckBySlug(slug: string): InventoryTruck | undefined {
  return INVENTORY.find((t) => t.slug === slug);
}

export function getTruckByChassis(chassisCode: string): InventoryTruck | undefined {
  const upper = chassisCode.toUpperCase();
  return INVENTORY.find((t) => t.chassisCode?.toUpperCase() === upper);
}

export function getTrucksByCategory(category: TruckCategory): InventoryTruck[] {
  return INVENTORY.filter((t) => t.category === category);
}

export function getTrucksByMake(make: string): InventoryTruck[] {
  return INVENTORY.filter((t) => t.make.toLowerCase() === make.toLowerCase());
}

export function searchInventory(query: string): InventoryTruck[] {
  const q = query.toLowerCase();
  return INVENTORY.filter(
    (t) =>
      t.name.toLowerCase().includes(q) ||
      t.make.toLowerCase().includes(q) ||
      t.category.includes(q) ||
      t.chassisCode?.toLowerCase().includes(q) ||
      t.specs.some((s) => s.toLowerCase().includes(q))
  );
}

export const CATEGORY_META: Record<
  TruckCategory,
  { label: string; description: string; image: string; imageAlt: string; badge?: string }
> = {
  flatbed: {
    label: 'Standard Flatbed',
    description:
      'The classic open flatbed kei truck, the workhorse of Japanese farms and job sites. Perfect for hauling, landscaping, and general farm work.',
    image: 'https://images.unsplash.com/photo-1730647760022-55bb9c32f5db',
    imageAlt:
      'Classic Japanese kei flatbed truck on a rural farm road with open flatbed bed, green countryside background',
  },
  dump: {
    label: 'Dump Trucks',
    description:
      'Hydraulic tilt-bed kei dump trucks built for hauling loose material: dirt, gravel, mulch, and more. Serious capacity in a compact package.',
    image: 'https://img.rocket.new/generatedImages/rocket_gen_img_1d4308644-1787342420512.png',
    imageAlt:
      'Japanese kei dump truck with hydraulic tilt bed raised, compact size, yellow dump body',
    badge: 'Most Popular',
  },
  'box-van': {
    label: 'Box Trucks / Panel Vans',
    description:
      'Enclosed cargo box kei vans, ideal for delivery, mobile storage, or keeping cargo protected from the elements.',
    image: 'https://images.unsplash.com/photo-1715708473213-e0d8869f4834',
    imageAlt:
      'Japanese kei box van with enclosed cargo body, white panel van parked on city street',
  },
  'stake-side': {
    label: 'Stake-Side Flatbed',
    description:
      'Flatbed with removable side rails (kanban style), versatile for farm produce, lumber, or any load that benefits from containment.',
    image: 'https://img.rocket.new/generatedImages/rocket_gen_img_1a9c01f8b-1787342419034.png',
    imageAlt:
      'Japanese kei truck with stake side rails on flatbed, wooden side boards, farm setting',
  },
  'crew-cab': {
    label: 'Crew Cab',
    description:
      'Extended cab with rear seating: carry your crew and light cargo. Perfect for small teams that need both passenger space and a work bed.',
    image: 'https://img.rocket.new/generatedImages/rocket_gen_img_16e8e6c60-1787342420495.png',
    imageAlt:
      'Japanese kei crew cab double cab truck with extended rear cab and smaller cargo bed, parked in open field',
  },
  refrigerated: {
    label: 'Refrigerated / Insulated',
    description:
      'Enclosed insulated box trucks, some with reefer units, popular with food vendors, caterers, and anyone needing temperature-controlled transport.',
    image: 'https://images.unsplash.com/photo-1699444117588-6a97e5ad048f',
    imageAlt:
      'Japanese kei refrigerated truck with insulated white box body, food delivery vehicle',
  },
  specialty: {
    label: 'Specialty / Novelty',
    description:
      'The most unique kei trucks on the planet: decommissioned fire engines, camper conversions, food trucks, mini wreckers, and farm-specialty rigs.',
    image: 'https://img.rocket.new/generatedImages/rocket_gen_img_1bf7c463e-1787342419085.png',
    imageAlt:
      'Miniature Japanese kei fire truck in red with ladder and emergency equipment, novelty specialty vehicle',
    badge: 'Fan Favorite',
  },
};
