/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configure for deployment on Netlify
  reactStrictMode: true,

  // For static exports, uncomment the following line:
  output: 'export',

  // For static exports, we need to disable image optimization
  images: {
    unoptimized: true,
    domains: [
      "source.unsplash.com",
      "images.unsplash.com",
      "ext.same-assets.com",
      "ugc.same-assets.com",
    ],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "source.unsplash.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "ext.same-assets.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "ugc.same-assets.com",
        pathname: "/**",
      },
    ],
  },

  // Disable type checking completely for builds
  typescript: {
    // Skip type checking entirely
    tsconfigPath: false
  },

  // Disable linting completely for builds
  eslint: {
    // Skip linting entirely
    dirs: []
  },

  // Improve webpack configuration for Tesseract.js
  webpack: (config, { isServer, dev }) => {
    // This is needed for Tesseract.js to work properly
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      path: false,
      crypto: false,
    };

    // Avoid server-side Tesseract usage
    if (isServer) {
      config.externals.push('tesseract.js');
    }

    return config;
  },
};

module.exports = nextConfig;
