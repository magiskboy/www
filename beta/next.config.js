/** @type {import('next').NextConfig} */
const { i18n } = require('./next-i18next.config')


const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  i18n,
  async redirects() {
    return [
      {
        source: '/posts',
        destination: '/',
        permanent: true,
      }
    ]
  },
  publicRuntimeConfig: {
    utterancRepo: "magiskboy/www",
    theme: "light",
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
        title: "Bản thân",
        link: "/about",
      },
      {
        title: "Danh mục",
        link: "/categories",
      },
    ],
    title: "Nguyễn Khắc Thành",
    pagination: {
      perPage: 5,
    },
  },
  images: {
    domains: ["miro.medium.com", "meme-arsenal.com", "web-dev.imgix.net"],
  },
  pageExtensions: ["mdx", "md", "tsx", "ts"],
};

module.exports = nextConfig;
