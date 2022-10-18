/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['miro.medium.com'],
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/posts',
        permanent: true,
      },
    ]
  },
};

module.exports = nextConfig;
