import { mkdirSync, writeFileSync } from 'node:fs'

const DEFAULT_SITE_URL = 'https://noitis-mc.github.io/noitis-website/'

function normalizeSiteUrl(rawValue) {
  const value = (rawValue || DEFAULT_SITE_URL).trim()
  const url = new URL(value)
  if (!['http:', 'https:'].includes(url.protocol)) {
    throw new Error('VITE_SITE_URL must use http or https.')
  }
  if (!url.pathname.endsWith('/')) url.pathname += '/'
  return url.toString()
}

const siteUrl = normalizeSiteUrl(process.env.VITE_SITE_URL || process.env.SITE_URL)
const publicPages = ['', 'privacy.html', 'terms.html', 'trademark.html']

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${publicPages.map((page) => `  <url><loc>${new URL(page, siteUrl).toString()}</loc></url>`).join('\n')}
</urlset>
`

const robots = `User-agent: *
Allow: /
Sitemap: ${new URL('sitemap.xml', siteUrl).toString()}
`

mkdirSync('public', { recursive: true })
writeFileSync('public/sitemap.xml', sitemap, 'utf8')
writeFileSync('public/robots.txt', robots, 'utf8')
console.log(`Generated sitemap.xml and robots.txt for ${siteUrl}`)
