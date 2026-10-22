import { imageHosts } from './image-hosts.config.mjs';

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Off so the live site doesn't publish readable source code.
  productionBrowserSourceMaps: false,
  distDir: process.env.DIST_DIR || '.next',

  images: {
    remotePatterns: imageHosts,
    // Aggressive caching: 30 days
    minimumCacheTTL: 2592000,
    // Serve modern compressed formats automatically (AVIF ~50% smaller than WebP, WebP ~30% smaller than JPEG)
    formats: ['image/avif', 'image/webp'],
    // Default quality 75 — sharp sweet spot between visual quality and file size
    qualities: [60, 75, 85],
    // Responsive breakpoints so Next.js generates only the sizes actually needed
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    // Disable dangerouslyAllowSVG to prevent SVG injection
    dangerouslyAllowSVG: false,
  },

  // Compress all HTTP responses (HTML, JS, CSS, JSON)
  compress: true
};
export default nextConfig;