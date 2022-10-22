/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || "https://blog.nkthanh.dev",
  generateRobotsTxt: true,
  generateIndexSitemap: false,
};
