'use client';

/**
 * Persistent wishlist store - backed by localStorage.
 */

export interface WishlistItem {
  id: string;
  category: 'truck' | 'part';
  name: string;
  price: number;
  image: string;
  imageAlt: string;
  badge?: string;
  specs?: string[];
  year?: string;
  make?: string;
  partCategory?: string;
  inStock?: number;
  addedDate: string;
}

const STORAGE_KEY = 'keitrucknation_wishlist';
const WISHLIST_CHANGE_EVENT = 'keitrucknation_wishlist_change';

function readStorage(): WishlistItem[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as WishlistItem[]) : [];
  } catch {
    return [];
  }
}

function writeStorage(items: WishlistItem[]): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    window.dispatchEvent(new Event(WISHLIST_CHANGE_EVENT));
  } catch {
    // storage quota exceeded - silently ignore
  }
}

export const wishlistStore = {
  getItems(): WishlistItem[] {
    return readStorage();
  },

  addItem(item: Omit<WishlistItem, 'addedDate'>): void {
    const items = readStorage();
    if (items.find((i) => i.id === item.id)) return; // already saved
    items.push({ ...item, addedDate: new Date().toISOString().split('T')[0] });
    writeStorage(items);
  },

  removeItem(id: string): void {
    writeStorage(readStorage().filter((i) => i.id !== id));
  },

  isInWishlist(id: string): boolean {
    return readStorage().some((i) => i.id === id);
  },

  toggle(item: Omit<WishlistItem, 'addedDate'>): boolean {
    if (this.isInWishlist(item.id)) {
      this.removeItem(item.id);
      return false;
    } else {
      this.addItem(item);
      return true;
    }
  },

  getCount(): number {
    return readStorage().length;
  },

  subscribe(callback: () => void): () => void {
    if (typeof window === 'undefined') return () => {};
    window.addEventListener(WISHLIST_CHANGE_EVENT, callback);
    return () => window.removeEventListener(WISHLIST_CHANGE_EVENT, callback);
  },
};
