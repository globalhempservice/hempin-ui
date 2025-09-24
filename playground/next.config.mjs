// playground/next.config.mjs
import withPWAInit from 'next-pwa';

const isDev = process.env.NODE_ENV !== 'production';

// 1) Initialize the PWA wrapper with ONLY PWA/workbox options
const withPWA = withPWAInit({
  dest: 'public',
  disable: isDev,   // service worker only in prod
  register: true,
  skipWaiting: true,
  // runtimeCaching: [] // (optional) add custom caching rules later
});

// 2) Your normal Next.js config (no `pwa:` key here)
const nextConfig = {
  reactStrictMode: true,
  experimental: { externalDir: true },
  output: 'standalone',
};

// 3) Export the wrapped config
export default withPWA(nextConfig);