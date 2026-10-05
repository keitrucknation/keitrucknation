/**
 * Re-exports from centralized inventory for backward compatibility.
 * Components that import from this file continue to work unchanged.
 */
import {
  INVENTORY,
  CATEGORY_META,
  type TruckCategory as InventoryCategory,
  type InventoryTruck,
} from '@/lib/inventory';

export type { InventoryTruck };

export interface TruckCategory {
  id: string;
  slug: string;
  label: string;
  description: string;
  image: string;
  imageAlt: string;
  trucks: InventoryTruck[];
  badge?: string;
}

// Build TRUCK_CATEGORIES from centralized inventory
const CATEGORY_ORDER: InventoryCategory[] = [
  'flatbed',
  'dump',
  'box-van',
  'stake-side',
  'crew-cab',
  'refrigerated',
  'specialty',
];

export const TRUCK_CATEGORIES: TruckCategory[] = CATEGORY_ORDER.map((cat) => {
  const meta = CATEGORY_META[cat];
  const trucks = INVENTORY.filter((t) => t.category === cat);
  return {
    id: cat,
    slug: cat,
    label: meta.label,
    description: meta.description,
    image: meta.image,
    imageAlt: meta.imageAlt,
    badge: meta.badge,
    trucks,
  };
});

export const MANUFACTURERS = [
  { id: 'suzuki', label: 'Suzuki Carry', color: '#3B82F6' },
  { id: 'honda', label: 'Honda Acty', color: '#EF4444' },
  { id: 'daihatsu', label: 'Daihatsu Hijet', color: '#F59E0B' },
  { id: 'subaru', label: 'Subaru Sambar', color: '#EAB308' },
  { id: 'mitsubishi', label: 'Mitsubishi Minicab', color: '#38BDF8' },
];

export const DRIVETRAINS = [
  {
    id: '2wd',
    label: '2WD',
    description: 'Lighter, more affordable: great for flat terrain and light work',
  },
  { id: '4wd', label: '4WD', description: 'Off-road, farm, snow, and uneven terrain use' },
];
