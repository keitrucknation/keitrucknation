'use client';

import React, { useState, useEffect, createContext, useContext } from 'react';
import { createPortal } from 'react-dom';
import Icon from '@/components/ui/AppIcon';
import { SUPPORTED_LANGUAGES, Language, Translations, getTranslations } from '@/lib/translations';

export type { Language };

// Maps each language code to the exact flag file saved in /public/assets/flags/
// (country-code naming, confirmed against the real files on disk)
const FLAG_FILE: Record<Language, string> = {
  en: 'us.png',
  fr: 'fr.jpg',
  es: 'es.png',
  de: 'de.png',
  ru: 'ru.png',
  ja: 'jp.png',
  zh: 'cn.png',
  ar: 'sa.png',
  pt: 'br.png',
  ko: 'kr.jpg',
};

function FlagImg({
  code,
  size = 20,
  className = '',
}: {
  code: Language;
  size?: number;
  className?: string;
}) {
  return (
    /* eslint-disable-next-line @next/next/no-img-element -- flag sprite is a tiny static asset, next/image is unnecessary overhead here */
    <img
      src={`/assets/flags/${FLAG_FILE[code]}`}
      alt=""
      width={size}
      height={size * 0.75}
      className={`inline-block object-cover rounded-[2px] flex-shrink-0 ${className}`}
      style={{ width: size, height: size * 0.75 }}
    />
  );
}

interface LanguageContextValue {
  language: Language;
  setLanguage: (lang: Language) => void;
  currentLang: (typeof SUPPORTED_LANGUAGES)[number];
  t: Translations;
}

const LanguageContext = createContext<LanguageContextValue>({
  language: 'en',
  setLanguage: () => {},
  currentLang: SUPPORTED_LANGUAGES[0],
  t: getTranslations('en'),
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>('en');
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('keitrucknation_language') as Language | null;
    if (stored && SUPPORTED_LANGUAGES.find((l) => l.code === stored)) {
      setLanguageState(stored);
    } else {
      const visited = localStorage.getItem('keitrucknation_lang_selected');
      if (!visited) {
        setTimeout(() => setShowModal(true), 1500);
      }
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('keitrucknation_language', lang);
    localStorage.setItem('keitrucknation_lang_selected', '1');
    setShowModal(false);
  };

  const currentLang =
    SUPPORTED_LANGUAGES.find((l) => l.code === language) ?? SUPPORTED_LANGUAGES[0];
  const t = getTranslations(language);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, currentLang, t }}>
      {children}
      {showModal && (
        <LanguageModal
          onSelect={setLanguage}
          onClose={() => {
            setShowModal(false);
            localStorage.setItem('keitrucknation_lang_selected', '1');
          }}
        />
      )}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}

function LanguageModal({
  onSelect,
  onClose,
}: {
  onSelect: (lang: Language) => void;
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm">
      <div className="bg-card border border-border rounded-2xl shadow-2xl w-full max-w-lg p-6 sm:p-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="font-display font-bold text-xl text-foreground">Choose Your Language</h2>
            <p className="text-muted-foreground text-sm mt-1">
              Select your preferred language to continue
            </p>
          </div>
          <button
            onClick={onClose}
            className="size-9 flex items-center justify-center rounded-full border border-border text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Close"
          >
            <Icon name="XMarkIcon" size={18} />
          </button>
        </div>
        <div className="grid grid-cols-2 gap-2 max-h-80 overflow-y-auto">
          {SUPPORTED_LANGUAGES.map((lang) => (
            <button
              key={lang.code}
              onClick={() => onSelect(lang.code)}
              className="flex items-center gap-3 p-3 rounded-xl border border-border hover:border-primary hover:bg-primary/5 transition-all text-left"
            >
              <FlagImg code={lang.code} size={28} />
              <div>
                <p className="font-bold text-foreground text-sm">{lang.nativeName}</p>
                <p className="text-xs text-muted-foreground">{lang.region}</p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function LanguageSelector() {
  const { language, setLanguage, currentLang } = useLanguage();
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-border text-sm font-medium text-foreground hover:border-primary hover:text-primary transition-all"
        aria-label="Select language"
      >
        <FlagImg code={currentLang.code} size={18} />
        <span className="hidden sm:inline text-xs font-bold uppercase tracking-widest">
          {language.toUpperCase()}
        </span>
        <Icon
          name="ChevronDownIcon"
          size={12}
          className={`transition-transform ${open ? 'rotate-180' : ''}`}
        />
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <div className="absolute right-0 top-full mt-2 z-[90] bg-card border border-border rounded-2xl shadow-2xl w-64 p-2 max-h-80 overflow-y-auto">
            {SUPPORTED_LANGUAGES.map((lang) => (
              <button
                key={lang.code}
                onClick={() => {
                  setLanguage(lang.code);
                  setOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-colors ${
                  lang.code === language
                    ? 'bg-primary/10 text-primary'
                    : 'hover:bg-muted text-foreground'
                }`}
              >
                <FlagImg code={lang.code} size={22} />
                <div>
                  <p className="font-bold text-sm">{lang.nativeName}</p>
                  <p className="text-xs text-muted-foreground">{lang.region}</p>
                </div>
                {lang.code === language && (
                  <Icon name="CheckIcon" size={14} className="ml-auto text-primary" />
                )}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

// Language picker button for header
export function LanguageToggle({ scrolled }: { scrolled: boolean }) {
  const { currentLang, setLanguage, language } = useLanguage();
  const [open, setOpen] = useState(false);
  const [coords, setCoords] = useState({ top: 0, right: 0 });
  const btnRef = React.useRef<HTMLButtonElement>(null);
  const panelRef = React.useRef<HTMLDivElement>(null);

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
    // Close on scroll/resize rather than trying to re-track position while
    // scrolling - simpler and avoids the dropdown drifting away from the button.
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

  return (
    <div className="relative hidden sm:block flex-shrink-0">
      <button
        ref={btnRef}
        onClick={handleToggle}
        aria-label={`Language: ${currentLang.label}`}
        aria-expanded={open}
        className={`flex items-center gap-1.5 px-3 py-2 rounded-full border text-xs font-bold transition-all ${
          scrolled
            ? 'border-white/30 text-white hover:border-white/50'
            : 'border-gray-400/30 text-gray-400 hover:border-gray-300/40'
        }`}
      >
        <FlagImg code={currentLang.code} size={18} />
        <span className="uppercase">{currentLang.code}</span>
        <Icon
          name="ChevronDownIcon"
          size={12}
          className={`transition-transform ${open ? 'rotate-180' : ''}`}
        />
      </button>

      {open &&
        typeof document !== 'undefined' &&
        createPortal(
          <div
            ref={panelRef}
            style={{ position: 'fixed', top: coords.top, right: coords.right, zIndex: 9999 }}
            className="bg-card border border-border rounded-2xl shadow-2xl overflow-hidden w-52 max-h-72 overflow-y-auto"
          >
            {SUPPORTED_LANGUAGES.map((lang) => (
              <button
                key={lang.code}
                onClick={() => {
                  setLanguage(lang.code);
                  setOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-4 py-2.5 text-xs font-bold transition-colors hover:bg-muted ${
                  language === lang.code ? 'text-primary bg-primary/5' : 'text-foreground'
                }`}
              >
                <FlagImg code={lang.code} size={20} />
                <span>{lang.nativeName}</span>
                {language === lang.code && (
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
