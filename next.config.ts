/** @type {import('next').NextConfig} */
const nextConfig = {
  turbopack: {
    // You can enable profiling or custom options here
  },
  images: {
    domains: ["techcrunch.com", "github.com"], // Add your allowed image hostnames here
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**", // You can replace this with actual domains
      },
    ],
  },
};

module.exports = nextConfig;
