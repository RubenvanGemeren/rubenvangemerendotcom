/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Remove 'output: export' to enable API routes and server-side rendering
  // output: 'export', // Commented out to support API routes
  images: {
    unoptimized: true,
  },
}

module.exports = nextConfig

// Initialize OpenNext Cloudflare adapter for local development
const { initOpenNextCloudflareForDev } = require("@opennextjs/cloudflare");
initOpenNextCloudflareForDev();

