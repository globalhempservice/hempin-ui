// playground/next.config.mjs
import withPWA from 'next-pwa';

const isDev = process.env.NODE_ENV === 'development';

const baseConfig = {
  reactStrictMode: true,

  // Needed because the playground imports from ../src
  experimental: { externalDir: true, typedRoutes: true },

  // Keeps Netlify/serverless happier
  output: 'standalone',
};

export default withPWA({
  ...baseConfig,
  pwa: {
    dest: 'public',
    disable: isDev,  // enable SW only in production
    register: true,
    skipWaiting: true,
  },
});