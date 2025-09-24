import withPWA from 'next-pwa';

const isDev = process.env.NODE_ENV === 'development';

/** @type {import('next').NextConfig} */
const nextConfig = withPWA({
  reactStrictMode: true,

  // we import from ../src during playground build
  experimental: { externalDir: true },

  // PWA settings
  pwa: {
    dest: 'public',
    disable: isDev,     // only enable SW in prod
    register: true,
    skipWaiting: true,
  },

  // leaner serverless output for Netlify
  output: 'standalone',
});

export default nextConfig;
