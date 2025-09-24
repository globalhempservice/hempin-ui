// ESM + next-pwa init pattern (correct for Next 14.x)
import withPWAInit from 'next-pwa';

const isDev = process.env.NODE_ENV !== 'production';

// First, initialize the plugin with its own options
const withPWA = withPWAInit({
  dest: 'public',
  disable: isDev,     // only enable SW in production
  register: true,
  skipWaiting: true,
});

// Then wrap your Next config
const nextConfig = {
  reactStrictMode: true,
  experimental: { externalDir: true },
  output: 'standalone',
};

export default withPWA(nextConfig);