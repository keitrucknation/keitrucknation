'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Icon from '@/components/ui/AppIcon';

const COOKIE_KEY = 'keitrucknation_cookie_consent';

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [preferences, setPreferences] = useState({
    necessary: true,
    analytics: false,
    marketing: false,
  });

  useEffect(() => {
    const stored = localStorage.getItem(COOKIE_KEY);
    if (!stored) {
      const timer = setTimeout(() => setVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const acceptAll = () => {
    localStorage.setItem(
      COOKIE_KEY,
      JSON.stringify({ necessary: true, analytics: true, marketing: true, timestamp: Date.now() })
    );
    setVisible(false);
  };

  const declineAll = () => {
    localStorage.setItem(
      COOKIE_KEY,
      JSON.stringify({ necessary: true, analytics: false, marketing: false, timestamp: Date.now() })
    );
    setVisible(false);
  };

  const savePreferences = () => {
    localStorage.setItem(COOKIE_KEY, JSON.stringify({ ...preferences, timestamp: Date.now() }));
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Cookie consent"
      className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:bottom-6 sm:max-w-sm z-[90] bg-card border border-border rounded-2xl shadow-2xl p-5 flex flex-col gap-4"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2">
          <Icon name="InformationCircleIcon" size={20} className="text-primary flex-shrink-0" />
          <h2 className="font-display font-bold text-sm text-foreground">Cookie Preferences</h2>
        </div>
        <button
          onClick={declineAll}
          aria-label="Decline cookies and close"
          className="text-muted-foreground hover:text-foreground transition-colors flex-shrink-0"
        >
          <Icon name="XMarkIcon" size={16} />
        </button>
      </div>

      <p className="text-xs text-muted-foreground leading-relaxed">
        We use cookies to improve your experience, analyze traffic, and personalize content. You can
        manage your preferences below.{' '}
        <Link href="/privacy-policy" className="text-primary hover:underline">
          Privacy Policy
        </Link>
      </p>

      {showDetails && (
        <div className="flex flex-col gap-3 border border-border rounded-xl p-3">
          {[
            {
              key: 'necessary',
              label: 'Necessary',
              desc: 'Required for the site to function',
              locked: true,
            },
            {
              key: 'analytics',
              label: 'Analytics',
              desc: 'Help us understand how you use the site',
              locked: false,
            },
            {
              key: 'marketing',
              label: 'Marketing',
              desc: 'Personalized ads and content',
              locked: false,
            },
          ].map(({ key, label, desc, locked }) => (
            <div key={key} className="flex items-center justify-between gap-3">
              <div>
                <div className="text-xs font-bold text-foreground">{label}</div>
                <div className="text-[10px] text-muted-foreground">{desc}</div>
              </div>
              <button
                role="switch"
                aria-checked={preferences[key as keyof typeof preferences]}
                aria-label={`Toggle ${label} cookies`}
                disabled={locked}
                onClick={() =>
                  !locked &&
                  setPreferences((p) => ({ ...p, [key]: !p[key as keyof typeof preferences] }))
                }
                className={`relative w-9 h-5 rounded-full transition-colors flex-shrink-0 ${
                  preferences[key as keyof typeof preferences] ? 'bg-primary' : 'bg-muted'
                } ${locked ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
              >
                <span
                  className={`absolute top-0.5 left-0.5 size-4 bg-white rounded-full shadow transition-transform ${
                    preferences[key as keyof typeof preferences] ? 'translate-x-4' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
          ))}
        </div>
      )}

      <div className="flex flex-col gap-2">
        <button
          onClick={acceptAll}
          className="w-full py-2.5 bg-primary text-primary-foreground rounded-xl font-black text-xs uppercase tracking-widest hover:scale-105 transition-transform"
        >
          Accept All
        </button>
        <div className="flex gap-2">
          <button
            onClick={() => setShowDetails(!showDetails)}
            className="flex-1 py-2.5 border border-border rounded-xl text-xs font-bold text-muted-foreground hover:text-foreground hover:bg-muted transition-all"
          >
            {showDetails ? 'Hide Details' : 'Manage'}
          </button>
          {showDetails ? (
            <button
              onClick={savePreferences}
              className="flex-1 py-2.5 border border-primary/40 rounded-xl text-xs font-bold text-primary hover:bg-primary/10 transition-all"
            >
              Save
            </button>
          ) : (
            <button
              onClick={declineAll}
              className="flex-1 py-2.5 border border-border rounded-xl text-xs font-bold text-muted-foreground hover:text-foreground hover:bg-muted transition-all"
            >
              Decline
            </button>
          )}
        </div>
      </div>

      <p className="text-[10px] text-muted-foreground text-center">
        GDPR · CCPA compliant · You can change preferences anytime
      </p>
    </div>
  );
}
