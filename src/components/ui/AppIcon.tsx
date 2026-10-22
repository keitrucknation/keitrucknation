'use client';

import React from 'react';
import * as HeroIcons from '@heroicons/react/24/outline';
import * as HeroIconsSolid from '@heroicons/react/24/solid';
import { QuestionMarkCircleIcon } from '@heroicons/react/24/outline';

type IconVariant = 'outline' | 'solid';

/** Heroicon name -> downloaded PNG in /public/assets/icons */
const CUSTOM_PNG: Record<string, string> = {
  MapPinIcon: 'location-pin.png',
  PhoneIcon: 'phone-contact.png',
  TruckIcon: 'truck-body.png',
  WrenchScrewdriverIcon: 'accessories.png',
  CurrencyDollarIcon: 'financing.png',
};

interface IconProps {
  name: string; // Changed to string to accept dynamic values
  variant?: IconVariant;
  size?: number;
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  [key: string]: unknown;
}

function Icon({
  name,
  variant = 'outline',
  size = 24,
  className = '',
  onClick,
  disabled = false,
  ...props
}: IconProps) {
  // Icons that have a real downloaded PNG. Drawn as a CSS mask filled with
  // `currentColor`, so they take whatever text color the caller sets
  // (e.g. className="text-primary" = brand yellow). One place controls this site-wide.
  const pngFile = CUSTOM_PNG[name];
  if (pngFile) {
    const url = `/assets/icons/${pngFile}`;
    return (
      <span
        role="img"
        aria-hidden="true"
        className={`inline-block flex-shrink-0 ${disabled ? 'opacity-50' : ''} ${className}`}
        style={{
          width: size,
          height: size,
          backgroundColor: 'currentColor',
          WebkitMaskImage: `url(${url})`,
          maskImage: `url(${url})`,
          WebkitMaskSize: 'contain',
          maskSize: 'contain',
          WebkitMaskRepeat: 'no-repeat',
          maskRepeat: 'no-repeat',
          WebkitMaskPosition: 'center',
          maskPosition: 'center',
        }}
        onClick={disabled ? undefined : onClick}
      />
    );
  }

  const iconSet = variant === 'solid' ? HeroIconsSolid : HeroIcons;
  const IconComponent = iconSet[name as keyof typeof iconSet] as
    | React.ComponentType<React.SVGProps<SVGSVGElement>>
    | undefined;

  if (!IconComponent) {
    return (
      <QuestionMarkCircleIcon
        width={size}
        height={size}
        className={`text-gray-400 ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}
        onClick={disabled ? undefined : onClick}
        {...props}
      />
    );
  }

  return (
    <IconComponent
      width={size}
      height={size}
      className={`${disabled ? 'opacity-50 cursor-not-allowed' : onClick ? 'cursor-pointer hover:opacity-80' : ''} ${className}`}
      onClick={disabled ? undefined : onClick}
      {...props}
    />
  );
}

export default Icon;