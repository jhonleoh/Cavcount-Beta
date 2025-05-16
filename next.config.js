/** @type {import('next').NextConfig} */
const nextConfig = {
  // For Cloudflare Pages, we need to output static files
  output: 'export',
  distDir: 'out',
  images: {
    unoptimized: true,
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
