'use client';

/**
 * Persistent cart store - backed by localStorage.
 * Provides a simple event-based pub/sub so any component can subscribe to changes.
 */

export interface CartItem {
  id: string;
  name: string;
  subtitle: string;
  price: number;
  quantity: number;
  image: string;
  imageAlt: string;
  specs: string[];
  category: 'truck' | 'part';
}

const STORAGE_KEY = 'keitrucknation_cart';
const CART_CHANGE_EVENT = 'keitrucknation_cart_change';

function readStorage(): CartItem[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as CartItem[]) : [];
  } catch {
    return [];
  }
}

function writeStorage(items: CartItem[]): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    window.dispatchEvent(new Event(CART_CHANGE_EVENT));
  } catch {
    // storage quota exceeded - silently ignore
  }
}

export const cartStore = {
  getItems(): CartItem[] {
    return readStorage();
  },

  addItem(item: Omit<CartItem, 'quantity'>): void {
    const items = readStorage();
    const existing = items.find((i) => i.id === item.id);
    if (existing) {
      existing.quantity += 1;
    } else {
      items.push({ ...item, quantity: 1 });
    }
    writeStorage(items);
  },

  removeItem(id: string): void {
    writeStorage(readStorage().filter((i) => i.id !== id));
  },

  updateQuantity(id: string, quantity: number): void {
    if (quantity < 1) {
      this.removeItem(id);
      return;
    }
    writeStorage(readStorage().map((i) => (i.id === id ? { ...i, quantity } : i)));
  },

  clearCart(): void {
    writeStorage([]);
  },

  getCount(): number {
    return readStorage().reduce((sum, i) => sum + i.quantity, 0);
  },

  getSubtotal(): number {
    return readStorage().reduce((sum, i) => sum + i.price * i.quantity, 0);
  },

  subscribe(callback: () => void): () => void {
    if (typeof window === 'undefined') return () => {};
    window.addEventListener(CART_CHANGE_EVENT, callback);
    return () => window.removeEventListener(CART_CHANGE_EVENT, callback);
  },
};
