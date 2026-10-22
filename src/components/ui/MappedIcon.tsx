import React from 'react';

/**
 * Maps a plain-word icon id to its file, relative to /public/assets/.
 * Several ids intentionally share a file (ocean/globe/ship -> ocean-shipping.png).
 *
 * NOTE: every file here is a real .png. (The old "logo.svg" files were PNG images
 * saved with a .svg extension, which browsers refuse to display.)
 */
const ICON_FILE: Record<string, string> = {
  // Generic UI icons (black on transparent -> recolored yellow)
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
  pin: 'icons/location-pin.png',
  // Payment logos (kept in real brand colors when color="none")
  bank: 'logos/payment/bank-transfer.png',
  visa: 'logos/payment/visa.png',
  mastercard: 'logos/payment/mastercard.png',
  cashapp: 'logos/payment/cashapp.png',
  zelle: 'logos/payment/zelle.png',
  chime: 'logos/payment/chime.png',
  applepay: 'logos/payment/apple-pay.png',
  bitcoin: 'logos/payment/bitcoin.png',
  // Manufacturer logos (kept in real brand colors when color="none")
  suzuki: 'logos/manufacturers/suzuki.png',
  honda: 'logos/manufacturers/honda.png',
  daihatsu: 'logos/manufacturers/daihatsu.png',
  subaru: 'logos/manufacturers/subaru.png',
  mitsubishi: 'logos/manufacturers/mitsubishi.png',
  // Social logos (always rendered in brand yellow)
  facebook: 'logos/social/facebook.png',
  instagram: 'logos/social/instagram.png',
  tiktok: 'logos/social/tiktok.png',
  youtube: 'logos/social/youtube.png',
};

/** Social icons are always brand yellow, even if a caller passes color="none". */
const ALWAYS_YELLOW = new Set(['facebook', 'instagram', 'tiktok', 'youtube']);

/** Plain-text label shown only when an id has no mapped file */
const FALLBACK_LABEL: Record<string, string> = {
  lightning: 'Fast',
  wheat: 'Farm',
};

const BRAND_YELLOW = '#E8FF3E';

interface MappedIconProps {
  /** Plain-word id, e.g. "factory", "truck", "facebook" */
  icon: string;
  size?: number;
  className?: string;
  /** Solid recolor (default: brand yellow). Pass color="none" to show the file's
   * original colors (manufacturer / payment logos). */
  color?: string;
}

/**
 * Server-safe (no hooks, no 'use client' needed). Icons are drawn as a CSS mask
 * filled with a solid color - one tiny request per icon, nothing extra to load.
 */
export default function MappedIcon({
  icon,
  size = 20,
  className = '',
  color = BRAND_YELLOW,
}: MappedIconProps) {
  const file = ICON_FILE[icon];

  if (!file) {
    return (
      <span className={`text-[10px] font-bold uppercase tracking-wide ${className}`}>
        {FALLBACK_LABEL[icon] ?? icon}
      </span>
    );
  }

  const src = `/assets/${file}`;

  if (color === 'none' && !ALWAYS_YELLOW.has(icon)) {
    return (
      // eslint-disable-next-line @next/next/no-img-element -- small static logo, next/image is unnecessary overhead
      <img
        src={src}
        alt=""
        width={size}
        height={size}
        loading="lazy"
        decoding="async"
        className={`inline-block object-contain flex-shrink-0 ${className}`}
        style={{ width: size, height: size }}
      />
    );
  }

  const fill = color === 'none' ? BRAND_YELLOW : color;

  return (
    <span
      role="img"
      aria-hidden="true"
      className={`inline-block flex-shrink-0 ${className}`}
      style={{
        width: size,
        height: size,
        backgroundColor: fill,
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
  );
}