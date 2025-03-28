/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://donowak.fr',
  generateRobotsTxt: true,
  // Personnalisation supplémentaire
  changefreq: 'monthly',
  priority: 0.7,
  sitemapSize: 5000,
  exclude: ['/admin-access-6742', '/login', '/dashboard'],
  robotsTxtOptions: {
    additionalSitemaps: [],
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin-access-6742', '/login', '/dashboard']
      }
    ]
  }
}; 