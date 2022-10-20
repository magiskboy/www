/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['miro.medium.com', 'avatars.githubusercontent.com'],
  },
  pageExtensions: ['mdx', 'md', 'tsx', 'ts'],
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
