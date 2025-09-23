/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    externalDir: true, // allow ../src imports
  },
};

module.exports = nextConfig;