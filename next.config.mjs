/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  reactStrictMode: true,
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || 'https://api.ibrahimlogs.me',
  },
  images: {
    unoptimized: true, // Required for static export
    remotePatterns: [
      {
        protocol: "http",
        hostname: "127.0.0.1",
        port: "8000",
      },
      {
        protocol: "https",
        hostname: "api.ibrahimlogs.me", // Updated to match your API
      },
    ],
  },
  trailingSlash: true, // Helps with static hosting
};

export default nextConfig;