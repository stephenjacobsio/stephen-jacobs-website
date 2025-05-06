/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['localhost'],
    unoptimized: process.env.NODE_ENV === 'development',
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  // Add performance optimizations
  poweredByHeader: false,
  compress: true,
  // Enable ISR for faster page loads
  experimental: {
    // Enable optimizations
    optimizeCss: true,
    scrollRestoration: true,
  },
};

module.exports = nextConfig;