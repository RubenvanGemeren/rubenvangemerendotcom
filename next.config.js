/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Remove 'output: export' to enable API routes and server-side rendering
  // output: 'export', // Commented out to support API routes
  images: {
    unoptimized: true,
  },
  webpack: (config, { isServer }) => {
    // Externalize MongoDB for Edge Runtime compatibility
    // MongoDB requires Node.js runtime and cannot run in Edge Runtime
    if (isServer) {
      config.externals = config.externals || [];
      config.externals.push({
        'mongodb': 'commonjs mongodb',
        'mongodb/lib/client-side-encryption/auto_encrypter': 'commonjs mongodb/lib/client-side-encryption/auto_encrypter',
        'mongodb/lib/client-side-encryption/mongocryptd_manager': 'commonjs mongodb/lib/client-side-encryption/mongocryptd_manager',
        'mongodb/lib/client-side-encryption/state_machine': 'commonjs mongodb/lib/client-side-encryption/state_machine',
      });
    }
    return config;
  },
}

module.exports = nextConfig

