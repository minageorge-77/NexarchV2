/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com"
      }
    ]
  },
  // Ensures trailing slashes are consistent for SEO (avoids duplicate-content URLs)
  trailingSlash: false
};

export default nextConfig;
