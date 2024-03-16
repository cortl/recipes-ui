/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  images: {
    // remotePatterns: ["localhost", "recipes.cortlan.dev", "storage.googleapis.com"],
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "3000",
      },
      {
        protocol: "https",
        hostname: "recipes.cortlan.dev",
      },
      {
        protocol: "https",
        hostname: "storage.googleapis.com",
        pathname: "/cortl-recipe-images/**",
      },
    ],
  },
};
