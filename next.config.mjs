/** @type {import('next').NextConfig} */
const nextConfig = {
  // REMOVE this if exists
  // experimental: { turbo: true }
  reactStrictMode: false,
  images:{
    remotePatterns:[
      {
        protocol: 'https',
        hostname: "randomuser.me",
      }
    ]
  }
};

export default nextConfig;