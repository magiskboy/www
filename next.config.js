/** @type {import('next').NextConfig} */
const { i18n } = require('./next-i18next.config');
const redirects = require("./legacy-page-redirect");


const nextConfig = {
  reactStrictMode: true,
  i18n,
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "Cross-Origin-Opener-Policy",
            value: "same-origin",
          },
          {
            key: "Cross-Origin-Embedder-Policy",
            value: "same-origin",
          },
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: 'Permission-Policy',
            value: 'interest-cohort=()'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
        ],
      },
    ]
  },
  async redirects() {
    return [
      {
        source: '/posts',
        destination: '/',
        permanent: true,
      },
      ...redirects,
    ]
  },
  publicRuntimeConfig: {
    utterancRepo: "magiskboy/www",
    socials: [
      {
        title: "Github",
        link: "https://github.com/magiskboy",
      },
      {
        title: "LinkedIn",
        link: "https://www.linkedin.com/in/thanh-nguyen-khac",
      },
      {
        title: "Twitter",
        link: "https://twitter.com/mag1skboy",
      },
    ],
    navs: [
      {
        title: "Bài viết",
        link: "/",
      },
      {
        title: "CV",
        link: "https://cv.nkthanh.dev",
      },
      {
        title: "Danh mục",
        link: "/categories",
      },
    ],
    title: "Nguyễn Khắc Thành",
    pagination: {
      perPage: 10,
    },
  },
  images: {
    domains: ["miro.medium.com", "meme-arsenal.com", "web-dev.imgix.net", "user-images.githubusercontent.com", "raw.githubusercontent.com"],
  },
  pageExtensions: ["mdx", "md", "tsx", "ts"],
};

module.exports = nextConfig;
