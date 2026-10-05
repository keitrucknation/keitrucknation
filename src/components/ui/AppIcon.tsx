'use client';

import React from 'react';
import * as HeroIcons from '@heroicons/react/24/outline';
import * as HeroIconsSolid from '@heroicons/react/24/solid';
import { QuestionMarkCircleIcon } from '@heroicons/react/24/outline';

type IconVariant = 'outline' | 'solid';

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
  // Any icon literally named 'MapPinIcon' - static or from a dynamic
  // name={someVariable} lookup - renders the real downloaded pin image
  // instead of the generic outline icon. One place controls this site-wide.
  if (name === 'MapPinIcon') {
    return (
      // eslint-disable-next-line @next/next/no-img-element -- small static UI icon, next/image is unnecessary overhead here
      <img
        src="/assets/icons/location-pin.png"
        alt=""
        width={size}
        height={size}
        className={`inline-block object-contain flex-shrink-0 ${disabled ? 'opacity-50' : ''} ${className}`}
        style={{ width: size, height: size }}
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
