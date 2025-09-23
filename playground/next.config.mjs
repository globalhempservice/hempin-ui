// playground/next.config.mjs

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // We are importing from ../src during playground build
  experimental: { externalDir: true },

  // If you ever import from the built package name, you can keep this too:
  // transpilePackages: ['hempin-ui'],

  // (Optional) makes serverless deploys happier
  output: 'standalone',
};

export default nextConfig;