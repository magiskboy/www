/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  publicRuntimeConfig: {
    utterancRepo: "magiskboy/www",
    theme: "light",
  },
  images: {
    domains: ["miro.medium.com", "meme-arsenal.com"],
  },
  pageExtensions: ["mdx", "md", "tsx", "ts"],
};

module.exports = nextConfig;
