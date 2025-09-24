// playground/next.config.mjs
import withPWA from 'next-pwa';
import path from 'node:path';

const isDev = process.env.NODE_ENV === 'development';

export default withPWA({
  reactStrictMode: true,
  experimental: { externalDir: true }, // allow ../src imports
  output: 'standalone',
  webpack(config) {
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      '@': path.resolve(__dirname, '../src'),
    };
    return config;
  },
  pwa: {
    dest: 'public',
    disable: isDev,
    register: true,
    skipWaiting: true,
  },
});