/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "cdn.discordapp.com",
      },
      {
        hostname: "utfs.io",
      },
      {
        hostname: "static.zerochan.net",
      },
      {
        hostname: "uploadthing.com",
      },
    ],
  },
};

export default nextConfig;
