'use client';

import React, { useState, useRef, useEffect, createContext, useContext } from 'react';
import { createPortal } from 'react-dom';
import Icon from '@/components/ui/AppIcon';

export type Currency = 'USD' | 'CAD' | 'EUR' | 'AUD';

const RATES: Record<Currency, number> = {
  USD: 1,
  CAD: 1.36,
  EUR: 0.92,
  AUD: 1.54,
};

const SYMBOLS: Record<Currency, string> = {
  USD: '$',
  CAD: 'CA$',
  EUR: '€',
  AUD: 'A$',
};

interface CurrencyContextValue {
  currency: Currency;
  setCurrency: (c: Currency) => void;
  convert: (usd: number) => string;
  symbol: string;
}

const CurrencyContext = createContext<CurrencyContextValue>({
  currency: 'USD',
  setCurrency: () => {},
  convert: (n) => `$${n.toLocaleString()}`,
  symbol: '$',
});

export function CurrencyProvider({ children }: { children: React.ReactNode }) {
  const [currency, setCurrencyState] = useState<Currency>('USD');

  useEffect(() => {
    const stored = localStorage.getItem('keitrucknation_currency') as Currency | null;
    if (stored && RATES[stored]) setCurrencyState(stored);
  }, []);

  const setCurrency = (c: Currency) => {
    setCurrencyState(c);
    localStorage.setItem('keitrucknation_currency', c);
  };

  const convert = (usd: number) => {
    const converted = usd * RATES[currency];
    return `${SYMBOLS[currency]}${Math.round(converted).toLocaleString()}`;
  };

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency, convert, symbol: SYMBOLS[currency] }}>
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  return useContext(CurrencyContext);
}

interface CurrencyToggleProps {
  scrolled: boolean;
}

export default function CurrencyToggle({ scrolled }: CurrencyToggleProps) {
  const { currency, setCurrency } = useCurrency();
  const [open, setOpen] = useState(false);
  const [coords, setCoords] = useState({ top: 0, right: 0 });
  const btnRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  const updatePosition = () => {
    if (!btnRef.current) return;
    const rect = btnRef.current.getBoundingClientRect();
    setCoords({ top: rect.bottom + 8, right: window.innerWidth - rect.right });
  };

  const handleToggle = () => {
    if (!open) updatePosition();
    setOpen((prev) => !prev);
  };

  useEffect(() => {
    if (!open) return;
    const handleClick = (e: MouseEvent) => {
      const target = e.target as Node;
      if (
        btnRef.current &&
        !btnRef.current.contains(target) &&
        panelRef.current &&
        !panelRef.current.contains(target)
      ) {
        setOpen(false);
      }
    };
    const handleDismiss = () => setOpen(false);
    document.addEventListener('mousedown', handleClick);
    window.addEventListener('scroll', handleDismiss, true);
    window.addEventListener('resize', handleDismiss);
    return () => {
      document.removeEventListener('mousedown', handleClick);
      window.removeEventListener('scroll', handleDismiss, true);
      window.removeEventListener('resize', handleDismiss);
    };
  }, [open]);

  const currencies: Currency[] = ['USD', 'CAD', 'EUR', 'AUD'];

  return (
    <div className="relative hidden sm:block flex-shrink-0">
      <button
        ref={btnRef}
        onClick={handleToggle}
        aria-label={`Currency: ${currency}`}
        aria-expanded={open}
        className={`flex items-center gap-1.5 px-3 py-2 rounded-full border text-xs font-bold transition-all ${
          scrolled
            ? 'border-white/30 text-white hover:border-white/50'
            : 'border-gray-400/30 text-gray-400 hover:border-gray-300/40'
        }`}
      >
        <span>{SYMBOLS[currency]}</span>
        <span>{currency}</span>
        <svg
          className={`w-3 h-3 transition-transform ${open ? 'rotate-180' : ''}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {open &&
        typeof document !== 'undefined' &&
        createPortal(
          <div
            ref={panelRef}
            style={{ position: 'fixed', top: coords.top, right: coords.right, zIndex: 9999 }}
            className="bg-card border border-border rounded-xl shadow-xl overflow-hidden min-w-[120px]"
          >
            {currencies.map((c) => (
              <button
                key={c}
                onClick={() => {
                  setCurrency(c);
                  setOpen(false);
                }}
                className={`w-full flex items-center gap-2 px-4 py-2.5 text-xs font-bold transition-colors hover:bg-muted ${
                  currency === c ? 'text-primary bg-primary/5' : 'text-foreground'
                }`}
              >
                <span className="w-8 text-muted-foreground">{SYMBOLS[c]}</span>
                <span>{c}</span>
                {currency === c && (
                  <Icon name="CheckIcon" size={14} className="ml-auto text-primary" />
                )}
              </button>
            ))}
          </div>,
          document.body
        )}
    </div>
  );
}
