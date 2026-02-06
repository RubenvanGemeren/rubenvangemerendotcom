/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Remove 'output: export' to enable API routes and server-side rendering
  // output: 'export', // Commented out to support API routes
  images: {
    unoptimized: true,
  },
  // Externalize mongodb so Next.js doesn't bundle it into the edge runtime.
  // It will be resolved at runtime in Cloudflare Workers (with nodejs_compat).
  serverExternalPackages: ["mongodb"],
}

module.exports = nextConfig

// Initialize OpenNext Cloudflare adapter for local development
const { initOpenNextCloudflareForDev } = require("@opennextjs/cloudflare");
initOpenNextCloudflareForDev();
