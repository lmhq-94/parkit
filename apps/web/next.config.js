/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@parkit/shared'],
  env: {
    NEXT_PUBLIC_API_URL:
      process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/graphql',
  },
  pageExtensions: ['tsx', 'ts', 'jsx', 'js'],
};

module.exports = nextConfig;
