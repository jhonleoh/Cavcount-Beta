/** @type {import('next').NextConfig} */
const nextConfig = {
  // Server-side rendering configuration
  images: {
    domains: ['source.unsplash.com', 'images.unsplash.com', 'ext.same-assets.com', 'ugc.same-assets.com'],
  },
  webpack: (config) => {
    config.resolve.fallback = {
      fs: false,
      path: false,
      os: false,
    };
    return config;
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

module.exports = nextConfig;
