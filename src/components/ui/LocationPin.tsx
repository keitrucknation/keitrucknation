import React from 'react';

interface LocationPinProps {
  size?: number;
  className?: string;
}

/**
 * The real red/yellow location pin icon (downloaded from Flaticon), used
 * everywhere the site needs to represent an address or place - drop-in
 * replacement for the generic outline MapPinIcon.
 */
export default function LocationPin({ size = 16, className = '' }: LocationPinProps) {
  return (
    // eslint-disable-next-line @next/next/no-img-element -- small static UI icon, next/image is unnecessary overhead here
    <img
      src="/assets/icons/location-pin.png"
      alt=""
      width={size}
      height={size}
      className={`inline-block object-contain flex-shrink-0 ${className}`}
      style={{ width: size, height: size }}
    />
  );
}
