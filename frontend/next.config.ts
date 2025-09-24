const { withHydrationOverlay } = require("@builder.io/react-hydration-overlay/next");

/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  reactStrictMode: true,
  async rewrites() {
    return [
      { source: '/api/:path*', destination: `${process.env.NEXT_PUBLIC_API_URL}/:path*` },
    ];
  },
};

// Wrap your config
module.exports = withHydrationOverlay({
  appRootSelector: "main", // or "#__next", depending on your setup
})(nextConfig);
