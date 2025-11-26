/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
    images: {
      remotePatterns: [
      {
        protocol: "https",
        hostname: "img.clerk.com",
      },
      {
        protocol: "https",
        hostname: "images.clerk.dev",
      },
      {
        protocol: "https",
        hostname: "ui-avatars.com", // for the fallback avatar
      },
    ],
    domains: ["i.ibb.co.com"],
  },
  reactCompiler: true,
};

export default nextConfig;
