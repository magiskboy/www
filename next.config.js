/** @type {import('next').NextConfig} */
const { i18n } = require('./next-i18next.config');
const redirects = require("./legacy-page-redirect");


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
      },
      ...redirects,
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
        link: "https://docs.google.com/document/d/1LsWN6eFli6Jic1oKZ_xce6qUKRFRKpdW/edit?usp=sharing&ouid=108176893074599585656&rtpof=true&sd=true",
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
    domains: ["miro.medium.com", "meme-arsenal.com", "web-dev.imgix.net", "user-images.githubusercontent.com"],
  },
  pageExtensions: ["mdx", "md", "tsx", "ts"],
};

module.exports = nextConfig;
