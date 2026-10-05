'use client';

import React, { useState } from 'react';

/**
 * Maps a plain-word icon id to its real file, as a path relative to
 * /public/assets/ (not just a filename - these live in different folders).
 * Several ids intentionally point at the same file where the concept
 * overlaps (mini-truck -> truck-body.png, ocean/globe -> ocean-shipping.png).
 */
const ICON_FILE: Record<string, string> = {
  // Generic UI icon set (black Flaticon downloads, meant to be recolored)
  factory: 'icons/factory.png',
  truck: 'icons/truck-body.png',
  ship: 'icons/ocean-shipping.png',
  gear: 'icons/drivetrain.png',
  refresh: 'icons/transmission.png',
  star: 'icons/condition.png',
  wrench: 'icons/accessories.png',
  notes: 'icons/blog-notes.png',
  book: 'icons/glossary-book.png',
  ocean: 'icons/ocean-shipping.png',
  globe: 'icons/ocean-shipping.png',
  money: 'icons/financing.png',
  map: 'icons/state-map.png',
  phone: 'icons/phone-contact.png',
  business: 'icons/business.png',
  document: 'icons/document.png',
  handshake: 'icons/handshake.png',
  // Payment brand logos (real brand colors - never recolored)
  bank: 'logos/payment/bank-transfer.svg',
  visa: 'logos/payment/visa.svg',
  mastercard: 'logos/payment/mastercard.svg',
  cashapp: 'logos/payment/cashapp.svg',
  zelle: 'logos/payment/zelle.svg',
  chime: 'logos/payment/chime.svg',
  applepay: 'logos/payment/apple-pay.svg',
  bitcoin: 'logos/payment/bitcoin.svg',
  // Manufacturer brand logos (real brand colors - never recolored)
  suzuki: 'logos/manufacturers/suzuki.svg',
  honda: 'logos/manufacturers/honda.svg',
  daihatsu: 'logos/manufacturers/daihatsu.svg',
  subaru: 'logos/manufacturers/subaru.svg',
  mitsubishi: 'logos/manufacturers/mitsubishi.svg',
  // Social brand logos (real brand colors - never recolored)
  facebook: 'logos/social/facebook.svg',
  instagram: 'logos/social/instagram.svg',
};

/** Plain-text label shown only if a given id has no mapped file yet (or the file fails to load) */
const FALLBACK_LABEL: Record<string, string> = {
  lightning: 'Fast',
  wheat: 'Farm',
};

interface MappedIconProps {
  /** Plain-word id, e.g. "factory", "truck", "gear" - looked up in ICON_FILE above */
  icon: string;
  size?: number;
  className?: string;
  /** Recolor the icon to this solid color via CSS mask (default: brand yellow).
   * Only works correctly on black-icon-on-transparent-background source files
   * (standard Flaticon monochrome downloads). Pass color="none" to render the
   * file's own original colors untouched (use this for real brand logos). */
  color?: string;
}

/**
 * Renders the real icon for a given icon id, recolored to a solid brand color
 * via CSS mask-image - this works regardless of the source file's own color
 * (black, dark grey, whatever Flaticon exported), since the mask only reads
 * the shape/alpha channel and fills it with `color`. Falls back to a short
 * plain-text label if no file mapping exists yet, or if the file hasn't
 * actually been saved to disk - detected via a hidden 1px probe image, since
 * a CSS mask has no onError of its own to hook into.
 */
export default function MappedIcon({
  icon,
  size = 20,
  className = '',
  color = '#E8FF3E',
}: MappedIconProps) {
  const file = ICON_FILE[icon];
  const [failed, setFailed] = useState(false);

  if (!file || failed) {
    return (
      <span className={`text-[10px] font-bold uppercase tracking-wide ${className}`}>
        {FALLBACK_LABEL[icon] ?? icon}
      </span>
    );
  }

  const src = `/assets/icons/${file}`;

  if (color === 'none') {
    return (
      // eslint-disable-next-line @next/next/no-img-element -- small static UI icon, next/image is unnecessary overhead here
      <img
        src={src}
        alt=""
        width={size}
        height={size}
        onError={() => setFailed(true)}
        className={`inline-block object-contain flex-shrink-0 ${className}`}
        style={{ width: size, height: size }}
      />
    );
  }

  return (
    <>
      {/* Invisible - exists only to detect a missing file via onError, since a CSS mask can't fire one itself */}
      <img
        src={src}
        alt=""
        aria-hidden="true"
        onError={() => setFailed(true)}
        style={{ position: 'absolute', width: 1, height: 1, opacity: 0, pointerEvents: 'none' }}
      />
      <span
        role="img"
        className={`inline-block flex-shrink-0 ${className}`}
        style={{
          width: size,
          height: size,
          backgroundColor: color,
          WebkitMaskImage: `url(${src})`,
          maskImage: `url(${src})`,
          WebkitMaskSize: 'contain',
          maskSize: 'contain',
          WebkitMaskRepeat: 'no-repeat',
          maskRepeat: 'no-repeat',
          WebkitMaskPosition: 'center',
          maskPosition: 'center',
        }}
      />
    </>
  );
}